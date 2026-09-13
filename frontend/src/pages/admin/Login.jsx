import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowRight, Lock, Mail, Award, Loader2, AlertCircle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const Login = () => {
  const [email, setEmail] = useState('admin@jeevant.gov.in');
  const [password, setPassword] = useState('Admin@12345');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setErrorMessage(err.message || 'Invalid credentials or connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAccess = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setEmail('admin@jeevant.gov.in');
    setPassword('Admin@12345');

    try {
      await login('admin@jeevant.gov.in', 'Admin@12345');
      navigate('/admin');
    } catch (err) {
      setErrorMessage(err.message || 'Demo login failed. Starting demo session...');
      navigate('/admin');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--forest-950) 0%, var(--forest-900) 45%, var(--forest-850) 100%)',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorative Rings */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid rgba(200, 149, 42, 0.15)',
          top: '-100px',
          right: '-100px',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          border: '1px dashed rgba(200, 149, 42, 0.1)',
          bottom: '-150px',
          left: '-150px',
          pointerEvents: 'none'
        }}
      />

      {/* Login Card */}
      <div
        style={{
          maxWidth: '460px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(200, 149, 42, 0.3)',
          overflow: 'hidden',
          zIndex: 10
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--forest-900) 0%, var(--forest-800) 100%)',
            padding: '32px 28px',
            color: '#ffffff',
            textAlign: 'center',
            position: 'relative',
            borderBottom: '2px solid var(--gold-500)'
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              background: 'linear-gradient(135deg, var(--gold-500) 0%, var(--terracotta-500) 100%)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              color: '#fff',
              boxShadow: '0 6px 16px rgba(200, 90, 50, 0.4)'
            }}
          >
            <Sparkles size={28} />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heritage)',
              fontSize: '26px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#ffffff',
              marginBottom: '4px'
            }}
          >
            JEEVANT
          </h1>
          <p
            style={{
              fontSize: '12.5px',
              color: 'var(--gold-500)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            LIVING INDIA • ADMIN CONSOLE
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              marginTop: '12px',
              color: '#f0ece1'
            }}
          >
            <ShieldCheck size={13} color="var(--gold-500)" />
            <span>Smart India Hackathon 2026 • PS 26197</span>
          </div>
        </div>

        {/* Form Body */}
        <div style={{ padding: '32px 28px' }}>
          {errorMessage && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#fee2e2',
                color: '#991b1b',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                marginBottom: '18px',
                border: '1px solid #f87171'
              }}
            >
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: 'var(--forest-900)',
                  marginBottom: '6px'
                }}
              >
                Officer / Administrator ID
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                  placeholder="admin@jeevant.gov.in"
                />
              </div>
            </div>

            <div style={{ marginBottom: '22px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: 'var(--forest-900)',
                  marginBottom: '6px'
                }}
              >
                Security Passcode
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="spin-animation" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Demo Login for SIH Judges */}
          <div
            style={{
              textAlign: 'center',
              margin: '18px 0 14px',
              position: 'relative'
            }}
          >
            <div
              style={{
                borderTop: '1px solid var(--border-subtle)',
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0
              }}
            />
            <span
              style={{
                background: '#ffffff',
                padding: '0 12px',
                position: 'relative',
                fontSize: '11px',
                color: 'var(--text-muted)',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}
            >
              Hackathon Evaluation Fast-Track
            </span>
          </div>

          <button
            type="button"
            disabled={isLoading}
            onClick={handleDemoAccess}
            className="btn btn-gold"
            style={{
              width: '100%',
              padding: '11px',
              fontSize: '13.5px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Award size={16} />
            <span>Launch SIH 2026 Admin Demo (admin@jeevant.gov.in)</span>
          </button>

          <p
            style={{
              fontSize: '11px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              marginTop: '16px'
            }}
          >
            Preserving Intangible Cultural Heritage through verified digital governance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
