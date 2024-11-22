const Customer = require("../models/customer.js");
const ItemBill = require("../models/billItem.js");
const Product = require("../models/product.js");
const BillItem = require("../models/billItem.js");
const Bill = require("../models/bill.js");

const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: 'http://localhost:9200' });

const getAllBills = async (req, res) => {

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

    
    let bills = await Bill.find()
    .sort({ purchaseDate: -1 })
    .exec();


    if (bills && bills.length === 0) {
        res.status(500).json({ error: "No bills found" });
        return
    }

    var itemsResult = [];

    for (const bill of bills) {
        const billItems = await ItemBill.find({ billId: bill._id });
        const customer = customerMap[bill.customerId] || null;

        for (const item of billItems) {
            const product = productMap[item.productId] || null;
            itemsResult.push({
                purchaseDate: bill.purchaseDate,
                billNo: bill.billNo,
                customerArea:customer ? customer.area : "Unknown",
                customerDistrict:customer ? customer.district : "Unknown",
                customerType: customer ? customer.customerType : "Unknown",
                customerName: customer ? customer.name + " : " + customer.area : "Unknown",
                productName: product ? product.name : 'Unknown',
                productType: product ? product.productType : 'Unknown',
                itemQuantity: item.quantity,
                itemRate: item.price,
                itemTotal: (item.quantity)*(item.price)
            });
        }
    }

    await storeObjectsInElasticsearch('customer_bill_test' , itemsResult)

    res.status(201).json({
        message: 'success'
    });

}


async function storeObjectsInElasticsearch(indexName, dataArray) {
    try {
      const indexExists = await client.indices.exists({ index: indexName });
      if (!indexExists.body) {
        await client.indices.create({ index: indexName });
      }
  
      const bulkOperations = dataArray.flatMap(doc => [
        { index: { _index: indexName } },
        doc
      ]);
  
      const { body } = await client.bulk({ refresh: true, operations: bulkOperations });
  
      if (body?.errors) {
        console.error('Errors occurred while indexing data:', body.items);
      } else {
        console.log('Successfully indexed data:', body.items);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }



module.exports = {
    getAllBills
}


