const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { signup, login, verify } = require("./handlers/auth");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "https://frontend-service-ykmr.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

app.post("/signup", signup);
app.post("/login", login);
app.post("/verify", verify);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
