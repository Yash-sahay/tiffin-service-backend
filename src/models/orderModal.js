const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'menus' },
        status: {
            type: String,
            enum: ['PE', 'REF', 'DIS', 'DVD'],
            default: "PE"
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("orders", orderSchema);