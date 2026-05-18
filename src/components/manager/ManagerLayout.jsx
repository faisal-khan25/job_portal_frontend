import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ManagerLayout({ children }) {

  const { user } = useAuth();

  return (
    <div className="manager-layout">

      {/* SIDEBAR */}
      <aside className="manager-sidebar">

        {/* PROFILE CARD */}
        <div className="manager-profile-card">

          <div className="manager-avatar">
            {user?.name?.charAt(0).toUpperCase() || 'R'}
          </div>

          <div>
            <h4>
              {user?.name?.split(' ')[0]}
            </h4>

            <p>Recruiter</p>
          </div>

        </div>

        {/* TITLE */}
        <div className="sidebar-title">
          Recruiter Tools
        </div>

        {/* NAVIGATION */}

        <NavLink
          to="/manager/jobs"
          className={({ isActive }) =>
            isActive
              ? 'manager-link active'
              : 'manager-link'
          }
        >
          <span>💼</span>
          <span>Manage Jobs</span>
        </NavLink>

        <NavLink
          to="/manager/applicants"
          className={({ isActive }) =>
            isActive
              ? 'manager-link active'
              : 'manager-link'
          }
        >
          <span>👥</span>
          <span>Applicants</span>
        </NavLink>

        <NavLink
          to="/manager/company"
          className={({ isActive }) =>
            isActive
              ? 'manager-link active'
              : 'manager-link'
          }
        >
          <span>🏢</span>
          <span>Company Profile</span>
        </NavLink>

      </aside>

      {/* MAIN CONTENT */}
      <main className="manager-main">
        {children}
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="mobile-nav">

        <NavLink
          to="/manager/jobs"
          className={({ isActive }) =>
            isActive
              ? 'mobile-link active'
              : 'mobile-link'
          }
        >
          <span>💼</span>
          <small>Jobs</small>
        </NavLink>

        <NavLink
          to="/manager/applicants"
          className={({ isActive }) =>
            isActive
              ? 'mobile-link active'
              : 'mobile-link'
          }
        >
          <span>👥</span>
          <small>Applicants</small>
        </NavLink>

        <NavLink
          to="/manager/company"
          className={({ isActive }) =>
            isActive
              ? 'mobile-link active'
              : 'mobile-link'
          }
        >
          <span>🏢</span>
          <small>Company</small>
        </NavLink>

      </nav>

    </div>
  );
}