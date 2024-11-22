const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator')

const BillItemSchema = new Schema({
    billId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill",
        required: [true, 'Please provide bill id'],
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, 'Please provide product id']
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide district']
    }
},
    {
        timestamps: true
    });

BillItemSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

const BillItem = mongoose.model('BillItem', BillItemSchema);

module.exports = BillItem;