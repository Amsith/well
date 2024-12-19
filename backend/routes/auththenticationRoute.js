const express = require('express')
const { register } = require('../controller/registerController')
const { login } = require('../controller/loginController')
const router= express.Router()


router.post('/register', register)
router.post('/login', login)


module.exports = router