// routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Бүх хэрэглэгчийг авах зам: GET /api/users
router.get("/list", userController.getAllUsers);

// Шинэ хэрэглэгч үүсгэх зам: POST /api/users
router.post("/create_user", userController.createUser);

module.exports = router;
