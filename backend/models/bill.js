const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator')

const BillSchema = new Schema({
    billNo: {
        type : String,
        required : true,
        unique : true
     },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, 'Please provide customer id'],
    },
    totalAmount: {
        type: Number,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: [true, 'Please provide district']
    },
    purchaseDate: {
        type: Date,
        required: [true, 'Please provide bill date']
    },
},
    {
        timestamps: true
    });

BillSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;