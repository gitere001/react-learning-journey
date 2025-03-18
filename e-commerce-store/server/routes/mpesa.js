// File: server/routes/mpesa.js
const express = require('express');
const router = express.Router();
const mpesaController = require('../controllers/mpesaController');
const { mpesaTokenGenerate } = require('../middleware/mpesaAuth');
const verifySafaricomIP = require('../middleware/mpesaIpCheck');

router.get('/', mpesaController.home);
router.post('/stk', mpesaTokenGenerate, mpesaController.stkPush);
router.post('/stkquery', mpesaTokenGenerate, mpesaController.stkQuery);
router.post('/secure-webhook-3947', verifySafaricomIP, mpesaController.callback);


module.exports = router;