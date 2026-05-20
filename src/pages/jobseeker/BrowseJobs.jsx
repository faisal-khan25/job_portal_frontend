import { useState } from 'react';
import { useFetch } from '../../hooks/useHooks';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const QUICK_FILTERS = ['Full Time', 'Remote', 'Fresher', '0-1 Years', '1-3 Years', 'Work From Home'];

export default function BrowseJobs() {
  const { user } = useAuth();
  const [keyword, setKeyword] = useState('');
  const [searched, setSearched] = useState('');
  const [applyModal, setApplyModal] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [applyMsg, setApplyMsg] = useState('');

  const url = searched ? `/api/jobs/browse?keyword=${searched}` : '/api/jobs/browse';
  const { data: jobs, loading } = useFetch(url, [searched]);

  const handleSearch = (e) => { e.preventDefault(); setSearched(keyword); };
  const handleApply = async () => {
    try {
      const res = await api.post(`/api/jobseeker/apply/${applyModal.id}`, { coverLetter });
      setApplyMsg(res.data);
    } catch (e) {
      setApplyMsg(e.response?.data?.error || 'Failed to apply');
    }
  };

  return (
    <div className="main-content">
      {/* Header */}
      <div className="page-header">
        <h1>Browse Jobs</h1>
        <p>{jobs?.length || 0} jobs available{searched ? ` for "${searched}"` : ''}</p>
      </div>

      {/* Search bar — Naukri style */}
      <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
        <div style={{
          background: 'var(--white)',
          border: '1.5px solid var(--gray-200)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          padding: '4px 4px 4px 16px',
          boxShadow: 'var(--shadow-sm)',
          transition: 'border-color 0.18s',
        }}
        onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--naukri-blue-dark)'}
        onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}>
          <span style={{ color: 'var(--gray-400)', marginRight: 8, fontSize: 16 }}>🔍</span>
          <input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Search by job title, skill, or keyword..."
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, background: 'transparent', fontFamily: 'var(--font-body)' }}
          />
          {searched && (
            <button type="button" onClick={() => { setSearched(''); setKeyword(''); }}
              style={{ background: 'none', color: 'var(--gray-400)', fontSize: 18, padding: '0 8px', lineHeight: 1 }}>
              ×
            </button>
          )}
          <button type="submit" className="btn btn-secondary btn-sm" style={{ borderRadius: 6, padding: '8px 20px' }}>
            Search
          </button>
        </div>
      </form>

      {/* Quick filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {QUICK_FILTERS.map((f, i) => (
          <button key={i} onClick={() => { setKeyword(f); setSearched(f); }}
            style={{
              padding: '5px 14px', background: 'var(--white)',
              border: '1px solid var(--gray-200)', borderRadius: 24,
              fontSize: 12, color: 'var(--gray-600)', cursor: 'pointer',
              fontFamily: 'var(--font-body)', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--naukri-blue-dark)'; e.currentTarget.style.color = 'var(--naukri-blue-dark)'; e.currentTarget.style.background = 'var(--naukri-blue-light)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.color = 'var(--gray-600)'; e.currentTarget.style.background = 'var(--white)'; }}>
            {f}
          </button>
        ))}
      </div>

      {loading && <div className="loading">Fetching jobs...</div>}

      {!loading && jobs?.length === 0 && (
        <div className="empty">
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <div style={{ fontWeight: 600, color: 'var(--gray-700)', marginBottom: 4 }}>No jobs found</div>
          <div style={{ fontSize: 13 }}>Try a different keyword or clear filters</div>
        </div>
      )}

      {/* Jobs Grid */}
      <div className="grid-2" style={{ gap: 12 }}>
        {jobs?.map(job => (
          <div key={job.id} className="job-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{
                width: 46, height: 46, borderRadius: 8,
                background: 'var(--naukri-blue-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0, border: '1px solid rgba(37,99,235,0.15)',
              }}>
                🏢
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, color: 'var(--naukri-green)',
                background: 'var(--naukri-green-light)',
                padding: '3px 10px', borderRadius: 24,
                border: '1px solid rgba(22,163,74,0.2)',
              }}>
                Actively Hiring
              </span>
            </div>

            <div className="job-title">{job.title}</div>
            <div className="job-company">
              <span>🏢</span>{job.companyName}
              <span style={{
                fontSize: 11, background: '#fef9ee', color: '#d97706',
                padding: '2px 6px', borderRadius: 4, marginLeft: 4,
                fontWeight: 600,
              }}>★ 4.2</span>
            </div>

            <div className="job-meta">
              <span><i className="bi bi-geo-alt" style={{ color: 'var(--naukri-blue-dark)' }}></i> {job.location || 'Remote'}</span>
              <span><i className="bi bi-currency-rupee" style={{ color: 'var(--naukri-green)' }}></i> {job.salary || 'Not disclosed'}</span>
              <span><i className="bi bi-briefcase" style={{ color: 'var(--gray-400)' }}></i> {job.jobType || 'Full Time'}</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {job.skills?.split(',').slice(0, 4).map((s, i) => (
                <span key={i} className="skill-tag">{s.trim()}</span>
              ))}
            </div>

            <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 14 }}>
              {job.description?.slice(0, 110)}...
            </p>

           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
  {user?.role === 'JOBSEEKER' ? (
    <button className="btn btn-outline-blue btn-sm"
      onClick={() => { setApplyModal(job); setApplyMsg(''); setCoverLetter(''); }}>
      Apply Now
    </button>
  ) : <span />}
  <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>Just now</span>
</div>
          </div>
        ))}
      </div>

      {/* Apply Modal */}
      {applyModal && (
        <div className="modal-overlay" onClick={() => setApplyModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 46, height: 46, background: 'var(--naukri-blue-light)',
                borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>🏢</div>
              <div>
                <h2 style={{ marginBottom: 2 }}>{applyModal.title}</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: 13 }}>{applyModal.companyName}</p>
              </div>
              <button onClick={() => setApplyModal(null)}
                style={{ marginLeft: 'auto', background: 'none', fontSize: 22, color: 'var(--gray-400)', lineHeight: 1 }}>×</button>
            </div>
            <hr className="section-divider" />
            {applyMsg ? (
              <div className={`alert ${applyMsg.toLowerCase().includes('success') || applyMsg.toLowerCase().includes('applied') ? 'alert-success' : 'alert-error'}`}>
                {applyMsg}
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label>Cover Letter <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>(optional)</span></label>
                  <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)}
                    placeholder="Tell the recruiter why you're a great fit for this role..." rows={5} />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-primary" onClick={handleApply}>Submit Application</button>
                  <button className="btn btn-outline" onClick={() => setApplyModal(null)}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
