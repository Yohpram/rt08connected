const ReviewModel = require('../models/review');
const { decodeToken  } = require('../middleware/auth');

const ReviewController = {
  async getReviewsByProductId(req, res) {
    const productId = req.params.id;
    try {
      const reviews = await ReviewModel.getReviewsByProductId(productId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addReviewByProductId(req, res) {
    const { review } = req.body;
    const productId = req.params.id;

    if (!review || !productId) {
      return res.status(400).json({ error: 'Harap lengkapi semua bidang ulasan.' });
    }

    try {
      const token = req.header('x-auth-token');
      
      if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
      }

      const { id: userId } = decodeToken(token);

      const newReview = await ReviewModel.addReviewByProductId(review, productId, userId);
      res.status(201).json({ message: 'Ulasan berhasil ditambahkan.', review: newReview });
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
  },     

  async updateReview(req, res) {
    const reviewId = req.params.reviewId;
    const newReview = req.body.review;

    try {
      const updatedReview = await ReviewModel.updateReviewById(reviewId, newReview);

      if (!updatedReview) {
        return res.status(404).json({ error: 'Ulasan tidak ditemukan.' });
      }

      res.json({ message: 'Ulasan berhasil diperbarui.', review: updatedReview });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteReview(req, res) {
    const reviewId = req.params.reviewId;

    try {
      const deletedReview = await ReviewModel.deleteReviewById(reviewId);

      if (!deletedReview) {
        return res.status(404).json({ error: 'Ulasan tidak ditemukan.' });
      }

      res.json({ message: 'Ulasan berhasil dihapus.', review: deletedReview });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ReviewController;