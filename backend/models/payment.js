const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator')

const PaymentSchema = new Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, 'Please provide customer id'],
    },
    amount: {
        type: Number,
        required: [true, 'Please provide amount'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Please provide payment method'],
        enum: ['Cash', 'PhonePe', 'Cash Credit'],
    },
    paymentDescription: {
        type: String,
        required: [true, 'Please provide payment Description']
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