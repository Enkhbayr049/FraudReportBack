const mysql = require("mysql2");

// MySQL сервертэй холболт үүсгэх
const connection = mysql.createConnection({
  host: "localhost", // таны MySQL серверийн хост
  user: "root", // хэрэглэгчийн нэр
  password: "1234asdf", // нууц үг
  database: "report_db", // өгөгдлийн сан
});

// Холболт шалгах
connection.connect((err) => {
  if (err) {
    console.error("Холболт амжилтгүй:", err);
    return;
  }
  console.log("Холболт амжилттай холбогдлоо!");

  // --- Users хүснэгтээс бүх өгөгдлийг авах (SELECT) SQL query ---
  const selectQuery = `
        SELECT * FROM users WHERE user_id = '51abf9bf-f2c8-4449-9f99-6d4ebfd4fe1c';
    `;

  // SELECT query-г гүйцэтгэх
  connection.query(selectQuery, (err, results, fields) => {
    if (err) {
      console.error("SELECT query-г гүйцэтгэхэд алдаа гарлаа:", err);
      connection.end();
      return;
    }

    // Амжилттай болвол үр дүнг хэвлэх
    console.log("\n### 'users' Хүснэгтийн Өгөгдөл ###");
    if (results.length > 0) {
      console.log(results); // Хүснэгт хэлбэрээр хэвлэх
      console.log(`Нийт ${results.length} мөр олдлоо.`);
    } else {
      console.log("Хүснэгт хоосон байна (Мөр олдсонгүй).");
    }
    console.log("---------------------------------");

    // Холболт хаах
    connection.end();
  });
});
