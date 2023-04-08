const db = require('../models');
const Op = db.Sequelize.Op;

// create main Model
const Tutorial = db.tutorials;
const Category = db.categories;
const Comment = db.comments;

// image Upload
const multer = require('multer');
const path = require('path');



// main work

// 1. create product

const addTutorial = async(req, res) => {

    let info = {
        image: req.file.path,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    const tutorial = await Tutorial.create(info)
    res.status(200).send(tutorial)
    console.log(tutorial)

}



// 2. get all products

const getAllTutorials = async(req, res) => {

    let tutorials = await Tutorial.findAll({})
    res.status(200).send(tutorials)

}

// 3. get single product

const getOneTutorial = async(req, res) => {

    let id = req.params.id
    let tutorial = await Tutorial.findOne({ where: { id: id } })
    res.status(200).send(tutorial)

}

// 4. update Product

const updateTutorial = async(req, res) => {

    let id = req.params.id;

    const tutorial = await Tutorial.update(req.body, { where: { id: id } });

    res.status(200).send(tutorial);


}

// 5. delete product by id

const deleteTutorial = async(req, res) => {

    let id = req.params.id

    await Tutorial.destroy({ where: { id: id } })

    res.status(200).send('Tutorial is deleted !')

}

// 6. get published product

const getPublishedTutorial = async(req, res) => {

    const tutorials = await Tutorial.findAll({ where: { published: true } })

    res.status(200).send(tutorials)

}

// 7. connect one to many relation Product and Reviews



const getTutorialCategories = async(req, res) => {

    const id = req.params.id

    const data = await Tutorial.findOne({
        include: [{
            model: Category,
            as: 'category'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}

const getTutorialComments = async(req, res) => {

    const id = req.params.id

    const data = await Tutorial.findOne({
        include: [{
            model: Comment,
            as: 'comment'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}

const search = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

const deleteAll = (req, res) => {
    Tutorial.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            });
        });
};


// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/tutorials/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')


module.exports = {
    addTutorial,
    getAllTutorials,
    getOneTutorial,
    updateTutorial,
    deleteTutorial,
    getPublishedTutorial,
    getTutorialCategories,
    upload,
    getTutorialComments,
    search,
    deleteAll

}