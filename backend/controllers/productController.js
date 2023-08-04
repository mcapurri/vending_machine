const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};
const addProduct = async (req, res) => {
  const user = req.user;
  const { amountAvailable, cost, productName, sellerId } = req.body;

  if (!productName || !cost || !amountAvailable) {
    res
      .status(400)
      .json({ message: "Please fill all the fields to add a product" });
  }

  if (user.role !== "seller") {
    res.status(401).json({ message: "User not authorized to add products" });
  }

  try {
    const newProduct = await Product.create({
      amountAvailable,
      cost,
      productName,
      sellerId,
    });

    console.log("new product added".green, newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(400).json({ message: "Product not found" });
    }

    if (product.sellerId.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    console.log(`updated product ${req.params.id}`.green, updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (product.sellerId.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await Product.deleteOne({ _id: product._id });
    console.log(`Deleted product ${req.params.id}`.red);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

const buyProducts = async (req, res) => {
  const { products } = req.body;
  const user = req.user;

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ message: "Invalid product data" });
  }

  if (user.role !== "buyer") {
    return res
      .status(401)
      .json({ message: "User not authorized to buy products" });
  }

  try {
    let totalSpent = 0;
    const purchasedProducts = [];

    for (const { _id, amount, cost } of products) {
      if (!_id || !amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid productId or amount" });
      }

      const product = await Product.findById(_id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${_id} not found` });
      }

      const totalCost = product.cost * amount;
      if (user.deposit < totalCost) {
        return res.status(400).json({ message: "Insufficient funds" });
      }

      totalSpent += totalCost;

      user.deposit -= totalCost;

      product.amountAvailable -= amount;

      purchasedProducts.push({
        _id,
        productName: product.productName,
        amount,
        cost,
        sum: amount * cost,
      });

      await product.save();
    }

    await user.save();

    res.status(200).json({
      message: "Purchase successful",
      totalSpent,
      purchasedProducts,
      change: calculateChange(totalSpent, user.deposit),
    });
  } catch (error) {
    console.error("Error while buying products:", error);
    res.status(500).json({ message: "Failed to buy products" });
  }
};

const calculateChange = (totalCost, deposit) => {
  let changeAmount = deposit - totalCost;
  const availableCoins = [100, 50, 20, 10, 5];
  const change = [];

  for (const coin of availableCoins) {
    while (changeAmount >= coin) {
      change.push(coin);
      changeAmount -= coin;
    }
  }

  return change;
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  buyProducts,
};
