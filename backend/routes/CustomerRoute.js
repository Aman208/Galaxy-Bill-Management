const express = require("express");
const router = express.Router();

const {
    getCustomers,
    getCustomerById,
    saveCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/CustomerController.js')



router.get('/customers',  getCustomers);
router.get('/customers/:id',  getCustomerById);
router.post('/customers',  saveCustomer);
router.patch('/customers/:id',  updateCustomer);
router.delete('/customers/:id', deleteCustomer);

module.exports = router