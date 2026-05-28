const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    bloodPressure: String,

    sugarLevel: String,

    weight: Number,

    height: Number,

    heartRate: String,

    sleepHours: Number,

    diet: String,

    medicines: String

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "HealthRecord",
    healthRecordSchema
);