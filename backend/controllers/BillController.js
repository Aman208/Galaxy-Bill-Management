
const Customer = require("../models/customer.js");
const ItemBill = require("../models/billItem.js");
const Product = require("../models/product.js");
const BillItem = require("../models/billItem.js");
const Bill = require("../models/bill.js");

const isItemBillValid = (item) => {

    if (!item.productId || !item.quantity || !item.price) {
        return res.status(400).json({ message: 'error', error: ['Invalid bill item data'] });
    }
}

const isBillValid = (newBill) => {

    const { customerId, billNo, billItems } = newBill;
    let errorList = [];
    if (!customerId || !billNo || !Array.isArray(billItems) || billItems.length === 0) {
        errorList[errorList.length] = "Invalid request";
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

const calculateStartDate = (range) => {
    const now = new Date();
    switch (range) {
        case '6 months':
            return new Date(now.setMonth(now.getMonth() - 6));
        case '3 months':
            return new Date(now.setMonth(now.getMonth() - 3));
        case '1 month':
            return new Date(now.setMonth(now.getMonth() - 1));
        case '12 months':
            return new Date(now.setMonth(now.getMonth() - 12));
        default:
            return null;
    }
};



const getAllBillByBillNo = async (req, res) => {

    let reqBillNo = req.body.billNo;

    const bill = await Bill.findOne({ billNo: reqBillNo });

    if (bill === null) {
        res.status(500).json({ error: "No bills found for this customer" });
        return
    }

    const billItems = await ItemBill.find({ billId: bill._id });
    const customer = await Customer.findById(bill.customerId);


    var result = {};

    result = {
        customerId: bill.customerId,
        customerName: customer.name,
        billId: bill._id,
        billNo: bill.billNo,
        purchaseDate: bill.purchaseDate,
        totalAmount: bill.totalAmount,
        totalQuantity: bill.totalQuantity,
    }
    var itemsResult = [];
    for (const item of billItems) {
        const product = await Product.findById(item.productId);
        itemsResult.push({
            productId: item.productId,
            productName: product ? product.name : 'Unknown',
            itemQuantity: item.quantity,

            itemRate: item.price,
            itemTotal: item.quantity * item.price
        });
    }
    result = { ...result, "billItem": itemsResult }
    res.status(201).json({ message: 'success', data: result });

}


const getAllBillByCustomerId = async (req, res) => {
    let reqCustomerId = req.body.customerId;
    let duration = req.body.dateRange;

    let customer = await Customer.findById(reqCustomerId);
    if (customer == null) {
        res.status(400).json({
            message: 'error',
            errors: ["Invalid Customer"]
        });
    }

    const startDate = calculateStartDate(duration);
    const endDate = new Date();

    let bills = await Bill.find({
        customerId: reqCustomerId, purchaseDate: {
            $gte: startDate,
            $lte: endDate
        }
    });

    if (bills && bills.length === 0) {
        res.status(500).json({ error: "No bills found for this customer" });
        return
    }
    var result = [];
    let totalAlmirah = 0, totalDressing = 0, totalTable = 0;

    for (const bill of bills) {
        const billItems = await ItemBill.find({ billId: bill._id });
        const itemsResult = [];


        for (const item of billItems) {
            const product = await Product.findById(item.productId);

            switch (product.productType) {
                case "Almirah": {
                    totalAlmirah += item.quantity;
                    break;
                }
                case "Dressing": {
                    totalDressing += item.quantity;
                    break;
                }
                case "Table": {
                    totalTable += item.quantity;
                    break;
                }
            }

            itemsResult.push({
                productId: item.productId,
                productName: product ? product.name : 'Unknown',
                itemQuantity: item.quantity,
                itemRate: item.price,
                itemTotal: item.quantity * item.price
            });
        }

        result.push({
            billId: bill._id,
            customerId: customer._id,
            customerName: customer.name,
            billNo: bill.billNo,
            purchaseDate: bill.purchaseDate,
            totalAmount: bill.totalAmount,
            totalQuantity: bill.totalQuantity,
            "billItem": itemsResult
        })

    }
    res.status(201).json({
        message: 'success', data: result,
        stats: {
            "totalAlmirah": totalAlmirah,
            "totalDressing": totalDressing,
            "totalTable": totalTable
        }
    });

}

const getAllBillsPagination = async (req, res) => {

    const { customerId , dateRange } = req.body;
    const page = parseInt(req.body.page) || 0;
    const limit = parseInt(req.body.limit) || 20;

    const startDate = calculateStartDate(dateRange);
    const endDate = new Date();

    const products = await Product.find();
    const customers = await Customer.find();

    const productMap = products.reduce((acc, product) => {
        acc[product._id] = product;
        return acc;
    }, {});


    const customerMap = customers.reduce((acc, customer) => {
        acc[customer._id] = customer;
        return acc;
    }, {});

    const filter = {};

    if (customerId) {
        filter.customerId = customerId;
        filter.purchaseDate.$gte = new Date(startDate);
        filter.purchaseDate.$lte = new Date(endDate);
      }
    
    let bills = await Bill.find(filter)
    .sort({ purchaseDate: -1 })
    .skip((page) * limit)
    .limit(limit)
    .exec();

    const totalBills = await Bill.countDocuments({
        purchaseDate: {
            $gte: startDate,
            $lte: endDate
        }
    });

    if (bills && bills.length === 0) {
        res.status(500).json({ error: "No bills found" });
        return
    }
    var result = [];

    for (const bill of bills) {
        const billItems = await ItemBill.find({ billId: bill._id });
        const itemsResult = [];
        const customer = customerMap[bill.customerId] || null;

        for (const item of billItems) {
            const product = productMap[item.productId] || null;
            itemsResult.push({
                productId: item.productId,
                productName: product ? product.name : 'Unknown',
                productType: product ? product.productType : 'Unknown',
                itemQuantity: item.quantity,
                itemRate: item.price,
                itemTotal: item.quantity * item.price
            });
        }

        result.push({
            billId: bill._id,
            billNo: bill.billNo,
            customerType: customer ? customer.customerType : "Unknown",
            customerName: customer ? customer.name + " : " + customer.area : "Unknown",
            purchaseDate: bill.purchaseDate,
            totalAmount: bill.totalAmount,
            totalQuantity: bill.totalQuantity,
            "billItem": itemsResult
        })
    }
    res.status(201).json({
        message: 'success', data: result,
        totalBills,
        totalPages: Math.ceil(totalBills / limit),
        currentPage: page,
        limit: limit
    });

}

const saveBill = async (req, res) => {
    let reqBill = req.body;
    let billValidStatus = isBillValid(reqBill);
    if (!billValidStatus.status) {
        res.status(400).json({
            message: 'error',
            errors: billValidStatus.errors
        });
    }
    else {
        let totalAmount = 0;
        let totalQuantity = 0;
        const { customerId, billNo, billItems, purchaseDate } = req.body;

        for (const item of billItems) {
            isItemBillValid(item)
            const itemTotal = item.quantity * item.price;
            totalAmount += itemTotal;
            totalQuantity += 1 * item.quantity;
        }

        try {
            const bill = new Bill({ billNo, customerId, totalAmount, totalQuantity, purchaseDate: purchaseDate });
            const savedBill = await bill.save();

            const newBillItems = billItems.map(item => new BillItem({
                billId: savedBill._id,
                ...item,
            }));
            const savedBillItems = await BillItem.bulkSave(newBillItems);


            res.status(201).json({ message: 'success', data: savedBill });
        } catch (error) {
            res.status(400).json({ message: 'error', errors: [error.message] });
        }



    }
}


module.exports = {
    saveBill,
    getAllBillByCustomerId,
    getAllBillByBillNo,
    getAllBillsPagination
}