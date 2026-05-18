import { useFetch } from '../../hooks/useHooks';
import StatusBadge from '../../components/common/StatusBadge';

export default function MyApplications() {
  const { data: apps, loading } = useFetch('/jobseeker/applications');

  if (loading) return <div className="loading">Loading applications...</div>;

  return (
    <div className="main-content">
      <div className="page-header">
        <h1>My Applications</h1>
        <p>Track all your job applications in one place</p>
      </div>

      {apps?.length === 0 && (
        <div className="empty">
          <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
          <div style={{ fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>No applications yet</div>
          <div style={{ fontSize: 13 }}>Browse jobs and start applying to see them here.</div>
        </div>
      )}

      {apps?.length > 0 && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Applied On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {apps.map(app => (
                  <tr key={app.id}>
                    <td style={{ fontWeight: 600, color: 'var(--brand-blue)' }}>{app.jobTitle}</td>
                    <td style={{ color: 'var(--gray-600)' }}>{app.companyName}</td>
                    <td style={{ color: 'var(--gray-400)', fontSize: 13 }}>
                      {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      }) : '-'}
                    </td>
                    <td><StatusBadge status={app.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
