import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AdminContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const { registerUser } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('learner');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser({
        name,
        email,
        password,
        role,
        location: location || 'India',
      });

      if (role === 'artisan') {
        navigate('/artisan/register');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
                Join India’s <span className="hero-gold-text">Cultural Vanguard</span>
              </h2>
              <p className="auth-visual-desc">
                Whether you want to learn centuries-old folk traditions, support rural craftspeople, or register as a master artisan — JEEVANT is your living home.
              </p>
            </div>

            <div className="auth-visual-features">
              <div className="auth-feature-pill">
                <ShieldCheck size={16} className="text-gold" />
                <span>Fair-Trade Direct Benefit Transfer</span>
              </div>
              <div className="auth-feature-pill">
                <ShieldCheck size={16} className="text-gold" />
                <span>Official GI-Protected Authenticity</span>
              </div>
              <div className="auth-feature-pill">
                <ShieldCheck size={16} className="text-gold" />
                <span>Live Interactive Masterclasses</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Signup Form Panel ─── */}
        <div className="auth-split-form-panel">
          <div className="auth-form-inner">
            <div className="auth-mode-tabs-bar" style={{ display: 'flex', background: '#e9dfcc', borderRadius: '10px', padding: '4px', marginBottom: '24px' }}>
              <Link to="/login" style={{ flex: 1, textAlign: 'center', padding: '10px 16px', borderRadius: '8px', color: '#123527', fontWeight: '600', textDecoration: 'none', transition: 'all 0.2s ease' }}>
                Sign In
              </Link>
              <Link to="/signup" style={{ flex: 1, textAlign: 'center', padding: '10px 16px', borderRadius: '8px', background: '#123527', color: '#ffffff', fontWeight: '600', textDecoration: 'none', transition: 'all 0.2s ease' }}>
                Sign Up
              </Link>
            </div>

            <div className="auth-header-block">
              <h2 className="auth-form-title">Create Account</h2>
              <p className="auth-form-subtitle">Choose how you wish to engage with India’s heritage</p>
            </div>

            {error && (
              <div className="auth-error-banner">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              {/* Role Selection Tabs */}
              <div className="form-group">
                <label className="form-label">I want to:</label>
                <div className="role-selection-grid">
                  <label className={`role-card-option ${role === 'learner' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="learner"
                      checked={role === 'learner'}
                      onChange={() => setRole('learner')}
                    />
                    <div>
                      <strong>Explore & Learn</strong>
                      <p>Discover traditions, book masterclasses & collect authentic crafts</p>
                    </div>
                  </label>

                  <label className={`role-card-option ${role === 'artisan' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="artisan"
                      checked={role === 'artisan'}
                      onChange={() => setRole('artisan')}
                    />
                    <div>
                      <strong>Become an Artisan</strong>
                      <p>Register your GI craft, conduct workshops & get 100% direct DBT</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <div className="input-icon-wrap">
                  <User size={18} className="input-icon" />
                  <input
                    id="name"
                    type="text"
                    className="form-input with-icon"
                    placeholder="Aarav Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

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
                <label className="form-label" htmlFor="password">Password (min 6 characters)</label>
                <div className="input-icon-wrap">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="password"
                    type="password"
                    className="form-input with-icon"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="location">City & State</label>
                <input
                  id="location"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Jaipur, Rajasthan"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="form-terms-text">
                By creating an account, you support fair-trade livelihood governance under the
                Smart India Hackathon 2026 guidelines.
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block btn-large"
                disabled={loading}
              >
                {loading ? 'Registering Account...' : 'Complete Sign Up'}
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Social Logins */}
            <div className="auth-divider">
              <span>Or sign up with</span>
            </div>

            <div className="social-auth-grid">
              <button
                type="button"
                className="btn-social"
                onClick={() => {
                  setName('Cultural Explorer');
                  setEmail('explorer@livingindia.org');
                  setLocation('New Delhi');
                }}
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
                onClick={() => {
                  setName('Tradition Patron');
                  setEmail('patron@livingindia.org');
                  setLocation('Jaipur, Rajasthan');
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </button>
            </div>

            <div className="auth-card-footer">
              <span>Already have an account? </span>
              <Link to="/login" className="auth-switch-link">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
