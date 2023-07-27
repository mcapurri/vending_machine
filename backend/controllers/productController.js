const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};
const addProduct = async (req, res) => {
  const user = req.user;
  const { amountAvailable, cost, productName } = req.body;

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
      sellerId: req.user.id,
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
      res.status(400);
      console.log("Product not found".red);
      res.status(200).json({ message: "Product not found" });
    }

    await Product.deleteOne({ _id: product._id });
    console.log(`Deleted product ${req.params.id}`.red.underline);

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    console.log(error);
  }
};
const buyProduct = async (req, res) => {
  const { amount } = req.body;
  const productId = req.params.id;
  const user = req.user;

  if (!productId || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid productId or amount" });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalCost = product.cost * amount;

    if (user.deposit < totalCost) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    // Deduct the total cost from the user's deposit
    user.deposit -= totalCost;
    await user.save();

    // Update the amountAvailable for the product
    product.amountAvailable -= amount;
    await product.save();

    res.status(200).json({
      message: "Purchase successful",
      totalSpent: totalCost,
      productsPurchased: {
        productId: product._id,
        productName: product.productName,
        amount,
      },
      change: calculateChange(totalCost, user.deposit),
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
  buyProduct,
};
