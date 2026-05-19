const express = require("express");
const router = express.Router();
const SOSLog = require("../models/SOSLog");
const User = require("../models/User");
const { verifyToken } = require("./auth");
const TelegramBot = require("node-telegram-bot-api");

// Initialize Telegram bot (polling: false because we only SEND, not receive)
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

// Helper function to send Telegram message to one contact
const sendTelegramAlert = async (chatId, message) => {
  try {
    await bot.sendMessage(chatId, message, { parse_mode: "HTML" });
    return { success: true, chatId };
  } catch (err) {
    console.error(`❌ Failed to send Telegram to chatId ${chatId}:`, err.message);
    return { success: false, chatId, error: err.message };
  }
};

// POST /api/sos — Send SOS alert
router.post("/", verifyToken, async (req, res) => {
  try {
    const { lat, lng, message } = req.body;

    // Validate location
    if (!lat || !lng) {
      return res.status(400).json({ msg: "Location is required to send SOS" });
    }

    // Fetch user with emergency contacts from DB
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const emergencyContacts = user.emergencyContacts || [];

    // Build Google Maps link
    const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;

    // Build the Telegram message
    const telegramMessage = 
      `🚨 <b>EMERGENCY SOS ALERT</b> 🚨\n\n` +
      `<b>From:</b> ${user.name}\n` +
      `<b>Phone:</b> ${user.phone || "Not provided"}\n\n` +
      `<b>Message:</b> ${message || "I need immediate help!"}\n\n` +
      `<b>📍 Live Location:</b>\n` +
      `${mapsLink}\n\n` +
      `<i>Please respond immediately or call emergency services.</i>`;

    // Send to all contacts that have a telegramChatId
    const telegramResults = [];
    const contactsWithTelegram = emergencyContacts.filter(c => c.telegramChatId);
    const contactsWithoutTelegram = emergencyContacts.filter(c => !c.telegramChatId);

    if (contactsWithTelegram.length > 0) {
      // Send all messages in parallel
      const sendPromises = contactsWithTelegram.map(contact =>
        sendTelegramAlert(contact.telegramChatId, telegramMessage)
      );
      const results = await Promise.all(sendPromises);
      telegramResults.push(...results);
    }

    // Count successes and failures
    const successCount = telegramResults.filter(r => r.success).length;
    const failCount = telegramResults.filter(r => !r.success).length;

    console.log(`✅ SOS sent: ${successCount} Telegram alerts sent, ${failCount} failed`);
    if (contactsWithoutTelegram.length > 0) {
      console.log(`⚠️  ${contactsWithoutTelegram.length} contacts have no Telegram Chat ID`);
    }

    // Save SOS event to DB
    const sosLog = new SOSLog({
      userId: req.user.userId,
      lat,
      lng,
      message: message || "Emergency SOS Alert",
      contactsNotified: emergencyContacts,
      status: successCount > 0 ? "sent" : "failed"
    });
    await sosLog.save();

    // Increment user's SOS count
    await User.findByIdAndUpdate(req.user.userId, { $inc: { sosCount: 1 } });

    // Send response back to frontend
    res.json({
      msg: "SOS alert processed",
      telegramSent: successCount,
      telegramFailed: failCount,
      contactsWithoutTelegram: contactsWithoutTelegram.length,
      sosLog,
      location: {
        lat,
        lng,
        googleMapsUrl: mapsLink
      }
    });

  } catch (err) {
    console.error("SOS route error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/sos/history — Get SOS history for logged-in user
router.get("/history", verifyToken, async (req, res) => {
  try {
    const logs = await SOSLog.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ sosLogs: logs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;