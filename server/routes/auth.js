import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import pool from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// POST /api/auth/register — Step 1: validate & send OTP
router.post('/register', async (req, res) => {
  try {
    const { enrollmentNo, email, password } = req.body;

    if (!enrollmentNo || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!/^\d{11}$/.test(enrollmentNo)) {
      return res.status(400).json({ message: 'Invalid enrollment number.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }

    if (password.length < 4) {
      return res.status(400).json({ message: 'Password must be at least 4 characters.' });
    }

    // Check if enrollment exists in student records
    const [students] = await pool.query('SELECT * FROM students WHERE enrollment_no = ?', [enrollmentNo]);
    if (students.length === 0) {
      return res.status(400).json({ message: 'Enrollment number not found in records.' });
    }

    // Check if already registered
    const [existing] = await pool.query('SELECT enrollment_no FROM users WHERE enrollment_no = ?', [enrollmentNo]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'This enrollment is already registered. Please login.' });
    }

    // Check if email already used
    const [emailExists] = await pool.query('SELECT enrollment_no FROM users WHERE email = ?', [email]);
    if (emailExists.length > 0) {
      return res.status(400).json({ message: 'This email is already registered.' });
    }

    // Generate and store OTP
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

    await pool.query(
      'INSERT INTO otps (enrollment_no, email, otp, expires_at) VALUES (?, ?, ?, ?)',
      [enrollmentNo, email, otp, expiresAt]
    );

    // Send OTP via email
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: '"HNCC Result Portal" <noreply@hnccportal.com>',
        to: email,
        subject: 'Email Verification OTP',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
            <h2 style="color: #2563eb;">HNCC Result Portal</h2>
            <p>Your OTP for email verification is:</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2563eb; padding: 16px; text-align: center; background: #f0f7ff; border-radius: 8px; margin: 16px 0;">
              ${otp}
            </div>
            <p style="color: #64748b;">This OTP is valid for 10 minutes.</p>
            <p style="color: #64748b; font-size: 12px;">If you did not request this, please ignore this email.</p>
          </div>
        `,
      });

      console.log('OTP email sent to:', email);

      res.json({
        message: 'OTP sent to your email.',
        enrollmentNo,
        email,
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      return res.status(500).json({ message: 'Failed to send OTP email.' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/auth/verify-otp — Step 2: verify OTP & create user
router.post('/verify-otp', async (req, res) => {
  try {
    const { enrollmentNo, otp } = req.body;

    if (!enrollmentNo || !otp) {
      return res.status(400).json({ message: 'Enrollment number and OTP are required.' });
    }

    // Find valid OTP
    const [otpRows] = await pool.query(
      'SELECT * FROM otps WHERE enrollment_no = ? AND otp = ? AND used = 0 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1',
      [enrollmentNo, otp]
    );

    if (otpRows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    const otpRecord = otpRows[0];

    // Get student info
    const [students] = await pool.query('SELECT * FROM students WHERE enrollment_no = ?', [enrollmentNo]);
    if (students.length === 0) {
      return res.status(400).json({ message: 'Student record not found.' });
    }

    const student = students[0];

    // Hash password (we stored plaintext in OTP record, but we need it from the first step)
    // Actually, we need to store the password temporarily. Let's get it.
    // For simplicity, re-query: the register endpoint should have the password.
    // But we didn't store it. Let me adjust — store pending registration with hashed password.
    // Actually, I'll just have the frontend include the password again in this step.
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await pool.query(
      'INSERT INTO users (enrollment_no, email, password, student_name, is_verified) VALUES (?, ?, ?, ?, 1)',
      [enrollmentNo, otpRecord.email, hashedPassword, student.student_name]
    );

    // Mark OTP as used
    await pool.query('UPDATE otps SET used = 1 WHERE id = ?', [otpRecord.id]);

    // Generate JWT
    const token = jwt.sign(
      { enrollmentNo, studentName: student.student_name },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Registration successful.',
      token,
      student: {
        enrollmentNo: student.enrollment_no,
        studentName: student.student_name,
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { enrollmentNo, password } = req.body;

    if (!enrollmentNo || !password) {
      return res.status(400).json({ message: 'Enrollment number and password are required.' });
    }

    const [users] = await pool.query('SELECT * FROM users WHERE enrollment_no = ?', [enrollmentNo]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'No account found. Please register first.' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }

    const token = jwt.sign(
      { enrollmentNo: user.enrollment_no, studentName: user.student_name },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful.',
      token,
      student: {
        enrollmentNo: user.enrollment_no,
        studentName: user.student_name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/auth/me — get current student info
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [students] = await pool.query('SELECT * FROM students WHERE enrollment_no = ?', [req.user.enrollmentNo]);
    if (students.length === 0) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const student = students[0];
    res.json({
      enrollmentNo: student.enrollment_no,
      studentName: student.student_name,
      dob: student.dob,
      department: student.department,
      program: student.program,
      semester: student.semester,
      session: student.session,
      status: student.status,
      cgpa: student.cgpa,
      attendance: student.attendance,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;
