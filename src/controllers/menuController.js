const menuModel = require("../models/menuModal");
const { successResponse, apiResponse, validationFailedResponse } = require('../common/apiResponse');
const Joi = require("joi");

const createOrUpdate = async (req, res) => {
    try {
        const { name, _id } = req.body;
        const existingMenu = await menuModel.findOne({ name });
        if (!_id && existingMenu) {
            return res
                .status(apiResponse.badRequest)
                .json({ message: "Menu already exists" });
        }

        let responseMessage;
        let request;

        if (_id) {
            const menu = await menuModel.findById(_id);

            if (!menu) {
                return res
                    .status(apiResponse.notFound)
                    .json({ message: "Menu not found" });
            }
            Object.assign(menu, req.body);
            request = await menu.save();

            responseMessage = "Menu Successfully Updated";
        } else {
            const newMenu = new menuModel(req.body);
            request = await newMenu.save();

            responseMessage = "Menu Successfully Created";
        }

        return res
            .status(apiResponse.success)
            .json(successResponse(responseMessage, request));
    } catch (error) {
        console.error(error);
        res
            .status(apiResponse.networkError)
            .json({ message: "Internal Server Error" });
    }
};



const getAll = async (req, res) => {
    try {
        const roles = await menuModel.find();
        res.status(apiResponse.success).json(successResponse("Successfully Fetch", roles));
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

module.exports = { createOrUpdate, getAll };