const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator')

const PricingSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, 'Please provide customer id'],
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, 'Please provide product id']
    },
    price: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    });

PricingSchema.index({ customerId: 1, productId: 1 }, { unique: true });

PricingSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

const Pricing = mongoose.model('Pricing', PricingSchema);

module.exports = Pricing;