const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      default: ""
    },

    email: {
      type: String,
      default: ""
    },

    message: {
      type: String,
      required: [true, "Feedback message is required"],
      trim: true,
      minlength: 5,
      maxlength: 1000
    },

    status: {
      type: String,
      enum: ["New", "Reviewed", "Resolved"],
      default: "New"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

feedbackSchema.index({
  user:1,
  createdAt:-1
});

feedbackSchema.set("toJSON",{
  versionKey:false
});

feedbackSchema.set("toObject",{
  versionKey:false
});

module.exports = mongoose.model("Feedback", feedbackSchema);
