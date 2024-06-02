const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        price: String,
        todayMenu: {
            type: String,
            enum: [false, true],
            default: false
        },
        orderConfirmed: {
            type: String,
            enum: [false, true],
            default: false
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("menus", menuSchema);