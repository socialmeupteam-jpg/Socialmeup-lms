import DashboardLayout, { SectionCard } from '../../components/layout/DashboardLayout.jsx';
import Badge, { StatusBadge } from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import ProgressBar, { CircularProgress } from '../../components/ui/ProgressBar.jsx';
import StatCard from '../../components/ui/StatCard.jsx';
import {
  IconAlertTriangle,
  IconBook,
  IconCalendar,
  IconChevronRight,
  IconClipboard,
  IconPlay,
  IconTrendingUp,
} from '../../components/Icons.jsx';
import { useLms } from '../../context/LmsContext.jsx';
import {
  ANNOUNCEMENTS,
  ATTENDANCE_SUMMARY,
  LMS_NOW,
  STUDENT_ASSIGNMENTS,
  STUDENT_ENROLLMENTS,
  STUDENT_GRADES,
} from '../../data/studentDashboard.js';
import styles from './StudentDashboard.module.css';

function gradeColor(percentage) {
  if (percentage >= 90) return '#10B981';
  if (percentage >= 75) return '#007991';
  if (percentage >= 60) return '#F59E0B';
  return '#EF4444';
}

function typeVariant(type) {
  if (type === 'exam') return 'error';
  if (type === 'quiz') return 'info';
  return 'teal';
}

export default function StudentDashboard() {
  const { navigate } = useLms();
  const activeEnrollments = STUDENT_ENROLLMENTS.filter((item) => item.status === 'active');
  const completedEnrollments = STUDENT_ENROLLMENTS.filter((item) => item.status === 'completed');
  const pendingAssignments = STUDENT_ASSIGNMENTS.filter(
    (item) => item.status === 'pending' || item.status === 'resubmit',
  );
  const avgProgress = Math.round(
    activeEnrollments.reduce((sum, item) => sum + item.progress, 0) / (activeEnrollments.length || 1),
  );

  return (
    <DashboardLayout>
      <div className={styles.stats}>
        <StatCard
          title="Enrolled Courses"
          value={STUDENT_ENROLLMENTS.length}
          subtitle={`${completedEnrollments.length} completed`}
          icon={<IconBook size={20} />}
          iconBg="#e0f6ff"
          iconColor="#007991"
          trend={{ value: 1, label: 'this month', positive: true }}
          onClick={() => navigate('student-courses')}
        />
        <StatCard
          title="Avg Progress"
          value={`${avgProgress}%`}
          subtitle="Across active courses"
          icon={<IconTrendingUp size={20} />}
          iconBg="#fff3e6"
          iconColor="#FF9635"
          trend={{ value: 8, label: 'vs last month', positive: true }}
        />
        <StatCard
          title="Attendance"
          value={`${ATTENDANCE_SUMMARY.percentage}%`}
          subtitle={`${ATTENDANCE_SUMMARY.present} / ${ATTENDANCE_SUMMARY.totalClasses} sessions`}
          icon={<IconCalendar size={20} />}
          iconBg="#D1FAE5"
          iconColor="#10B981"
          onClick={() => navigate('student-attendance')}
        />
        <StatCard
          title="Pending Tasks"
          value={pendingAssignments.length}
          subtitle="Assignments due"
          icon={<IconClipboard size={20} />}
          iconBg={pendingAssignments.length > 0 ? '#FEF3C7' : '#D1FAE5'}
          iconColor={pendingAssignments.length > 0 ? '#F59E0B' : '#10B981'}
          onClick={() => navigate('student-assignments')}
        />
      </div>

      <div className={styles.columns}>
        <div className={styles.primaryCol}>
          <SectionCard
            title="Continue Learning"
            subtitle="Pick up where you left off"
            action={
              <Button
                variant="ghost"
                size="sm"
                iconRight={<IconChevronRight size={14} />}
                onClick={() => navigate('student-courses')}
              >
                All Courses
              </Button>
            }
          >
            <div className={styles.divide}>
              {activeEnrollments.map((enrollment) => (
                <div key={enrollment.id} className={styles.courseRow}>
                  <div className={styles.thumb}>
                    <img src={enrollment.thumbnail} alt={enrollment.courseTitle} />
                  </div>
                  <div className={styles.courseBody}>
                    <p className={styles.courseTitle}>{enrollment.courseTitle}</p>
                    <p className={styles.courseNext}>{enrollment.nextLesson}</p>
                    <div className={styles.progressWrap}>
                      <ProgressBar value={enrollment.progress} showLabel label="Progress" height={6} />
                    </div>
                    <p className={styles.courseMeta}>
                      {enrollment.lessonsCompleted}/{enrollment.totalLessons} lessons · {enrollment.trainer}
                    </p>
                  </div>
                  <Button
                    variant="cta"
                    size="sm"
                    icon={<IconPlay size={12} />}
                    className={styles.resumeBtn}
                  >
                    Resume
                  </Button>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Upcoming Assignments"
            subtitle={`${pendingAssignments.length} pending`}
            action={
              <Button
                variant="ghost"
                size="sm"
                iconRight={<IconChevronRight size={14} />}
                onClick={() => navigate('student-assignments')}
              >
                View All
              </Button>
            }
          >
            {pendingAssignments.length === 0 ? (
              <div className={styles.empty}>
                <p className={styles.emptyEmoji}>🎉</p>
                <p className={styles.emptyTitle}>All caught up!</p>
                <p className={styles.emptyText}>No pending assignments right now</p>
              </div>
            ) : (
              <table className="lms-table">
                <thead>
                  <tr>
                    <th>Assignment</th>
                    <th>Course</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingAssignments.slice(0, 4).map((assignment) => {
                    const due = new Date(assignment.dueDate);
                    const days = Math.ceil((due.getTime() - LMS_NOW.getTime()) / (1000 * 60 * 60 * 24));
                    const isUrgent = days <= 2;
                    return (
                      <tr key={assignment.id}>
                        <td>
                          <p className={styles.cellTitle}>{assignment.title}</p>
                          <p className={styles.cellSub}>{assignment.maxMarks} marks</p>
                        </td>
                        <td className={styles.courseCell}>
                          {assignment.courseTitle.split(' ').slice(0, 3).join(' ')}
                        </td>
                        <td>
                          <div className={`${styles.dueRow} ${isUrgent ? styles.dueUrgent : ''}`}>
                            {isUrgent ? <IconAlertTriangle size={12} /> : null}
                            {due.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </div>
                          {days > 0 ? <p className={styles.dueRemain}>{days}d remaining</p> : null}
                        </td>
                        <td>
                          <StatusBadge status={assignment.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </SectionCard>

          <SectionCard
            title="Recent Grades"
            action={
              <Button
                variant="ghost"
                size="sm"
                iconRight={<IconChevronRight size={14} />}
                onClick={() => navigate('student-grades')}
              >
                All Grades
              </Button>
            }
          >
            <table className="lms-table">
              <thead>
                <tr>
                  <th>Assessment</th>
                  <th>Type</th>
                  <th>Marks</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {STUDENT_GRADES.slice(0, 4).map((grade) => (
                  <tr key={grade.id}>
                    <td>
                      <p className={styles.cellMedium}>{grade.title}</p>
                      <p className={styles.cellSub}>{grade.course.split(' ').slice(0, 3).join(' ')}</p>
                    </td>
                    <td>
                      <Badge variant={typeVariant(grade.type)} size="sm">
                        {grade.type}
                      </Badge>
                    </td>
                    <td className={styles.marks}>
                      {grade.marksObtained}/{grade.maxMarks}
                    </td>
                    <td>
                      <span className={styles.grade} style={{ color: gradeColor(grade.percentage) }}>
                        {grade.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
        </div>

        <div className={styles.sideCol}>
          <SectionCard
            title="Attendance Overview"
            action={
              <Button variant="ghost" size="sm" onClick={() => navigate('student-attendance')}>
                View
              </Button>
            }
          >
            <div className={styles.attendanceRow}>
              <CircularProgress value={ATTENDANCE_SUMMARY.percentage} size={80} strokeWidth={8} />
              <div className={styles.legend}>
                <div className={styles.legendItem}>
                  <span className={styles.dot} style={{ backgroundColor: '#10B981' }} />
                  <span className={styles.legendLabel}>Present</span>
                  <span className={styles.legendValue}>{ATTENDANCE_SUMMARY.present}</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.dot} style={{ backgroundColor: '#EF4444' }} />
                  <span className={styles.legendLabel}>Absent</span>
                  <span className={styles.legendValue}>{ATTENDANCE_SUMMARY.absent}</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.dot} style={{ backgroundColor: '#F59E0B' }} />
                  <span className={styles.legendLabel}>Late</span>
                  <span className={styles.legendValue}>{ATTENDANCE_SUMMARY.late}</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.dot} style={{ backgroundColor: '#3B82F6' }} />
                  <span className={styles.legendLabel}>Excused</span>
                  <span className={styles.legendValue}>{ATTENDANCE_SUMMARY.excused}</span>
                </div>
              </div>
            </div>
            <div className={styles.eligibleWrap}>
              <div
                className={`${styles.eligible} ${
                  ATTENDANCE_SUMMARY.percentage >= 75 ? styles.eligibleOk : styles.eligibleBad
                }`}
              >
                {ATTENDANCE_SUMMARY.percentage >= 75
                  ? '✓ Eligible for certification'
                  : '⚠ Below minimum 75% threshold'}
              </div>
            </div>
          </SectionCard>

          {completedEnrollments.length > 0 ? (
            <SectionCard title="Completed Courses">
              <div className={styles.divide}>
                {completedEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className={styles.completedRow}>
                    <div className={styles.completedThumb}>
                      <img src={enrollment.thumbnail} alt="" />
                    </div>
                    <div className={styles.completedMeta}>
                      <p className={styles.completedTitle}>{enrollment.courseTitle}</p>
                      <p className={styles.completedTrainer}>{enrollment.trainer}</p>
                    </div>
                    {enrollment.certificate ? (
                      <Button variant="outline" size="sm" onClick={() => navigate('student-certificates')}>
                        Certificate
                      </Button>
                    ) : (
                      <StatusBadge status="completed" />
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          ) : null}

          <SectionCard title="Announcements">
            <div className={styles.divide}>
              {ANNOUNCEMENTS.slice(0, 2).map((announcement) => (
                <div key={announcement.id} className={styles.announcement}>
                  {announcement.priority === 'high' ? (
                    <Badge variant="error" size="sm" className={styles.important}>
                      📌 Important
                    </Badge>
                  ) : null}
                  <p className={styles.annTitle}>{announcement.title}</p>
                  <p className={styles.annMessage}>{announcement.message}</p>
                  <p className={styles.annMeta}>
                    {announcement.author} ·{' '}
                    {new Date(announcement.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Payment Status"
            action={
              <Button variant="ghost" size="sm" onClick={() => navigate('student-payments')}>
                View
              </Button>
            }
          >
            <div className={styles.paymentBody}>
              <div className={styles.paymentCard}>
                <div>
                  <p className={styles.paymentLabel}>Pending Payment</p>
                  <p className={styles.paymentAmount}>₹5,000</p>
                </div>
                <Button variant="cta" size="sm" onClick={() => navigate('student-payments')}>
                  Pay Now
                </Button>
              </div>
              <p className={styles.paymentDue}>Due: Dec 31, 2024</p>
            </div>
          </SectionCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
