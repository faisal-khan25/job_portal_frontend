import { useFetch } from '../../hooks/useHooks';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend
} from 'recharts';

export default function AdminDashboard() {
  const { data: stats, loading } = useFetch('/api/admin/dashboard');

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (!stats) return null;

  const STAT_CARDS = [
    { num: stats.totalJobSeekers, label: 'Job Seekers', icon: '👤', color: 'var(--brand-blue)', bg: 'var(--brand-blue-light)' },
    { num: stats.totalManagers,   label: 'Recruiters',  icon: '🏢', color: '#7c3aed',           bg: '#f5f3ff' },
    { num: stats.totalJobs,       label: 'Jobs Posted', icon: '💼', color: 'var(--brand-green)', bg: 'var(--brand-green-light)' },
    { num: stats.totalApplications, label: 'Applications', icon: '📋', color: 'var(--brand-red)', bg: 'var(--brand-red-light)' },
  ];

  return (
    <div className="main-content">
      <div className="page-header">
        <h1>Growth Dashboard</h1>
        <p>Platform-wide analytics and trends</p>
      </div>

      {/* Stat Cards */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        {STAT_CARDS.map((s, i) => (
          <div key={i} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: s.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>
                {s.icon}
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 4 }}>
              {s.num}
            </div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ alignItems: 'flex-start', marginBottom: 20 }}>
        {/* Monthly Recruiter Growth */}
        <div className="card">
          <h3 style={{ marginBottom: 16, fontSize: 14, fontWeight: 700 }}>Monthly Recruiter Growth</h3>
          {stats.monthlyGrowth?.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={stats.monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="managers"
                  stroke="var(--brand-red)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="New Recruiters"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty" style={{ padding: '40px 0' }}>No data yet</div>
          )}
        </div>

        {/* Company-wise Applications */}
        <div className="card">
          <h3 style={{ marginBottom: 16, fontSize: 14, fontWeight: 700 }}>Company-wise Applications</h3>
          {stats.companyHiringTrends?.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats.companyHiringTrends} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="company" type="category" tick={{ fontSize: 11 }} width={90} />
                <Tooltip />
                <Bar dataKey="applications" fill="var(--brand-red)" radius={[0, 4, 4, 0]} name="Applications" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty" style={{ padding: '40px 0' }}>No hiring data yet</div>
          )}
        </div>
      </div>

      {/* Companies Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-100)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700 }}>Hiring Trends by Company</h3>
        </div>
        {stats.companyHiringTrends?.length === 0 ? (
          <div className="empty">No data available</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company</th>
                  <th>Total Applications</th>
                </tr>
              </thead>
              <tbody>
                {stats.companyHiringTrends?.map((row, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--gray-400)', fontWeight: 600 }}>{i + 1}</td>
                    <td style={{ fontWeight: 600 }}>{row.company}</td>
                    <td>
                      <span className="badge badge-orange">{row.applications}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
