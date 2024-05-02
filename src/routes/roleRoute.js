const express = require('express');
const { createOrUpdate } = require('../controllers/roleController');
const roleRouter = express.Router();

roleRouter.post("/createOrUpdate", createOrUpdate);

module.exports = roleRouter;