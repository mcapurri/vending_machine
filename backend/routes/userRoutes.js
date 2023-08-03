const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  depositCredit,
  resetDeposit,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/deposit", protect, depositCredit);
router.post("/reset", protect, resetDeposit);

module.exports = router;
