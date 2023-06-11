const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,

    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                // return validator.isEmail(v);
                return /^[a-zA-Z]{3,8}(@)(gmail|yahoo|outlook)(.com)$/.test(v);
            },
            message: props => `${props.value} Is Not a Valid Email xxxxxxxxxxxxxxxxxxxxxxxxxx !`
        },
        required: [true, 'User Email required'],
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    image : String

}, { timestamps: true }
)


userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        console.log(this);
        next();
        console.log(hashedPassword);
    } catch (error) {
        next(error);
    }
});


var userModel = mongoose.models.User || mongoose.model("User", userSchema)

module.exports = userModel


