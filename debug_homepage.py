with open(r'C:\Third-year\src\pages\HomePage.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total: {len(lines)} lines")

# Find key markers
for i, line in enumerate(lines):
    s = line.strip()
    if 'Announcements' in s or s.startswith('<footer') or '</footer>' in s:
        print(f"Line {i+1}: ...{s}...")
    if s == '</section>' and i > 150:
        print(f"Line {i+1}: {s} (after hero)")
