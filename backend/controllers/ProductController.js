

const Product = require("../models/product.js");

const isProductValid = (newProduct) => {
    let errorList = [];
    if (!newProduct.name) {
        errorList[errorList.length] = "Please enter name";
    }
    if (!newProduct.productType) {
        errorList[errorList.length] = "Please enter productType";
    }
    if (!newProduct.defaultPrice) {
        errorList[errorList.length] = "Please enter default Price";
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

const getProducts = async (req, res) => {
    try {
        let products  = await Product.find({}).sort({productType :1  , name:1});
        res.json({data : products , message : "success"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const saveProduct = async (req, res) => {
    let newProduct = req.body;
    let productValidStatus = isProductValid(newProduct);
    if (!productValidStatus.status) {
        res.status(400).json({
            message: 'error',
            errors: productValidStatus.errors
        });
    }

    else {
        
        const product = new Product(req.body);
        try {
            const saveProduct = await product.save();
            res.status(201).json({ message: 'success', data: saveProduct });
        } catch (error) {
            res.status(400).json({ message: 'error', errors: [error.message] });
        }
    }
}




module.exports = {
    getProducts,
    saveProduct
}