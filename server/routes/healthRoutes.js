const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {

    addHealthRecord,

    getHealthRecords,

    updateHealthRecord,

    deleteHealthRecord

} = require("../controllers/healthController");



router.post(
    "/add",
    protect,
    addHealthRecord
);

router.get(
    "/all",
    protect,
    getHealthRecords
);

router.put(

    "/update/:id",

    protect,

    updateHealthRecord
);

router.delete(

    "/delete/:id",

    protect,

    deleteHealthRecord
);

module.exports = router;