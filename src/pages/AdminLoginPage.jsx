import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';

function AdminLoginPage() {
  const navigate = useNavigate();
  const { loginAdmin } = usePortal();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = loginAdmin(username, password);

    if (!isValid) {
      setError('Invalid admin credentials.');
      return;
    }

    setError('');
    navigate('/admin/dashboard');
  };

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-4 flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-between sm:text-left">
        <div className="mx-auto sm:mx-0">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Admin page</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Admin login</h2>
          <p className="mt-2 max-w-lg text-sm text-slate-600">
            Use the admin credentials to access dashboard tasks and result entry.
          </p>
        </div>
        <Link className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white" to="/">
          Home
        </Link>
      </div>

      <div className="rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block text-left">
            <span className="mb-2 block text-sm font-medium text-slate-700">Username</span>
            <input
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
            />
          </label>
          <label className="block text-left">
            <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="admin123"
            />
          </label>
          <button className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">
            Login
          </button>
        </form>
        {error ? <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
      </div>
    </section>
  );
}

export default AdminLoginPage;
