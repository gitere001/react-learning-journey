// File: server/middleware/mpesaAuth.js
const axios = require('axios');
const config = require('../config/mpesa');

const mpesaTokenGenerate = async (req, res, next) => {
    try {
        const auth = Buffer.from(
            `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
        ).toString("base64");

        const resp = await axios.get(
            `${config.MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
            {
                headers: {
                    authorization: `Basic ${auth}`,
                },
            }
        );

        req.token = resp.data.access_token;
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { mpesaTokenGenerate };