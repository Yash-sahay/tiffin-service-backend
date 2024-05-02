const setSchema = require("../models/setModal");
const { successResponse, apiResponse, validationFailedResponse } = require('../common/apiResponse');
const Joi = require('joi');

const createUpdate = async (req, res) => {
    try {
        const { body } = req;
        const validateSchema = Joi.object().keys({
            descr: Joi.string().required(),
        });
        const result = validateSchema.validate(body);
        const { error } = result;
        if (error) {
            return res.status(apiResponse.badRequest).json(validationFailedResponse(error));
        }
        else {
            let set = new setSchema(req.body);
            let request = await set.save();
            res.status(apiResponse.success).json(successResponse("Successfully Added", request));
        }
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

const getAll = async (req, res) => {
    try {
        const sets = await setSchema.find();
        res.status(apiResponse.success).json(successResponse("Successfully Fetch", sets));
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

const deleteRecord = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await setSchema.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            res.status(apiResponse.success).json(successResponse(id + " is successfully deleted", result));
        } else {
            res.status(apiResponse.success).json(successResponse("Wrong ID"));
        }
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

module.exports = { createUpdate, getAll, deleteRecord };