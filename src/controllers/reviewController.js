const reviewSchema = require("../models/reviewModal");
const { successResponse, apiResponse, validationFailedResponse } = require('../common/apiResponse');
const Joi = require('joi');

const createUpdate = async (req, res) => {
    try {
        const { body } = req;
        console.log(body);
        console.log(req.file);
        const validationSchima = Joi.object().keys({
            name: Joi.string().required(),
            descr: Joi.string().required(),
        });
        const result = validationSchima.validate(body);
        const { error } = result;
        if (error) {
            return res.status(apiResponse.badRequest).json(validationFailedResponse(error));
        }
        else {
            let review = new reviewSchema(req.body);
            let request = review.save();
            res.status(apiResponse.success).json(successResponse("Successfully Added", req.file));
        }
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

const getAll = async (req, res) => {
    try {
        const reviews = await reviewSchema.find();
        res.status(apiResponse.success).json(successResponse("Successfully Fetch", reviews));
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

const deleteRecord = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await reviewSchema.deleteOne({ _id: id });
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