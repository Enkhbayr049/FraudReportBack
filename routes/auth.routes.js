const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller"); // Controller-ийг дуудна

// Нэвтрэх маршрут
router.post("/sign_in", authController.signIn);

module.exports = router;
