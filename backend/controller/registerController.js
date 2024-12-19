const bcrypt = require('bcrypt');
const registerModel = require('../Model/registerModel')


const register = async (req, res) => {
    
    try {
        const { name, email, password } = req.body;
        // Check if the email already exists
        const existingUser = await registerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Hash the password
        // const salt = await bcrypt.genSalt(10);  
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = new registerModel({
            name,
            email,
            password: hashedPassword  // Store hashed password
        });

        // Save the new user to the database
        await newUser.save();

        // Send success response
        return res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { register }
