import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { enrollmentHint, mockResults } from '../data/mockData';

function makeCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let value = '';
  for (let index = 0; index < 5; index += 1) {
    value += chars[Math.floor(Math.random() * chars.length)];
  }
  return value;
}

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('studentLoggedIn') === 'true') {
      navigate('/result', { replace: true });
    }
  }, [navigate]);

  const [enrollmentNo, setEnrollmentNo] = useState('24203001065');
  const [captcha, setCaptcha] = useState(() => makeCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');

  const refreshCaptcha = () => {
    setCaptcha(makeCaptcha());
    setCaptchaInput('');
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^\d{11}$/.test(enrollmentNo.trim())) {
      setError('Enter a valid 11 digit enrollment number.');
      return;
    }
    if (captchaInput.trim().toUpperCase() !== captcha) {
      setError('Captcha does not match.');
      setCaptcha(makeCaptcha());
      setCaptchaInput('');
      return;
    }
    setError('');
    const student = mockResults.find((r) => r.enrollmentNo === enrollmentNo.trim());
    localStorage.setItem('studentLoggedIn', 'true');
    localStorage.setItem('studentName', student?.studentName || 'Student');
    localStorage.setItem('enrollmentNo', enrollmentNo.trim());
    navigate(`/result?enrollmentNo=${encodeURIComponent(enrollmentNo.trim())}`);
  };
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#dbeafe] via-[#e8f2fc] to-[#f0f7ff] shadow-sm border border-[#d0d8e0]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#2563eb]/8 blur-3xl sm:-right-32 sm:-top-32 sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#2563eb]/5 blur-3xl sm:-bottom-32 sm:-left-32 sm:h-64 sm:w-64" />

        <div className="relative z-10 flex flex-col gap-6 px-4 py-6 lg:flex-row lg:items-center lg:justify-center lg:gap-12 lg:px-12 lg:py-16">
          {/* Form Card */}
          <div className="w-full shrink-0 lg:w-[28rem]">
            <div className="rounded-xl border border-[#d0d8e0] bg-white p-5 shadow-lg sm:p-8">
              <div className="mb-6 flex items-center gap-3 border-b border-[#e2e8f0] pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563eb]">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1e293b]">Student Login</h2>
                  <p className="text-xs text-[#64748b]">Enter your enrollment number</p>
                </div>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-[#334155]">Enrollment No</span>
                  <div className="relative">
                    <input className="portal-input pl-9" inputMode="numeric" maxLength={11}
                      value={enrollmentNo}
                      onChange={(event) => setEnrollmentNo(event.target.value.replace(/\D/g, ''))}
                      placeholder="24203001065" aria-invalid={Boolean(error)}
                    />
                    <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <p className="mt-1 text-xs text-[#94a3b8]">{enrollmentHint}</p>
                </label>

                <div className="space-y-2">
                  <span className="block text-sm font-semibold text-[#334155]">Captcha Verification</span>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex-1">
                      <input className="portal-input uppercase" value={captchaInput}
                        onChange={(event) => setCaptchaInput(event.target.value)}
                        placeholder="Enter captcha"
                      />
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <div className="flex h-10 items-center rounded-lg border border-dashed border-[#cbd5e1] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] px-3 font-mono text-sm font-bold tracking-[0.25em] text-[#1e293b] select-none">
                        {captcha.split('').map((char, i) => (
                          <span key={i} className="inline-block"
                            style={{ transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (2 + Math.random() * 4)}deg)`, fontSize: `${13 + (i % 3) * 2}px` }}
                          >{char}</span>
                        ))}
                      </div>                      <button type="button" onClick={refreshCaptcha}
                        className="portal-secondary-button flex h-10 w-10 items-center justify-center p-0" title="Refresh captcha"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-[#fef2f2] px-4 py-2.5 text-sm text-[#dc2626]">
                    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                )}

                <button type="submit" className="portal-button w-full flex items-center justify-center gap-2">
                  View Result
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </form>


            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default HomePage;
