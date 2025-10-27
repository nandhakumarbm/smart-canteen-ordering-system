const Student = require("../models/Student");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password, type } = req.body;

  try {
    let user = await Student.findOne({ email });

    let role = "student";

    if (!user) {
      user = await Admin.findOne({ email });
      role = "admin";
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // If login type is NOT Google, then check password
    if (type !== "googlelogin") {
      const isMatch = password === user.password;
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
