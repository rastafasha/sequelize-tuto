/*
 Ruta: /api/category
 */

const { authJwt } = require("../middleware");
const categoryController = require('../controllers/categoryController');


// crud
const router = require('express').Router();

router.post('/createCategory', [authJwt.verifyToken, authJwt.isAdmin], categoryController.createCategory);

router.get('/allCategories', [authJwt.verifyToken], categoryController.getAllCategories);

module.exports = router;