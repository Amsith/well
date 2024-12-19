const mongoose = require('mongoose')



const registerSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true,

    },
    password: {
        required: true,
        type: String
    },
    role: {
        type: String,
        default: "user"
    }
})



const registerModel = mongoose.model('Register', registerSchema);


module.exports =  registerModel 