const OrderModel = require('../models/order');
const { decodeToken } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Tambahkan ekstensi file
  },
});

const upload = multer({ storage: storage });

const OrderController = {
  async createOrder(req, res) {
    const token = req.header('x-auth-token');

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    upload.single('bukti_bayar')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      try {
        const { id: user_id } = decodeToken(token);

        const { produk_id, metode_pembayaran, bulan_bayar } = req.body;
        const bukti_bayar = req.file ? req.file.filename : null;

        if (!produk_id || !metode_pembayaran || !user_id || !bulan_bayar || !bukti_bayar) {
          return res.status(400).json({ error: 'Harap lengkapi semua informasi .' });
        }

        const newOrder = await OrderModel.createOrder(produk_id, metode_pembayaran, user_id, bulan_bayar, bukti_bayar);

        res.status(201).json({ message: 'Pesanan berhasil dibuat.', order: newOrder });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    });
  },

  async getOrdersByUserId(req, res) {
    const { user_id } = req.params;
    try {
      const orders = await OrderModel.getOrdersByUserId(user_id);
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllOrders(req, res) {
    try {
      const orders = await OrderModel.getAllOrders();
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteOrder(req, res) {
    const { order_id } = req.params;
    try {
      await OrderModel.deleteOrder(order_id);
      res.status(200).json({ message: 'iuran deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = OrderController;
