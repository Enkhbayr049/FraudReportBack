// models/user.model.js
const db = require("../config/db.config");

const User = {
  // Бүх хэрэглэгчийг авах
  getAll: async () => {
    const [rows] = await db.execute(
      "SELECT id, username, email, created_at, first_name, last_name, phone_number FROM users"
    );
    return rows;
  },

  // Шинэ хэрэглэгч үүсгэх
  create: async (username, email, passwordHash) => {
    // Энэ хэсэгт passwordHash-ийг бодож оруулах шаардлагатай
    const [result] = await db.execute(
      "INSERT INTO users (username, email, password, first_name, last_name, phone_number) VALUES (?, ?, ?, ?, ?, ?)",
      [username, email, passwordHash]
    );
    return result.insertId;
  },
  // ... бусад функцууд (getById, update, delete)
};

module.exports = User;
