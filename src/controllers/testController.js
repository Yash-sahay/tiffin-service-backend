const testSchema = require("../models/testModal");
const subjectSchema = require("../models/subjectModal");
const questionSchema = require("../models/questionModal");
const { successResponse, apiResponse, validationFailedResponse } = require('../common/apiResponse');
const Joi = require('joi');
const moment = require('moment');

const createUpdate = async (req, res) => {
    try {
        const { body } = req;
        const noteSchima = Joi.object().keys({
            descr: Joi.string().required(),
            createdOn: Joi.date().required(),
        });
        const result = noteSchima.validate(body);
        const { error } = result;
        if (error) {
            return res.status(apiResponse.badRequest).json(validationFailedResponse(error));
        }
        else {
            let test = new testSchema(req.body);
            test.createdOn = moment.utc(test.createdOn);
            let request = await test.save();
            res.status(apiResponse.success).json(successResponse("Successfully Added", request));
        }
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

const getAll = async (req, res) => {
    try {
        const tests = await testSchema.find();
        res.status(apiResponse.success).json(successResponse("Successfully Fetch", tests));
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

const deleteRecord = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await testSchema.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            await subjectSchema.find({ testId: id }).remove();
            await questionSchema.find({ testId: id }).remove();
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