// server.js
const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");

const app = express();

// Middleware
app.use(express.json()); // JSON format-ийн хүсэлтийн биеийг (body) уншихад

// API Routes
app.use("/api/users", userRoutes);

// Энгийн тест маршрут
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express + MySQL backend." });
});

// Серверийг эхлүүлэх
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
