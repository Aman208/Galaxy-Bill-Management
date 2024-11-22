const express = require("express");
const router = express.Router();

const {
    getProducts,
    saveProduct
} = require('../controllers/ProductController.js');



router.get('/products',  getProducts);
router.post('/products',  saveProduct);


module.exports = router