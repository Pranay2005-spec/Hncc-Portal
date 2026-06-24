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
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#dbeafe] via-[#e8f2fc] to-[#f0f7ff] shadow-sm border border-[#d0d8e0]">
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#2563eb]/8 blur-3xl sm:-right-32 sm:-top-32 sm:h-80 sm:w-80" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#2563eb]/5 blur-3xl sm:-bottom-32 sm:-left-32 sm:h-64 sm:w-64" />

      <div className="relative z-10 flex flex-col gap-6 px-4 py-6 lg:flex-row lg:items-center lg:justify-center lg:gap-12 lg:px-12 lg:py-16">
        <div className="w-full shrink-0 lg:w-[28rem]">
          <div className="rounded-xl border border-[#d0d8e0] bg-white p-5 shadow-lg sm:p-8">
            <div className="mb-6 flex items-center gap-3 border-b border-[#e2e8f0] pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563eb]">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1e293b]">Admin Login</h2>
                <p className="mt-0.5 text-xs text-[#64748b]">
                  Enter your authorised credentials to access the administrative dashboard.
                </p>
              </div>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-[#334155]">Username</span>
                <input
                  className="portal-input"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="admin"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-[#334155]">Password</span>
                <input
                  type="password"
                  className="portal-input"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="admin123"
                />
              </label>
              <button className="portal-button w-full">
                Login
              </button>
            </form>
            {error ? (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#fef2f2] px-4 py-2.5 text-sm text-[#dc2626]">
                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLoginPage;
