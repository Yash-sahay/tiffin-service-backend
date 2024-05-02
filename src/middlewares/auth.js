const jwt = require('jsonwebtoken');
const secretKey = "courseApi";
const { apiResponse } = require('../../src/common/apiResponse');
const User = require("../models/userModel");

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorizations;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, secretKey);
            // req.body.userId = user?.id;
            // req.body.userDetail = await User.findOne({ _id: user?.id });
        }
        else {
            res.status(apiResponse.unauthorized).json({ message: "Unauthorized User" });
        }
        next();
    } catch (error) {
        res.status(apiResponse.unauthorized).json({ message: "Unauthorized User" });
    }
}

module.exports = auth;