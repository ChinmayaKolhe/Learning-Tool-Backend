const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// POST /api/students/register
router.post("/register", async (req, res) => {
  const { fullName, email, division, prn, department, password } = req.body;


  if (!fullName || !email || !division || !prn || !department || !password) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  try {
   
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Student already registered with this email." });
    }

    const newStudent = new Student({ fullName, email, division, prn, department, password });
    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
});

module.exports = router;
