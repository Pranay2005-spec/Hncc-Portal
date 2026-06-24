export const portalStats = [
  { label: 'Departments', value: '8' },
  { label: 'Results Published', value: '1,240' },
  { label: 'Live Sessions', value: '24' }
];

export const recentAnnouncements = [
  {
    title: 'Semester IV results are live',
    detail: 'Published at 09:30 AM with downloadable mark sheets.'
  },
  {
    title: 'Supplementary exam window',
    detail: 'Applications remain open until Friday 5:00 PM.'
  },
  {
    title: 'Profile verification reminder',
    detail: 'Students should confirm name and registration number.'
  }
];

export const mockResults = [
  {
    enrollmentNo: '24203001065',
    studentName: 'Aarav Sharma',
    dob: '2004-08-19',
    department: 'BCA',
    program: 'Bachelor of Computer Applications',
    semester: 'Semester IV',
    session: '2024-25',
    status: 'Pass',
    cgpa: '8.74',
    attendance: '91%',
    subjects: [
      { code: 'CSE401', name: 'Data Structures', marks: 86, grade: 'A+' },
      { code: 'CSE402', name: 'Database Systems', marks: 81, grade: 'A' },
      { code: 'CSE403', name: 'Operating Systems', marks: 79, grade: 'A' },
      { code: 'MTH401', name: 'Discrete Mathematics', marks: 88, grade: 'A+' }
    ]
  },
  {
    enrollmentNo: '24203001066',
    studentName: 'Meera Iyer',
    dob: '2004-11-02',
    department: 'BBA',
    program: 'Bachelor of Business Administration',
    semester: 'Semester IV',
    session: '2024-25',
    status: 'Pass',
    cgpa: '9.12',
    attendance: '95%',
    subjects: [
      { code: 'ECE401', name: 'Signals and Systems', marks: 90, grade: 'A+' },
      { code: 'ECE402', name: 'Microprocessors', marks: 87, grade: 'A+' },
      { code: 'ECE403', name: 'Digital Communication', marks: 84, grade: 'A' },
      { code: 'HUM401', name: 'Professional Ethics', marks: 92, grade: 'A+' }
    ]
  }
];

export const departments = ['BCA', 'BBA', 'BCom', 'MBA'];

export const departmentCodes = {
  BCA: '20300',
  BBA: '20301',
  BCom: '20302',
  MBA: '20303'
};

export const enrollmentHint = 'Example: 24203001065';

export const adminQueue = [
  { title: 'CSE - Semester IV', meta: 'Ready for publish review', count: 126 },
  { title: 'ECE - Semester IV', meta: 'Marks imported from Excel', count: 98 },
  { title: 'MBA - Semester II', meta: 'Pending moderation', count: 42 }
];
