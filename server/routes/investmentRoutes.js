const express = require("express");

const {
  createInvestment,
  getInvestments,
  updateInvestment,
  deleteInvestment
} = require("../controllers/investmentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(protect, createInvestment)
  .get(protect, getInvestments);

router
  .route("/:id")
  .put(protect, updateInvestment)
  .delete(protect, deleteInvestment);

module.exports = router;