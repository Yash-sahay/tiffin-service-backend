const express = require('express');
const { createUpdate, getAll, deleteRecord } = require('../controllers/questionController');
const auth = require('../middlewares/auth');
const questionRouter = express.Router();

questionRouter.post("/createUpdate", auth, createUpdate);
questionRouter.get("/all", auth, getAll);
questionRouter.delete("/delete/:id", auth, deleteRecord);

module.exports = questionRouter;