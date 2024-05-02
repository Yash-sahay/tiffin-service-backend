const User = require("../models/userModel");
const { successResponse, apiResponse, validationFailedResponse } = require('../../src/common/apiResponse');
const jwt = require('jsonwebtoken');
const Joi = require("joi");
const secretKey = "courseApi";

const signup = async (req, res) => {
    const { email, codeRoleDTO } = req.body;
    try {
        //    Validator start
        const { body } = req;
        const userSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            aadhaarNo: Joi.string().required(),
            profilePic: Joi.string().required(),
            password: Joi.string().required(),
            codeRoleDTO: Joi.object({ id: Joi.string().required() }).required(),
        });
        const result = userSchema.validate(body);
        const { error } = result;
        if (error) {
            return res.status(apiResponse.badRequest).json(validationFailedResponse(error));
        }
        // Validator end

        if (codeRoleDTO?.id == "ST") {
            req.body = {
                ...req.body,
                codeRoleDTO: {
                    ...req.body.codeRoleDTO,
                    descr: "Staff"
                }
            }
        }
        else if (codeRoleDTO?.id == "AD") {
            req.body = {
                ...req.body,
                codeRoleDTO: {
                    ...req.body.codeRoleDTO,
                    descr: "Admin"
                }
            }
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.status(apiResponse.badRequest).json({ message: "User already exists" });
        }
        else {
            let user = new User(req.body);
            let request = await user.save();
            res.status(apiResponse.success).json(successResponse("User Successfully Register", request));
        }
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (email && password) {
            let user = await User.findOne(req.body).select("-password");
            if (user) {
                const token = jwt.sign({ email: email, name: name, id: user._id, roleId: user.codeRoleDTO.id }, secretKey);
                res.status(apiResponse.success).json({ message: "Successfully Login", token });
            }
            else {
                res.status(apiResponse.badRequest).json({ message: "No user found" });
            }
        }
        else {
            res.status(apiResponse.badRequest).json({ message: "No user found" });
        }
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(apiResponse.success).json(successResponse("Successfully Fetch", users));
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

module.exports = { signup, login, getAll };