const reviewModel = require('../Model/reviewModel');



//POST =  stdentModel = const studnet = path require
const createReview = async (req, res) => {
    try {

        // Ensure req.user exists and has the _id property
        const userId = req.user?._id;
        if (!userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Destructure review details from the request body
        const { title, author, rating, review } = req.body;

        // Create a new review document
        const newReview = new reviewModel({
            userId,
            title,
            author,
            rating,
            review,
        });

        // Save the review to the database
        const savedReview = await newReview.save();

        // Send a success response with the saved review
        return res.status(201).json({
            message: "Review created successfully",
            review: savedReview,
        });
    } catch (error) {
        console.error("Error creating review:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



const getReview = async (req, res) => {
    try {


        const { rating, sortOrder } = req.query
        // Build the filter condition
        let filter = {};
        if (rating) { filter.rating = { $lte: Number(rating) } }
        // == GET http://localhost:8000/api/get/reviews?rating=3
        // if (author) filter.author = new RegExp(author, 'i');  // Case-insensitive search for author
        // if (title) filter.title = new RegExp(title, 'i');

        // Create the sort object based on sortOrder query parameter
        // Default to 'desc' (descending) if no sortOrder is provided
        const sort = sortOrder === 'asc' ? { createdAt: 1 } : { createdAt: -1 };
        // == GET http://localhost:8000/api/get/reviews?sortOrder=desc
        const response = await reviewModel.find(filter).sort(sort)

        res.status(200).json({
            Total: response.length,
            response
        }
        )
    } catch (error) {
        console.error("Error retrieving reviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getReviewById = async (req, res) => {
    try {
        const response = await reviewModel.findById(req.params.id)
        res.status(200).json(response)
    } catch (error) {
        console.error("Error retrieving reviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const updateReview = async (req, res) => {
    try {

        const id = req.params.id
        const { title, author, rating, review } = req.body

        if (!id) {
            return res.status(400).json({ message: "ID Not found" })
        }

        const response = await reviewModel.findByIdAndUpdate(
            id,
            { title, author, rating, review },
            { new: true, runValidators: true }
        )
        res.status(200).json({ message: "Updated Successfully", response })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}


const deleteReview = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await reviewModel.findByIdAndDelete(id);

        if (!response) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully", response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    createReview,
    getReview,
    getReviewById,
    updateReview,
    deleteReview
};


// try {
//     const {id} = req.params.id
//     const { title, author, rating, review } = req.body;
//     if(!id){
//         return res.status(400).json({message:"Id not found"})
//     }
//     const response = reviewModel.findByIdAndUpdate(
//         id,
//         {title, author, rating, review}
//     ) 
//     res.status(200).json({message:"Updated Successfully" ,response})
// } catch (error) {
//     console.log(error)
//     res.status(500).json({message:error.message})
// }