
const Customer = require("../models/customer.js");
const Pricing = require("../models/pricing.js");

const getCustomers = async (req, res) => {

    try {
        var searchName = req.query.name;
        var searchRole = req.query.role;

        let conditions = [];

        if (searchName) {
            conditions.push({name : {$regex: new RegExp(searchName, 'i')}});
        }

        if (searchRole) {
            conditions.push({ customerType: searchRole });
        }
        let customers = [];
        if (conditions.length === 0) {
            customers = await Customer.find({}).sort({name :1});
        } else {
            customers = await Customer.find({
                $or: conditions
            }).sort({name :1});
        }

        res.json({message : "success" ,data : customers});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id
        const customer = await Customer.findById(customerId);
        const pricing = await Pricing.find({customerId : customerId});
    
        res.json({"data" : customer  , "pricing" : pricing});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const isCustomerValid = (newCustomer) => {
    let errorList = [];
    if (!newCustomer.name) {
        errorList[errorList.length] = "Please enter name";
    }
    if (!newCustomer.customerType) {
        errorList[errorList.length] = "Please enter customer Type";
    }
    if (!newCustomer.area || !newCustomer.district) {
        errorList[errorList.length] = "Please enter address";
    }

    if (errorList.length > 0) {
        result = {
            status: false,
            errors: errorList
        }
        return result;
    }
    else {
        return { status: true };
    }

}

const saveCustomer = async (req, res) => {
    let newCustomer = req.body;
    let customerValidStatus = isCustomerValid(newCustomer);
    if (!customerValidStatus.status) {
        res.status(400).json({
            message: 'error',
            errors: customerValidStatus.errors
        });
    }
    else {
        const customer = new Customer(req.body);
        try {
            const savedCustomer = await customer.save();
            res.status(201).json({ message: 'success', data: savedCustomer });
        } catch (error) {
            res.status(400).json({ message: 'error', errors: [error.message] });
        }

    }
}

const updateCustomer = async (req, res) => {
    let customerReq = req.body;
    let customerValidStatus = isCustomerValid(customerReq);
    if (!customerValidStatus.status) {
        res.status(400).json({
            message: 'error',
            errors: customerValidStatus.errors
        });
    }
    else {
        try {
            const updatedcustomer = await Customer.updateOne({ _id: req.params.id }, { $set: req.body });
            res.status(201).json({ message: 'success' });
        } catch (error) {
            res.status(400).json({ message: 'error', errors: [error.message] });
        }
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (customer == null) {
            throw new Exception("Customer Not Found")
        }
        const deletedCustomer = await Customer.deleteOne({ customerId: req.params.id });

        res.status(200).json({ message: 'success' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getCustomers,
    getCustomerById,
    saveCustomer,
    updateCustomer,
    deleteCustomer
}