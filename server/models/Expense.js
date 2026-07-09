const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: [true, "Expense title is required"],
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Food",
        "Transport",
        "Shopping",
        "Bills",
        "Entertainment",
        "Health",
        "Education",
        "Travel",
        "Other"
      ]
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01
    },

    date: {
      type: Date,
      default: Date.now
    },

    note: {
      type: String,
      trim: true,
      maxlength: 500,
      default: ""
    },

    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "UPI",
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "Other"
      ],
      default: "Cash"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

expenseSchema.index({

  user: 1,

  date: -1

});

expenseSchema.index({

  user: 1,

  category: 1

});

expenseSchema.index({

  user: 1,

  amount: -1

});

expenseSchema.set("toJSON", {
  virtuals: true,
  versionKey: false
});

module.exports = mongoose.model("Expense", expenseSchema);
