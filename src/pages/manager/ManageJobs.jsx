import { useState, useEffect } from 'react';
import { useFetch, useForm } from '../../hooks/useHooks';
import api from '../../services/api';

const emptyJob = {
  title: '',
  description: '',
  skills: '',
  salary: '',
  location: '',
  jobType: 'Full Time'
};

export default function ManageJobs() {

  // FETCH JOBS
  const { data, loading } = useFetch('/api/manager/jobs');

  // LOCAL STATE
  const [jobs, setJobs] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const { form, setForm, onChange, reset } = useForm(emptyJob);

  // SYNC FETCHED DATA
  useEffect(() => {
    setJobs(data || []);
  }, [data]);

  // OPEN NEW FORM
  const openNew = () => {
    reset();
    setEditingId(null);
    setShowForm(true);
    setError('');
  };

  // OPEN EDIT FORM
  const openEdit = (job) => {
    setForm({ ...job });
    setEditingId(job.id);
    setShowForm(true);
    setError('');
  };

  // SAVE JOB
  const handleSave = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await api.put(
          `/api/manager/jobs/${editingId}`,
          form
        );

        // UPDATE UI
        setJobs(prev =>
          prev.map(job =>
            job.id === editingId
              ? { ...form, id: editingId }
              : job
          )
        );

      } else {

        const res = await api.post(
          '/api/manager/jobs',
          form
        );

        // ADD NEW JOB TO UI
        setJobs(prev => [
          res.data,
          ...prev
        ]);
      }

      setShowForm(false);

    } catch (e) {

      setError(
        e.response?.data?.error ||
        'Failed to save job'
      );
    }
  };

  // DELETE JOB
  const handleDelete = async (id) => {

    if (!window.confirm(
      'Remove this job posting?'
    )) {
      return;
    }

    try {

      await api.delete(
        `api/manager/jobs/${id}`
      );

      // REMOVE FROM FRONTEND
      setJobs(prev =>
        prev.filter(job => job.id !== id)
      );

    } catch (error) {

      console.error(error);

      alert('Delete failed');
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="loading">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="main-content">

      {/* CSS */}
      <style>{`

        body {
          margin: 0;
          font-family: Arial;
          background: linear-gradient(
            135deg,
            #eef2ff,
            #f8fafc
          );
        }

        .main-content {
          padding: 25px;
          max-width: 1100px;
          margin: auto;
        }

        /* HEADER */

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .page-header h1 {
          font-size: 30px;
          font-weight: 800;

          background: linear-gradient(
            90deg,
            #6366f1,
            #06b6d4,
            #10b981
          );

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .page-header p {
          color: #6b7280;
        }

        /* BUTTONS */

        .btn {
          padding: 10px 14px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: 0.3s;
        }

        .btn-primary {
          background: linear-gradient(
            90deg,
            #6366f1,
            #06b6d4
          );

          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);

          box-shadow:
            0 10px 20px rgba(
              99,
              102,
              241,
              0.3
            );
        }

        .btn-outline {
          background: white;
          border: 1px solid #d1d5db;
        }

        .btn-danger {
          background: linear-gradient(
            90deg,
            #ef4444,
            #f97316
          );

          color: white;
        }

        .btn-sm {
          font-size: 12px;
          padding: 6px 10px;
        }

        /* JOB CARD */

        .job-card {
          background: white;
          padding: 18px;
          border-radius: 16px;
          margin-bottom: 12px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          box-shadow:
            0 10px 25px rgba(
              0,
              0,
              0,
              0.08
            );

          transition: 0.3s;
        }

        .job-card:hover {
          transform: translateY(-4px);

          box-shadow:
            0 15px 30px rgba(
              99,
              102,
              241,
              0.15
            );
        }

        .job-title {
          font-weight: 700;
          font-size: 15px;
        }

        .job-meta {
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        .skill-tag {
          background: linear-gradient(
            90deg,
            #e0e7ff,
            #dbeafe
          );

          color: #3730a3;

          padding: 4px 8px;

          border-radius: 20px;

          font-size: 11px;

          margin-right: 5px;
        }

        /* EMPTY */

        .empty {
          text-align: center;
          padding: 50px;
          background: white;
          border-radius: 16px;

          box-shadow:
            0 10px 25px rgba(
              0,
              0,
              0,
              0.05
            );
        }

        /* MODAL */

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;

          width: 100%;
          height: 100%;

          background: rgba(0,0,0,0.5);

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          background: white;
          padding: 20px;
          border-radius: 16px;
          width: 520px;

          animation: pop 0.2s ease;
        }

        @keyframes pop {

          from {
            transform: scale(0.9);
            opacity: 0;
          }

          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        input,
        textarea,
        select {

          width: 100%;

          padding: 10px;

          margin-top: 6px;

          border-radius: 8px;

          border: 1px solid #ddd;
        }

        label {
          font-weight: 600;
          font-size: 13px;
          color: #374151;
        }

        .form-group {
          margin-bottom: 12px;
        }

      `}</style>

      {/* HEADER */}

      <div className="header">

        <div className="page-header">
          <h1>Job Postings</h1>
          <p>
            {jobs?.length || 0} active jobs
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={openNew}
        >
          + Post Job
        </button>

      </div>

      {/* JOB LIST */}

      {jobs?.length === 0 ? (

        <div className="empty">

          <h3>No jobs found</h3>

          <p>
            Create your first job posting
          </p>

          <button
            className="btn btn-primary"
            onClick={openNew}
          >
            Post Job
          </button>

        </div>

      ) : (

        jobs?.map(job => (

          <div
            className="job-card"
            key={job.id}
          >

            <div>

              <div className="job-title">
                {job.title}
              </div>

              <div className="job-meta">
                📍 {job.location}
                {' · '}
                💰 {job.salary}
                {' · '}
                🕒 {job.jobType}
              </div>

              <div style={{ marginTop: 6 }}>

                {job.skills
                  ?.split(',')
                  .map((s, i) => (

                    <span
                      key={i}
                      className="skill-tag"
                    >
                      {s}
                    </span>

                  ))}

              </div>

            </div>

            <div
              style={{
                display: 'flex',
                gap: 8
              }}
            >

              <button
                className="btn btn-outline btn-sm"
                onClick={() => openEdit(job)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(job.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))
      )}

      {/* MODAL */}

      {showForm && (

        <div
          className="modal-overlay"
          onClick={() => setShowForm(false)}
        >

          <div
            className="modal"
            onClick={e => e.stopPropagation()}
          >

            <h2>
              {editingId
                ? 'Edit Job'
                : 'Post New Job'}
            </h2>

            {error && (
              <p style={{ color: 'red' }}>
                {error}
              </p>
            )}

            <form onSubmit={handleSave}>

              <div className="form-group">
                <label>Title</label>

                <input
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>

                <input
                  name="location"
                  value={form.location}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label>Salary</label>

                <input
                  name="salary"
                  value={form.salary}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label>Job Type</label>

                <select
                  name="jobType"
                  value={form.jobType}
                  onChange={onChange}
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>

              <div className="form-group">
                <label>Skills</label>

                <input
                  name="skills"
                  value={form.skills}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  rows={4}
                />
              </div>

              <button
                className="btn btn-primary"
                type="submit"
              >
                {editingId
                  ? 'Update'
                  : 'Post'}
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}