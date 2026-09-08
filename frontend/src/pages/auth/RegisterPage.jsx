import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import { IconEye, IconGraduate, IconMail, IconShield } from '../../components/Icons.jsx';
import { registerAsRole } from '../../services/authService.js';
import styles from './RegisterPage.module.css';

const FEATURES = [
  { icon: '🎯', label: 'Structured Course Learning' },
  { icon: '📊', label: 'Real-time Progress Tracking' },
  { icon: '🏆', label: 'Industry-Recognised Certificates' },
  { icon: '🤝', label: 'Direct Trainer Communication' },
];

const LEARNER_INITIALS = ['AV', 'SK', 'PM', 'RK'];

const ROLES = [
  { role: 'student', label: 'Student', description: 'Learn courses & track progress' },
  { role: 'parent', label: 'Parent', description: 'Monitor your child’s progress' },
  { role: 'trainer', label: 'Trainer / Teacher', description: 'Teach & manage courses' },
  { role: 'admin', label: 'Admin', description: 'Manage academy operations' },
];

const ROLE_NOTES = {
  student: 'Student accounts are open to everyone. Create your free account and start learning.',
  parent:
    'Parent accounts are added through an approved invitation. Request access and the academy will confirm your link to the student.',
  trainer:
    'Trainer accounts are created by the academy administration. Request access and you will be contacted with your credentials.',
  admin:
    'Admin accounts are provisioned internally by the academy system owner. Submit a request and the system owner will review it.',
};

const ROLE_PLACEHOLDERS = {
  student: {
    fullName: 'e.g. Rahul Sharma',
    email: 'you@example.com',
    phone: 'e.g. +91 98765 43210',
    extra: 'Select your course interest',
  },
  parent: {
    fullName: 'e.g. Sunita Sharma',
    email: 'you@example.com',
    phone: 'e.g. +91 98765 43210',
    extra: 'Linked student name',
  },
  trainer: {
    fullName: 'e.g. Ankit Verma',
    email: 'you@socialmeup.in',
    phone: 'e.g. +91 98765 43210',
    extra: 'Area of expertise',
  },
  admin: {
    fullName: 'e.g. Rajesh Kumar',
    email: 'admin@socialmeupacademy.in',
    phone: 'e.g. +91 98765 43210',
    extra: 'Request reason',
  },
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [extra, setExtra] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const placeholders = ROLE_PLACEHOLDERS[role];

  const handleRoleChange = (nextRole) => {
    setRole(nextRole);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const result = await registerAsRole(role, { fullName, email, phone, extra, password });
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSuccess(result.message);
  };

  return (
    <div className={styles.page}>
      <aside className={styles.brandPanel} aria-hidden="false">
        <div className={styles.decorTop} />
        <div className={styles.decorBottom} />
        <div className={styles.decorMid} />

        <div className={styles.brandContent}>
          <div className={styles.logoRow}>
            <div className={styles.logoMark}>
              <IconGraduate size={22} />
            </div>
            <div>
              <p className={styles.logoName}>SocialMeUp Academy</p>
              <p className={styles.logoSub}>Learning Management System</p>
            </div>
          </div>

          <h1 className={styles.headline}>
            Join SocialMeUp
            <br />
            Academy today.
          </h1>
          <p className={styles.lede}>
            Create your account, pick your role, and start your digital marketing journey with structured courses and expert trainers.
          </p>
        </div>

        <div className={styles.brandFooter}>
          <div className={styles.featureList}>
            {FEATURES.map((feature) => (
              <div key={feature.label} className={styles.featureRow}>
                <span className={styles.featureIcon}>{feature.icon}</span>
                <span className={styles.featureLabel}>{feature.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.learnersRow}>
            <div className={styles.avatarStack}>
              {LEARNER_INITIALS.map((initial) => (
                <div key={initial} className={styles.avatar}>
                  {initial}
                </div>
              ))}
            </div>
            <p className={styles.learnersCopy}>248+ learners enrolled this year</p>
          </div>
        </div>
      </aside>

      <main className={styles.formPanel}>
        <div className={styles.formInner}>
          <div className={styles.mobileLogo}>
            <div className={styles.mobileMark}>
              <IconGraduate size={18} />
            </div>
            <span className={styles.mobileName}>SocialMeUp Academy</span>
          </div>

          <div className={styles.card}>
            <h2 className={styles.title}>Create your account</h2>
            <p className={styles.subtitle}>Register to get started with SocialMeUp Academy</p>

            {error ? (
              <div className={styles.error} role="alert">
                <span className={styles.errorIcon} aria-hidden="true">
                  ⚠
                </span>
                <p className={styles.errorText}>{error}</p>
              </div>
            ) : null}

            {success ? (
              <div className={styles.success} role="status">
                <p className={styles.successText}>{success}</p>
              </div>
            ) : null}

            <div className={styles.roleBlock}>
              <p className={styles.roleLabel}>I am registering as</p>
              <div className={styles.roleGrid} role="radiogroup" aria-label="Registration role">
                {ROLES.map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    className={`${styles.roleCard} ${role === item.role ? styles.roleCardActive : ''}`}
                    onClick={() => handleRoleChange(item.role)}
                    role="radio"
                    aria-checked={role === item.role}
                    disabled={loading}
                  >
                    <div className={styles.roleMeta}>
                      <p className={styles.roleName}>{item.label}</p>
                      <p className={styles.roleDesc}>{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
              <p className={styles.roleNote}>{ROLE_NOTES[role]}</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <label className={styles.fieldLabel} htmlFor="register-fullname">
                  Full Name
                </label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}>
                    <IconGraduate size={16} />
                  </span>
                  <input
                    id="register-fullname"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder={placeholders.fullName}
                    className={styles.input}
                  />
                </div>
              </div>

              <div>
                <label className={styles.fieldLabel} htmlFor="register-email">
                  Email Address
                </label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}>
                    <IconMail size={16} />
                  </span>
                  <input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={placeholders.email}
                    className={styles.input}
                  />
                </div>
              </div>

              <div>
                <label className={styles.fieldLabel} htmlFor="register-phone">
                  Phone Number
                </label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}>
                    <IconShield size={16} />
                  </span>
                  <input
                    id="register-phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder={placeholders.phone}
                    className={styles.input}
                  />
                </div>
              </div>

              <div>
                <label className={styles.fieldLabel} htmlFor="register-extra">
                  {placeholders.extra}
                </label>
                {role === 'student' ? (
                  <div className={styles.inputWrap}>
                    <span className={styles.inputIcon}>
                      <IconGraduate size={16} />
                    </span>
                    <select
                      id="register-extra"
                      value={extra}
                      onChange={(event) => setExtra(event.target.value)}
                      className={`${styles.input} ${styles.select}`}
                    >
                      <option value="">Select a course interest</option>
                      <option value="dm-mastery">Digital Marketing Mastery</option>
                      <option value="smm">Social Media Marketing Essentials</option>
                      <option value="seo">SEO & Content Strategy</option>
                    </select>
                  </div>
                ) : (
                  <div className={styles.inputWrap}>
                    <span className={styles.inputIcon}>
                      <IconShield size={16} />
                    </span>
                    <input
                      id="register-extra"
                      type="text"
                      value={extra}
                      onChange={(event) => setExtra(event.target.value)}
                      placeholder={
                        role === 'parent'
                          ? 'e.g. Rahul Sharma'
                          : role === 'trainer'
                            ? 'e.g. SEO, Paid Ads, Content'
                            : 'e.g. New trainer onboarding'
                      }
                      className={styles.input}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className={styles.fieldLabel} htmlFor="register-password">
                  Password
                </label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}>
                    <IconShield size={16} />
                  </span>
                  <input
                    id="register-password"
                    type={showPass ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a password"
                    className={`${styles.input} ${styles.passwordInput}`}
                  />
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowPass((value) => !value)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    <IconEye size={16} />
                  </button>
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                Create Account
              </Button>
            </form>
          </div>

          <p className={styles.footer}>
            Already have an account?{' '}
            <button type="button" className={styles.loginLink} onClick={() => navigate('/login')}>
              Sign in
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
