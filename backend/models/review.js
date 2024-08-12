const { pool } = require('../config/config');

const getReviewsByProductId = async (productId) => {
  try {
    const result = await pool.query(
      'SELECT reviews.id, reviews.produk_id, reviews.review, reviews.created_at, users.username FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE produk_id = $1',
      [productId]
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting reviews by product ID: ${error.message}`);
  }
};

const addReviewByProductId = async (review, productId, userId) => {
  try {
    const created_at = new Date();
    const result = await pool.query(
      'INSERT INTO reviews (produk_id, review, user_id, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
      [productId, review, userId, created_at]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error adding review for product ID ${productId}: ${error.message}`);
  }
};

const updateReviewById = async (reviewId, newReview) => {
  try {
    const result = await pool.query(
      'UPDATE reviews SET review = $1 WHERE id = $2 RETURNING *',
      [newReview, reviewId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error updating review with ID ${reviewId}: ${error.message}`);
  }
};

const deleteReviewById = async (reviewId) => {
  try {
    const result = await pool.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [reviewId]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error deleting review with ID ${reviewId}: ${error.message}`);
  }
};

module.exports = {
  getReviewsByProductId,
  addReviewByProductId,
  updateReviewById,
  deleteReviewById,
};