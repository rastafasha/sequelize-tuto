/*
 Ruta: /api/tutorial
 */

const { authJwt } = require("../middleware");
const tutorialController = require('../controllers/tutorialController');
const categoryController = require('../controllers/categoryController');
const commentController = require('../controllers/commentController');


// router
const router = require('express').Router();


// crud
router.get('/:id', [authJwt.verifyToken], tutorialController.getOneTutorial);

router.put('/update/:id', [authJwt.verifyToken, authJwt.isAdmin], tutorialController.updateTutorial);

router.delete('/delete/:id', [authJwt.verifyToken, authJwt.isAdmin], tutorialController.deleteTutorial);

router.post('/addTutorial', [authJwt.verifyToken, authJwt.isAdmin], tutorialController.upload, tutorialController.addTutorial);

router.get('/allTutorials', [authJwt.verifyToken, authJwt.isAdmin], tutorialController.getAllTutorials);

router.get('/published', [authJwt.verifyToken], tutorialController.getPublishedTutorial);

// search
router.get("/search?title=[kw]", tutorialController.search);

// Delete all 
router.delete("/deleteAll", tutorialController.deleteAll);

// get product Reviews, category, comment
router.get('/getTutorialCategory/:id', [authJwt.verifyToken], tutorialController.getTutorialCategories);
router.get('/getTutorialComment/:id', [authJwt.verifyToken], tutorialController.getTutorialComments);


//category
router.put('/addCategory/:id', [authJwt.verifyToken, authJwt.isAdmin], categoryController.addCategorytoTutorial);

//comment
router.put('/addComment/:id', [authJwt.verifyToken], commentController.addComment);
router.get('/allComments', [authJwt.verifyToken], commentController.findAllComments);



module.exports = router;