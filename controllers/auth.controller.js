// controllers/auth.controller.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Таны User Model-ийг импортлох
const UserModel = require("../models/user.model"); // Таны замаар солино уу

/**
 * Хэрэглэгчийг нэвтрүүлэх (Sign In)
 * username, password-ийг хүлээн авч, шалгаад JWT үүсгэнэ.
 */
const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Шаардлагатай талбарууд байгаа эсэхийг шалгах
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Нэвтрэх нэр, нууц үг шаардлагатай." });
    }

    // 1. Хэрэглэгчийг DB-ээс username-ээр олох
    // UserModel.findByUsername нь хэшэлсэн password-ийг хамт буцаана
    const user = await UserModel.findByUsername(username);

    if (!user) {
      // Илүү аюулгүй байдлыг хангах үүднээс username/password аль нь буруу болохыг хэлэхгүй
      return res
        .status(401)
        .json({ message: "Нэвтрэх нэр эсвэл нууц үг буруу байна." });
    }

    // 2. Нууц үгийг шалгах (bcrypt ашиглан)
    // req.body-оос ирсэн энгийн password-ийг user.password (хэш)-тэй харьцуулна.
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res
        .status(401)
        .json({ message: "Нэвтрэх нэр эсвэл нууц үг буруу байна." });
    }

    // 3. JWT үүсгэх
    const token = jwt.sign(
      {
        id: user.id, // user_id (DB-ээс авсан user_id-г 'id' нэрээр ашиглаж байна)
        username: user.username,
        // Хэрэглэгчийн үүрэг (role)-ийг DB-д хадгалсан бол энд нэмж болно.
        // role: user.role
      },
      process.env.JWT_SECRET, // .env файл дахь нууц түлхүүр
      {
        expiresIn: 86400, // 24 цаг (секундээр)
      }
    );

    // Нууц үгийн талбарыг хариунаас хасна
    delete user.password;

    // 4. Token болон хэрэглэгчийн мэдээллийг буцаах
    res.status(200).json({
      message: "Нэвтрэлт амжилттай.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        // ... бусад талбарууд
      },
      accessToken: token,
    });
  } catch (error) {
    console.error("Sign In Error:", error);
    res.status(500).json({ message: "Серверийн алдаа гарлаа." });
  }
};

module.exports = {
  signIn,
};
