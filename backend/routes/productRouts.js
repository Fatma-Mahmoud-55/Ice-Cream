const express = require("express");
var router = express.Router();
const ProductsModel = require("../models/productModel");
var {createProduct,getAllProducts} = require("../controllers/productControl");





//add create
router.post("/product", async (req, res, next) => {
    var product = req.body;
    try {
        var savedProduct = await createProduct(product);
        res.status(200).json(savedProduct);
    } catch (err) {
        res.json({ message: err.message });
    }
});


//get all
router.get("/product", async (req, res, next) => {
    try {
        var Products = await getAllProducts();

        var listedProducts = Products.filter((product) => {
            return !product.isDeleted;
        });
        if (listedProducts.length === 0) {
            res.send("No Products");
        } else {
            res.status(200).json(listedProducts);
        }
    } catch (err) {
        res.json({ message: err.message });
    }
});




module.exports = router;