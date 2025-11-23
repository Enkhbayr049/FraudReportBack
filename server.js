const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const reportRoutes = require("./routes/report.routes");
const authRoutes = require("./routes/auth.routes"); // <-- Нэмэх

const app = express();

// Middleware
app.use(express.json());

// CORS тохиргоо
app.use(
  cors({
    origin: "http://localhost:3039",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes); // <-- Нэвтрэх маршрутыг нэмэх

// Энгийн тест маршрут
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express + MySQL backend." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
