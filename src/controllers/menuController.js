const menuModel = require("../models/menuModal");
const { successResponse, apiResponse, validationFailedResponse } = require('../common/apiResponse');
const Joi = require("joi");

const createOrUpdate = async (req, res) => {
    const { menuName } = req.body;
    try {
        //    Validator start
        const { body } = req;
        const menuSchema = Joi.object({
            menuName: Joi.string().required(),
            menuImage: Joi.string().required()
        });
        const result = menuSchema.validate(body);
        const { error } = result;
        if (error) {
            return res.status(apiResponse.badRequest).json(validationFailedResponse(error));
        }
        // Validator end

        const existingMenu = await menuModel.findOne({ menuName: menuName });
        if (existingMenu) {
            res.status(apiResponse.badRequest).json({ message: "Menu already exists" });
        }
        else {
            let role = new menuModel(req.body);
            let request = await role.save();
            res.status(apiResponse.success).json(successResponse("Menu Successfully Register", request));
        }
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}


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