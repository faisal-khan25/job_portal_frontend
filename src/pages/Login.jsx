import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useHooks';
import api from '../services/api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { form, onChange } = useForm({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/api/auth/login', form);
      login({ name: res.data.name, email: res.data.email, role: res.data.role }, res.data.token);
      const paths = { JOBSEEKER: '/jobseeker/browse', MANAGER: '/manager/jobs', ADMIN: '/admin/dashboard' };
      navigate(paths[res.data.role] || '/');
    } catch (e) {
      setError(e.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 52px)',
      background: '#f1f4f9',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '24px 14px 40px',
     
    }}>
      {/* Mobile: stacked. Desktop: side-by-side */}
      <div style={{
        width: '100%',
        maxWidth: 900,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-xl)',
        borderRadius: 16,
        overflow: 'hidden',
      }}
        className="login-card"
      >
        <style>{`
          @media (min-width: 700px) {
            .login-card { flex-direction: row !important; }
            .login-left-panel { display: flex !important; }
            .login-right-panel { padding: 48px 40px !important; }
          }
          @media (max-width: 699px) {
            .login-left-panel { display: none !important; }
          }
        `}</style>

        {/* Left Panel — info panel (hidden on mobile) */}
        <div
          className="login-left-panel"
          style={{
            background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)',
            padding: '48px 32px',
            width: 300,
            flexShrink: 0,
            flexDirection: 'column',
            alignItems: 'flex-start',
            borderRight: '1px solid var(--gray-200)',
            display: 'none',
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 18, textAlign: 'center', width: '100%' }}>👨‍💼</div>
            <div style={{
              background: 'rgba(37,99,235,0.08)',
              borderRadius: 12, padding: '14px 16px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-900)', fontFamily: 'var(--font-display)', marginBottom: 2 }}>
                On logging in, you can
              </div>
            </div>
          </div>
          {[
            '✅ View personalised job recommendations',
            '✅ Track all your job applications',
            '✅ Get recruiter messages in your inbox',
            '✅ Access your saved jobs anytime',
          ].map((item, i) => (
            <div key={i} style={{
              fontSize: 13, color: 'var(--gray-700)', marginBottom: 14,
              display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5,
            }}>
              {item}
            </div>
          ))}
        </div>

        {/* Right Panel — Form */}
        <div
          className="login-right-panel"
          style={{ flex: 1, background: 'var(--white)', padding: '28px 20px' }}
        >
          {/* Mobile benefit strip */}
          <div style={{
            display: 'none',
            background: 'var(--naukri-blue-light)',
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 20,
            border: '1px solid rgba(37,99,235,0.15)',
          }}
            className="mobile-benefits"
          >
            <style>{`
              @media (max-width: 699px) { .mobile-benefits { display: block !important; } }
            `}</style>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--naukri-blue-dark)', marginBottom: 8 }}>
              👨‍💼 On logging in, you can
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px' }}>
              {[
                '✅ Personalised jobs',
                '✅ Track applications',
                '✅ Recruiter messages',
                '✅ Saved jobs',
              ].map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: 'var(--gray-700)' }}>{item}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: 20, fontSize: 13, color: 'var(--gray-500)' }}>
            New to HireX?{' '}
            <Link to="/register" style={{ color: 'var(--naukri-blue-dark)', fontWeight: 600 }}>
              Register here
            </Link>
          </div>

          <h1 style={{
            fontSize: 20, fontWeight: 700, color: 'var(--gray-900)',
            fontFamily: 'var(--font-display)', marginBottom: 4,
          }}>
            Login to your account
          </h1>
          <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 22 }}>
            Search and apply for jobs from India's No.1 Job Platform
          </p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email" name="email" value={form.email}
                onChange={onChange} placeholder="Tell us your Email ID"
                required style={{ borderRadius: 6 }}
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password" name="password" value={form.password}
                onChange={onChange} placeholder="Enter your password"
                required style={{ borderRadius: 6 }}
              />
              <div style={{ textAlign: 'right', marginTop: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--naukri-blue-dark)', cursor: 'pointer', fontWeight: 500 }}>
                  Forgot Password?
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 4, borderRadius: 6 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={{ margin: '18px 0', textAlign: 'center', position: 'relative' }}>
            <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)' }} />
            <span style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#fff', padding: '0 12px',
              fontSize: 12, color: 'var(--gray-400)',
            }}>OR</span>
          </div>

          <button style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            border: '1.5px solid var(--gray-200)', borderRadius: 6,
            padding: '10px', background: 'transparent', cursor: 'pointer',
            fontSize: 14, fontWeight: 600, color: 'var(--gray-700)',
            fontFamily: 'var(--font-body)', transition: 'all 0.18s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--naukri-blue-dark)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
          >
            <span style={{ fontSize: 18 }}>G</span> Continue with Google
          </button>

          <p style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: 'var(--gray-400)', lineHeight: 1.6 }}>
            By continuing, you agree to HireX's{' '}
            <span style={{ color: 'var(--naukri-blue-dark)', cursor: 'pointer' }}>Terms of Use</span>{' '}
            and{' '}
            <span style={{ color: 'var(--naukri-blue-dark)', cursor: 'pointer' }}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
