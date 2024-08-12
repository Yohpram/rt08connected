const express = require('express');
const pesanController = require('../controller/pesan');

const router = express.Router();

router.post('/pesan', pesanController.upload.single('file'), pesanController.createpesan);
router.get('/pesan/user/:user_id', pesanController.getpesanByUserId);
router.delete('/pesan/:id', pesanController.deletepesan);

module.exports = router;
