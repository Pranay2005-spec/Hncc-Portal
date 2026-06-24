import { useSearchParams } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';

function ResultPage() {
  const [searchParams] = useSearchParams();
  const enrollmentNo = searchParams.get('enrollmentNo') || '';
  const { results } = usePortal();
  const student = results.find((item) => item.enrollmentNo === enrollmentNo);

  const totalMarks = student ? student.subjects.reduce((sum, subject) => sum + subject.marks, 0) : 0;
  const maxMarks = student ? student.subjects.length * 100 : 0;
  const percentage = maxMarks ? ((totalMarks / maxMarks) * 100).toFixed(2) : '0.00';

  return (
    <section className="mx-auto max-w-5xl">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#64748b]">Student Result</p>

      {student ? (
        <div className="rounded-xl border border-[#d0d8e0] bg-white p-5 shadow-lg sm:p-8">
          {/* Top: Name, Enrollment, Photo */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">{student.studentName}</h2>
              <div className="mt-3 space-y-1 text-sm text-[#64748b]">
                <p><span className="font-semibold text-[#334155]">Enrollment No:</span> {student.enrollmentNo}</p>
                <p><span className="font-semibold text-[#334155]">Department:</span> {student.department} - {student.program}</p>
                <p><span className="font-semibold text-[#334155]">Semester:</span> {student.semester} ({student.session})</p>
                <p><span className="font-semibold text-[#334155]">DOB:</span> {student.dob}</p>
              </div>
            </div>
            <div className="shrink-0">
              <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-gradient-to-br from-[#dbeafe] to-[#e8f2fc] border border-[#d0d8e0] sm:h-32 sm:w-32">
                <svg className="h-12 w-12 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-[#e2e8f0]" />

          {/* Marks Table */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#64748b]">Subject-wise Marks</p>

            <div className="grid gap-3 sm:hidden">
              {student.subjects.map((subject) => (
                <div key={subject.code} className="rounded-lg border border-[#d0d8e0] bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-[#1e293b]">{subject.code}</span>
                    <span className="rounded-lg bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                      {subject.grade}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#475569]">{subject.name}</p>
                  <p className="mt-3 text-sm text-[#64748b]">Marks: {subject.marks}</p>
                </div>
              ))}
            </div>

            <div className="hidden overflow-hidden rounded-lg border border-[#d0d8e0] shadow-sm sm:block">
              <div className="grid grid-cols-[0.7fr_2fr_0.7fr_0.7fr] bg-[#2563eb] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white sm:px-6">
                <span>Code</span>
                <span>Subject</span>
                <span>Marks</span>
                <span>Grade</span>
              </div>
              <div className="divide-y divide-[#e2e8f0] bg-white">
                {student.subjects.map((subject) => (
                  <div key={subject.code} className="grid grid-cols-[0.7fr_2fr_0.7fr_0.7fr] gap-3 px-4 py-3 text-sm sm:px-6">
                    <span className="font-semibold text-[#1e293b]">{subject.code}</span>
                    <span className="text-[#475569]">{subject.name}</span>
                    <span className="text-[#475569]">{subject.marks}</span>
                    <span className="font-semibold text-[#1e293b]">{subject.grade}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-[#e2e8f0]" />

          {/* Bottom: Total, Percentage, CGPA, Status */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-[#f8fafc] p-4">
              <p className="text-sm text-[#64748b]">Total Marks</p>
              <p className="mt-1 text-xl font-bold text-[#1e293b]">{totalMarks} / {maxMarks}</p>
            </div>
            <div className="rounded-xl bg-[#f8fafc] p-4">
              <p className="text-sm text-[#64748b]">Percentage</p>
              <p className="mt-1 text-xl font-bold text-[#1e293b]">{percentage}%</p>
            </div>
            <div className="rounded-xl bg-[#f8fafc] p-4">
              <p className="text-sm text-[#64748b]">CGPA</p>
              <p className="mt-1 text-xl font-bold text-[#1e293b]">{student.cgpa}</p>
            </div>
            <div className="rounded-xl bg-[#f8fafc] p-4">
              <p className="text-sm text-[#64748b]">Status</p>
              <p className={`mt-1 text-xl font-bold ${student.status === 'Pass' ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
                {student.status}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[#d0d8e0] bg-white p-8 shadow-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fef2f2]">
            <svg className="h-8 w-8 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="mt-4 text-lg font-bold text-[#1e293b]">No result found</p>
          <p className="mt-2 text-sm text-[#64748b]">Go back and enter a valid enrollment number.</p>
        </div>
      )}
    </section>
  );
}

export default ResultPage;
