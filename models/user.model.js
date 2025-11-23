// models/user.model.js

// UUID болон bcrypt сангуудыг оруулж ирэх
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const db = require("../config/db.config");

// Нууц үг hash хийхэд ашиглах "давсны" хэмжээ (өндөр байх тусам аюулгүй)
const saltRounds = 10;

const User = {
  // Бүх хэрэглэгчийг авах
  getAll: async () => {
    const [rows] = await db.execute(
      "SELECT user_id, username, email, created_at, first_name, last_name, phone_number FROM users"
    );
    return rows;
  },

  /**
   * Шинэ хэрэглэгч үүсгэх
   * @param {string} username - Хэрэглэгчийн нэр
   * @param {string} email - Имэйл хаяг
   * @param {string} password - Энгийн нууц үг
   * @param {string} firstName - Нэр
   * @param {string} lastName - Овог
   * @param {string} phoneNumber - Утасны дугаар
   * @returns {string} Үүсгэсэн хэрэглэгчийн UUID user_id
   */
  create: async (
    username,
    email,
    password,
    firstName,
    lastName,
    phoneNumber
  ) => {
    // 1. UUID үүсгэх
    const user_id = uuidv4();

    // 2. Нууц үгийг hash хийх
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 3. Өгөгдлийн санд оруулах
    const [result] = await db.execute(
      `INSERT INTO users (user_id, username, email, password, first_name, last_name, phone_number) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, username, email, passwordHash, firstName, lastName, phoneNumber]
    );

    // INSERT-ийн үр дүнд user_id-г буцааж байна
    return user_id;
  },

  /**
   * Хэрэглэгчийн ID-гаар хайж олох
   * @param {string} user_id - Хэрэглэгчийн UUID
   * @returns {Object|null} Хэрэглэгчийн мэдээлэл эсвэл null
   */
  getById: async (user_id) => {
    const [rows] = await db.execute(
      "SELECT user_id, username, email, created_at, first_name, last_name, phone_number FROM users WHERE user_id = ?",
      [user_id]
    );
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Хэрэглэгч устгах
   * @param {string} user_id - Устгах хэрэглэгчийн UUID
   * @returns {number} Устгагдсан мөрийн тоо (1 эсвэл 0)
   */
  delete: async (user_id) => {
    const [result] = await db.execute("DELETE FROM users WHERE user_id = ?", [
      user_id,
    ]);
    // affectedRows нь устгагдсан мөрийн тоог илэрхийлнэ
    return result.affectedRows;
  },

  // ... update болон бусад функцууд нэмэх боломжтой
  // models/user.model.js (Нэмэлт функц)

  // ... (Одоо байгаа кодын доор нэмнэ)

  /**
   * Хэрэглэгчийн нэрээр хайж олох (Нэвтрэхэд зориулсан)
   * @param {string} username - Хэрэглэгчийн нэр
   * @returns {Object|null} Хэрэглэгчийн мэдээлэл (нууц үгийн hash-ийг оролцуулан) эсвэл null
   */
  findByUsername: async (username) => {
    const [rows] = await db.execute(
      "SELECT user_id AS id, username, password, email, first_name, last_name, phone_number FROM users WHERE username = ?",
      [username]
    );
    // Бид JWT Payload-д ашиглахын тулд user_id-г "id" болгож буцааж байна.
    return rows.length > 0 ? rows[0] : null;
  },

  // ...
};

module.exports = User;
