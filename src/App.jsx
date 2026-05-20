import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BrowseJobs from './pages/jobseeker/BrowseJobs';
import MyApplications from './pages/jobseeker/MyApplications';
import MyProfile from './pages/jobseeker/MyProfile';
import CompanyProfile from './pages/manager/CompanyProfile';
import ManageJobs from './pages/manager/ManageJobs';
import Applicants from './pages/manager/Applicants';
import AdminDashboard from './pages/admin/AdminDashboard';

// layouts
import JobSeekerLayout from './components/jobseeker/JobSeekerLayout';
import ManagerLayout from './components/manager/ManagerLayout';
import AdminLayout from './components/admin/AdminLayout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<BrowseJobs />} />

          {/* jobseeker routes */}
          <Route path="/jobseeker/*" element={
            <ProtectedRoute role="JOBSEEKER">
              <JobSeekerLayout>
                <Routes>
                  <Route path="browse" element={<BrowseJobs />} />
                  <Route path="applications" element={<MyApplications />} />
                  <Route path="profile" element={<MyProfile />} />
                  <Route path="*" element={<Navigate to="browse" />} />
                </Routes>
              </JobSeekerLayout>
            </ProtectedRoute>
          } />

          {/* manager routes */}
          <Route path="/manager/*" element={
            <ProtectedRoute role="MANAGER">
              <ManagerLayout>
                <Routes>
                  <Route path="company" element={<CompanyProfile />} />
                  <Route path="jobs" element={<ManageJobs />} />
                  <Route path="applicants" element={<Applicants />} />
                  <Route path="*" element={<Navigate to="jobs" />} />
                </Routes>
              </ManagerLayout>
            </ProtectedRoute>
          } />

          {/* admin routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="*" element={<Navigate to="dashboard" />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
