// File: server/controllers/mpesaController.js
const axios = require('axios');
const config = require('../config/mpesa');
const { generateTimestamp, generatePassword } = require('../utils/mpesaHelpers');

const home = (req, res) => {
    res.send("Hello world");
};

const stkPush = async (req, res) => {
    const { phoneNumber, amount } = req.body;
    const formattedPhone = `254${phoneNumber.slice(-9)}`;

    try {
        const timestamp = generateTimestamp();
        const password = generatePassword(timestamp);

        const response = await axios.post(
            `${config.MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
            {
                BusinessShortCode: process.env.MPESA_SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline", //CustomerBuyGoodsOnline - for till
                Amount: amount,
                PartyA: formattedPhone,
                PartyB: process.env.MPESA_SHORTCODE, //till number for tills
                PhoneNumber: formattedPhone,
                CallBackURL: process.env.MPESA_CALLBACK_URL,
                AccountReference: phoneNumber,
                TransactionDesc: "anything here",
            },
            {
                headers: {
                    Authorization: `Bearer ${req.token}`,
                },
            }
        );

        return res.status(200).json({
            message: `stk sent succefully to ${phoneNumber}`,
            data: {
                MerchantRequestID: response.data.MerchantRequestID,
                CheckoutRequestID: response.data.CheckoutRequestID,
                ResponseDescription: response.data.ResponseDescription,
            },
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const stkQuery = async (req, res) => {
    const { reqId } = req.body;

    if (!reqId) {
        return res.status(400).json({ error: "Missing CheckoutRequestID" });
    }

    try {
        const timestamp = generateTimestamp();
        const password = generatePassword(timestamp);

        const response = await axios.post(
            `${config.MPESA_BASE_URL}/mpesa/stkpushquery/v1/query`,
            {
                BusinessShortCode: process.env.MPESA_SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                CheckoutRequestID: reqId,
            },
            {
                headers: {
                    Authorization: `Bearer ${req.token}`,
                },
            }
        );

        return res.status(200).json({ message: "STK Query Successful", data: response.data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const callback = async (req, res) => {
    console.log('M-Pesa Callback Data:', JSON.stringify(req.body, null, 2));
    res.status(200).json("success");
};

module.exports = {
    home,
    stkPush,
    stkQuery,
    callback
};