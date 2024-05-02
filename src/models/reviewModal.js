const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        name: String,
        descr: String,
        image: String,
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("reviews", reviewSchema);