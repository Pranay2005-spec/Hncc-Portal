import { useState } from 'react';
import { Link } from 'react-router-dom';

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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2b2b27]">Rechecking Evaluation</h2>
        <p className="mt-1 text-sm text-[#6b6b63]">
          Apply for rechecking of your examination answer scripts.
        </p>
      </div>

      {!submitted ? (
        <div className="rounded-lg border border-[#d7d7d2] bg-white p-6 shadow-sm">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#8a1f1f]/10">
            <svg className="h-6 w-6 text-[#8a1f1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-[#2b2b27]">Submit Rechecking Request</h3>
          <p className="mt-1 text-sm text-[#6b6b63]">
            Enter your 11-digit enrollment number to apply for answer script rechecking.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
            <div>
              <label htmlFor="enrollment" className="block text-sm font-medium text-[#4f4f49]">
                Enrollment Number
              </label>
              <input
                id="enrollment"
                type="text"
                value={enrollmentNo}
                onChange={(e) => setEnrollmentNo(e.target.value.replace(/\D/g, '').slice(0, 11))}
                placeholder="e.g. 24203001065"
                className="mt-1 w-full rounded-lg border border-[#c9c9c2] bg-[#fbfbfa] px-3 py-2.5 text-sm text-[#1f2933] outline-none transition focus:border-[#8a1f1f] focus:bg-white focus:shadow-[0_0_0_3px_rgba(138,31,31,0.12)]"
              />
            </div>

            <button
              type="submit"
              disabled={enrollmentNo.length !== 11}
              className="rounded-lg bg-[#8a1f1f] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#6f1818] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit Request
            </button>
          </form>
        </div>
      ) : (
        <div className="rounded-lg border border-[#d7d7d2] bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#2b2b27]">Request Submitted</h3>
          <p className="mt-1 text-sm text-[#6b6b63]">
            Your rechecking request for enrollment <strong className="text-[#2b2b27]">{enrollmentNo}</strong> has been received. You will be notified once the results are available.
          </p>
          <button
            type="button"
            onClick={() => { setSubmitted(false); setEnrollmentNo(''); }}
            className="mt-4 rounded-lg border border-[#c9c9c2] bg-white px-4 py-2 text-sm font-semibold text-[#3f3f3a] transition hover:border-[#9b9b93] hover:bg-[#f6f6f3]"
          >
            Submit Another Request
          </button>
        </div>
      )}

      <div className="mt-6 rounded-lg border border-[#d7d7d2] bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-[#2b2b27]">Important Notes</h3>
        <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-[#6b6b63]">
          <li>Rechecking applications are accepted within 15 days of result declaration.</li>
          <li>A nominal fee may apply as per college regulations.</li>
          <li>Rechecked results will be communicated via the portal and notice board.</li>
        </ul>
      </div>
    </div>
  );
}

export default RecheckingPage;
