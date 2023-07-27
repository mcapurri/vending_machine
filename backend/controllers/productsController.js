const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};
const addProduct = async (req, res) => {
  const { amountAvailable, cost, productName, sellerId } = req.body;

  if (!productName || !cost || !amountAvailable || !sellerId) {
    res
      .status(400)
      .json({ message: "Please fill all the fields to add a product" });
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
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found".red);
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

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
