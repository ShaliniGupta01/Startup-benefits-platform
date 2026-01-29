const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    partner: { type: String },
    category: { type: String },
    isLocked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", dealSchema);
