const SurketModel = require('../models/surket');
const { decodeToken } = require('../middleware/auth');

const SurketController = {
  async createSurket(req, res) {
    const token = req.header('x-auth-token');

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
      const { id: user_id } = decodeToken(token); 
      
      const { nik, nama, tempat_lahir, tanggal_lahir, alamat, agama, gender, keperluan, } = req.body;
      console.log(nik, nama, tempat_lahir, tanggal_lahir, alamat, agama, gender, keperluan,  user_id);

      if (!nik || !nama || !tempat_lahir || !tanggal_lahir || !alamat || !agama ||!gender || !keperluan|| !user_id  ) {
        return res.status(400).json({ error: 'Harap lengkapi semua informasi surat keterangan.' });
      }

      const newSurket = await SurketModel.createSurket(nik, nama, tempat_lahir, tanggal_lahir, alamat, agama, gender, keperluan, user_id);
      
      res.status(201).json({ message: 'Surat keterangan berhasil dibuat.', surket: newSurket });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  async getSurketsByUserId(req, res) {
    const { user_id } = req.params;
    try {
      const surkets = await SurketModel.getSurketsByUserId(user_id);
      res.status(200).json({ surkets });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  async getAllSurket(req, res) {
    try {
      const surkets = await SurketModel.getAllSurket();
      res.status(200).json({ surkets });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  async deleteSurket(req, res) {
    const { id } = req.params;
    try {
      await SurketModel.deleteSurket(id);
      res.status(200).json({ message: 'Surat keterangan berhasil dihapus.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = SurketController;