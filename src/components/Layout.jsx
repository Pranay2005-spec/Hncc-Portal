import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import logo from '../assets/logo.png';
import { recentAnnouncements } from '../data/mockData';
import { usePortal } from '../context/PortalContext';

const collegeName = 'Hirachand Nemchand College of Commerce, Solapur';

const marqueeKeyframes = `
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAdminLoggedIn, isStudentLoggedIn } = usePortal();
  const isLoggedIn = isStudentLoggedIn;
  const isHomePage = pathname === '/';

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <>
      <style>{marqueeKeyframes}</style>
      <div className="min-h-screen bg-[#eaf2fa] text-[#1f2933]">
      <header className="sticky top-0 z-40 bg-white text-[#1e293b]">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:gap-5 sm:px-6 sm:py-4 lg:px-8">
          {isLoggedIn && !isHomePage && (
            <button
              type="button"
              onClick={toggleSidebar}
              className="rounded-lg p-2 text-[#64748b] transition hover:bg-[#f1f5f9] lg:hidden"
              aria-label="Toggle navigation"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          )}

          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img src={logo} alt={collegeName} className="h-14 w-auto max-w-[3.5rem] object-contain sm:h-16 sm:max-w-[4rem]" />
          </Link>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold italic leading-tight text-[#64748b] sm:text-[11px]">
              || शिक्षण हाच धर्म ||
            </p>
            <h1 className="truncate text-sm font-bold leading-tight sm:text-base lg:text-lg">
              {collegeName}
            </h1>
            <p className="truncate text-[10px] leading-tight text-[#64748b] sm:text-[11px]">
              Autonomous College &middot; NAAC Re-accredited <span className="font-semibold text-[#2563eb]">&lsquo;A&rsquo; Grade</span>
            </p>
          </div>

          {!isAdminLoggedIn && !isLoggedIn && (
            <div className="flex items-center gap-2">
              {pathname.startsWith('/student') ? (
                <button type="button" onClick={() => navigate('/')}
                  className="hidden shrink-0 items-center gap-1.5 text-xs font-medium text-[#2563eb] transition hover:text-[#1d4ed8] sm:flex sm:text-sm"
                >
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </button>
              ) : (
                <button type="button" onClick={() => navigate('/student/login')}
                  className="hidden shrink-0 items-center gap-1.5 text-xs font-medium text-[#2563eb] transition hover:text-[#1d4ed8] sm:flex sm:text-sm"
                >
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Student Login
                </button>
              )}
              {pathname.startsWith('/admin') ? (
                <button type="button" onClick={() => navigate('/')}
                  className="hidden shrink-0 items-center gap-1.5 text-xs font-medium text-[#2563eb] transition hover:text-[#1d4ed8] sm:flex sm:text-sm"
                >
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </button>
              ) : (
                <button type="button" onClick={() => navigate('/admin/login')}
                  className="hidden shrink-0 items-center gap-1.5 text-xs font-medium text-[#2563eb] transition hover:text-[#1d4ed8] sm:flex sm:text-sm"
                >
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  Admin Login
                </button>
              )}
            </div>
          )}
        </div>
        <div className="overflow-hidden border-t border-[#d0d8e0] bg-[#f8fafc] py-1.5">
          <div className="marquee-content flex gap-8 whitespace-nowrap text-xs text-[#475569]"
            style={{ animation: 'marquee 30s linear infinite' }}
          >
            <span className="flex shrink-0 items-center gap-1.5 font-medium text-[#dc2626]" style={{ textShadow: '0 0 8px rgba(220,38,38,0.5), 0 0 20px rgba(220,38,38,0.3)' }}>
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
              </svg>
              Announcements
            </span>
            {recentAnnouncements.map((a) => (
              <span key={a.title} className="shrink-0">&middot; {a.title} &mdash; {a.detail}</span>
            ))}
            <span className="flex shrink-0 items-center gap-1.5 font-medium text-[#dc2626]" style={{ textShadow: '0 0 8px rgba(220,38,38,0.5), 0 0 20px rgba(220,38,38,0.3)' }}>
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
              </svg>
              Announcements
            </span>
            {recentAnnouncements.map((a) => (
              <span key={a.title} className="shrink-0">&middot; {a.title} &mdash; {a.detail}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="flex">
        {isLoggedIn && !isHomePage && <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />}
        <main className={`flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 ${isLoggedIn ? 'min-h-[calc(100vh-57px)]' : ''}`}>
          <Outlet />
        </main>
      </div>

      <footer className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-[#d0d8e0] bg-white px-4 py-3 text-center text-xs text-[#64748b] sm:px-8 sm:py-4 sm:text-sm">
          &copy; {new Date().getFullYear()} HNCC Result Portal &mdash; Hirachand Nemchand College of Commerce, Solapur.
        </div>
      </footer>
    </div>
    </>
  );
}

export default Layout;
