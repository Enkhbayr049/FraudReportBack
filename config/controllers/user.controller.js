// controllers/user.controller.js
const UserModel = require("../models/user.model");
// Жишээ нь: bcrypt ашиглан нууц үгийг encrypt хийх

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Энд нууц үгийг encrypt хийх (жишээ нь, bcrypt ашиглан)
  // const passwordHash = await bcrypt.hash(password, 10);
  const passwordHash = `hashed_${password}`; // Зөвхөн жишээ

  try {
    const newUserId = await UserModel.create(username, email, passwordHash);
    res.status(201).json({
      message: "User created successfully",
      id: newUserId,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Could not create user." });
  }
};
