import { Link } from 'react-router-dom';

const documentsList = [
  { title: 'College Prospectus', description: 'Download the official college prospectus for the academic year.' },
  { title: 'Student Handbook', description: 'Rules, regulations, and guidelines for students.' },
  { title: 'Exam Guidelines', description: 'Important examination rules and instructions.' },
];

function DocumentsPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2b2b27]">Documents</h2>
        <p className="mt-1 text-sm text-[#6b6b63]">Access important college documents and resources.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {documentsList.map((doc) => (
          <div key={doc.title} className="rounded-lg border border-[#d7d7d2] bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#8a1f1f]/10">
              <svg className="h-5 w-5 text-[#8a1f1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#2b2b27]">{doc.title}</h3>
            <p className="mt-1 text-sm text-[#6b6b63]">{doc.description}</p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#8a1f1f] transition hover:text-[#6f1818]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-[#d7d7d2] bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-[#2b2b27]">Need a different document?</h3>
        <p className="mt-1 text-sm text-[#6b6b63]">
          Contact the college administration office for any other documents or records.
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#8a1f1f] transition hover:text-[#6f1818]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
          Contact Administration
        </Link>
      </div>
    </div>
  );
}

export default DocumentsPage;
