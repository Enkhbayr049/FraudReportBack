// routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// --- RESTful API замууд ---

// Бүх хэрэглэгчийг авах: GET /api/users
// Жишээ: router.get("/", userController.getAllUsers);
// Таны өмнөх загварыг дагавал:
router.post("/list", userController.getAllUsers);

// Шинэ хэрэглэгч үүсгэх: POST /api/users
// Жишээ: router.post("/", userController.createUser);
// Таны өмнөх загварыг дагавал:
router.post("/create_user", userController.createUser);

// Хэрэглэгчийг ID-гаар авах: GET /api/users/:id
// ID-г 'user_id' гэж тодорхойлсон ч Express нь req.params.user_id-аар авна.
router.get("/get_user/:user_id", userController.getUserById); // ✅ Эхэнд нь / нэмсэн

// Шинээр нэмсэн: Хэрэглэгч устгах: DELETE /api/users/:id
router.delete("/delete_user/:user_id", userController.deleteUser);

module.exports = router;
