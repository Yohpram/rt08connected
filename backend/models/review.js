const { pool } = require('../config/config');

const getAllReviews = async () => {
  try {
    const result = await pool.query(
      `SELECT reviews.id, reviews.review, reviews.created_at, users.username 
       FROM reviews 
       INNER JOIN users ON reviews.user_id = users.id`
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting reviews: ${error.message}`);
  }
};

const addReview = async (review, userId) => {
  try {
    const created_at = new Date();
    const result = await pool.query(
      'INSERT INTO reviews (review, user_id, created_at) VALUES ($1, $2, $3) RETURNING *',
      [review, userId, created_at]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error adding review: ${error.message}`);
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
    const result = await pool.query(
      'DELETE FROM reviews WHERE id = $1 RETURNING *',
      [reviewId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error deleting review with ID ${reviewId}: ${error.message}`);
  }
};

module.exports = {
  getAllReviews,
  addReview,
  updateReviewById,
  deleteReviewById,
};
