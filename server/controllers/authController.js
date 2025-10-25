const Student = require('../models/Student');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists in students
    let user = await Student.findOne({ email });
    let role = 'student';

    // If not found in students, check admin
    if (!user) {
      user = await Admin.findOne({ email });
      role = 'admin';
    }

    if (!user) return res.status(400).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT with 7 days expiry
    const token = jwt.sign(
      { id: user._id, role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // <-- 7 days
    );

    // Return user info + token
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role,
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
    login
}