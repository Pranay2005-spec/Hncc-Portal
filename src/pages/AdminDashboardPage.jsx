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
    <section className="mx-auto max-w-6xl space-y-6">
      <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Admin dashboard</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Portal tasks</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/add-result"
              className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Add Result
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Published Results</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{publishedCount}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Pass Results</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{passCount}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Departments</p>
            <p className="mt-2 text-xl font-bold text-slate-900">BCA, BBA, BCom, MBA</p>
          </div>
        </div>
      </div>

      <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
        <div className="mb-4">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Recent records</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">Latest result entries</h3>
        </div>

        <div className="space-y-3">
          {recent.map((student) => (
            <div key={student.enrollmentNo} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-900">{student.studentName}</p>
                <p className="text-sm text-slate-500">
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
  );
}

export default AdminDashboardPage;
