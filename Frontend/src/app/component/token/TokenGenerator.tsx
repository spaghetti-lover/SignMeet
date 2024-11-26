import jwt from "jsonwebtoken";

const appID = 280263608; // Replace with your App ID
const serverSecret = "1175c6e2e8bec41076e917a9a01a5627"; // Replace with your Server Secret

/**
 * Generates a ZEGOCLOUD token.
 * @param {string} userID - The unique user ID.
 * @param {number} effectiveTimeInSeconds - Token expiration time in seconds.
 * @returns {string} - The generated token.
 */
export const generateToken = (userID: string, effectiveTimeInSeconds = 3600): string => {
  const payload = {
    app_id: appID,
    user_id: userID,
    nonce: Math.floor(Math.random() * 1e9), // Random nonce
    ctime: Math.floor(Date.now() / 1000), // Current time in seconds
    expire: effectiveTimeInSeconds, // Token validity duration in seconds
  };

  return jwt.sign(payload, serverSecret, { algorithm: "HS256" });
};
