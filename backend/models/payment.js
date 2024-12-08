const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator')

const PaymentSchema = new Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, 'Please provide customer id'],
    },
    billId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill",
        required: [true, 'Please provide bill id'],
    },
    paymentAmount: {
        type: Number,
        required: [true, 'Please provide amount'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Please provide payment method'],
        enum: ['Cash', 'Cash Credit (CC)', 'Current A/C' , 'Others A/C'],
    },
    paymentDescription: {
        type: String
    },
    paymentDate: {
        type: Date,
        required: [true, 'Please provide payment date']
    },
},
    {
        timestamps: true
    });

PaymentSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;