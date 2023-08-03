const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { username, password, deposit, role } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      deposit,
      role,
    });

    if (user) {
      return res.status(201).json({
        id: user._id,
        username: user.username,
        deposit: user.deposit,
        role: user.role,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid user data", error });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user._id,
        username: user.username,
        deposit: user.deposit,
        role: user.role,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid credentials " });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const depositCredit = async (req, res) => {
  const coins = req.body;
  const user = req.user;

  const validCoins = [5, 10, 20, 50, 100];

  if (!coins || !Array.isArray(coins) || coins.length === 0) {
    return res
      .status(400)
      .json({ message: "Please provide an array of coins to deposit" });
  }

  // Check if all coins are valid
  const invalidCoins = coins.filter((coin) => !validCoins.includes(coin));
  if (user.role === "buyer" && invalidCoins.length > 0) {
    return res.status(401).json({
      message:
        "Invalid coins. Only 5, 10, 20, 50, and 100 cent coins are allowed.",
    });
  }
  try {
    // Calculate the total deposit and update user's deposit amount
    const totalDeposit = coins.reduce((acc, coin) => acc + coin, 0);
    user.deposit += totalDeposit;
    await user.save();

    res
      .status(200)
      .json({ message: "Deposit successful", deposit: user.deposit });
  } catch (error) {
    console.error("Error while depositing coins:", error);
    res.status(500).json({ message: "Failed to deposit coins" });
  }
};

const resetDeposit = async (req, res) => {
  const user = req.user;

  if (user.role !== "buyer") {
    return res.status(403).json({ message: "Forbidden. User not authorized" });
  }

  try {
    user.deposit = 0;
    await user.save();

    res
      .status(200)
      .json({ message: "Deposit reset successful", deposit: user.deposit });
  } catch (error) {
    console.error("Error while resetting deposit:", error);
    res.status(500).json({ message: "Failed to reset deposit" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  depositCredit,
  resetDeposit,
};
