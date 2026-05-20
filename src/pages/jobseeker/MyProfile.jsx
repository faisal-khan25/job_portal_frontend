import { useState, useEffect } from 'react';
import { useFetch, useForm } from '../../hooks/useHooks';
import api from '../../services/api';

export default function MyProfile() {
  const { data: profile, loading } = useFetch('/api/jobseeker/profile');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { form, setForm, onChange } = useForm({
    skills: '', experience: '', resumeUrl: '', bio: '', location: '', education: ''
  });

  useEffect(() => {
    if (profile) setForm(prev => ({ ...prev, ...profile }));
  // eslint-disable-next-line
  }, [profile]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/jobseeker/profile', form);
      setSuccess('Profile saved successfully!');
      setError('');
    } catch {
      setError('Failed to save profile');
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <div className="main-content">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Keep your profile updated to get better job recommendations</p>
      </div>

      <div className="card" style={{ maxWidth: 620 }}>
        {/* Profile completeness indicator */}
        <div style={{
          background: 'var(--brand-blue-light)',
          borderRadius: 'var(--radius)',
          padding: '12px 16px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span style={{ fontSize: 20 }}>💡</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand-blue)' }}>Complete your profile</div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>Profiles with all fields filled get 3x more views</div>
          </div>
        </div>

        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Skills <span style={{ color: 'var(--gray-400)', fontWeight: 400, fontSize: 12 }}>(comma separated)</span></label>
            <input
              name="skills"
              value={form.skills}
              onChange={onChange}
              placeholder="React, Java, MySQL, Node.js..."
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Experience</label>
              <input
                name="experience"
                value={form.experience}
                onChange={onChange}
                placeholder="2 years"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                name="location"
                value={form.location}
                onChange={onChange}
                placeholder="Hyderabad, India"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Education</label>
            <input
              name="education"
              value={form.education}
              onChange={onChange}
              placeholder="B.Tech Computer Science – JNTU Hyderabad"
            />
          </div>

          <div className="form-group">
            <label>Resume URL</label>
            <input
              name="resumeUrl"
              value={form.resumeUrl}
              onChange={onChange}
              placeholder="https://drive.google.com/..."
            />
          </div>

          <div className="form-group">
            <label>About Me</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={onChange}
              placeholder="A brief summary about yourself, your experience, and career goals..."
              rows={4}
            />
          </div>

          <button type="submit" className="btn btn-primary">Save Profile</button>
        </form>
      </div>
    </div>
  );
}
