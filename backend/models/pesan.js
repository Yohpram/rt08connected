const { pool } = require('../config/config');

const pesanModel = {
  async createpesan(user_id, pesan, file) {
    try {
      const result = await pool.query(
        'INSERT INTO "pesan" (user_id, pesan, file, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [user_id, pesan, file]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating pesan: ${error.message}`);
    }
  },

  async getpesanByUserId(user_id) {
    try {
      const result = await pool.query(
        'SELECT * FROM "pesan" WHERE user_id = $1',
        [user_id]
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Error getting pesan: ${error.message}`);
    }
  },

  async deletepesan(id) {
    try {
      await pool.query(
        'DELETE FROM "pesan" WHERE id = $1',
        [id]
      );
    } catch (error) {
      throw new Error(`Error deleting pesan: ${error.message}`);
    }
  }
};

module.exports = pesanModel;
