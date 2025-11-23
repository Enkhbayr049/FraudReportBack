// controllers/user.controller.js
const UserModel = require("../models/user.model");
// bcrypt-ийг model дотор ашиглаж байгаа тул энд дахин оруулах шаардлагагүй

/**
 * Бүх хэрэглэгчийг авах
 * GET /api/users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * ID-гаар нэг хэрэглэгчийг авах
 * GET /api/users/:id
 */
exports.getUserById = async (req, res) => {
  const { user_id } = req.params; // Энэ нь user_id (UUID) байна
  try {
    const user = await UserModel.getById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Шинэ хэрэглэгч үүсгэх
 * POST /api/users
 */
exports.createUser = async (req, res) => {
  const { username, email, password, first_name, last_name, phone_number } =
    req.body;

  // Шаардлагатай талбарууд байгаа эсэхийг шалгах (Validation)
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required." });
  }

  try {
    // Model давхарга нь UUID үүсгэж, нууц үгийг hash хийх болно.
    const newUserId = await UserModel.create(
      username,
      email,
      password, // Энд энгийн нууц үгийг дамжуулж байна
      first_name,
      last_name,
      phone_number
    );

    // 201 Created статус болон үүсгэсэн ID-г буцаах
    res.status(201).json({
      message: "User created successfully",
      user_id: newUserId, // Model-ээс буцаж ирсэн UUID
    });
  } catch (error) {
    console.error("Error creating user:", error);
    // Хэрэв давхардсан username эсвэл email-ийн алдаа гарвал
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "Username or email already exists." });
    }
    res
      .status(500)
      .json({ message: "Could not create user due to a server error." });
  }
};

/**
 * Хэрэглэгч устгах
 * DELETE /api/users/:id
 */
exports.deleteUser = async (req, res) => {
  const { user_id } = req.params; // Энэ нь user_id (UUID) байна

  try {
    const affectedRows = await UserModel.delete(user_id);

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "User not found or already deleted." });
    }

    // 204 No Content статус нь устгах үйлдлийн хувьд стандарт
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    res.status(500).json({ message: "Could not delete user." });
  }
};
