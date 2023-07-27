const express = require("express");
require("dotenv").config();
require("colors");
const errorhandler = require("errorhandler");
const connectDB = require("./config/db");
const port = process.env.PORT;

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", require("./routes/productsRoutes"));

if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
}

app.listen(port, () => console.log(`Server up and running on port ${port}`));
