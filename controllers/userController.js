const db = require('../models');

// image Upload
const multer = require('multer');
const path = require('path');


// create main Model
const User = db.users;
const Role = db.roles;
const Product = db.products;
const Address = db.addresses;
const Comment = db.comments;
const Review = db.reviews;

// main work


// 2. get all users

const getAllUsers = async(req, res) => {

    let users = await User.findAll({})
    res.status(200).send(users)

}

// 3. get single user

const getOneUser = async(req, res) => {

    let id = req.params.id
    let user = await User.findOne({ where: { id: id } })
    res.status(200).send(user)

}

// 4. update user

const updateUser = async(req, res) => {

    let id = req.params.id;

    const user = await User.update(req.body, { where: { id: id } });

    res.status(200).send(user);


}

// 5. delete user by id

const deleteUser = async(req, res) => {

    let id = req.params.id

    await User.destroy({ where: { id: id } })

    res.status(200).send('User is deleted !')

}

// 6. get Active user

const getActiveUser = async(req, res) => {

    const users = await User.findAll({ where: { active: true } })

    res.status(200).send(users)

}

// 7. connect one to many relation

const getUserProducts = async(req, res) => {

    const id = req.params.id

    const data = await User.findOne({
        include: [{
            model: Product,
            as: 'product'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}
const getUserAddress = async(req, res) => {

    const id = req.params.id

    const data = await User.findOne({
        include: [{
            model: Address,
            as: 'address'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}
const getUserRole = async(req, res) => {

    const id = req.params.id

    const data = await User.findOne({
        include: [{
            model: Role,
            as: 'role'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}
const getUserComments = async(req, res) => {

    const id = req.params.id

    const data = await User.findOne({
        include: [{
            model: Comment,
            as: 'comment'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}
const getUserReviews = async(req, res) => {

    const id = req.params.id

    const data = await User.findOne({
        include: [{
            model: Review,
            as: 'reviews'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}



// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/users/')
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
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    getActiveUser,
    upload,
    getUserProducts,
    getUserAddress,
    getUserRole,
    getUserComments,
    getUserReviews

}