const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const productsController = require('../controllers/productosController');

router.get('/', productsController.index); 
router.get('/figures', productsController.figures)
router.get('/detail/:id', productsController.detail); 



module.exports = router;