const express = require('express');
const { signup, login, getAll } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/all", getAll);

module.exports = userRouter;