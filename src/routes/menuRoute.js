const express = require('express');
const { createOrUpdate, getAll } = require('../controllers/menuController');
const menuRoute = express.Router();

menuRoute.post("/createOrUpdate", createOrUpdate);
menuRoute.get("/getAll", getAll);

module.exports = menuRoute;