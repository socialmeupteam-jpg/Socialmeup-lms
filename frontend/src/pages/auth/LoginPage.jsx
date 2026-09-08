import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import { IconEye, IconGraduate, IconMail, IconShield } from '../../components/Icons.jsx';
import { DEMO_ACCOUNTS } from '../../data/demoAccounts.js';
import { signInAsDemoRole, signInWithPassword } from '../../services/authService.js';
import styles from './LoginPage.module.css';

const FEATURES = [
  { icon: '🎯', label: 'Structured Course Learning' },
  { icon: '📊', label: 'Real-time Progress Tracking' },
  { icon: '🏆', label: 'Industry-Recognised Certificates' },
  { icon: '🤝', label: 'Direct Trainer Communication' },
];

const LEARNER_INITIALS = ['AV', 'SK', 'PM', 'RK'];

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const result = await signInWithPassword();
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
    }
  };

  const handleDemo = async (role) => {
    setError('');
    setLoading(true);
    await signInAsDemoRole(role);
    setLoading(false);
    if (role === 'student') {
      navigate('/lms/student/dashboard');
    }
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
            Your learning journey
            <br />
            starts here.
          </h1>
          <p className={styles.lede}>
            Access your courses, track progress, submit assignments, and grow your digital marketing career — all in one place.
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
            <h2 className={styles.title}>Welcome back</h2>
            <p className={styles.subtitle}>Sign in to your account to continue</p>

            {error ? (
              <div className={styles.error} role="alert">
                <span className={styles.errorIcon} aria-hidden="true">
                  ⚠
                </span>
                <p className={styles.errorText}>{error}</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <label className={styles.fieldLabel} htmlFor="login-email">
                  Email Address
                </label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}>
                    <IconMail size={16} />
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className={styles.input}
                  />
                </div>
              </div>

              <div>
                <label className={styles.fieldLabel} htmlFor="login-password">
                  Password
                </label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}>
                    <IconShield size={16} />
                  </span>
                  <input
                    id="login-password"
                    type={showPass ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
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

              <div className={styles.rowBetween}>
                <label className={styles.remember}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  <span className={styles.rememberText}>Remember me</span>
                </label>
                <button type="button" className={styles.forgot}>
                  Forgot password?
                </button>
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                Sign In
              </Button>
            </form>

            <div className={styles.demoBlock}>
              <div className={styles.demoDivider}>
                <hr />
                <span className={styles.demoDividerText}>Demo Accounts</span>
                <hr />
              </div>
              <p className={styles.demoHint}>Click to sign in instantly as any role</p>

              <div className={styles.demoGrid}>
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.role}
                    type="button"
                    className={styles.demoCard}
                    onClick={() => handleDemo(account.role)}
                    disabled={loading}
                  >
                    <div
                      className={styles.demoAvatar}
                      style={{ backgroundColor: account.bg, color: account.color }}
                    >
                      {account.initial}
                    </div>
                    <div className={styles.demoMeta}>
                      <p className={styles.demoName}>{account.name}</p>
                      <p className={styles.demoDesc}>{account.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className={styles.footer}>
            Don&apos;t have an account?{' '}
            <button type="button" className={styles.register} onClick={() => navigate('/register')}>
              Register now
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
