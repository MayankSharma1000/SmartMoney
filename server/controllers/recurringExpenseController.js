const RecurringExpense = require("../models/RecurringExpense");

const createRecurringExpense = async (req, res) => {
  try {
    const { title, category, amount, frequency, nextDueDate, paymentMethod } =
      req.body;

    if (!title || !amount || !nextDueDate) {
      return res.status(400).json({
        success: false,
        message: "Title, amount and next due date are required"
      });
    }

    const recurringExpense = await RecurringExpense.create({
      user: req.user._id,
      title,
      category,
      amount,
      frequency,
      nextDueDate,
      paymentMethod
    });

    res.status(201).json({
      success: true,
      recurringExpense
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getRecurringExpenses = async (req, res) => {
  try {
    const recurringExpenses = await RecurringExpense.find({
      user: req.user._id
    }).sort({ nextDueDate: 1 });

    res.status(200).json({
      success: true,
      recurringExpenses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteRecurringExpense = async (req, res) => {
  try {
    const recurringExpense = await RecurringExpense.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!recurringExpense) {
      return res.status(404).json({
        success: false,
        message: "Recurring expense not found"
      });
    }

    await recurringExpense.deleteOne();

    res.status(200).json({
      success: true,
      message: "Recurring expense deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createRecurringExpense,
  getRecurringExpenses,
  deleteRecurringExpense
};