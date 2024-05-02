const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
        descr: String
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("roles", roleSchema);