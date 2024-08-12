const { pool } = require('../config/config');

const OrderModel = {
  async createOrder(produk_id,  metode_pembayaran, user_id, bulan_bayar, bukti_bayar) {
    try {
      const result = await pool.query(
        'INSERT INTO "iuran" (produk_id, metode_pembayaran, user_id, bulan_bayar, bukti_bayar) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [produk_id, metode_pembayaran, user_id, bulan_bayar, bukti_bayar]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  },

  async getOrdersByUserId(user_id) {
    try {
      const result = await pool.query(
        'SELECT * FROM "iuran" WHERE user_id = $1',
        [user_id]
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Error getting iuran: ${error.message}`);
    }
  },

  async getAllOrders() {
    try {
      const result = await pool.query('SELECT * FROM "iuran"');
      return result.rows;
    } catch (error) {
      throw new Error(`Error getting all iuran: ${error.message}`);
    }
  },

  async deleteOrder(order_id) {
    try {
      await pool.query('DELETE FROM "iuran" WHERE id = $1', [order_id]);
    } catch (error) {
      throw new Error(`Error deleting iuran: ${error.message}`);
    }
  },
};

module.exports = OrderModel;
