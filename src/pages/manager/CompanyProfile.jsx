import { useState, useEffect } from 'react';
import { useFetch, useForm } from '../../hooks/useHooks';
import api from '../../services/api';

export default function CompanyProfile() {
  const { data: company, loading } = useFetch('/api/manager/company');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { form, setForm, onChange } = useForm({
    name: '',
    description: '',
    website: '',
    location: '',
    industry: '',
    logoUrl: '',
    size: ''
  });

  useEffect(() => {
    if (company) setForm(prev => ({ ...prev, ...company, size: company.size || '' }));
  }, [company, setForm]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/manager/company', { ...form, size: Number(form.size) });
      setSuccess('Company profile saved successfully 🎉');
      setError('');
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to save company');
      setSuccess('');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="main-content">

      {/* 🔥 STYLES */}
      <style>{`
        body {
          background: linear-gradient(135deg, #eef2ff, #f8fafc);
        }

        .main-content {
          max-width: 900px;
          margin: auto;
          padding: 30px;
        }

        /* HEADER */
        .page-header h1 {
          font-size: 30px;
          font-weight: 800;
          background: linear-gradient(90deg, #6366f1, #06b6d4, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .page-header p {
          color: #6b7280;
          margin-bottom: 20px;
        }

        /* CARD */
        .card {
          background: white;
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
          border: 1px solid #eef2ff;
        }

        /* PREVIEW BANNER (DYNAMIC GRADIENT) */
        .preview-banner {
          background: linear-gradient(135deg, #4f46e5, #06b6d4, #10b981);
          background-size: 300% 300%;
          animation: gradientMove 6s ease infinite;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 16px;
          color: white;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .logo-box {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .company-name {
          font-size: 18px;
          font-weight: 700;
        }

        .company-meta {
          font-size: 13px;
          opacity: 0.8;
        }

        /* FORM */
        .form-group {
          margin-bottom: 16px;
        }

        label {
          font-weight: 600;
          font-size: 13px;
          color: #374151;
          display: block;
          margin-bottom: 6px;
        }

        input, textarea {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          outline: none;
          transition: 0.2s;
          font-size: 14px;
        }

        input:focus, textarea:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
        }

        /* GRID */
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        @media (max-width: 768px) {
          .grid-2 {
            grid-template-columns: 1fr;
          }
        }

        /* BUTTON */
        .btn {
          padding: 12px 16px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          transition: 0.3s;
        }

        .btn-primary {
          background: linear-gradient(90deg, #6366f1, #06b6d4);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(99,102,241,0.3);
        }

        /* ALERTS */
        .alert-success {
          background: #dcfce7;
          color: #166534;
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 10px;
        }

        .alert-error {
          background: #fee2e2;
          color: #991b1b;
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 10px;
        }

        .loading {
          text-align: center;
          padding: 30px;
          font-weight: 600;
          color: #6366f1;
        }
      `}</style>

      {/* HEADER */}
      <div className="page-header">
        <h1>Company Profile</h1>
        <p>Manage your company details and attract top talent</p>
      </div>

      {/* CARD */}
      <div className="card">

        {/* 🔥 DYNAMIC PREVIEW */}
        {form.name && (
          <div className="preview-banner">
            <div className="logo-box">🏢</div>
            <div>
              <div className="company-name">{form.name}</div>
              <div className="company-meta">
                {[form.industry, form.location].filter(Boolean).join(' • ')}
              </div>
            </div>
          </div>
        )}

        {success && <div className="alert-success">{success}</div>}
        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSave}>

          <div className="form-group">
            <label>Company Name *</label>
            <input name="name" value={form.name} onChange={onChange} required />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Industry</label>
              <input name="industry" value={form.industry} onChange={onChange} />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input name="location" value={form.location} onChange={onChange} />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Website</label>
              <input name="website" value={form.website} onChange={onChange} />
            </div>

            <div className="form-group">
              <label>Team Size</label>
              <input type="number" name="size" value={form.size} onChange={onChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Logo URL</label>
            <input name="logoUrl" value={form.logoUrl} onChange={onChange} />
          </div>

          <div className="form-group">
            <label>About Company</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              rows={4}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Save Profile
          </button>

        </form>
      </div>
    </div>
  );
}