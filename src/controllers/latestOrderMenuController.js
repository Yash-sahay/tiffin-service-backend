const menuModal = require("../models/menuModal");
const orderModal = require("../models/orderModal");
const { successResponse, apiResponse, validationFailedResponse } = require('../common/apiResponse');
const Joi = require("joi");

const getAll = async (req, res) => {
    try {
        const menus = await menuModal.find();
        const orders = await orderModal.find().populate("userId").populate("menuId");
        let latestMenuList = menus.slice(-6);
        let latestOrderList = orders.slice(-6);
        let latestMenuOrder = {
            latestMenuList: latestMenuList,
            latestOrderList: latestOrderList,
        }
        if (latestMenuOrder) {
            res.status(apiResponse.success).json(successResponse("Successfully Fetch", latestMenuOrder));
        }
        else{
            res.status(apiResponse.notFound).json({ message: "Data Not Found" });
        }
    } catch (error) {
        console.log(error);
        res.status(apiResponse.networkError).json({ message: "Internal Server Error" });
    }
}

module.exports = { getAll };