const express = require('express');
const { createOrUpdate, getAll } = require('../controllers/orderController');
const orderRouter = express.Router();

orderRouter.post("/createOrUpdate", createOrUpdate);
orderRouter.get("/getAll", getAll);

module.exports = orderRouter;