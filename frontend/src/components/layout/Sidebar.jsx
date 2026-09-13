import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Palette,
  BookOpen,
  Sparkles,
  FileBarChart2,
  CreditCard,
  MessageSquareQuote,
  Settings,
  LogOut,
  Landmark
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const Sidebar = () => {
  const { adminUser, stats, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      label: 'Overview',
      to: '/admin',
      icon: LayoutDashboard,
      end: true
    },
    {
      label: 'Artisans',
      to: '/admin/artisans',
      icon: Palette,
      badge: stats.pendingVerifications > 0 ? stats.pendingVerifications : null
    },
    {
      label: 'Users',
      to: '/admin/users',
      icon: Users
    },
    {
      label: 'Traditions',
      to: '/admin/traditions',
      icon: Landmark
    },
    {
      label: 'Workshops',
      to: '/admin/workshops',
      icon: BookOpen
    },
    {
      label: 'Reports',
      to: '/admin/reports',
      icon: FileBarChart2
    },
    {
      label: 'Payments',
      to: '/admin/payments',
      icon: CreditCard
    },
    {
      label: 'Reviews',
      to: '/admin/reviews',
      icon: MessageSquareQuote
    },
    {
      label: 'Settings',
      to: '/admin/settings',
      icon: Settings
    }
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand-icon">
          <Sparkles size={24} />
        </div>
        <div>
          <div className="sidebar-brand-title">JEEVANT</div>
          <div className="sidebar-brand-subtitle">LIVING INDIA</div>
        </div>
      </div>

      {/* SIH Hackathon Meta Tag */}
      <div className="sidebar-badge">
        <span className="sidebar-badge-dot" />
        <span>SIH 2026 • PS 26197</span>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={18} strokeWidth={2} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="sidebar-nav-badge" title={`${item.badge} Pending Requests`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer / User & Logout */}
      <div className="sidebar-footer">
        <div className="sidebar-user-card">
          <div className="sidebar-user-avatar">
            {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{adminUser.name}</div>
            <div className="sidebar-user-role">{adminUser.role}</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="sidebar-logout-btn"
          title="Sign out of Admin Portal"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
