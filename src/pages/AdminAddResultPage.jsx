import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { usePortal } from '../context/PortalContext';

function AdminAddResultPage() {
  const navigate = useNavigate();
  const { addResult } = usePortal();
  const [studentName, setStudentName] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [dob, setDob] = useState('');
  const [department, setDepartment] = useState('BCA');
  const [program, setProgram] = useState('Bachelor of Computer Applications');
  const [semester, setSemester] = useState('Semester IV');
  const [session, setSession] = useState('2024-25');
  const [cgpa, setCgpa] = useState('');
  const [attendance, setAttendance] = useState('');
  const [status, setStatus] = useState('Pass');
  const [message, setMessage] = useState('');
  const [subjects, setSubjects] = useState([
    { code: 'SUB401', name: 'Subject 1', marks: '', grade: 'A' },
    { code: 'SUB402', name: 'Subject 2', marks: '', grade: 'A' },
    { code: 'SUB403', name: 'Subject 3', marks: '', grade: 'A' },
    { code: 'SUB404', name: 'Subject 4', marks: '', grade: 'A' }
  ]);

  const isFormReady = useMemo(
    () => studentName.trim() && enrollmentNo.trim() && dob && cgpa.trim() && attendance.trim(),
    [attendance, cgpa, dob, enrollmentNo, studentName]
  );

  const updateSubject = (index, field, value) => {
    setSubjects((current) => current.map((subject, subjectIndex) => (subjectIndex === index ? { ...subject, [field]: value } : subject)));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextResult = {
      studentName: studentName.trim(),
      enrollmentNo: enrollmentNo.trim(),
      dob,
      department,
      program,
      semester,
      session,
      status,
      cgpa,
      attendance,
      subjects: subjects.map((subject) => ({
        ...subject,
        marks: Number(subject.marks) || 0
      }))
    };

    addResult(nextResult);
    setMessage('Result saved successfully.');
    navigate('/admin/dashboard');
  };

  return (
    <section className="mx-auto max-w-3xl">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#64748b]">Admin page</p>
      <h2 className="mb-6 text-2xl font-bold text-[#1e293b] sm:text-3xl">Add Result Data</h2>

      <div className="rounded-xl border border-[#d0d8e0] bg-white p-5 shadow-lg sm:p-8">
        <form className="grid gap-4 sm:grid-cols-2 sm:gap-5" onSubmit={handleSubmit}>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-[#334155]">Student Name</span>
            <input
              className="portal-input"
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
              placeholder="Student name"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#334155]">Enrollment No</span>
            <input
              className="portal-input"
              value={enrollmentNo}
              onChange={(event) => setEnrollmentNo(event.target.value)}
              placeholder="24203001065"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#334155]">DOB</span>
            <input
              type="date"
              className="portal-input"
              value={dob}
              onChange={(event) => setDob(event.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#334155]">Department</span>
            <select
              className="portal-input"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="BCom">BCom</option>
              <option value="MBA">MBA</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#334155]">CGPA</span>
            <input
              className="portal-input"
              value={cgpa}
              onChange={(event) => setCgpa(event.target.value)}
              placeholder="8.74"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#334155]">Attendance</span>
            <input
              className="portal-input"
              value={attendance}
              onChange={(event) => setAttendance(event.target.value)}
              placeholder="91%"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-[#334155]">Program</span>
            <input
              className="portal-input"
              value={program}
              onChange={(event) => setProgram(event.target.value)}
              placeholder="Program name"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#334155]">Semester</span>
            <input
              className="portal-input"
              value={semester}
              onChange={(event) => setSemester(event.target.value)}
              placeholder="Semester IV"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[#334155]">Status</span>
            <select
              className="portal-input"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          </label>

          <div className="space-y-4 rounded-xl border border-[#d0d8e0] bg-[#f8fafc] p-4 sm:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748b]">Subjects</p>
            {subjects.map((subject, index) => (
              <div key={subject.code} className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                <input
                  className="portal-input"
                  value={subject.code}
                  onChange={(event) => updateSubject(index, 'code', event.target.value)}
                  placeholder="Code"
                />
                <input
                  className="portal-input"
                  value={subject.name}
                  onChange={(event) => updateSubject(index, 'name', event.target.value)}
                  placeholder="Subject name"
                />
                <input
                  className="portal-input"
                  value={subject.marks}
                  onChange={(event) => updateSubject(index, 'marks', event.target.value)}
                  placeholder="Marks"
                />
                <input
                  className="portal-input"
                  value={subject.grade}
                  onChange={(event) => updateSubject(index, 'grade', event.target.value)}
                  placeholder="Grade"
                />
              </div>
            ))}
          </div>

          <button
            className="portal-button w-full sm:col-span-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!isFormReady}
          >
            Save Result
          </button>
        </form>
        {message ? (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#f0fdf4] px-4 py-2.5 text-sm text-[#16a34a]">
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {message}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default AdminAddResultPage;
