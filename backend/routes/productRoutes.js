const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  buyProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.post("/add-product", protect, addProduct);
router.put("/buy/:id", protect, buyProduct);
router
  .route("/edit/:id")
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
