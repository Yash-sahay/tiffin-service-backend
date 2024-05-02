const express = require('express');
const { createUpdate, getAll, deleteRecord } = require('../controllers/testController');
const auth = require('../middlewares/auth');
const testRouter = express.Router();

testRouter.post("/createUpdate", auth, createUpdate);
testRouter.get("/all", auth, getAll);
testRouter.delete("/delete/:id", auth, deleteRecord);

module.exports = testRouter;