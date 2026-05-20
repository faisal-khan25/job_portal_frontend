import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useHooks';
import api from '../services/api';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { form, onChange } = useForm({ name: '', email: '', password: '', phone: '', role: 'JOBSEEKER' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await api.post('/api/auth/register', form);
      login({ name: res.data.name, email: res.data.email, role: res.data.role }, res.data.token);
      if (res.data.role === 'MANAGER') navigate('/manager/company');
      else navigate('/jobseeker/browse');
    } catch (e) {
      setError(e.response?.data?.error || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 52px)', background: '#f1f4f9',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '24px 14px 40px',
    }}>
      <div style={{
        width: '100%', maxWidth: 940,
        display: 'flex', flexDirection: 'column',
        boxShadow: 'var(--shadow-xl)', borderRadius: 16, overflow: 'hidden',
      }}
        className="register-card"
      >
        <style>{`
          @media (min-width: 700px) {
            .register-card { flex-direction: row !important; }
            .register-left-panel { display: flex !important; }
            .register-right-panel { padding: 40px 36px !important; }
          }
          @media (max-width: 699px) {
            .register-left-panel { display: none !important; }
          }
        `}</style>

        {/* Left Panel (desktop only) */}
        <div
          className="register-left-panel"
          style={{
            background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)',
            padding: '48px 32px', width: 300, flexShrink: 0,
            flexDirection: 'column', alignItems: 'flex-start',
            borderRight: '1px solid var(--gray-200)',
            display: 'none',
          }}
        >
          <div style={{ textAlign: 'center', width: '100%', marginBottom: 20 }}>
            <div style={{ fontSize: 60, marginBottom: 14 }}>🚀</div>
            <div style={{
              background: 'rgba(37,99,235,0.08)', borderRadius: 12,
              padding: '12px 14px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', fontFamily: 'var(--font-display)' }}>
                On registering, you can
              </div>
            </div>
          </div>
          {[
            '✅ Build your profile and let recruiters find you',
            '✅ Get job postings delivered right to your email',
            '✅ Find a job and grow your career',
            '✅ Access lakhs of job opportunities',
          ].map((item, i) => (
            <div key={i} style={{ fontSize: 13, color: 'var(--gray-700)', marginBottom: 14, lineHeight: 1.5 }}>
              {item}
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div
          className="register-right-panel"
          style={{ flex: 1, background: 'var(--white)', padding: '28px 20px' }}
        >
          {/* Mobile benefit strip */}
          <div style={{
            display: 'none',
            background: 'var(--naukri-blue-light)',
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 18,
            border: '1px solid rgba(37,99,235,0.15)',
          }}
            className="register-mobile-benefits"
          >
            <style>{`
              @media (max-width: 699px) { .register-mobile-benefits { display: block !important; } }
            `}</style>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--naukri-blue-dark)', marginBottom: 8 }}>
              🚀 On registering, you can
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 10px' }}>
              {['✅ Profile for recruiters', '✅ Job alerts on email', '✅ Grow your career', '✅ Lakhs of jobs'].map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: 'var(--gray-700)' }}>{item}</div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: 16, fontSize: 13, color: 'var(--gray-500)' }}>
            Already Registered?{' '}
            <Link to="/login" style={{ color: 'var(--naukri-blue-dark)', fontWeight: 600 }}>
              Login here
            </Link>
          </div>

          <h1 style={{
            fontSize: 20, fontWeight: 700, color: 'var(--gray-900)',
            fontFamily: 'var(--font-display)', marginBottom: 4,
          }}>
            Create your HireX profile
          </h1>
          <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 18 }}>
            Search & apply to jobs from India's No.1 Job Site
          </p>

          {error && <div className="alert alert-error">{error}</div>}

          {/* Role Toggle */}
          <div style={{
            display: 'flex', background: 'var(--gray-100)',
            borderRadius: 8, padding: 4, marginBottom: 18,
          }}>
            {[{ value: 'JOBSEEKER', label: '👤 Job Seeker' }, { value: 'MANAGER', label: '🏢 Recruiter' }].map(opt => (
              <label key={opt.value} style={{
                flex: 1, textAlign: 'center', padding: '9px 10px',
                borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: form.role === opt.value ? 'var(--white)' : 'transparent',
                color: form.role === opt.value ? 'var(--naukri-orange)' : 'var(--gray-500)',
                boxShadow: form.role === opt.value ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s',
              }}>
                <input type="radio" name="role" value={opt.value}
                  checked={form.role === opt.value} onChange={onChange} style={{ display: 'none' }} />
                {opt.label}
              </label>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full name *</label>
              <input name="name" value={form.name} onChange={onChange}
                placeholder="What is your name?" required style={{ borderRadius: 6 }} />
            </div>

            <div className="form-group">
              <label>Email ID *</label>
              <input type="email" name="email" value={form.email} onChange={onChange}
                placeholder="Tell us your Email ID" required style={{ borderRadius: 6 }} />
              <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>
                We'll send relevant jobs and updates to this email
              </div>
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input type="password" name="password" value={form.password} onChange={onChange}
                placeholder="(Minimum 6 characters)" required style={{ borderRadius: 6 }} />
            </div>

            <div className="form-group">
              <label>Mobile number *</label>
              <div style={{ display: 'flex', gap: 0, border: '1.5px solid var(--gray-200)', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ padding: '10px 12px', background: 'var(--gray-50)', borderRight: '1px solid var(--gray-200)', fontSize: 14, fontWeight: 600, color: 'var(--gray-600)', flexShrink: 0 }}>
                  +91
                </div>
                <input name="phone" value={form.phone} onChange={onChange}
                  placeholder="Enter your mobile number" type="tel"
                  style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 12px', fontSize: 14, borderRadius: 0, minWidth: 0 }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>
                Recruiters will contact you on this number
              </div>
            </div>

            <button type="submit" className="btn btn-primary"
              style={{ width: '100%', marginTop: 4, borderRadius: 6 }} disabled={loading}>
              {loading ? 'Creating account...' : 'Register now'}
            </button>
          </form>

          <div style={{ margin: '16px 0', textAlign: 'center', position: 'relative' }}>
            <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)' }} />
            <span style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#fff', padding: '0 12px', fontSize: 12, color: 'var(--gray-400)',
            }}>Or</span>
          </div>

          <button style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            border: '1.5px solid var(--gray-200)', borderRadius: 24,
            padding: '10px', background: 'transparent', cursor: 'pointer',
            fontSize: 14, fontWeight: 600, color: 'var(--gray-700)',
            fontFamily: 'var(--font-body)',
          }}>
            <span style={{ fontSize: 18 }}>G</span> Continue with Google
          </button>

          <p style={{ textAlign: 'center', marginTop: 14, fontSize: 11, color: 'var(--gray-400)', lineHeight: 1.6 }}>
            By clicking Register, you agree to the{' '}
            <span style={{ color: 'var(--naukri-blue-dark)', cursor: 'pointer' }}>Terms and Conditions</span>{' '}
            &{' '}
            <span style={{ color: 'var(--naukri-blue-dark)', cursor: 'pointer' }}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
