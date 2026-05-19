/* eslint-disable */
import { useState, useEffect } from "react";
import { sosAPI, userAPI, isLoggedIn } from "../utils/api";

const SOS = ({ setPage }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [message, setMessage] = useState("I need immediate help!");
  const [sosResult, setSosResult] = useState(null); // stores { telegramSent, telegramFailed }

  useEffect(() => {
    if (!isLoggedIn()) {
      setPage("login");
      return;
    }
    getLocation();
    loadEmergencyContacts();
  }, [setPage]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (err) => {
        setLocationError("Unable to get location: " + err.message);
      }
    );
  };

  const loadEmergencyContacts = async () => {
    try {
      const data = await userAPI.getProfile();
      setEmergencyContacts(data.user.emergencyContacts || []);
    } catch (err) {
      console.error("Error loading contacts:", err);
    }
  };

  const handleSOS = async () => {
    if (!location) {
      setError("Location not available. Please enable location services.");
      return;
    }

    if (emergencyContacts.length === 0) {
      setError("No emergency contacts found. Please add contacts in your Profile.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // This hits POST /api/sos on your backend
      // Backend fetches contacts from DB, sends Telegram alerts, and returns result
      const result = await sosAPI.sendSOS({
        lat: location.lat,
        lng: location.lng,
        message
      });

      setSosResult(result); // save telegramSent / telegramFailed counts
      setSent(true);

    } catch (err) {
      setError(err.message || "Failed to send SOS. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetSOS = () => {
    setSent(false);
    setSosResult(null);
    setError("");
    getLocation();
  };

  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2">
          Emergency SOS
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Send instant emergency alerts to your contacts
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {locationError && !location && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            {locationError}
          </div>
        )}

        {sent ? (
          /* ── SUCCESS SCREEN ── */
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">SOS Sent!</h2>

            {/* Show how many Telegram alerts were delivered */}
            {sosResult && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-left space-y-1">
                <p className="text-green-700 font-medium">
                  📨 Telegram alerts sent: {sosResult.telegramSent ?? 0}
                </p>
                {sosResult.telegramFailed > 0 && (
                  <p className="text-orange-600 text-sm">
                    ⚠️ Failed to reach {sosResult.telegramFailed} contact(s) — check their Chat IDs in Profile.
                  </p>
                )}
                {sosResult.contactsWithoutTelegram > 0 && (
                  <p className="text-orange-500 text-sm">
                    ℹ️ {sosResult.contactsWithoutTelegram} contact(s) have no Telegram ID — add them in Profile.
                  </p>
                )}
              </div>
            )}

            <p className="text-gray-600 mb-6 text-sm">
              Your emergency contacts were notified with your current location via Telegram.
            </p>
            <button
              onClick={resetSOS}
              className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Send Another SOS
            </button>
          </div>
        ) : (
          <>
            {/* Location Status */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${location ? "bg-green-500" : "bg-yellow-400 animate-pulse"}`}></div>
                <div>
                  <div className="font-medium">Your Location</div>
                  <div className="text-sm text-gray-500">
                    {location
                      ? `Lat: ${location.lat.toFixed(6)}, Lng: ${location.lng.toFixed(6)}`
                      : "Fetching location..."}
                  </div>
                  {location && (
                    <a
                      href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-500 underline"
                    >
                      Preview on Google Maps
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-semibold mb-3">Emergency Contacts ({emergencyContacts.length})</h3>
              {emergencyContacts.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No emergency contacts set.{" "}
                  <button
                    onClick={() => setPage("profile")}
                    className="text-indigo-600 underline"
                  >
                    Add them in Profile
                  </button>
                </p>
              ) : (
                <div className="space-y-2">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex justify-between items-start text-sm">
                      <div>
                        <span className="font-medium">{contact.name}</span>
                        {contact.relation && (
                          <span className="text-gray-400 ml-1">({contact.relation})</span>
                        )}
                        <div className="text-xs mt-0.5">
                          {contact.telegramChatId
                            ? <span className="text-green-600">✅ Telegram ready</span>
                            : <span className="text-orange-500">⚠️ No Telegram ID</span>
                          }
                        </div>
                      </div>
                      <span className="text-gray-500">{contact.phone}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Message */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Custom Message (optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border p-3 rounded-lg"
                rows={3}
              />
            </div>

            {/* SOS Button */}
            <button
              onClick={handleSOS}
              disabled={loading || !location}
              className={`w-full py-6 text-xl font-bold rounded-lg shadow-lg transition-all text-white ${
                loading || !location
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 hover:scale-105"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Sending SOS...
                </span>
              ) : (
                "🚨 TRIGGER SOS"
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              This will send your live location to all emergency contacts via Telegram
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SOS;
