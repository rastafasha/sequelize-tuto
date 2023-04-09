/*
 Ruta: /api/user
 */

const { authJwt } = require("../middleware");
const userController = require('../controllers/userController');
const addressController = require('../controllers/addressController');


// router
const router = require('express').Router();


// crud
router.get('/:id', [authJwt.verifyToken], userController.getOneUser);

router.delete('/delete/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUser);

router.post('/update/:id', [authJwt.verifyToken], userController.upload, userController.updateUser);

router.get('/allUsers', [authJwt.verifyToken, authJwt.isAdmin], userController.getAllUsers);

router.get('/active', [authJwt.verifyToken, authJwt.isAdmin], userController.getActiveUser);


// Addresss
router.get('/allAddress', [authJwt.verifyToken], addressController.getAllAddresses);
router.post('/addAddress/:id', [authJwt.verifyToken], addressController.addAddress);

// reviews, comments by user

router.get('/getReviews/:id', [authJwt.verifyToken], userController.getUserReviews);
router.get('/getComents/:id', [authJwt.verifyToken], userController.getUserComments);

// get user address, product, role
router.get('/getAddress/:id', userController.getUserAddress);
router.get('/getProduct/:id', userController.getUserProducts);
router.get('/getRole/:id', userController.getUserRole);



module.exports = router;