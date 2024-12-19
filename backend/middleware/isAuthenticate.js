const jwt = require('jsonwebtoken')
const registerModel = require('../Model/registerModel')


const isAuthenticate = async (req, res, next) => {
    try {
        const tokenHeader = req.headers.token
        if (!tokenHeader) {
            return res.status(403).json({ message: "Please Login to access" })
        }

        //Decode JWT signed
        const decodeData = jwt.verify(tokenHeader, process.env.JWT_SECRET_KEY)
        req.user = await registerModel.findById(decodeData._id)
        // console.log('User iD:',req.user._id)
        next()
    } catch (error) {
        res.status(403).json({ message: "Please Login to access" })
    }
}

module.exports = { isAuthenticate }