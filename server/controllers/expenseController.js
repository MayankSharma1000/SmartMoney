const Expense = require("../models/Expense");

/* ========================= */
/* ADD EXPENSE */
/* ========================= */

const addExpense = async (req, res) => {
  try {
    const {
      title,
      category,
      amount,
      date,
      note,
      paymentMethod
    } = req.body;

    if (!title || !category || !amount) {
      return res.status(400).json({
        success: false,
        message: "Title, category and amount are required"
      });
    }

    const expense = await Expense.create({
      user: req.user._id,
      title,
      category,
      amount,
      date,
      note,
      paymentMethod
    });

    res.status(201).json({
      success: true,
      expense
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ========================= */
/* GET USER EXPENSES */
/* ========================= */

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user._id
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ========================= */
/* UPDATE EXPENSE */
/* ========================= */

const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      expense: updatedExpense
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ========================= */
/* DELETE EXPENSE */
/* ========================= */

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    await expense.deleteOne();

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense
};