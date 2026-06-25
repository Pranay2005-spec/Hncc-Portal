import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import DocumentsPage from './pages/DocumentsPage';
import RecheckingPage from './pages/RecheckingPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminAddResultPage from './pages/AdminAddResultPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import { usePortal } from './context/PortalContext';

function RequireAdmin({ children }) {
  const { isAdminLoggedIn } = usePortal();

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function RequireStudent({ children }) {
  const { isStudentLoggedIn } = usePortal();

  if (!isStudentLoggedIn) {
    return <Navigate to="/student/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/documents" element={<RequireStudent><DocumentsPage /></RequireStudent>} />
        <Route path="/rechecking" element={<RequireStudent><RecheckingPage /></RequireStudent>} />
        <Route path="/student/login" element={<StudentLoginPage />} />
        <Route path="/student/register" element={<StudentRegisterPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <AdminDashboardPage />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/add-result"
          element={
            <RequireAdmin>
              <AdminAddResultPage />
            </RequireAdmin>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
