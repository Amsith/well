const mongoose = require('mongoose')

// Schema Definition
const reviewSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true
        },
        title: {
            type: String,
            required: [true, "Name is Required"]
        },
        author: {
            type: String,
            required: [true, "Author is Required"]
        },
        rating: {
            type: Number, // Change the type to Number for star ratings
            min: 1, // Minimum value for the rating
            max: 5, // Maximum value for the rating
            required: [true, "Minimum 1 and Maximun 5"]
        },
        review: {
            type: String,
            required: [true, "Review is Required"]
        }
    },
    { timestamps: true }
);


// Model Creation
const reviewModel = mongoose.model("review", reviewSchema);

// Export the Model
module.exports = reviewModel;
