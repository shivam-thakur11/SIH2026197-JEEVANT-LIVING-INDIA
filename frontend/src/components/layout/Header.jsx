import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, CheckCheck, Calendar } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const Header = () => {
  const location = useLocation();
  const { notifications, markAllNotificationsAsRead } = useAdmin();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageMeta = (pathname) => {
    switch (pathname) {
      case '/':
        return { title: 'Executive Overview & Live Dashboard', category: 'Analytics' };
      case '/artisans':
        return { title: 'Master Artisans & Craft Guilds', category: 'Heritage Registry' };
      case '/users':
        return { title: 'Registered Cultural Enthusiasts', category: 'Community' };
      case '/traditions':
        return { title: 'Intangible Cultural Heritage Directory', category: 'Preservation' };
      case '/workshops':
        return { title: 'Masterclasses & Heritage Residencies', category: 'Capacity Building' };
      case '/reports':
        return { title: 'SIH Impact & Preservation Reports', category: 'Intelligence' };
      case '/payments':
        return { title: 'Direct Artisan Payouts & Fair-Trade Ledger', category: 'Finance' };
      case '/reviews':
        return { title: 'Community Feedback & Sentiment Moderation', category: 'Quality' };
      case '/settings':
        return { title: 'Platform Governance & Hackathon Demo Settings', category: 'Administration' };
      default:
        return { title: 'Admin Console', category: 'JEEVANT' };
    }
  };

  const meta = getPageMeta(location.pathname);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="header">
      {/* Page Title & Breadcrumb */}
      <div className="header-left">
        <div className="header-title-group">
          <div className="header-breadcrumb">
            <span>JEEVANT</span>
            <span>/</span>
            <span>{meta.category}</span>
          </div>
          <h1>{meta.title}</h1>
        </div>
      </div>

      {/* Right controls */}
      <div className="header-right">
        {/* Global Search */}
        <div className="header-search">
          <Search size={16} className="header-search-icon" />
          <input
            type="text"
            placeholder="Search craft, artisan, GI tag..."
            aria-label="Global search"
          />
        </div>

        {/* Live Hackathon Status Indicator */}
        <div className="header-live-badge" title="Live evaluation mode enabled for SIH 2026 jury">
          <span className="header-live-dot" />
          <span>SIH 2026 LIVE</span>
        </div>

        {/* Notification Bell with Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className="header-action-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            aria-label="Toggle notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="header-badge-count">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '48px',
                right: '0',
                width: '340px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 12px 30px rgba(14,32,21,0.18)',
                border: '1px solid var(--border-subtle)',
                zIndex: 150,
                overflow: 'hidden',
                animation: 'fadeIn 0.2s ease'
              }}
            >
              <div
                style={{
                  padding: '14px 18px',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--beige-50)'
                }}
              >
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--forest-900)' }}>
                  Platform Alerts ({unreadCount} new)
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    style={{
                      border: 'none',
                      background: 'none',
                      fontSize: '11px',
                      color: 'var(--forest-700)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CheckCheck size={14} /> Mark all read
                  </button>
                )}
              </div>

              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                      backgroundColor: notif.read ? '#ffffff' : '#f9fbf9'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: 'var(--forest-900)',
                        marginBottom: '3px'
                      }}
                    >
                      {notif.title}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.4'
                      }}
                    >
                      {notif.message}
                    </div>
                    <div
                      style={{
                        fontSize: '10.5px',
                        color: 'var(--text-muted)',
                        marginTop: '5px'
                      }}
                    >
                      {notif.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Current Date Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            background: 'var(--surface-white)',
            padding: '7px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <Calendar size={14} color="var(--forest-700)" />
          <span>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
