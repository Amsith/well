// routes/studentRoute.js
const express = require('express');
const router = express.Router();

const { createReview, getReview, getReviewById, updateReview, deleteReview } = require('../controller/reviewController');
const { isAuthenticate } = require('../middleware/isAuthenticate');


router.post('/post/reviews', isAuthenticate, createReview);
router.get('/get/reviews', isAuthenticate, getReview);
router.get('/get/reviews/:id', isAuthenticate, getReviewById);
router.put('/put/reviews/:id', isAuthenticate, updateReview);
router.delete('/delete/reviews/:id', isAuthenticate, deleteReview);


module.exports = router;
