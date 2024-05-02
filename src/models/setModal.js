const mongoose = require('mongoose');

const setSchema = new mongoose.Schema(
    {
        descr: String,
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("sets", setSchema);