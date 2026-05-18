import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashPath = {
    JOBSEEKER: '/jobseeker/browse',
    MANAGER: '/manager/jobs',
    ADMIN: '/admin/dashboard',
  };

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        {/* Logo */}
        <Link to="/" className="logo">
          Hire<span>X</span>
        </Link>

        {/* Nav links */}
        <div className="nav-links">
          {!user ? (
            <>
              <Link to="/jobs">Browse Jobs</Link>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          ) : (
            <>
              <span className="nav-user-info">Hi, {user.name}</span>
              <Link to={dashPath[user.role]}>Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
