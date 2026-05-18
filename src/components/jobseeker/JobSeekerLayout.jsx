import { NavLink } from 'react-router-dom';

export default function JobSeekerLayout({ children }) {
  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-section-label">
          Job Seeker
        </div>

        <NavLink
          to="/jobseeker/browse"
          className={({ isActive }) =>
            isActive ? 'sidebar-link active' : 'sidebar-link'
          }
        >
          <span>🔍</span>
          <span>Browse Jobs</span>
        </NavLink>

        <NavLink
          to="/jobseeker/applications"
          className={({ isActive }) =>
            isActive ? 'sidebar-link active' : 'sidebar-link'
          }
        >
          <span>📋</span>
          <span>Applications</span>
        </NavLink>

        <NavLink
          to="/jobseeker/profile"
          className={({ isActive }) =>
            isActive ? 'sidebar-link active' : 'sidebar-link'
          }
        >
          <span>👤</span>
          <span>Profile</span>
        </NavLink>

      </aside>

      {/* MAIN CONTENT */}
      <div className="dashboard-main">
        {children}
      </div>

    </div>
  );
}