const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review');

router.get('/reviews', reviewController.getAllReviews);
router.post('/reviews', reviewController.addReview);
router.put('/reviews/:reviewId', reviewController.updateReview);
router.delete('/reviews/:reviewId', reviewController.deleteReview);

module.exports = router;
