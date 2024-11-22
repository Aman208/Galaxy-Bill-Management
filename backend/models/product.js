const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator')

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        unique: true,
        index : true
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
    },
    defaultPrice: {
        type: Number,
        required: [true, 'Please provide model'],
    },
    productType: {
        type: String,
        required: true,
        enum: ['Almirah', 'Dressing', 'Table'],
    },
    isAddOn: {
        type: Boolean,
        required: true,
        default : false
    },
},
    {
        timestamps: true
    });

ProductSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;