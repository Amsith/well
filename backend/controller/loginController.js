const registerModel = require("../Model/registerModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check the email
        const user = await registerModel.findOne({ email })
        
        if (!user) {
            return res.status(400).json({ message: "invalid credential" })
        }

        // match passowrd
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "invalid credential" })
        }

        // Generate Toke
        // jwt.sign(payload, secretOrPrivateKey, options):
        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
        // console.log("Token:", token)


        // Send response with token and role
        res.status(200).json({
            message: "Login successful",
            token, // JWT token
            role: user.role, // Send the user's role for role-based authentication
            id: user._id,
            user// Send limited user data
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}






module.exports = { login}