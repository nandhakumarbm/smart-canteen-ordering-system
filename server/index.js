const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/smart-canteen-ordering-system");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/test", (req, res) => {
  res.send("Smart canteen API is running...");
});

app.use("/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
