const express = require('express');
const SurketController = require('../controller/surket');

const router = express.Router();

router.post('/surket', SurketController.createSurket);
router.get('/surket/user/:user_id', SurketController.getSurketsByUserId);
router.get('/surket', SurketController.getAllSurket);
router.delete('/surket/:id', SurketController.deleteSurket);

module.exports = router;
