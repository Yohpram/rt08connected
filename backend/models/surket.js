const { pool } = require('../config/config');

const SurketModel = {
  async createSurket(nik, nama, tempat_lahir, tanggal_lahir, alamat, agama, gender, keperluan, user_id,) {
    try {
      const result = await pool.query(
        'INSERT INTO "suket" (nik, nama, tempat_lahir, tanggal_lahir, alamat, agama, gender, keperluan, user_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) RETURNING *',
        [nik, nama, tempat_lahir, tanggal_lahir, alamat, agama, gender, keperluan, user_id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating surket: ${error.message}`);
    }
  },

  async getSurketsByUserId(user_id) {
    try {
      const result = await pool.query(
        'SELECT * FROM "suket" WHERE user_id = $1',
        [user_id]
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Error getting surkets: ${error.message}`);
    }
  },
  async getAllSurket() {
    try {
      const result = await pool.query(
        'SELECT * FROM "suket"'
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Error getting all surkets: ${error.message}`);
    }
  },

  async deleteSurket(id) {
    try {
      await pool.query(
        'DELETE FROM "suket" WHERE id = $1',
        [id]
      );
    } catch (error) {
      throw new Error(`Error deleting surket: ${error.message}`);
    }
  }

};

module.exports = SurketModel;