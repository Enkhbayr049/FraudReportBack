// mysql2 package суулгах: npm install mysql2

const mysql = require("mysql2");

// MySQL сервертэй холболт үүсгэх
const connection = mysql.createConnection({
  host: "localhost", // таны MySQL серверийн хост
  user: "root", // хэрэглэгчийн нэр
  password: "1234asdf", // нууц үг
  database: "report_db", // үүсгэх гэж буй өгөгдлийн сан
});

// Холболт шалгах
connection.connect((err) => {
  if (err) {
    console.error("Холболт амжилтгүй:", err);
    return;
  }
  console.log("Холболт амжилттай холбогдлоо!");
});

// Table үүсгэх SQL query
const createTableQuery = `
INSERT INTO users (username, email, password, first_name, last_name, phone_number) VALUES ('Enkhbayr', 'Enkhbayr049@gmail.com', '123', 'Enkhbayr', 'Bat-Erdene', '80200276')
`;

// Table үүсгэх
connection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error("Table үүсгэхэд алдаа гарлаа:", err);
    return;
  }
  console.log("Table амжилттай үүслээ!");
});

// Холболт хаах
connection.end();
