const mongoose = require("mongoose");

const productModel = mongoose.Schema(
  {
    amountAvailable: { type: Number, required: true },
    cost: { type: Number, required: true },
    productName: { type: String, required: true },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productModel);
