const Medicine = require("../models/Medicine");


// ADD MEDICINE
exports.addMedicine = async (req, res) => {
    try {
        const { medicineName, dosage, timing } = req.body;

        const medicine = await Medicine.create({
            userId: req.user,
            medicineName,
            dosage,
            timing
        });

        res.status(201).json({
            message: "Medicine Added",
            medicine
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET MEDICINES
exports.getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find({ userId: req.user });

        res.status(200).json(medicines);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// TOGGLE TAKEN STATUS (mark taken OR reset)
exports.markTaken = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);

        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        medicine.taken = !medicine.taken;
        await medicine.save();

        res.status(200).json({
            message: medicine.taken ? "Medicine Marked as Taken" : "Medicine Reset",
            medicine
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// DELETE MEDICINE
exports.deleteMedicine = async (req, res) => {
    try {
        const deleted = await Medicine.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        res.status(200).json({ message: "Medicine Deleted" });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
