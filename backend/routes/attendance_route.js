import express from 'express';
import Attendance from '../models/attendance.js';

const router = express.Router();

// Add or update attendance for a student on a specific date
router.post('/', async (req, res) => {
  const { studentId, date, status } = req.body;
  if (!studentId || !date || !status) {
    return res.status(400).json({ success: false, message: 'studentId, date, and status are required' });
  }
  try {
    const attendanceDate = new Date(date);
    const existingRecord = await Attendance.findOne({ student: studentId, date: attendanceDate });
    if (existingRecord) {
      existingRecord.status = status;
      await existingRecord.save();
      return res.status(200).json({ success: true, data: existingRecord });
    } else {
      const attendance = new Attendance({ student: studentId, date: attendanceDate, status });
      await attendance.save();
      return res.status(201).json({ success: true, data: attendance });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get attendance records for a student
router.get('/student/:studentId', async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.params.studentId }).sort({ date: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get attendance records for a specific date
router.get('/date/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const records = await Attendance.find({ date: date });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Delete an attendance record by ID
router.delete('/:id', async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Attendance record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

export default router;
