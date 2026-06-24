import { Link, useNavigate } from 'react-router-dom';
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
      <div className="mb-4 flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-between sm:text-left">
        <div className="mx-auto sm:mx-0">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Admin page</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Add result data</h2>
        </div>
        <Link className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white" to="/admin/dashboard">
          Dashboard
        </Link>
      </div>

      <div className="rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <form className="grid gap-4 sm:gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="block text-left sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Student Name</span>
            <input
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
              placeholder="Student name"
            />
          </label>
          <label className="block text-left">
            <span className="mb-2 block text-sm font-medium text-slate-700">Enrollment No</span>
            <input
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              value={enrollmentNo}
              onChange={(event) => setEnrollmentNo(event.target.value)}
              placeholder="24203001065"
            />
          </label>
          <label className="block text-left">
            <span className="mb-2 block text-sm font-medium text-slate-700">DOB</span>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              value={dob}
              onChange={(event) => setDob(event.target.value)}
            />
          </label>
          <label className="block text-left">
            <span className="mb-2 block text-sm font-medium text-slate-700">Department</span>
            <select
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="BCom">BCom</option>
              <option value="MBA">MBA</option>
            </select>
          </label>
          <label className="block text-left">
            <span className="mb-2 block text-sm font-medium text-slate-700">CGPA</span>
            <input
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              value={cgpa}
              onChange={(event) => setCgpa(event.target.value)}
              placeholder="8.74"
            />
          </label>
          <label className="block text-left">
            <span className="mb-2 block text-sm font-medium text-slate-700">Attendance</span>
            <input
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              value={attendance}
              onChange={(event) => setAttendance(event.target.value)}
              placeholder="91%"
            />
          </label>
          <label className="block text-left sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Program</span>
            <input
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              value={program}
              onChange={(event) => setProgram(event.target.value)}
              placeholder="Program name"
            />
          </label>
          <label className="block text-left">
            <span className="mb-2 block text-sm font-medium text-slate-700">Semester</span>
            <input
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              value={semester}
              onChange={(event) => setSemester(event.target.value)}
              placeholder="Semester IV"
            />
          </label>
          <label className="block text-left">
            <span className="mb-2 block text-sm font-medium text-slate-700">Status</span>
            <select
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          </label>

          <div className="sm:col-span-2 space-y-4 rounded-[1rem] border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Subjects</p>
            {subjects.map((subject, index) => (
              <div key={subject.code} className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                <input
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  value={subject.code}
                  onChange={(event) => updateSubject(index, 'code', event.target.value)}
                  placeholder="Code"
                />
                <input
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  value={subject.name}
                  onChange={(event) => updateSubject(index, 'name', event.target.value)}
                  placeholder="Subject name"
                />
                <input
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  value={subject.marks}
                  onChange={(event) => updateSubject(index, 'marks', event.target.value)}
                  placeholder="Marks"
                />
                <input
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  value={subject.grade}
                  onChange={(event) => updateSubject(index, 'grade', event.target.value)}
                  placeholder="Grade"
                />
              </div>
            ))}
          </div>

          <button
            className="sm:col-span-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!isFormReady}
          >
            Save Result
          </button>
        </form>
        {message ? <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p> : null}
      </div>
    </section>
  );
}

export default AdminAddResultPage;
