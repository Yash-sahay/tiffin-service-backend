const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        aadhaarNo: String,
        profilePic: String,
        password: String,
        codeRoleDTO: {
            id: String,
            descr: String,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("users", userSchema);