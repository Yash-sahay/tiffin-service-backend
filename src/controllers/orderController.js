const orderModal = require("../models/orderModal");
const { successResponse, apiResponse, validationFailedResponse } = require('../common/apiResponse');
const Joi = require("joi");

const createOrUpdate = async (req, res) => {
    const { descr } = req.body;
    try {
        let role = new orderModal(req.body);
        let request = await role.save();
        res.status(apiResponse.success).json(successResponse("Role Successfully Register", request));
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}


const getAll = async (req, res) => {
    try {
        const orders = await orderModal.find().populate("userId").populate("menuId");
        // const orders = await orderModal.find();
        res.status(apiResponse.success).json(successResponse("Successfully Fetch", orders));
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

module.exports = { createOrUpdate, getAll };