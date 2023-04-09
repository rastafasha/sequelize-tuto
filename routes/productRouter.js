/*
 Ruta: /api/product
 */

const { authJwt } = require("../middleware");
const productController = require('../controllers/productController.js');
const reviewController = require('../controllers/reviewController');
const categoryController = require('../controllers/categoryController');


// router
const router = require('express').Router();


// crud
router.get('/:id', [authJwt.verifyToken], productController.getOneProduct);

router.put('/update/:id', [authJwt.verifyToken, authJwt.isAdmin], productController.updateProduct);

router.delete('/delete/:id', [authJwt.verifyToken, authJwt.isAdmin], productController.deleteProduct);

router.post('/addProduct', [authJwt.verifyToken, authJwt.isAdmin], productController.upload, productController.addProduct);

router.get('/allProducts', [authJwt.verifyToken, authJwt.isAdmin], productController.getAllProducts);

router.get('/published', [authJwt.verifyToken], productController.getPublishedProduct);

// search
router.get("/search?title=[kw]", productController.search);

// Delete all 
router.delete("/deleteAll", productController.deleteAll);


// Reviews
router.get('/allReviews', [authJwt.verifyToken], reviewController.getAllReviews);
router.post('/addReview/:id', [authJwt.verifyToken], reviewController.addReview);

// get product Reviews, category, comment
router.get('/getProductReviews/:id', [authJwt.verifyToken], productController.getProductReviews);
router.get('/getProductCategory/:id', [authJwt.verifyToken], productController.getProductCategories);


//category
router.put('/addCategory/:id', [authJwt.verifyToken, authJwt.isAdmin], categoryController.addCategorytoProduct);


module.exports = router;