
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// signup
async function createUser(req, res, next) {
    var { email } = req.body
    var user = await userModel.findOne({ email })
    if (user) {
        res.send({ message: "Email id is already register", alert: false });
    } else {
        try {
            var newUser = await userModel.create(req.body);
            // res.status(200).json(newUser);
            console.log(newUser)
            res.send({ message: "Successfully sign up", alert: true });
            next()
            return

        } catch (err) {
            return res.status(422).json(err.message);
        }
    }


}




// Login

async function login(req, res) {
    console.log(req.body)

    var { email, password } = req.body
    var user = await userModel.findOne({ email }) // {email:email}

    if (user) {
        var valid = await bcrypt.compare(user.password, password);
        console.log(valid)

        const dataSend = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image,
        }
        console.log(dataSend)
        res.send({ message: "Login is successfully", alert: true, data: dataSend })

    }



    else {

        return res.send({ message: "Email is not available , please sign up", alert: false })
    }
}







module.exports = { createUser, login }