const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    deposit: { type: Number, default: 0 },
    role: { type: String, required: true, enum: ["seller", "buyer"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userModel);
