CREATE DATABASE IF NOT EXISTS hncc_portal;
USE hncc_portal;

-- Students who have registered
CREATE TABLE IF NOT EXISTS users (
  enrollment_no VARCHAR(11) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  student_name VARCHAR(100) NOT NULL,
  is_verified TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Pending OTPs for registration
CREATE TABLE IF NOT EXISTS otps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_no VARCHAR(11) NOT NULL,
  email VARCHAR(255) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  expires_at DATETIME NOT NULL,
  used TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student records (seeded from college data)
CREATE TABLE IF NOT EXISTS students (
  enrollment_no VARCHAR(11) PRIMARY KEY,
  student_name VARCHAR(100) NOT NULL,
  dob DATE,
  department VARCHAR(20),
  program VARCHAR(100),
  semester VARCHAR(20),
  session VARCHAR(20),
  status VARCHAR(10),
  cgpa DECIMAL(4,2),
  attendance VARCHAR(10)
);

-- Seed data for students
INSERT IGNORE INTO students (enrollment_no, student_name, dob, department, program, semester, session, status, cgpa, attendance) VALUES
('24203001065', 'Aarav Sharma', '2004-08-19', 'BCA', 'Bachelor of Computer Applications', 'Semester IV', '2024-25', 'Pass', 8.74, '91%'),
('24203001066', 'Meera Iyer', '2004-11-02', 'BBA', 'Bachelor of Business Administration', 'Semester IV', '2024-25', 'Pass', 9.12, '95%');
