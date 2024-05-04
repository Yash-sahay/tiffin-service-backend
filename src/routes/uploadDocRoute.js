const express = require("express");
const uploadDocRoute = express.Router();
const uploadDocController = require("../controllers/uploadDocController");
const { fileUpload } = require('../common/fileUploadMulter');

uploadDocRoute.post('/uploadDoc', fileUpload.single('url'), uploadDocController.uploadDoc);
uploadDocRoute.post('/deleteDoc', uploadDocController.deleteDoc);


module.exports = uploadDocRoute;
