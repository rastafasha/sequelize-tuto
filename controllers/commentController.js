const db = require('../models');
const Comment = db.comments;



const addComment = async(req, res) => {

    const id = req.params.id;

    let data = {
        product_id: id,
        name: req.body.name,
        text: req.body.text
    }

    const comment = await Comment.create(data);
    res.status(200).send(comment);

}

const findAllComments = async(req, res) => {

    const comments = await Comment.findAll({});
    res.status(200).send(comments);

}

module.exports = {
    addComment,
    findAllComments

}