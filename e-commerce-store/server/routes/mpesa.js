// File: server/routes/mpesa.js
const express = require('express');
const router = express.Router();
const mpesaController = require('../controllers/mpesaController');
const { mpesaTokenGenerate } = require('../middleware/mpesaAuth');

router.get('/', mpesaController.home);
router.post('/stk', mpesaTokenGenerate, mpesaController.stkPush);
router.post('/stkquery', mpesaTokenGenerate, mpesaController.stkQuery);
router.post('/callback-url-path', mpesaController.callback);

module.exports = router;