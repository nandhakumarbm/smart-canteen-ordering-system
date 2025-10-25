const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  role: { type: String, default: 'student' },
  password: String,
  rollNo: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  department: String,
  year: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
