const express = require('express')
// const router = require("express").Router();
var router = express.Router();
const userController = require("../controllers/userControl")







//create new user (register)
router.post("/signup", userController.createUser);

//login
router.post("/login", userController.login);



module.exports = router