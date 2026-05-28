const HealthRecord = require("../models/HealthRecord");


// ADD RECORD
exports.addHealthRecord = async (req, res) => {
    try {
        const {
            bloodPressure,
            sugarLevel,
            weight,
            height,
            heartRate,
            sleepHours,
            diet
        } = req.body;

        const record = await HealthRecord.create({
            userId: req.user,
            bloodPressure,
            sugarLevel,
            weight,
            height,
            heartRate,
            sleepHours,
            diet
        });

        res.status(201).json({
            message: "Health Record Added",
            record
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET RECORDS
exports.getHealthRecords = async (req, res) => {
    try {
        const records = await HealthRecord.find({
            userId: req.user
        }).sort({ createdAt: -1 });

        res.status(200).json(records);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// UPDATE RECORD
exports.updateHealthRecord = async (req, res) => {
    try {
        const updatedRecord = await HealthRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedRecord) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.status(200).json({
            message: "Record Updated",
            updatedRecord
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// DELETE RECORD
exports.deleteHealthRecord = async (req, res) => {
    try {
        const deleted = await HealthRecord.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.status(200).json({
            message: "Record Deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
