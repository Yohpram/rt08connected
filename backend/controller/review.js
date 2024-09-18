const ReviewModel = require('../models/review');
const { decodeToken } = require('../middleware/auth');

const ReviewController = {
  async getAllReviews(req, res) {
    try {
      const reviews = await ReviewModel.getAllReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addReview(req, res) {
    const { review } = req.body;

    if (!review) {
      return res.status(400).json({ error: 'Harap lengkapi bidang ulasan.' });
    }

    try {
      const token = req.header('x-auth-token');

      if (!token) {
        return res.status(401).json({ error: 'Akses ditolak. Token tidak ditemukan.' });
      }

      const { id: userId } = decodeToken(token);

      const newReview = await ReviewModel.addReview(review, userId);
      res.status(201).json({ message: 'Ulasan berhasil ditambahkan.', review: newReview });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateReview(req, res) {
    const reviewId = req.params.reviewId;
    const { review: newReview } = req.body;

    if (!newReview) {
      return res.status(400).json({ error: 'Harap masukkan ulasan yang diperbarui.' });
    }

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
