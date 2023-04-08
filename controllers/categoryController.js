const db = require('../models')

// model
const Category = db.categories;
const Product = db.products;

// functions

//1. Add Review

const createCategory = async(req, res) => {

    let info = {
        title: req.body.title
    }

    const category = await Category.create(info)
    res.status(200).send(category)
    console.log(category)

}

const addCategorytoProduct = async(req, res) => {

    const id = req.params.id;

    let data = {
            product_id: id,
            category_id: req.body.category
        }
        // const category = await Category.create(data);

    const category = await Category.update(data, { where: { id: id } });
    res.status(200).send(category);

}
const addCategorytoTutorial = async(req, res) => {

    const id = req.params.id;

    let data = {
            tutorialId: id,
            category_id: req.body.category
        }
        // const category = await Category.create(data);

    const category = await Category.update(data, { where: { id: id } });
    res.status(200).send(category);

}

// 2. Get All Reviews

const getAllCategories = async(req, res) => {

    const categories = await Category.findAll({});
    res.status(200).send(categories);

}

module.exports = {
    createCategory,
    addCategorytoProduct,
    getAllCategories,
    addCategorytoTutorial
}