// import controllers review, products
const productController = require('../controllers/productController.js');
const reviewController = require('../controllers/reviewController');
const categoryController = require('../controllers/categoryController');


// router
const router = require('express').Router();


// use routers
router.post('/addProduct', productController.upload, productController.addProduct);

router.get('/allProducts', productController.getAllProducts);

router.get('/published', productController.getPublishedProduct);



// Review Url and Controller

router.get('/allReviews', reviewController.getAllReviews);
router.post('/addReview/:id', reviewController.addReview);

// get product Reviews
router.get('/getProductReviews/:id', productController.getProductReviews);
router.get('/getProductCategory/:id', productController.getProductCategories);




// Products router
router.get('/:id', productController.getOneProduct);

router.put('/update/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

//category
router.post('/createCategory', categoryController.createCategory);
router.put('/addCategory/:id', categoryController.addCategorytoProduct);
router.get('/allCategories', categoryController.getAllCategories);

module.exports = router;