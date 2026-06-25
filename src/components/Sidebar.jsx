import { NavLink, useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';

const sidebarItems = [
  {
    label: 'Documents',
    path: '/documents',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    label: 'Result',
    path: '/result',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    label: 'Rechecking',
    path: '/rechecking',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
];

function Sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const { logoutStudent, student } = usePortal();
  const studentName = student?.studentName || localStorage.getItem('studentName') || 'Student';
  const enrollmentNo = student?.enrollmentNo || localStorage.getItem('enrollmentNo') || '';
  const initial = studentName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logoutStudent();
    navigate('/');
  };

  return (
    <>
      {/* Overlay on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={        `fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-[#d0d8e0] bg-white shadow-xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* User Profile */}
        <div className="border-b border-[#d0d8e0] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-sm font-bold text-white shadow-sm">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-[#2b2b27]">{studentName}</p>
              <p className="truncate text-xs text-[#8b8b83]">College Student</p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-3 rounded-lg p-1 text-[#8b8b83] transition hover:bg-[#f4f5f2] hover:text-[#2b2b27] lg:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-0.5">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path === '/result' && enrollmentNo ? `/result?enrollmentNo=${enrollmentNo}` : item.path}
                  onClick={onToggle}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition duration-150 ${
                      isActive
                        ? 'bg-[#2563eb]/10 text-[#2563eb]'
                        : 'text-[#5f5f57] hover:bg-[#eaf2fa] hover:text-[#2b2b27]'
                    }`
                  }
                >
                  <span className={({ isActive }) => (isActive ? 'text-[#2563eb]' : 'text-[#8b8b83]')}>
                    {item.icon}
                  </span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-[#d0d8e0] px-2 py-3">
          <button type="button" onClick={() => { handleLogout(); onToggle(); }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#dc2626] transition hover:bg-[#fef2f2]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

