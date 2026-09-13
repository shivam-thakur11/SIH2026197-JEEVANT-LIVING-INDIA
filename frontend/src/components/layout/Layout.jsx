import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAdmin } from '../../context/AdminContext';

export const Layout = () => {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
