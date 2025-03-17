// File: server/config/mpesa.js
const mpesaEnv = process.env.MPESA_ENV || "sandbox";
const MPESA_BASE_URL = mpesaEnv === "live" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke";

module.exports = {
    MPESA_BASE_URL
};