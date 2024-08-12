const multer = require('multer');
const path = require('path');
const pesanModel = require('../models/pesan');

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename the file to avoid conflicts
  }
});

const upload = multer({ storage });

const pesanController = {
  async createpesan(req, res) {
    try {
      const { user_id, pesan } = req.body;
      const file = req.file;

      if (!user_id || !pesan) {
        return res.status(400).json({ error: 'Harap lengkapi semua informasi pesan.' });
      }

      const filePath = file ? file.path : null;
      const newPesan = await pesanModel.createpesan(user_id, pesan, filePath);

      res.status(201).json({ message: 'Pesan berhasil dibuat.', pesan: newPesan });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  async getpesanByUserId(req, res) {
    const { user_id } = req.params;
    try {
      const pesans = await pesanModel.getpesanByUserId(user_id);
      res.status(200).json({ pesans });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  async deletepesan(req, res) {
    const { id } = req.params;
    try {
      await pesanModel.deletepesan(id);
      res.status(200).json({ message: 'Pesan berhasil dihapus.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  upload // Export the upload middleware
};

module.exports = pesanController;
