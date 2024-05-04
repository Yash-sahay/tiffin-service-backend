const fs = require('fs');

module.exports.uploadDoc = async (req, res, next) => {
    try {
        if (req.file.path) {
            return res.status(200).send({ code: 200, status: true, url: req.file.path });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    }
}

module.exports.deleteDoc = async (req, res) => {
    fs.unlink(req.body.url, (err) => {
        if (err) {
            return res.status(500).send({ code: 500, message: "Error deleting file:", err });
        }
        else {
            return res.status(200).send({ code: 200, message: 'File deleted successfully', url: req.body.url });
        }
    });
}

