// File: server/routes/mpesa.js
const express = require('express');
const router = express.Router();
const mpesaController = require('../controllers/mpesaController');
const offlineController=require('../controllers/mpesaOfflineController')
const { mpesaTokenGenerate } = require('../middleware/mpesaAuth');
const verifySafaricomIP = require('../middleware/mpesaIpCheck');

router.get('/', mpesaController.home);
router.post('/stk', mpesaTokenGenerate, mpesaController.stkPush);
router.post('/stkquery', mpesaTokenGenerate, mpesaController.stkQuery);
router.post('/secure-webhook-3947', verifySafaricomIP, mpesaController.callback);

router.post('/register-c2b', mpesaTokenGenerate, offlineController.registerC2BURLs);
router.get('/generate-reference', offlineController.generatePaymentReference);
router.post('/confirmation', verifySafaricomIP, offlineController.handleC2BConfirmation);
router.post('/validation', verifySafaricomIP, offlineController.validationUrl);
router.post('/verify-payment', offlineController.verifyOfflinePayment);



module.exports = router;