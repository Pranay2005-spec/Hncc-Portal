with open(r'C:\Third-year\src\pages\HomePage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_footer = '''      {/* Footer */}
      <footer className="mt-16 rounded-xl border border-[#d7d7d2] bg-white px-6 py-8 shadow-sm sm:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8a1f1f]">Departments</h3>
            <ul className="mt-3 space-y-2">
              {['BCA', 'BBA', 'B.Com', 'MBA'].map((dept) => (
                <li key={dept} className="text-sm text-[#6b6b63]">{dept}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8a1f1f]">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#6b6b63]">
              <li>Pune, Maharashtra</li>
              <li>admin@hncc.edu.in</li>
              <li>+91 20 1234 5678</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-[#d7d7d2] pt-6 text-center text-xs text-[#9b9b93]">
          &copy; {new Date().getFullYear()} Hirachand Nemchand College of Commerce. All rights reserved.
        </div>
      </footer>'''

new_footer = '''      {/* Footer */}
      <footer className="mt-16 rounded-xl border border-[#d7d7d2] bg-white px-6 py-8 shadow-sm sm:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8a1f1f] text-xs font-bold text-white">HN</div>
              <span className="text-sm font-bold text-[#2b2b27]">HNCC Portal</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#6b6b63]">
              Hirachand Nemchand College of Commerce provides a seamless result management system for students across all departments.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8a1f1f]">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              {['Home', 'View Result', 'Admin Login'].map((link) => (
                <li key={link}>
                  <button type="button" onClick={() => {
                    if (link === 'View Result') window.scrollTo({ top: 0, behavior: 'smooth' });
                    else if (link === 'Admin Login') navigate('/admin/login');
                    else navigate('/');
                  }} className="text-sm text-[#6b6b63] transition hover:text-[#8a1f1f]">{link}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8a1f1f]">Departments</h3>
            <ul className="mt-3 space-y-2">
              {['BCA', 'BBA', 'B.Com', 'MBA'].map((dept) => (
                <li key={dept} className="text-sm text-[#6b6b63]">{dept}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8a1f1f]">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#6b6b63]">
              <li>Pune, Maharashtra</li>
              <li>admin@hncc.edu.in</li>
              <li>+91 20 1234 5678</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-[#d7d7d2] pt-6 text-center text-xs text-[#9b9b93]">
          &copy; {new Date().getFullYear()} Hirachand Nemchand College of Commerce. All rights reserved.
        </div>
      </footer>'''

if old_footer in content:
    content = content.replace(old_footer, new_footer)
    with open(r'C:\Third-year\src\pages\HomePage.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Footer fixed successfully!')
else:
    print('Could not find the corrupted footer pattern')
    # Try to find partial match
    idx = content.find('      <footer className=')
    if idx >= 0:
        print(f'Footer found at index {idx}')
        print(f'Context: {repr(content[idx:idx+200])}')
