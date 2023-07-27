const getProducts = async (req, res) => {
  res.status(200).json({ message: "All the products" });
};
const addProduct = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  console.log(req.body.text);
  res.status(200).json({ message: "Added product" });
};

const updateProduct = async (req, res) => {
  res.status(200).json({ message: `Updated product ${req.params.id}` });
};

const deleteProduct = async (req, res) => {
  res.status(200).json({ message: `Deleted product ${req.params.id}` });
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
