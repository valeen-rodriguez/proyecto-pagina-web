const express = require('express');
const router = express.Router();

const mainController = require('../controllers/indexController');

router.get('/', mainController.index);

//CONTACTO//
router.get('/contact', mainController.contact)

//BUSCADOR//
router.get('/search', mainController.search);

module.exports = router;