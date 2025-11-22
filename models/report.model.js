// models/report.model.js
const db = require("../config/db.config"); // db.config.js файл нь MySQL connection pool-ийг export хийж байгаа

const Report = {
  // Шинэ Report үүсгэх функц
  create: async ({
    reporter_name,
    reporter_email,
    fraud_type,
    description,
    amount_lost,
    fraud_date,
  }) => {
    const query = `
            INSERT INTO reports 
            (reporter_name, reporter_email, fraud_type, description, amount_lost, fraud_date) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;

    // SQL Injection-ээс хамгаалах үүднээс параметруудыг тусад нь дамжуулна
    const values = [
      reporter_name || null, // null байж болно
      reporter_email || null, // null байж болно
      fraud_type,
      description,
      amount_lost || 0,
      fraud_date || null, // null байж болно
    ];

    try {
      const [result] = await db.execute(query, values);
      // insertId нь шинээр үүссэн мөрийн ID
      return result.insertId;
    } catch (error) {
      // Алдаа гарвал дээш дамжуулна
      throw error;
    }
  },

  // UPDATE функц
  update: async (id, data) => {
    // Энэ нь маш нарийн төвөгтэй SQL query үүсгэх тул, талбаруудыг динамикаар үүсгэх шаардлагатай.
    // data нь { fraud_type: 'шинэ төрөл', status: 'In Progress' } гэх мэт object байна.
    const keys = Object.keys(data);
    const setQuery = keys.map((key) => `${key} = ?`).join(", ");
    const values = [...Object.values(data), id];

    if (keys.length === 0) return 0; // Шинэчлэх зүйл байхгүй бол

    const query = `UPDATE reports SET ${setQuery} WHERE id = ?`;

    const [result] = await db.execute(query, values);
    return result.affectedRows; // Шинэчлэгдсэн мөрийн тоо
  },

  // DELETE функц
  remove: async (id) => {
    const query = "DELETE FROM reports WHERE id = ?";
    const [result] = await db.execute(query, [id]);
    return result.affectedRows; // Устгагдсан мөрийн тоо
  },

  getAll: async () => {
    const [rows] = await db.execute(
      "SELECT * FROM reports ORDER BY created_at DESC"
    );
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM reports WHERE id = ?", [id]);
    return rows[0];
  },
};

module.exports = Report;
