const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const productsController = require('../controllers/productosController');

//INICIO//
router.get('/', productsController.index);

//DETALLE INICIO & FIGURAS//
router.get('/detail/:id', productsController.detail);

//FIGURAS//
router.get('/figures', productsController.figures);

//MANGA//
router.get('/manga', productsController.manga);
router.get('/detailManga/:id', productsController.detailManga);

//ROPA//
router.get('/clothes', productsController.clothes);
router.get('/detailClothes/:id', productsController.detailClothes);

//PRODUCTOS//
router.get('/producto', productsController.products)
router.get('/producto/detailProducto/:id', productsController.detailProducto)




module.exports = router;