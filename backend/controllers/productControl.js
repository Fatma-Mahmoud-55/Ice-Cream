const ProductsModel = require("../models/productModel");

// create new product
function createProduct(product) {
    return ProductsModel.create(product);
}

// get all products
function getAllProducts() {
    return ProductsModel.find()
        

}


















module.exports = {
    createProduct,
    getAllProducts
}