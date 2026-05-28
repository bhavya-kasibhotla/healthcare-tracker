const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
    addMedicine,
    getMedicines,
    markTaken,
    deleteMedicine
} = require("../controllers/medicineController");


// ADD
router.post("/add", protect, addMedicine);

// GET ALL
router.get("/all", protect, getMedicines);

// TOGGLE TAKEN / RESET
router.put("/taken/:id", protect, markTaken);

// DELETE
router.delete("/delete/:id", protect, deleteMedicine);

module.exports = router;
