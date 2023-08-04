const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  buyProducts,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.post("/add-product", protect, addProduct);
router.post("/buy-products", protect, buyProducts);
router
  .route("/edit/:id")
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
