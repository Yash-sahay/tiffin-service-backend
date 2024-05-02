const express = require('express');
const { createUpdate, getAll, deleteRecord } = require('../controllers/reviewController');
const auth = require('../middlewares/auth');
const reviewRouter = express.Router();
const { imageUpload, videoUpload } = require('../common/fileUploadMulter');

reviewRouter.post("/createUpdate", imageUpload.single('image'), createUpdate);
// reviewRouter.post("/createUpdate", videoUpload.single('video'), createUpdate);
reviewRouter.get("/all", getAll);
reviewRouter.delete("/delete/:id", auth, deleteRecord);

module.exports = reviewRouter;