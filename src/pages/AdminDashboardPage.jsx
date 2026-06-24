import { Link, useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';

function AdminDashboardPage() {
  const navigate = useNavigate();
  const { results, logoutAdmin } = usePortal();

  const publishedCount = results.length;
  const passCount = results.filter((result) => result.status === 'Pass').length;
  const recent = results.slice(0, 5);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <><section className="mx-auto max-w-6xl space-y-6">
      <div className="rounded-xl border border-[#d0d8e0] bg-white p-5 shadow-lg sm:p-8">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563eb] sm:flex">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#64748b]">Admin dashboard</p>
              <h2 className="mt-1 text-2xl font-bold text-[#1e293b] sm:text-3xl">Portal tasks</h2>
              <p className="mt-1 text-xs text-[#64748b]">
                Review institutional statistics, manage result records, and publish academic outcomes from the central administrative panel.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/add-result"
              className="rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
            >
              Add Result
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-[#c9d2db] px-4 py-2.5 text-sm font-semibold text-[#475569] transition hover:bg-[#f6f6f3]"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          <div className="rounded-xl bg-[#f8fafc] p-4">
            <p className="text-sm text-[#64748b]">Published Results</p>
            <p className="mt-2 text-2xl font-bold text-[#1e293b]">{publishedCount}</p>
          </div>
          <div className="rounded-xl bg-[#f8fafc] p-4">
            <p className="text-sm text-[#64748b]">Pass Results</p>
            <p className="mt-2 text-2xl font-bold text-[#1e293b]">{passCount}</p>
          </div>
          <div className="rounded-xl bg-[#f8fafc] p-4">
            <p className="text-sm text-[#64748b]">Departments</p>
            <p className="mt-2 text-xl font-bold text-[#1e293b]">BCA, BBA, BCom, MBA</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#d0d8e0] bg-white p-5 shadow-lg sm:p-8">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#64748b]">Recent records</p>
          <h3 className="mt-1 text-xl font-bold text-[#1e293b]">Latest result entries</h3>
          <p className="mt-1 text-xs text-[#64748b]">
            The table below displays the five most recently published student results for quick reference and verification.
          </p>
        </div>

        <div className="space-y-3">
          {recent.map((student) => (
            <div key={student.enrollmentNo} className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#f8fafc] p-4">
              <div>
                <p className="font-semibold text-[#1e293b]">{student.studentName}</p>
                <p className="text-sm text-[#64748b]">
                  {student.enrollmentNo} · {student.department}
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                {student.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

export default AdminDashboardPage;
