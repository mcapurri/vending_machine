const mongoose = require("mongoose");

const productModel = mongoose.Schema(
  {
    amountAvailable: { type: Number, required: true },
    cost: { type: Number, required: true },
    productName: { type: String, required: true },
    sellerId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productModel);
