const express = require("express");
const router = express.Router();

const { getPayments, recordPayment } = require('../controllers/PaymentController');  

router.post('/payments',  recordPayment);
router.get('/payments/:id',  getPayments);


module.exports = router