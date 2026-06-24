import { Link, useSearchParams } from 'react-router-dom';
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
    <section className="mx-auto max-w-4xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b6b63]">Student Result</p>
          <h2 className="mt-1 text-2xl font-bold text-[#8a1f1f] sm:text-3xl">Your result</h2>
        </div>
        <Link className="portal-button px-4 py-2.5 sm:py-2" to="/">
          Back
        </Link>
      </div>

      <div className="portal-card rounded-xl p-5 sm:p-8">
        {student ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-[#2b2b27] sm:text-3xl">
                  {student.studentName}
                </h3>
                <p className="mt-1 text-sm text-[#6b6b63]">
                  {student.department} - {student.program}
                </p>
              </div>
              <span className="rounded-lg bg-[#e7f4ec] px-3 py-1 text-sm font-semibold text-[#17633a]">
                {student.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              <div className="rounded-lg bg-[#f7f7f4] p-4">
                <p className="text-sm text-[#6b6b63]">Overall Marks</p>
                <p className="mt-1 font-bold text-[#2b2b27]">
                  {totalMarks} / {maxMarks}
                </p>
              </div>
              <div className="rounded-lg bg-[#f7f7f4] p-4">
                <p className="text-sm text-[#6b6b63]">Percentage</p>
                <p className="mt-1 font-bold text-[#2b2b27]">{percentage}%</p>
              </div>
              <div className="rounded-lg bg-[#f7f7f4] p-4">
                <p className="text-sm text-[#6b6b63]">CGPA</p>
                <p className="mt-1 font-bold text-[#2b2b27]">{student.cgpa}</p>
              </div>
              <div className="rounded-lg bg-[#f7f7f4] p-4">
                <p className="text-sm text-[#6b6b63]">Status</p>
                <p className="mt-1 font-bold text-[#2b2b27]">{student.status}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="rounded-lg bg-[#f7f7f4] p-4">
                <p className="text-sm text-[#6b6b63]">Enrollment No</p>
                <p className="mt-1 font-bold text-[#2b2b27]">{student.enrollmentNo}</p>
              </div>
              <div className="rounded-lg bg-[#f7f7f4] p-4">
                <p className="text-sm text-[#6b6b63]">DOB</p>
                <p className="mt-1 font-bold text-[#2b2b27]">{student.dob}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid gap-3 sm:hidden">
                {student.subjects.map((subject) => (
                  <div key={subject.code} className="rounded-lg border border-[#d7d7d2] bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold text-[#2b2b27]">{subject.code}</span>
                      <span className="rounded-lg bg-[#f7f7f4] px-3 py-1 text-xs font-semibold text-[#3f3f3a]">
                        {subject.grade}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[#3f3f3a]">{subject.name}</p>
                    <p className="mt-3 text-sm text-[#6b6b63]">Marks: {subject.marks}</p>
                  </div>
                ))}
              </div>

              <div className="hidden overflow-hidden rounded-lg border border-[#d7d7d2] shadow-sm sm:block">
                <div className="grid grid-cols-[1fr_2fr_0.7fr_0.7fr] bg-[#8a1f1f] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white sm:px-6">
                  <span>Code</span>
                  <span>Subject</span>
                  <span>Marks</span>
                  <span>Grade</span>
                </div>
                <div className="divide-y divide-slate-200 bg-white">
                  {student.subjects.map((subject) => (
                    <div key={subject.code} className="grid grid-cols-[1fr_2fr_0.7fr_0.7fr] gap-3 px-4 py-3 text-sm sm:px-6">
                      <span className="font-semibold text-[#2b2b27]">{subject.code}</span>
                      <span className="text-[#3f3f3a]">{subject.name}</span>
                      <span className="text-[#3f3f3a]">{subject.marks}</span>
                      <span className="font-semibold text-[#2b2b27]">{subject.grade}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-[#f7f7f4] p-6 text-center">
            <p className="text-lg font-bold text-[#2b2b27]">No result found</p>
            <p className="mt-2 text-sm text-[#6b6b63]">Go back and enter a valid enrollment number.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ResultPage;
