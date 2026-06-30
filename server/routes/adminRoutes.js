const express = require("express");

const {

  getDashboard

} = require("../controllers/adminController");

const {

  protect

} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(

  "/dashboard",

  protect,

  getDashboard

);

module.exports = router;