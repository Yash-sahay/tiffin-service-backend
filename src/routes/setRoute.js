const express = require('express');
const { createUpdate, getAll, deleteRecord } = require('../controllers/setController');
const auth = require('../middlewares/auth');
const setRouter = express.Router();

setRouter.post("/createUpdate", auth, createUpdate);
setRouter.get("/all", auth, getAll);
setRouter.delete("/delete/:id", auth, deleteRecord);

module.exports = setRouter;