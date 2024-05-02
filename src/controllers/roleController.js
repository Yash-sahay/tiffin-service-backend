const roleModel = require("../models/roleModel");
const { successResponse, apiResponse, validationFailedResponse } = require('../common/apiResponse');
const Joi = require("joi");

const createOrUpdate = async (req, res) => {
    const { descr } = req.body;
    try {
        //    Validator start
        const { body } = req;
        const roleSchema = Joi.object({
            descr: Joi.string().required()
        });
        const result = roleSchema.validate(body);
        const { error } = result;
        if (error) {
            return res.status(apiResponse.badRequest).json(validationFailedResponse(error));
        }
        // Validator end

        const existingRole = await roleModel.findOne({ descr: descr });
        if (existingRole) {
            res.status(apiResponse.badRequest).json({ message: "Role already exists" });
        }
        else {
            let role = new roleModel(req.body);
            let request = await role.save();
            res.status(apiResponse.success).json(successResponse("Role Successfully Register", request));
        }
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

module.exports = { createOrUpdate };