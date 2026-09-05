/** Frozen design date from the Figma Make student dashboard preview. */
export const LMS_NOW = new Date('2024-12-06T09:00:00');

export const STUDENT_USER = {
  id: 'student-1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@email.com',
  role: 'student',
};

export const STUDENT_ENROLLMENTS = [
  {
    id: 'enr-1',
    courseId: 'course-1',
    courseTitle: 'Digital Marketing Mastery',
    thumbnail:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop&auto=format',
    progress: 68,
    status: 'active',
    nextLesson: 'Module 8: Email Marketing Fundamentals',
    trainer: 'Ankit Verma',
    lessonsCompleted: 58,
    totalLessons: 86,
  },
  {
    id: 'enr-2',
    courseId: 'course-2',
    courseTitle: 'Social Media Marketing Essentials',
    thumbnail:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=340&fit=crop&auto=format',
    progress: 100,
    status: 'completed',
    trainer: 'Sneha Nair',
    lessonsCompleted: 52,
    totalLessons: 52,
    certificate: 'cert-2',
  },
  {
    id: 'enr-3',
    courseId: 'course-3',
    courseTitle: 'SEO & Content Strategy',
    thumbnail:
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=340&fit=crop&auto=format',
    progress: 24,
    status: 'active',
    nextLesson: 'Module 3: On-Page SEO Techniques',
    trainer: 'Vikram Singh',
    lessonsCompleted: 16,
    totalLessons: 68,
  },
];

export const STUDENT_ASSIGNMENTS = [
  {
    id: 'asgn-1',
    title: 'Social Media Audit Report',
    courseTitle: 'Digital Marketing Mastery',
    dueDate: '2024-12-15',
    maxMarks: 100,
    status: 'pending',
  },
  {
    id: 'asgn-3',
    title: 'SEO Keyword Research Document',
    courseTitle: 'SEO & Content Strategy',
    dueDate: '2024-12-10',
    maxMarks: 50,
    status: 'pending',
  },
];

export const ATTENDANCE_SUMMARY = {
  totalClasses: 18,
  present: 14,
  absent: 1,
  late: 1,
  excused: 2,
  percentage: 83,
};

export const STUDENT_GRADES = [
  {
    id: 'gr-1',
    type: 'assignment',
    title: 'Instagram Content Calendar',
    course: 'Digital Marketing Mastery',
    maxMarks: 75,
    marksObtained: 68,
    percentage: 91,
    grade: 'A',
  },
  {
    id: 'gr-2',
    type: 'assignment',
    title: 'Meta Ads Creative Analysis',
    course: 'Digital Marketing Mastery',
    maxMarks: 60,
    marksObtained: 48,
    percentage: 80,
    grade: 'B+',
  },
  {
    id: 'gr-3',
    type: 'quiz',
    title: 'Module 5 Quiz: SEO Fundamentals',
    course: 'Digital Marketing Mastery',
    maxMarks: 50,
    marksObtained: 46,
    percentage: 92,
    grade: 'A',
  },
  {
    id: 'gr-4',
    type: 'assignment',
    title: 'SEO Keyword Research Document',
    course: 'SEO & Content Strategy',
    maxMarks: 50,
    marksObtained: 44,
    percentage: 88,
    grade: 'A-',
  },
];

export const ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: 'Special Guest Lecture — Industry Leader from Dentsu',
    message:
      'We are excited to host a special guest lecture by a Senior Director from Dentsu on "The Future of AI in Digital Marketing" on December 20, 2024 at 5:00 PM. All Digital Marketing Mastery students must attend. Meeting link will be shared 24 hours before.',
    author: 'Rajesh Kumar',
    date: '2024-12-09',
    priority: 'high',
  },
  {
    id: 'ann-2',
    title: 'Holiday Schedule — December 24–26',
    message:
      'The academy will be on holiday from December 24–26. Classes will resume on December 27. Assignment deadlines falling in this period are extended by 3 days. Happy holidays!',
    author: 'Rajesh Kumar',
    date: '2024-12-05',
    priority: 'normal',
  },
];

export const NOTIFICATIONS = [
  {
    id: 'n-1',
    title: 'Assignment Due Tomorrow',
    message: '"Social Media Audit Report" is due on December 15. Please submit before 11:59 PM.',
    type: 'warning',
    read: false,
    date: '2024-12-14T09:00:00Z',
  },
  {
    id: 'n-2',
    title: 'Assignment Graded',
    message: 'Your "SEO Keyword Research Document" has been graded. You scored 44/50.',
    type: 'grade',
    read: false,
    date: '2024-12-10T14:30:00Z',
  },
  {
    id: 'n-3',
    title: 'New Announcement',
    message:
      'Guest lecture by industry expert on Dec 20. Attendance is mandatory for all DMM students.',
    type: 'announcement',
    read: false,
    date: '2024-12-09T10:00:00Z',
  },
  {
    id: 'n-4',
    title: 'Payment Reminder',
    message: 'Your Digital Marketing Mastery installment of ₹5,000 is due on December 31.',
    type: 'payment',
    read: true,
    date: '2024-12-01T08:00:00Z',
  },
  {
    id: 'n-5',
    title: 'Certificate Ready',
    message:
      'Your certificate for "Social Media Marketing Essentials" is ready. Download it from Certificates page.',
    type: 'success',
    read: true,
    date: '2024-01-20T16:00:00Z',
  },
];
