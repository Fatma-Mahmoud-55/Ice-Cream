console.log("hello from backend :)")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const userRouts = require("./routes/userRoutes")
const productRouts = require("./routes/productRouts")
const Stripe = require("stripe")

const app = express();
app.use(cors())
app.use(express.json({ limit: "10mb" }))

// port
var PORT = process.env.PORT || 3456;

// mongodb connection
console.log(process.env.MONGODB_URL)
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connect to Database Success :)"))
    .catch((err) => console.log(err))

app.get("/", (req, res) => {
    res.send("Hello Fatma")


})

//sign up
// app.post("/signup", async (req, res) => {
//     // console.log(req.body);
//     const { email } = req.body;

//     userModel.findOne({ email: email }, (err, result) => {
//         // console.log(result);
//         console.log(err);
//         if (result) {
//             res.send({ message: "Email id is already register", alert: false });
//         } else {
//             const data = userModel(req.body);
//             const save = data.save();
//             res.send({ message: "Successfully sign up", alert: true });
//         }
//     });
// });


app.use("/", userRouts)
app.use("/", productRouts)

console.log(process.env.STRIPE_SECRET_KEY)
console.log("backend checkout")
console.log("backend checkout")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
app.post("/checkout", async (req, res) => {

    console.log(req.body)
    try {
        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: "auto",
            shipping_options: [{
                shipping_rate: "shr_1NBz4UIj0GGRUwkdat516BwL"
            }],
            line_items: req.body.map((item) => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.itemName,


                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.qty
                }
            }),

            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,

        }
        const session = await stripe.checkout.sessions.create(params)
        res.status(200).json(session.id)
        // res.send({message : "payment" , success : true})


    } catch (err) {
        res.status(err.statusCode || 500).json(err.message)
    }

})





app.listen(PORT, () => {
    console.log(`Server Started Listening Successfully On ${PORT}`)
})

