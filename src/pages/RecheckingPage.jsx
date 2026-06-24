import { useState } from 'react';

function RecheckingPage() {
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{11}$/.test(enrollmentNo.trim())) return;
    setSubmitted(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1e293b]">Rechecking Evaluation</h2>
      <p className="mt-1 text-sm text-[#64748b]">
        Apply for rechecking of your examination answer scripts.
      </p>

      {!submitted ? (
        <div className="mt-6 rounded-xl border border-[#d0d8e0] bg-white p-5 shadow-lg sm:p-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#2563eb]/10">
            <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-[#1e293b]">Submit Rechecking Request</h3>
          <p className="mt-1 text-sm text-[#64748b]">
            Enter your 11-digit enrollment number to apply for answer script rechecking.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
            <div>
              <label htmlFor="enrollment" className="mb-1.5 block text-sm font-semibold text-[#334155]">
                Enrollment Number
              </label>
              <input
                id="enrollment"
                type="text"
                value={enrollmentNo}
                onChange={(e) => setEnrollmentNo(e.target.value.replace(/\D/g, '').slice(0, 11))}
                placeholder="e.g. 24203001065"
                className="portal-input"
              />
            </div>

            <button
              type="submit"
              disabled={enrollmentNo.length !== 11}
              className="portal-button disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit Request
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-[#d0d8e0] bg-white p-5 shadow-lg sm:p-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#1e293b]">Request Submitted</h3>
          <p className="mt-1 text-sm text-[#64748b]">
            Your rechecking request for enrollment <strong className="text-[#1e293b]">{enrollmentNo}</strong> has been received. You will be notified once the results are available.
          </p>
          <button
            type="button"
            onClick={() => { setSubmitted(false); setEnrollmentNo(''); }}
            className="mt-4 rounded-lg border border-[#c9d2db] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f6f6f3]"
          >
            Submit Another Request
          </button>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-[#d0d8e0] bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-[#1e293b]">Important Notes</h3>
        <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-[#64748b]">
          <li>Rechecking applications are accepted within 15 days of result declaration.</li>
          <li>A nominal fee may apply as per college regulations.</li>
          <li>Rechecked results will be communicated via the portal and notice board.</li>
        </ul>
      </div>
    </div>
  );
}

export default RecheckingPage;
