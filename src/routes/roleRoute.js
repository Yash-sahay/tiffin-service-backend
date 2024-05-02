const express = require('express');
const { createOrUpdate, getAll } = require('../controllers/roleController');
const roleRouter = express.Router();

roleRouter.post("/createOrUpdate", createOrUpdate);
roleRouter.get("/getAll", getAll);

module.exports = roleRouter;