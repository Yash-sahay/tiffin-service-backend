const testSchema = require("../models/testModal");
const subjectSchema = require("../models/subjectModal");
const setSchema = require("../models/setModal");
const questionSchema = require("../models/questionModal");
const { successResponse, apiResponse, validationFailedResponse } = require('../common/apiResponse');
const Joi = require('joi');

const createUpdate = async (req, res) => {
    try {
        const { body } = req;
        const checkTest = await testSchema.findOne({ _id: body?.testId });
        const checkSubject = await subjectSchema.findOne({ _id: body?.subjectId });
        const checkSet = await setSchema.findOne({ _id: body?.setId });
        if (!checkTest.id) {
            return res.status(apiResponse.badRequest).json({ message: "Please select correct test" });
        }
        if (!checkSubject.id) {
            return res.status(apiResponse.badRequest).json({ message: "Please select correct subject" });
        }
        if (!checkSet.id) {
            return res.status(apiResponse.badRequest).json({ message: "Please select correct set" });
        }
        const noteSchima = Joi.object().keys({
            testId: Joi.string().required(),
            subjectId: Joi.string().required(),
            setId: Joi.string().required(),
            descr: Joi.string().required(),
            aOption: Joi.string().required(),
            bOption: Joi.string().required(),
            cOption: Joi.string().required(),
            dOption: Joi.string().required(),
            answer: Joi.string().required(),
        });
        const result = noteSchima.validate(body);
        const { error } = result;
        if (error) {
            return res.status(apiResponse.badRequest).json(validationFailedResponse(error));
        }
        else {
            let question = new questionSchema(req.body);
            let request = await question.save();
            res.status(apiResponse.success).json(successResponse("Successfully Added", request));
        }
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

const getAll = async (req, res) => {
    try {
        const questions = await questionSchema.find().populate("testId").populate("subjectId").populate("setId");
        res.status(apiResponse.success).json(successResponse("Successfully Fetch", questions));
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}


const deleteRecord = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await questionSchema.deleteOne({ _id: id });
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