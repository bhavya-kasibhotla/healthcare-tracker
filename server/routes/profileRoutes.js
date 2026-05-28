const express =
require("express");

const router =
express.Router();

const {

  saveProfile,

  getProfile

} = require(
  "../controllers/profileController"
);

const protect =
require("../middleware/authMiddleware");


// SAVE PROFILE

router.post(
  "/save",
  protect,
  saveProfile
);


// GET PROFILE

router.get(
  "/get",
  protect,
  getProfile
);

module.exports = router;