import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Home,
  Compass,
  ShoppingBag,
  GraduationCap,
  Calendar,
  Users,
  Search,
  Heart,
  Menu,
  X,
  User,
  Shield,
  LogOut,
  ChevronDown,
  Info,
  CheckCircle2,
  ExternalLink,
  Globe,
  Bell,
  Palette,
  ShieldCheck,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useApp } from '../context/AdminContext';
import CartDrawer from '../components/common/CartDrawer';

/**
 * LearnerLayout
 * The primary public-facing layout wrapper for JEEVANT – LIVING INDIA.
 * Features responsive navbar with search, language selector, notifications, cart, user profile dropdown, and cultural footer.
 */
const LearnerLayout = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    logoutUser,
    cartCount,
    setIsCartOpen,
    wishlist,
    savedCultures,
    isAuthenticated,
    notifications,
    markNotificationRead,
    markAllNotificationsAsRead,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const profileDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);
  const notifDropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  ];

  const unreadNotifsCount = (notifications || []).filter((n) => n.unread || !n.read).length;

  // Compact navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setLangDropdownOpen(false);
      }
      if (
        notifDropdownRef.current &&
        !notifDropdownRef.current.contains(event.target)
      ) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'Explore', to: '/explore', icon: Compass },
    { label: 'Artists', to: '/artists', icon: Users },
    { label: 'Shop', to: '/shop', icon: ShoppingBag },
    { label: 'Workshops', to: '/workshops', icon: Calendar },
    { label: 'Learn', to: '/learn', icon: GraduationCap },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(navSearchQuery.trim())}`);
      setSearchBarOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <div className="learner-layout">
      {/* Top Heritage Notice Bar */}
      <div className="heritage-top-bar">
        <div className="heritage-top-container">
          <div className="heritage-top-badge">
            <span className="sih-indicator">SIH 2026 · Problem Statement PS 26197</span>
            <span className="heritage-divider">•</span>
            <span className="tagline-text">Culture • Artisans • People • A Living Heritage</span>
          </div>
          <div className="heritage-top-links">
            <Link to="/how-it-works" className="top-link">How It Works</Link>
            <Link to="/about" className="top-link">About JEEVANT</Link>
            <Link to="/artist/dashboard" className="top-link highlight">Artist Studio</Link>
            <Link to="/artisan/register" className="top-link">Register as Artist</Link>
            <Link to="/admin/login" className="top-link admin-pill">
              <Shield size={12} /> Admin Console
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className={`learner-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="learner-nav-container">
          {/* Brand Logo */}
          <Link to="/" className="learner-nav-brand">
            <div className="learner-nav-brand-icon">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="learner-nav-brand-title">JEEVANT</div>
              <div className="learner-nav-brand-sub">LIVING INDIA</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="learner-nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `learner-nav-link ${isActive ? 'active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Action Icons & Auth */}
          <div className="learner-nav-actions">
            {/* Search Trigger */}
            <div className="nav-search-wrapper">
              <form onSubmit={handleSearchSubmit} className={`nav-search-form ${searchBarOpen ? 'open' : ''}`}>
                <input
                  type="text"
                  placeholder="Search art, craft, artist, region, workshop..."
                  value={navSearchQuery}
                  onChange={(e) => setNavSearchQuery(e.target.value)}
                  className="nav-search-input"
                />
                <button type="submit" className="nav-search-submit" aria-label="Submit search">
                  <Search size={16} />
                </button>
              </form>
              <button
                className="nav-action-btn search-toggle-btn"
                onClick={() => setSearchBarOpen(!searchBarOpen)}
                title="Search platform"
                aria-label="Toggle search"
              >
                <Search size={19} />
              </button>
            </div>

            {/* Language Selector */}
            <div className="nav-dropdown-wrapper" ref={langDropdownRef}>
              <button
                className="nav-action-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                title="Select Language"
                aria-label="Select Language"
              >
                <Globe size={19} />
              </button>
              {langDropdownOpen && (
                <div className="nav-popover-menu lang-popover">
                  <div className="popover-header">Choose Language</div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`popover-item ${selectedLang === lang.name ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedLang(lang.name);
                        setLangDropdownOpen(false);
                      }}
                    >
                      {lang.name}
                      {selectedLang === lang.name && <CheckCircle2 size={14} className="text-forest" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="nav-dropdown-wrapper" ref={notifDropdownRef}>
              <button
                className="nav-action-btn notif-toggle-btn"
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell size={19} />
                {unreadNotifsCount > 0 && (
                  <span className="nav-badge notif-badge">{unreadNotifsCount}</span>
                )}
              </button>
              {notifDropdownOpen && (
                <div className="nav-popover-menu notif-popover">
                  <div className="notif-header">
                    <div className="notif-header-title">
                      <span>Notifications</span>
                      {unreadNotifsCount > 0 && (
                        <span className="notif-badge-pill">{unreadNotifsCount} New</span>
                      )}
                    </div>
                    {unreadNotifsCount > 0 && (
                      <button
                        type="button"
                        className="notif-mark-all-btn"
                        onClick={markAllNotificationsAsRead}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="notif-list">
                    {(notifications || []).length === 0 ? (
                      <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-muted, #71717a)' }}>
                        <Bell size={24} style={{ opacity: 0.4, margin: '0 auto 8px' }} />
                        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600 }}>No Notifications Yet</p>
                        <small style={{ fontSize: '0.75rem', opacity: 0.8 }}>Living updates and masterclass notices will appear here.</small>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id || n._id}
                          className={`notif-item ${n.unread || !n.read ? 'unread' : 'read'}`}
                          onClick={() => markNotificationRead(n.id || n._id)}
                        >
                          <div className="notif-item-icon-box">
                            {n.type === 'artisan' && <ShieldCheck size={16} className="notif-icon notif-icon-gi" />}
                            {n.type === 'gi' && <ShieldCheck size={16} className="notif-icon notif-icon-gi" />}
                            {n.type === 'workshop' && <Calendar size={16} className="notif-icon notif-icon-masterclass" />}
                            {n.type === 'masterclass' && <Calendar size={16} className="notif-icon notif-icon-masterclass" />}
                            {n.type === 'booking' && <Calendar size={16} className="notif-icon notif-icon-masterclass" />}
                            {n.type === 'order' && <Sparkles size={16} className="notif-icon notif-icon-dbt" />}
                            {n.type === 'review' && <Sparkles size={16} className="notif-icon notif-icon-dbt" />}
                            {n.type === 'report' && <ShieldCheck size={16} className="notif-icon notif-icon-gi" />}
                            {(!n.type || n.type === 'system') && <Bell size={16} className="notif-icon notif-icon-dbt" />}
                          </div>
                          <div className="notif-item-body">
                            <div className="notif-item-header">
                              <h4 className="notif-item-title">{n.title}</h4>
                              {(n.unread || !n.read) && <span className="notif-unread-dot" />}
                            </div>
                            <p className="notif-item-desc">{n.message || n.desc}</p>
                            <span className="notif-item-time">{n.time || (n.createdAt ? new Date(n.createdAt).toLocaleDateString('en-IN') : 'Recent')}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <Link
              to="/dashboard?tab=wishlist"
              className="nav-action-btn wishlist-btn"
              title="Saved Heritage & Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {(wishlist.length + (savedCultures?.length || 0)) > 0 && (
                <span className="nav-badge wishlist-badge">
                  {wishlist.length + (savedCultures?.length || 0)}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              className="nav-action-btn cart-btn"
              onClick={() => setIsCartOpen(true)}
              title="Shopping Cart"
              aria-label="Open cart"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="nav-badge cart-badge">{cartCount}</span>
              )}
            </button>

            {/* User Profile / Auth State */}
            {currentUser ? (
              <div className="nav-profile-menu" ref={profileDropdownRef}>
                <button
                  className="nav-profile-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-label="User menu"
                >
                  <img
                    src={currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=14532d&color=fff`}
                    alt={currentUser.name}
                    className="nav-avatar"
                  />
                  <span className="nav-username">{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>

                {profileDropdownOpen && (
                  <div className="nav-dropdown-menu">
                    <div className="dropdown-user-header">
                      <strong>{currentUser.name}</strong>
                      <span>{currentUser.email}</span>
                      <div className="dropdown-role-tag">{currentUser.role || 'Learner'}</div>
                    </div>
                    <div className="dropdown-divider" />
                    <Link
                      to="/dashboard"
                      className="dropdown-item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User size={15} /> User Dashboard
                    </Link>
                    <Link
                      to="/artist/dashboard"
                      className="dropdown-item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Palette size={15} /> Artist Studio & Dashboard
                    </Link>
                    <Link
                      to="/dashboard"
                      className="dropdown-item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <ShoppingBag size={15} /> My Orders
                    </Link>
                    <Link
                      to="/dashboard"
                      className="dropdown-item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Calendar size={15} /> Workshop Passes
                    </Link>
                    <Link
                      to="/dashboard"
                      className="dropdown-item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Heart size={15} /> Saved Cultures
                    </Link>

                    {(currentUser.role === 'admin' || isAuthenticated) && (
                      <>
                        <div className="dropdown-divider" />
                        <Link
                          to="/admin"
                          className="dropdown-item admin-highlight"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <Shield size={15} /> Admin Console
                        </Link>
                      </>
                    )}

                    <div className="dropdown-divider" />
                    <button onClick={handleLogout} className="dropdown-item text-red">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="nav-auth-buttons">
                <Link to="/login" className="btn btn-sm btn-ghost">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-sm btn-primary">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Drawer Hamburger */}
            <button
              className="learner-nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="learner-nav-mobile-menu">
            <form onSubmit={handleSearchSubmit} className="mobile-search-form">
              <input
                type="text"
                placeholder="Search traditions, artisans..."
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                className="mobile-search-input"
              />
              <button type="submit" className="mobile-search-submit">
                <Search size={16} />
              </button>
            </form>

            <div className="mobile-nav-links">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `learner-nav-mobile-link ${isActive ? 'active' : ''}`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
              <NavLink
                to="/how-it-works"
                className="learner-nav-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Info size={18} />
                <span>How It Works</span>
              </NavLink>
              <NavLink
                to="/about"
                className="learner-nav-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles size={18} />
                <span>About JEEVANT</span>
              </NavLink>
              <NavLink
                to="/artisan/register"
                className="learner-nav-mobile-link highlight"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users size={18} />
                <span>Join as Master Artisan</span>
              </NavLink>
              <NavLink
                to="/dashboard?tab=wishlist"
                className="learner-nav-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart size={18} />
                <span>Saved Heritage ({(wishlist?.length || 0) + (savedCultures?.length || 0)})</span>
              </NavLink>
              <NavLink
                to="/dashboard"
                className="learner-nav-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={18} />
                <span>My Dashboard</span>
              </NavLink>
              <NavLink
                to="/admin/login"
                className="learner-nav-mobile-link admin"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Shield size={18} />
                <span>Admin Governance</span>
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Slide-Over Cart Drawer */}
      <CartDrawer />

      {/* Main Page Content Outlet */}
      <main className="learner-main">
        <Outlet />
      </main>

      {/* Rich Cultural Footer */}
      <footer className="learner-footer">
        {/* Fair Trade Assurance Banner */}
        <div className="footer-trust-banner">
          <div className="footer-trust-container">
            <div className="trust-item">
              <div className="trust-icon-box">
                <CheckCircle2 size={22} className="trust-icon" />
              </div>
              <div className="trust-item-content">
                <strong>0% Intermediary Fee Guarantee</strong>
                <p>100% of masterclass proceeds disburse directly to artisans via DBT.</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon-box">
                <Shield size={22} className="trust-icon" />
              </div>
              <div className="trust-item-content">
                <strong>Official GI Verification</strong>
                <p>Administrative authentication of Geographical Indication registration certificates.</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon-box">
                <Sparkles size={22} className="trust-icon" />
              </div>
              <div className="trust-item-content">
                <strong>Living Cultural Repository</strong>
                <p>Archiving folk antiquity, natural materials, and intangible oral knowledge.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns: 2fr 1fr 1fr 1fr Grid */}
        <div className="learner-footer-container">
          <div className="learner-footer-grid">
            {/* Column 1: Brand & SIH Context */}
            <div className="learner-footer-brand-col">
              <Link to="/" className="learner-footer-logo">
                <div className="footer-logo-icon">
                  <Sparkles size={20} />
                </div>
                <span>JEEVANT · LIVING INDIA</span>
              </Link>
              <p className="learner-footer-desc">
                India's living intangible cultural heritage, presented through a modern digital experience.
                Connecting cultural patrons directly with GI-verified master artisans with zero intermediary deductions.
              </p>
              <div className="sih-footer-pill">
                <div className="sih-pill-title">Smart India Hackathon 2026</div>
                <div className="sih-pill-sub">Problem Statement PS 26197 · Heritage & Culture</div>
              </div>
            </div>

            {/* Column 2: Explore */}
            <div className="learner-footer-col">
              <h4>Explore</h4>
              <Link to="/explore">Explore Culture</Link>
              <Link to="/explore/map">India Culture Map</Link>
              <Link to="/artists">Master Artisans</Link>
              <Link to="/shop">Fair-Trade Shop</Link>
              <Link to="/workshops">Live Workshops</Link>
            </div>

            {/* Column 3: Learn */}
            <div className="learner-footer-col">
              <h4>Learn</h4>
              <Link to="/learn">Cultural Stories</Link>
              <Link to="/learn">Masterclass Videos</Link>
              <Link to="/learn">Heritage Quiz</Link>
              <Link to="/how-it-works">How It Works</Link>
              <Link to="/about">About JEEVANT</Link>
            </div>

            {/* Column 4: Connect & Governance */}
            <div className="learner-footer-col">
              <h4>Connect</h4>
              <Link to="/artisan/register" className="highlight-link">Register as Artist</Link>
              <Link to="/artist/dashboard">Artist Studio</Link>
              <Link to="/dashboard">Learner Dashboard</Link>
              <Link to="/admin/login">Admin Console</Link>
              <a
                href="https://www.sih.gov.in"
                target="_blank"
                rel="noreferrer"
                className="external-col-link"
              >
                SIH Official Portal <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Assurance Bar */}
        <div className="learner-footer-bottom">
          <div className="footer-bottom-container">
            <p>© 2026 JEEVANT: Living India · Preserving Bharat's Living Cultural Heritage.</p>
            <div className="footer-bottom-badges">
              <span>National Living Intangible Heritage Initiative</span>
              <span className="badge-divider">•</span>
              <span>100% Direct Benefit Transfer (DBT)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LearnerLayout;
