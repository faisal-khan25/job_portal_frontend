import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FEATURES = [
  {
    icon: '🔍',
    title: 'Smart Job Search',
    desc: 'Search across thousands of live job listings by title, skills, or location with instant keyword filtering.',
  },
  {
    icon: '📋',
    title: 'One-Click Apply',
    desc: 'Submit applications with a personalised cover letter and track every application in real time.',
  },
  {
    icon: '📊',
    title: 'Built-in ATS',
    desc: 'Recruiters can shortlist, reject, or hire candidates directly from a clean applicant tracking dashboard.',
  },
];

const STATS = [
  { num: '50K+', label: 'Jobs Posted' },
  { num: '2L+',  label: 'Job Seekers' },
  { num: '10K+', label: 'Recruiters' },
  { num: '95%',  label: 'Placement Rate' },
];

const TOP_COMPANIES = [
  'TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra', 'Cognizant',
];

const JOB_CATEGORIES = [
  { icon: '💻', label: 'Software Dev', count: '12,400+' },
  { icon: '📈', label: 'Sales & Mktg', count: '4,200+' },
  { icon: '🎨', label: 'Design & UX', count: '2,800+' },
  { icon: '📊', label: 'Data & Analytics', count: '6,100+' },
  { icon: '☁️', label: 'Cloud & DevOps', count: '3,500+' },
  { icon: '🏦', label: 'Finance & BFSI', count: '5,700+' },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      {/* ===== HERO ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 50%, #1d4ed8 100%)',
        color: '#fff',
        padding: '64px 24px 52px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative circles */}
        <div style={{
          position: 'absolute', top: -80, right: -80, width: 320, height: 320,
          borderRadius: '50%', background: 'rgba(255,255,255,0.04)',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -60, width: 220, height: 220,
          borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
        }} />

        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '20px',
              padding: '5px 14px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.5px',
              marginBottom: 20,
              textTransform: 'uppercase',
            }}>
              India's #1 Job Platform
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 44,
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: 16,
              letterSpacing: '-0.5px',
            }}>
              Find Your Next<br />
              <span style={{ color: '#93c5fd' }}>Dream Job</span>
            </h1>

            <p style={{ fontSize: 16, opacity: 0.8, marginBottom: 36, lineHeight: 1.7 }}>
              HireX connects talented professionals with top companies across India. Browse lakhs of jobs and apply in minutes.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/jobs" className="btn btn-lg" style={{
                background: '#ff6524',
                color: '#fff',
                border: 'none',
                boxShadow: '0 4px 14px rgba(255,101,36,0.4)',
              }}>
                Browse Jobs
              </Link>
              {!user && (
                <Link to="/register" className="btn btn-lg" style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                }}>
                  Upload Resume
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--gray-200)', padding: '20px 24px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--brand-red)', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== JOB CATEGORIES ===== */}
      <section style={{ padding: '52px 24px 40px', background: 'var(--gray-50)' }}>
        <div className="container">
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 6 }}>
            Browse by Category
          </h2>
          <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 28 }}>
            Explore jobs across the most in-demand fields
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {JOB_CATEGORIES.map((cat, i) => (
              <Link to="/jobs" key={i} style={{
                background: '#fff',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-md)',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                transition: 'all 0.18s',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--brand-red)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--gray-200)';
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              >
                <span style={{ fontSize: 28 }}>{cat.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)' }}>{cat.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--brand-red)', marginTop: 2, fontWeight: 500 }}>{cat.count} jobs</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY HIREX ===== */}
      <section style={{ padding: '52px 24px', background: '#fff' }}>
        <div className="container">
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 6, textAlign: 'center' }}>
            Why Choose HireX?
          </h2>
          <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 36, textAlign: 'center' }}>
            Everything you need to land your next role
          </p>

          <div className="grid-3">
            {FEATURES.map((f, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '28px 24px' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '14px',
                  background: 'var(--brand-red-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, margin: '0 auto 16px',
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOP COMPANIES ===== */}
      <section style={{ padding: '40px 24px', background: 'var(--gray-50)', borderTop: '1px solid var(--gray-200)' }}>
        <div className="container">
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-800)', marginBottom: 20, textAlign: 'center' }}>
            Top Hiring Companies
          </h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {TOP_COMPANIES.map((c, i) => (
              <div key={i} style={{
                background: '#fff',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius)',
                padding: '10px 22px',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--gray-700)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RECRUITER CTA ===== */}
      {!user && (
        <section style={{
          background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
          padding: '56px 24px',
          textAlign: 'center',
        }}>
          <div className="container">
            <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 10, fontFamily: 'var(--font-display)' }}>
              Are you a Recruiter?
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 28, maxWidth: 420, margin: '0 auto 28px' }}>
              Post jobs and find the best talent in India with our powerful ATS dashboard. Free to get started.
            </p>
            <Link to="/register" className="btn btn-lg" style={{
              background: 'var(--brand-red)',
              color: '#fff',
              border: 'none',
              boxShadow: '0 4px 14px rgba(255,101,36,0.4)',
            }}>
              Register as Recruiter →
            </Link>
          </div>
        </section>
      )}

      {/* ===== FOOTER ===== */}
      <footer style={{
        background: '#111827',
        color: 'rgba(255,255,255,0.45)',
        textAlign: 'center',
        padding: '20px 24px',
        fontSize: 13,
      }}>
        © 2025 HireX · India's Premier Job Platform
      </footer>
    </div>
  );
}
