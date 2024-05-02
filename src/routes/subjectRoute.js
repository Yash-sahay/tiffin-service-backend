const express = require('express');
const { createUpdate, getAll, deleteRecord } = require('../controllers/subjectController');
const auth = require('../middlewares/auth');
const subjectRouter = express.Router();

subjectRouter.post("/createUpdate", auth, createUpdate);
subjectRouter.get("/all", auth, getAll);
subjectRouter.delete("/delete/:id", auth, deleteRecord);

module.exports = subjectRouter;