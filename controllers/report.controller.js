// controllers/report.controller.js
const ReportModel = require("../models/report.model");

exports.submitNewReport = async (req, res) => {
  // Хүсэлтийн биеэс (body) шаардлагатай мэдээллийг авах
  const {
    reporter_name,
    reporter_email,
    fraud_type,
    description,
    amount_lost,
    fraud_date,
  } = req.body;

  // 1. Үндсэн Шаардлагатай Талбарыг Шалгах
  if (!fraud_type || !description) {
    return res
      .status(400)
      .json({ message: "Fraud type and description are required fields." });
  }

  try {
    // 2. Model-ийн функцыг дуудах
    const newReportId = await ReportModel.create({
      reporter_name,
      reporter_email,
      fraud_type,
      description,
      // NaN бол 0-ээр солих
      amount_lost: parseFloat(amount_lost) || 0,
      fraud_date,
    });

    // 3. Амжилттай хариу буцаах
    res.status(201).json({
      message: "Report submitted successfully.",
      reportId: newReportId,
      status: "New",
    });
  } catch (error) {
    console.error("Error submitting new report:", error);
    // DB-ээс эсвэл бусад гэнэтийн алдаа
    res
      .status(500)
      .json({ message: "Internal server error during report submission." });
  }
};

// UPDATE Controller
exports.updateReport = async (req, res) => {
  const reportId = req.params.id;
  const updateData = req.body; // Шинэчлэх мэдээлэл

  try {
    const affectedRows = await ReportModel.update(reportId, updateData);

    if (affectedRows === 0) {
      // Мөр олдсон боловч өөрчлөгдөөгүй, эсвэл ID-аар олоогүй
      const exists = await ReportModel.findById(reportId);
      if (!exists) {
        return res
          .status(404)
          .json({ message: `Report with ID ${reportId} not found.` });
      }
    }

    res.status(200).json({
      message: `Report ID ${reportId} updated successfully.`,
      updatedRows: affectedRows,
    });
  } catch (error) {
    console.error(`Error updating report ID ${reportId}:`, error);
    res.status(500).json({ message: "Internal server error during update." });
  }
};

// DELETE Controller
exports.deleteReport = async (req, res) => {
  const reportId = req.params.id;

  try {
    const affectedRows = await ReportModel.remove(reportId);

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `Report with ID ${reportId} not found.` });
    }

    // Устгасан бол 204 No Content эсвэл 200 OK буцааж болно
    res
      .status(200)
      .json({ message: `Report ID ${reportId} successfully deleted.` });
  } catch (error) {
    console.error(`Error deleting report ID ${reportId}:`, error);
    res.status(500).json({ message: "Internal server error during delete." });
  }
};

// GET ALL Controller

exports.getAllReports = async (req, res) => {
  try {
    // ReportModel-ийн getAll функцийг дуудан бүх report-уудыг авах
    const reports = await ReportModel.getAll();

    // Амжилттай бол 200 OK статус болон report-уудын жагсаалтыг буцаана
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching all reports:", error);
    // Алдаа гарвал 500 Internal Server Error буцаана
    res.status(500).json({
      message: "Internal server error while fetching reports.",
      error: error.message,
    });
  }
};

// ------------------------------------------------------------------
// READ SINGLE REPORT Controller (Нэмэлтээр)
// ------------------------------------------------------------------
exports.getReportById = async (req, res) => {
  // URL-ын параметрээс ID-г авах
  const reportId = req.params.id;

  try {
    const report = await ReportModel.findById(reportId);

    if (!report) {
      // Report олохгүй бол 404 Not Found статус буцаана
      return res
        .status(404)
        .json({ message: `Report with ID ${reportId} not found.` });
    }

    // Амжилттай бол 200 OK статус болон Report-ын мэдээллийг буцаана
    res.status(200).json(report);
  } catch (error) {
    console.error(`Error fetching report ID ${reportId}:`, error);
    res.status(500).json({ message: "Internal server error." });
  }
};
