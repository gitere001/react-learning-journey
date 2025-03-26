const axios = require("axios");
const config = require("../config/mpesa");
const crypto = require("crypto");

let lastReceivedPayment = null; // Temporarily stores the last payment (No DB used)

/**
 * Handle M-Pesa Validation Callback
 */
const validationUrl = (req, res) => {
    console.log("Validation Request:", req.body);

    return res.status(200).json({
        ResultCode: 0, // 0 = Accept transaction, 1 = Reject transaction
        ResultDesc: "Accepted"
    });
};

/**
 * Register C2B URLs with Safaricom
 */
const registerC2BURLs = async (req, res) => {
    try {
        const accessToken = req.token;
		console.log('safaricom reached here');

        const response = await axios.post(
            `${config.MPESA_BASE_URL}/mpesa/c2b/v1/registerurl`,
            {
                ShortCode: process.env.MPESA_SHORTCODE,
                ResponseType: "Completed",
                ConfirmationURL: process.env.MPESA_CONFIRMATION_URL,
                ValidationURL: process.env.MPESA_VALIDATION_URL
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("C2B URLs Registered:", response.data);
        res.status(200).json({ message: "C2B URLs registered successfully", data: response.data });

    } catch (error) {
        console.error("Error registering C2B URLs:", error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Generate a unique payment reference
 */
const generatePaymentReference = async (req, res) => {
    try {
        const uniqueID = crypto.randomBytes(3).toString("hex").toUpperCase();
        res.status(200).json({
            shortcode: process.env.MPESA_SHORTCODE, // Return Paybill/Till Number
            paymentReference: uniqueID
        });
    } catch (error) {
        console.error("Error generating payment reference:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * Handle M-Pesa Confirmation Callback (Stores last received payment)
 */
const handleC2BConfirmation = async (req, res) => {
    try {
        console.log("M-Pesa Payment Confirmed:", req.body);

        // Store last received payment temporarily
        lastReceivedPayment = req.body;

        res.status(200).json({ message: "Confirmation received" });

    } catch (error) {
        console.error("Error handling confirmation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * Verify Payment (Check last received payment)
 */
const verifyOfflinePayment = async (req, res) => {
    try {
        const { paymentReference } = req.body;

        // If no payment has been received
        if (!lastReceivedPayment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        // Check if last received payment matches the given reference
        if (lastReceivedPayment.BillRefNumber === paymentReference) {
            return res.status(200).json({ success: true, message: "Payment confirmed" });
        }

        return res.status(404).json({ success: false, message: "Payment not found" });

    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    generatePaymentReference,
    registerC2BURLs,
    validationUrl,
    handleC2BConfirmation,
    verifyOfflinePayment
};
