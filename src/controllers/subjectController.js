const testSchema = require("../models/testModal");
const subjectSchema = require("../models/subjectModal");
const questionSchema = require("../models/questionModal");
const { successResponse, apiResponse, validationFailedResponse } = require('../common/apiResponse');
const Joi = require('joi');

const createUpdate = async (req, res) => {
    try {
        const { body } = req;
        const checkTest = await testSchema.findOne({ _id: body?.testId })
        if (!checkTest.id) {
            return res.status(apiResponse.badRequest).json({ message: "Please select correct test" });
        }
        const noteSchima = Joi.object().keys({
            testId: Joi.string().required(),
            descr: Joi.string().required(),
        });
        const result = noteSchima.validate(body);
        const { error } = result;
        if (error) {
            return res.status(apiResponse.badRequest).json(validationFailedResponse(error));
        }
        else {
            let subject = new subjectSchema(req.body);
            let request = await subject.save();
            res.status(apiResponse.success).json(successResponse("Successfully Added", request));
        }
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

const getAll = async (req, res) => {
    try {
        const subjects = await subjectSchema.find().populate("testId");
        res.status(apiResponse.success).json(successResponse("Successfully Fetch", subjects));
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

const deleteRecord = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await subjectSchema.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            await questionSchema.find({ subjectId: id }).remove();
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