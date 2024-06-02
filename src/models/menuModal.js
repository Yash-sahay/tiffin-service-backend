const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        price: String,
        todayMenu: {
            type: Boolean,
            enum: [false, true],
            default: false
        },
        orderConfirmed: {
            type: Boolean,
            enum: [false, true],
            default: false
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("menus", menuSchema);