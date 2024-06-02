const express = require('express');
const { getAll } = require('../controllers/latestOrderMenuController');
const latestOrderMenuRoute = express.Router();

latestOrderMenuRoute.get("/getAll", getAll);

module.exports = latestOrderMenuRoute;