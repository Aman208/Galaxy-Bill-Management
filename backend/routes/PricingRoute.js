const express = require("express");
const router = express.Router();

const {
    savePricing
} = require('../controllers/PricingController');



router.post('/pricing',  savePricing);


module.exports = router