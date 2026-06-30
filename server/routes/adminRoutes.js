const express = require("express");

const {

  getDashboard

} = require("../controllers/adminController");

const {

  protect

} = require("../middleware/authMiddleware");

const {

  isAdmin

} = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  isAdmin,
  getDashboard
);

module.exports = router;