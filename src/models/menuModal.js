const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
    {
        menuName: String,
        menuImage: String
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("menus", menuSchema);