with open(r'C:\Third-year\src\pages\HomePage.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# We need to insert announcements + footer open tag between lines 173 (idx 172) and 174 (idx 173)
# Currently line 174 jumps right into footer grid content

# Content to insert (announcements section + footer opening)
insert = [
    '\n',
    '      {/* Announcements Section */}\n',
    '      <section className="mt-14">\n',
    '        <div className="flex items-center gap-3">\n',
    '          <svg className="h-5 w-5 text-[#8a1f1f]" fill="currentColor" viewBox="0 0 20 20">\n',
    '            <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />\n',
    '          </svg>\n',
    '          <h2 className="text-lg font-bold text-[#2b2b27]">Latest Announcements</h2>\n',
    '        </div>\n',
    '        <div className="mt-4 grid gap-4 sm:grid-cols-3">\n',
    '          {recentAnnouncements.map((item) => (\n',
    '            <div key={item.title} className="rounded-lg border border-[#d7d7d2] bg-white p-5 shadow-sm">\n',
    '              <div className="mb-2 h-1.5 w-8 rounded-full bg-[#8a1f1f]" />\n',
    '              <h3 className="font-semibold text-[#2b2b27]">{item.title}</h3>\n',
    '              <p className="mt-1.5 text-sm text-[#6b6b63]">{item.detail}</p>\n',
    '            </div>\n',
    '          ))}\n',
    '        </div>\n',
    '      </section>\n',
    '\n',
    '      {/* Footer */}\n',
    '      <footer className="mt-16 rounded-xl border border-[#d7d7d2] bg-white px-6 py-8 shadow-sm sm:px-10">\n',
]

# Insert at index 173 (after the hero section closing)
new_lines = lines[:173] + insert + lines[173:]

with open(r'C:\Third-year\src\pages\HomePage.jsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f'Fixed. Total lines: {len(new_lines)}')
