const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    flavor: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        
    },
    // color: {
    //     type: String
    // },
    images: [{
        type: String
    }],




}, { timestamps: true }) //timestamps add createdAt updatedAt

const ProductModel = mongoose.model("Products", ProductSchema) //create collection

module.exports = ProductModel