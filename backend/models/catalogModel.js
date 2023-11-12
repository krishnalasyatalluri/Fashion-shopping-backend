const mongoose = require('mongoose')
const Schema = mongoose.Schema
const catalogSchema = new Schema({

    product_id: {
        type: Number,
        required: true
    },
    Product_category: {
        type: String,
        required: true

    },

    Rank: {
        type: Number,
        required: true

    },

    brand_name: {
        type: String,
        required: true


    },
    product_description: {
        type: String,
        required: true


    },
    price: {
        type: Number,
        required: true

    },

    image_link: {
        type: String,
        required: true


    }



}, { timestamps: true })
const Catalog = mongoose.model('Catalog', catalogSchema,'catalog')
module.exports = Catalog