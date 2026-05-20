import { useState } from 'react';
import { useFetch } from '../../hooks/useHooks';
import StatusBadge from '../../components/common/StatusBadge';
import api from '../../services/api';

const STATUS_OPTIONS = ['APPLIED', 'SHORTLISTED', 'REJECTED', 'HIRED'];

export default function Applicants() {
  const { data: jobs, loading } = useFetch('/api/manager/jobs');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loadingApps, setLoadingApps] = useState(false);

  const loadApplicants = async (job) => {
    setSelectedJob(job);
    setLoadingApps(true);
    try {
      const res = await api.get(`/api/manager/jobs/${job.id}/applicants`);
      setApplicants(res.data);
    } catch {
      setApplicants([]);
    } finally {
      setLoadingApps(false);
    }
  };

  const updateStatus = async (appId, status) => {
    await api.put(`/api/manager/applications/${appId}/status`, { status });
    const res = await api.get(`/api/manager/jobs/${selectedJob.id}/applicants`);
    setApplicants(res.data);
  };

  if (loading) return <div className="loading">Loading jobs...</div>;

  return (
    <div className="layout">

      {/* 🌈 FULL COLOR STYLE */}
      <style>{`
        body {
          margin: 0;
          font-family: Arial;
          background: linear-gradient(135deg, #eef2ff, #f8fafc);
        }

        /* LAYOUT */
        .layout {
          display: flex;
          min-height: 100vh;
        }

        /* SIDEBAR */
        .sidebar {
          width: 260px;
          background: linear-gradient(180deg, #4f46e5, #06b6d4, #10b981);
          padding: 20px;
          color: white;
          position: fixed;
          height: 100%;
        }

        .logo {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 30px;
        }

        .job-card {
          background: rgba(255,255,255,0.15);
          padding: 12px;
          border-radius: 12px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: 0.3s;
          backdrop-filter: blur(10px);
        }

        .job-card:hover {
          transform: translateX(5px);
          background: rgba(255,255,255,0.25);
        }

        .job-active {
          background: white;
          color: #4f46e5;
        }

        /* MAIN */
        .main {
          margin-left: 260px;
          padding: 25px;
          width: 100%;
        }

        /* HEADER */
        .page-header h1 {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(90deg, #6366f1, #06b6d4, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .page-header p {
          color: #6b7280;
        }

        /* CARD */
        .card {
          background: white;
          padding: 18px;
          border-radius: 16px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
          margin-bottom: 12px;
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 40px rgba(99,102,241,0.15);
        }

        /* AVATAR */
        .avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        }

        /* COVER LETTER */
        .cover {
          background: linear-gradient(90deg, #f1f5f9, #e0f2fe);
          border-left: 4px solid #6366f1;
          padding: 10px 14px;
          border-radius: 10px;
          font-style: italic;
          color: #475569;
        }

        /* BUTTONS */
        .btn {
          padding: 6px 10px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: 0.2s;
        }

        .btn-sm {
          font-size: 12px;
        }

        .btn-outline {
          background: white;
          border: 1px solid #d1d5db;
        }

        .btn-danger {
          background: linear-gradient(90deg, #ef4444, #f97316);
          color: white;
        }

        .btn-success {
          background: linear-gradient(90deg, #10b981, #22c55e);
          color: white;
        }

        .btn-secondary {
          background: linear-gradient(90deg, #6366f1, #06b6d4);
          color: white;
        }

        /* STATUS AREA */
        .status-box {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        /* EMPTY */
        .empty {
          text-align: center;
          padding: 50px;
          background: white;
          border-radius: 16px;
        }

        /* LOADING */
        .loading {
          text-align: center;
          padding: 20px;
          color: #4f46e5;
          font-weight: bold;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .layout {
            flex-direction: column;
          }

          .sidebar {
            position: relative;
            width: 100%;
            height: auto;
          }

          .main {
            margin-left: 0;
          }
        }
      `}</style>

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="logo">🚀 ATS Dashboard</div>

        <div>
          <h4 style={{ marginBottom: 10 }}>Your Jobs</h4>

          {jobs?.map(job => (
            <div
              key={job.id}
              className={`job-card ${selectedJob?.id === job.id ? 'job-active' : ''}`}
              onClick={() => loadApplicants(job)}
            >
              <div style={{ fontWeight: 700 }}>{job.title}</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>
                📍 {job.location}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        <div className="page-header">
          <h1>Applicant Tracker</h1>
          <p>Manage and filter job applicants easily</p>
        </div>

        {!selectedJob && (
          <div className="empty">👈 Select a job to view applicants</div>
        )}

        {selectedJob && (
          <>
            <h3 style={{ marginBottom: 15 }}>
              {selectedJob.title} Applicants
            </h3>

            {loadingApps && <div className="loading">Loading...</div>}

            {applicants?.map(app => (
              <div key={app.id} className="card">

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <div className="avatar">
                      {app.applicantName?.[0]}
                    </div>

                    <div>
                      <div style={{ fontWeight: 700 }}>{app.applicantName}</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>
                        {app.applicantEmail}
                      </div>
                    </div>
                  </div>

                  <StatusBadge status={app.status} />
                </div>

                {app.coverLetter && (
                  <div className="cover" style={{ marginTop: 10 }}>
                    "{app.coverLetter}"
                  </div>
                )}

                {/* ACTIONS */}
                <div className="status-box" style={{ marginTop: 12 }}>
                  {STATUS_OPTIONS.filter(s => s !== app.status).map(s => (
                    <button
                      key={s}
                      className={`btn btn-sm ${
                        s === 'REJECTED' ? 'btn-danger' :
                        s === 'HIRED' ? 'btn-success' :
                        s === 'SHORTLISTED' ? 'btn-secondary' :
                        'btn-outline'
                      }`}
                      onClick={() => updateStatus(app.id, s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>

              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
}