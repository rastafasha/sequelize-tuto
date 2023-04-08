const db = require('../models')

// model
const Address = db.addresses;

// functions

//1. Add Review

const addAddress = async(req, res) => {

    const id = req.params.id;

    let data = {
        userId: id,
        type: req.body.type,
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
    }

    const address = await Address.create(data);
    res.status(200).send(address);

}

// 2. Get All Reviews

const getAllAddresses = async(req, res) => {

    const addresses = await Address.findAll({});
    res.status(200).send(addresses);

}

module.exports = {
    addAddress,
    getAllAddresses
}