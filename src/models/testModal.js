const mongoose = require('mongoose');

const testSchema = new mongoose.Schema(
    {
        descr: String,
        createdOn: Date,
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("tests", testSchema);