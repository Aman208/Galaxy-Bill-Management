const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator')

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        unique: true,
        index: true 
    },
    area: {
        type: String,
        required: [true, 'Please provide area'],
    },
    district: {
        type: String,
        required: [true, 'Please provide district'],
    },
    customerType: {
        type: String,
        required: true,
        enum: ['Dealer', 'Premium Retailer', 'Normal Retailer'],
    }
},
    {
        timestamps: true
    });

CustomerSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;