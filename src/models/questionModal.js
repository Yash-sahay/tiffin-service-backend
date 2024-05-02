const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
        testId: { type: mongoose.Schema.Types.ObjectId, ref: 'tests' },
        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'subjects' },
        setId: { type: mongoose.Schema.Types.ObjectId, ref: 'sets' },
        descr: String,
        aOption: String,
        bOption: String,
        cOption: String,
        dOption: String,
        answer: String,
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("questions", questionSchema);