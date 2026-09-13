import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Sparkles, Mail, Lock, LogIn, ArrowRight, Shield, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AdminContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const { loginUser, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      const role = res?.user?.role || (email.includes('admin') ? 'admin' : 'learner');

      if (redirectUrl) {
        navigate(redirectUrl);
      } else if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Demo Login fill
  const handleQuickDemo = (roleType) => {
    if (roleType === 'admin') {
      setEmail('admin@jeevant.gov.in');
      setPassword('Admin@12345');
    } else if (roleType === 'artisan') {
      setEmail('dulari.madhubani@jeevantindia.org');
      setPassword('Artisan@12345');
    } else {
      setEmail('aarav.sharma@example.com');
      setPassword('Learner@12345');
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSubmitted(true);
    showToast('Password recovery instructions dispatched.', 'info');
  };

  return (
    <div className="auth-page-wrapper auth-split-wrapper">
      <div className="auth-split-layout">
        {/* ─── LEFT: Cultural Visual & Heritage Mission ─── */}
        <div className="auth-split-visual">
          <div className="auth-visual-overlay" />
          <div className="auth-visual-content">
            <Link to="/" className="auth-visual-brand">
              <div className="auth-logo-icon">
                <Sparkles size={24} />
              </div>
              <div className="auth-brand-text-col">
                <span className="auth-brand-name">JEEVANT</span>
                <span className="auth-brand-sub">LIVING INDIA</span>
              </div>
            </Link>

            <div className="auth-visual-quote-block">
              <div className="auth-eyebrow-pill">
                <Sparkles size={13} />
                <span>Smart India Hackathon 2026 · PS 26197</span>
              </div>
              <h2 className="auth-visual-title">
                Safeguarding India’s <span className="hero-gold-text">Living Cultural Heritage</span>
              </h2>
              <p className="auth-visual-desc">
                Connect directly with GI-verified master artisans, discover centuries-old craft traditions,
                and empower generational livelihoods through 100% Direct Benefit Transfer.
              </p>
            </div>

            <div className="auth-visual-features">
              <div className="auth-feature-pill">
                <CheckCircle2 size={16} className="text-gold" />
                <span>Official GI Certification Verification</span>
              </div>
              <div className="auth-feature-pill">
                <CheckCircle2 size={16} className="text-gold" />
                <span>0% Intermediary Fee (100% Direct DBT)</span>
              </div>
              <div className="auth-feature-pill">
                <CheckCircle2 size={16} className="text-gold" />
                <span>Masterclass Ateliers & Living Lineages</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Authentication Form Panel ─── */}
        <div className="auth-split-form-panel">
          <div className="auth-form-inner">
            <div className="auth-mode-tabs-bar" style={{ display: 'flex', background: '#e9dfcc', borderRadius: '10px', padding: '4px', marginBottom: '24px' }}>
              <Link to="/login" style={{ flex: 1, textAlign: 'center', padding: '10px 16px', borderRadius: '8px', background: '#123527', color: '#ffffff', fontWeight: '600', textDecoration: 'none', transition: 'all 0.2s ease' }}>
                Sign In
              </Link>
              <Link to="/signup" style={{ flex: 1, textAlign: 'center', padding: '10px 16px', borderRadius: '8px', color: '#123527', fontWeight: '600', textDecoration: 'none', transition: 'all 0.2s ease' }}>
                Sign Up
              </Link>
            </div>

            <div className="auth-header-block">
              <h2 className="auth-form-title">Welcome Back</h2>
              <p className="auth-form-subtitle">Sign in to your JEEVANT cultural account</p>
            </div>

            {error && (
              <div className="auth-error-banner">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <div className="input-icon-wrap">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    className="form-input with-icon"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label" htmlFor="password">Password</label>
                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={() => setForgotModalOpen(true)}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="input-icon-wrap">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="password"
                    type="password"
                    className="form-input with-icon"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me on this browser</span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block btn-large"
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Sign In to Account'}
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Social Logins */}
            <div className="auth-divider">
              <span>Or continue with</span>
            </div>

            <div className="social-auth-grid">
              <button
                type="button"
                className="btn-social"
                onClick={() => handleQuickDemo('learner')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="btn-social"
                onClick={() => handleQuickDemo('learner')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </button>
            </div>

            {/* Quick Demo Fill Pills */}
            <div className="auth-quick-fill-box">
              <span className="quick-fill-label">SIH Demo Auto-Fill:</span>
              <div className="quick-fill-buttons">
                <button
                  type="button"
                  className="demo-account-pill"
                  onClick={() => handleQuickDemo('learner')}
                >
                  <User size={13} /> Learner
                </button>
                <button
                  type="button"
                  className="demo-account-pill"
                  onClick={() => handleQuickDemo('artisan')}
                >
                  <Sparkles size={13} /> Artisan
                </button>
                <button
                  type="button"
                  className="demo-account-pill admin"
                  onClick={() => handleQuickDemo('admin')}
                >
                  <Shield size={13} /> Admin
                </button>
              </div>
            </div>

            <div className="auth-card-footer">
              <span>Don't have an account? </span>
              <Link to="/signup" className="auth-switch-link">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      {forgotModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog forgot-modal">
            <div className="modal-header">
              <h3>Reset Password</h3>
              <button
                className="modal-close"
                onClick={() => {
                  setForgotModalOpen(false);
                  setForgotSubmitted(false);
                }}
              >
                ✕
              </button>
            </div>

            {!forgotSubmitted ? (
              <form onSubmit={handleForgotSubmit} className="forgot-form">
                <p>Enter your registered email address to receive password reset instructions.</p>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setForgotModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Send Reset Link
                  </button>
                </div>
              </form>
            ) : (
              <div className="forgot-success">
                <CheckCircle2 size={48} className="text-forest" />
                <h4>Reset Link Sent!</h4>
                <p>If an account exists for {forgotEmail}, an authorization token has been sent.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setForgotModalOpen(false);
                    setForgotSubmitted(false);
                  }}
                >
                  Return to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
