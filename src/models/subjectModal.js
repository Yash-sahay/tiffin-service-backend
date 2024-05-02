const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
    {
        testId: { type: mongoose.Schema.Types.ObjectId, ref: 'tests' },
        descr: String,
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("subjects", subjectSchema);