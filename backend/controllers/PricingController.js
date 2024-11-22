
const Customer = require("../models/customer.js");
const Pricing = require("../models/pricing.js");
const Product = require("../models/product.js");

const isPricingValid = (newPricingList) => {

    for (let i = 0; i < newPricingList.length; i++) {
        let newPricing = newPricingList[i];

        if (!newPricing.customerId || !newPricing.productId) {
            errorList[errorList.length] = "Invalid request";
        }
        if (newPricing.customerId) {
            const customer = Customer.findById(newPricing.customerId)
            if (customer == null) {
                errorList[errorList.length] = "Invalid customer";
            }
        }
        if (newPricing.productId) {
            const product = Product.findById(newPricing.productId)
            if (product == null) {
                errorList[errorList.length] = "Invalid product";
            }
        }
    }

    let errorList = [];

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

const savePricing = async (req, res) => {
    let reqPricingList = req.body;
    let pricingValidStatus = isPricingValid(reqPricingList);
    if (!pricingValidStatus.status) {
        res.status(400).json({
            message: 'error',
            errors: pricingValidStatus.errors
        });
    }

    for (let i = 0; i < reqPricingList.length; i++) {
        let reqPricing = reqPricingList[i];

        try {
            let customerId = reqPricing.customerId;
            let productId = reqPricing.productId;

            const updatedPricing = await Pricing.findOneAndUpdate(
                { customerId , productId },  
                { price: reqPricing.price },        
                { new: true, upsert: true }
              );
        } catch (error) {
            console.log("Ignoring Error")
        }
    }
    res.status(201).json({ message: 'success' });
}


module.exports = {
    savePricing
}