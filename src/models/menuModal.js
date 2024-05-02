const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        price: String,
        today: {
            type: String,
            enum: ['0', '1', 'electric']
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("menus", menuSchema);