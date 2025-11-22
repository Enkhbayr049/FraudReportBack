// routes/report.routes.js
const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");
// (Анхаарах: Энд Controller-ийн функцуудыг импорт хийж байгаа)

// ------------------------------------------------------------------
// READ (БҮХИЙГ АВАХ) - GET /api/reports
// ------------------------------------------------------------------
router.get("/", reportController.getAllReports);

// ------------------------------------------------------------------
// CREATE (НЭМЭХ) - POST /api/reports
// ------------------------------------------------------------------
router.post("/", reportController.submitNewReport);

// ------------------------------------------------------------------
// READ (НЭГ АВАХ) - GET /api/reports/:id
// ------------------------------------------------------------------
router.get("/:id", reportController.getReportById); // ID-аар авах

// ------------------------------------------------------------------
// UPDATE (ӨӨРЧЛӨХ) - PUT /api/reports/:id
// ------------------------------------------------------------------
// PUT нь тухайн Report-ын бүх мэдээллийг шинээр сольдог.
// Заримдаа хэсэгчилсэн шинэчлэлд PATCH ашигладаг. Энд бид PUT-ийг сонгов.
router.put("/:id", reportController.updateReport);

// ------------------------------------------------------------------
// DELETE (УСТГАХ) - DELETE /api/reports/:id
// ------------------------------------------------------------------
router.delete("/:id", reportController.deleteReport);

module.exports = router;
