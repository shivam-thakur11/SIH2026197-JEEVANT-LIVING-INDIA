import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  Calendar,
  Heart,
  Bookmark,
  Settings,
  LogOut,
  Package,
  Clock,
  MapPin,
  CheckCircle2,
  Trash2,
  ExternalLink,
  QrCode,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import ProductCard from '../../components/common/ProductCard';
import TraditionCard from '../../components/common/TraditionCard';

const UserDashboard = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    setCurrentUser,
    logoutUser,
    userOrders,
    userBookings,
    wishlist,
    products,
    traditions,
    savedCultures,
    addToCart,
    toggleWishlist,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');

  // Edit Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || 'Aarav Sharma',
    email: currentUser?.email || 'aarav.sharma@gmail.com',
    phone: currentUser?.phone || '+91 98111 22334',
    location: currentUser?.location || 'Bengaluru, Karnataka',
  });

  // Settings State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [preferredLanguage, setPreferredLanguage] = useState('English');

  // Selected Order for Invoice Modal
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setCurrentUser((prev) => ({ ...prev, ...profileForm }));
    showToast('Profile information updated successfully!', 'success');
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  // Wishlist product items
  const wishlistedProducts = (products || []).filter((p) =>
    wishlist.includes(p.id) || wishlist.includes(p._id)
  );

  // Saved culture tradition items
  const savedTraditionItems = (traditions || []).filter((t) =>
    savedCultures.includes(t.id) || savedCultures.includes(t._id)
  );

  return (
    <div className="dashboard-page">
      <div className="page-container dashboard-layout">
        {/* ─── Sidebar Navigation ────────────────────────────────────────── */}
        <aside className="dashboard-sidebar">
          <div className="dashboard-user-card">
            <img
              src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'User')}&background=14532d&color=fff`}
              alt={currentUser?.name}
              className="dashboard-user-avatar"
            />
            <div className="dashboard-user-meta">
              <h3 className="dashboard-user-name">{currentUser?.name || 'Cultural Patron'}</h3>
              <span className="dashboard-user-role">{currentUser?.role || 'Learner'}</span>
              <span className="dashboard-user-loc">{currentUser?.location || 'India'}</span>
            </div>
          </div>

          <nav className="dashboard-nav-list">
            <button
              className={`dash-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Sparkles size={18} />
              <span>Overview</span>
            </button>
            <button
              className={`dash-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} />
              <span>My Profile</span>
            </button>
            <button
              className={`dash-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag size={18} />
              <span>Orders ({userOrders.length})</span>
            </button>
            <button
              className={`dash-nav-btn ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <Calendar size={18} />
              <span>Bookings ({userBookings.length})</span>
            </button>
            <button
              className={`dash-nav-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <Heart size={18} />
              <span>Wishlist ({wishlist.length})</span>
            </button>
            <button
              className={`dash-nav-btn ${activeTab === 'cultures' ? 'active' : ''}`}
              onClick={() => setActiveTab('cultures')}
            >
              <Bookmark size={18} />
              <span>Saved Cultures ({savedCultures.length})</span>
            </button>
            <button
              className={`dash-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>

            <div className="dash-nav-divider" />

            <button className="dash-nav-btn text-red" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </nav>
        </aside>

        {/* ─── Main Content Pane ─────────────────────────────────────────── */}
        <main className="dashboard-main-pane">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="dash-pane-content">
              <div className="dash-welcome-banner">
                <div>
                  <h2>Namaste, {currentUser?.name?.split(' ')[0] || 'Patron'}!</h2>
                  <p>Welcome to your personal JEEVANT cultural dashboard and living heritage hub.</p>
                </div>
                <Link to="/explore" className="btn btn-primary btn-sm">
                  Explore Traditions <ArrowRight size={14} />
                </Link>
              </div>

              {/* Quick Metrics */}
              <div className="dash-metrics-grid">
                <div className="dash-metric-card">
                  <div className="metric-icon-wrap bg-green-light">
                    <Package size={22} className="text-forest" />
                  </div>
                  <div>
                    <div className="metric-number">{userOrders.length}</div>
                    <div className="metric-label">Authentic Orders</div>
                  </div>
                </div>

                <div className="dash-metric-card">
                  <div className="metric-icon-wrap bg-gold-light">
                    <Calendar size={22} className="text-gold" />
                  </div>
                  <div>
                    <div className="metric-number">{userBookings.length}</div>
                    <div className="metric-label">Masterclasses Booked</div>
                  </div>
                </div>

                <div className="dash-metric-card">
                  <div className="metric-icon-wrap bg-terra-light">
                    <Bookmark size={22} className="text-terracotta" />
                  </div>
                  <div>
                    <div className="metric-number">{savedCultures.length}</div>
                    <div className="metric-label">Saved Traditions</div>
                  </div>
                </div>
              </div>

              {/* Upcoming Masterclasses Section */}
              <div className="dash-section-block">
                <div className="dash-section-header">
                  <h3>Upcoming Masterclasses</h3>
                  <button onClick={() => setActiveTab('bookings')} className="dash-view-all">
                    View All Passes
                  </button>
                </div>

                {userBookings.length === 0 ? (
                  <div className="dash-empty-box">
                    <Calendar size={32} />
                    <p>No active masterclasses scheduled.</p>
                    <Link to="/workshops" className="btn btn-outline btn-sm">
                      Browse Masterclasses
                    </Link>
                  </div>
                ) : (
                  <div className="dash-bookings-preview">
                    {userBookings.slice(0, 2).map((bkg) => (
                      <div key={bkg.id} className="dash-booking-card">
                        <div className="booking-pass-left">
                          <span className="booking-pass-code">{bkg.id}</span>
                          <h4>{bkg.title}</h4>
                          <p>Instructor: <strong>{bkg.artisan}</strong></p>
                          <div className="booking-time-line">
                            <Clock size={13} />
                            <span>{bkg.date} · {bkg.time}</span>
                          </div>
                        </div>
                        <div className="booking-pass-right">
                          <span className="pass-status-badge">{bkg.status}</span>
                          {bkg.meetingLink && (
                            <a
                              href={bkg.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-primary btn-sm"
                            >
                              Join Studio <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Orders Section */}
              <div className="dash-section-block">
                <div className="dash-section-header">
                  <h3>Recent Handicraft Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="dash-view-all">
                    View All Orders
                  </button>
                </div>

                {userOrders.length === 0 ? (
                  <div className="dash-empty-box">
                    <ShoppingBag size={32} />
                    <p>You haven't placed any handicraft orders yet.</p>
                    <Link to="/shop" className="btn btn-primary btn-sm">
                      Visit Shop
                    </Link>
                  </div>
                ) : (
                  <div className="dash-orders-table">
                    {userOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="dash-order-row">
                        <div className="order-main-info">
                          <strong>{order.id}</strong>
                          <span className="order-date-text">{order.date}</span>
                          <p className="order-items-snippet">
                            {order.items.map((it) => it.name).join(', ')}
                          </p>
                        </div>
                        <div className="order-amount-info">
                          <span className="order-price">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                          <span className={`order-status-pill ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setSelectedInvoice(order)}
                        >
                          <FileText size={13} /> Receipt
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Saved Cultures Circular Showcase (Screen 10 Spec) */}
              <div className="dash-section-block">
                <div className="dash-section-header">
                  <h3>Saved Living Cultures & Traditions</h3>
                  <button onClick={() => setActiveTab('cultures')} className="dash-view-all">
                    View All ({savedCultures.length})
                  </button>
                </div>

                {savedTraditionItems.length === 0 ? (
                  <div className="dash-empty-box">
                    <Bookmark size={32} />
                    <p>No saved cultures yet. Explore India's traditions to bookmark favorites.</p>
                    <Link to="/explore" className="btn btn-outline btn-sm">
                      Explore Culture
                    </Link>
                  </div>
                ) : (
                  <div className="dash-saved-cultures-circles-row" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '12px' }}>
                    {savedTraditionItems.slice(0, 6).map((trad) => (
                      <Link
                        key={trad.id || trad._id}
                        to={`/traditions/${trad.id || trad._id}`}
                        className="dash-culture-circle-item"
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', textDecoration: 'none', color: 'inherit', width: '100px' }}
                      >
                        <div style={{ width: '76px', height: '76px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #c8952a', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', marginBottom: '8px' }}>
                          <img
                            src={trad.image}
                            alt={trad.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80';
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#123527', lineHeight: '1.2' }}>
                          {trad.name}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          {trad.region || trad.state}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && (
            <div className="dash-pane-content">
              <div className="dash-pane-title-row">
                <h2>Account Profile</h2>
                <p>Manage your cultural credentials and delivery preferences.</p>
              </div>

              <div className="profile-edit-card">
                <form onSubmit={handleProfileUpdate}>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-input"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-input"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">City & State</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Save Profile Changes
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <div className="dash-pane-content">
              <div className="dash-pane-title-row">
                <h2>Order History ({userOrders.length})</h2>
                <p>Every order contributes 100% directly to master artisans via Direct Benefit Transfer.</p>
              </div>

              {userOrders.length === 0 ? (
                <div className="dash-empty-box">
                  <ShoppingBag size={48} />
                  <h3>No Orders Found</h3>
                  <p>Discover authentic folk crafts handcrafted by verified Indian artisans.</p>
                  <Link to="/shop" className="btn btn-primary">
                    Explore Shop
                  </Link>
                </div>
              ) : (
                <div className="orders-complete-list">
                  {userOrders.map((order) => (
                    <div key={order.id} className="order-detailed-card">
                      <div className="order-card-header">
                        <div>
                          <span className="order-ref-number">Order ID: <strong>{order.id}</strong></span>
                          <span className="order-date">Placed on {order.date}</span>
                        </div>
                        <div className="order-header-right">
                          <span className={`order-status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                          <span className="order-total-price">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="order-card-items-list">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-line-item">
                            <img
                              src={item.image || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80'}
                              alt={item.name}
                              className="order-line-thumb"
                            />
                            <div className="order-line-info">
                              <h5>{item.name}</h5>
                              <p>Crafted by <strong>{item.artisan}</strong> {item.giTagNumber && `· ${item.giTagNumber}`}</p>
                              <span>Qty: {item.quantity || 1} · ₹{item.price.toLocaleString('en-IN')} each</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="order-card-footer">
                        <div className="order-tracking-info">
                          <span>Tracking Number: <strong>{order.trackingNumber || 'IND-POST-449102'}</strong></span>
                        </div>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setSelectedInvoice(order)}
                        >
                          <FileText size={14} /> View DBT Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="dash-pane-content">
              <div className="dash-pane-title-row">
                <h2>Masterclass Passes ({userBookings.length})</h2>
                <p>Digital admission passes with live studio meeting links and verification QR codes.</p>
              </div>

              {userBookings.length === 0 ? (
                <div className="dash-empty-box">
                  <Calendar size={48} />
                  <h3>No Masterclass Passes Found</h3>
                  <p>Enroll in real-time interactive masterclasses led by master artisans.</p>
                  <Link to="/workshops" className="btn btn-primary">
                    Browse Masterclasses
                  </Link>
                </div>
              ) : (
                <div className="bookings-cards-grid">
                  {userBookings.map((bkg) => (
                    <div key={bkg.id} className="digital-pass-card">
                      <div className="pass-top">
                        <div className="pass-pill-badge">
                          <Sparkles size={13} />
                          <span>OFFICIAL PASS</span>
                        </div>
                        <span className="pass-id-tag">{bkg.id}</span>
                      </div>

                      <h3 className="pass-title">{bkg.title}</h3>
                      <p className="pass-instructor">Instructor: <strong>{bkg.artisan}</strong></p>

                      <div className="pass-meta-box">
                        <div className="meta-pair">
                          <span>Date & Time</span>
                          <strong>{bkg.date} · {bkg.time}</strong>
                        </div>
                        <div className="meta-pair">
                          <span>Learning Format</span>
                          <strong>{bkg.mode || 'Live Virtual Studio'}</strong>
                        </div>
                        <div className="meta-pair">
                          <span>Attendee</span>
                          <strong>{bkg.attendeeName || currentUser?.name}</strong>
                        </div>
                      </div>

                      <div className="pass-qr-bar">
                        <QrCode size={48} />
                        <div className="qr-pass-text">
                          <strong>Authenticated Pass</strong>
                          <span>100% Direct DBT Payout Verified</span>
                        </div>
                      </div>

                      <div className="pass-actions">
                        <a
                          href={bkg.meetingLink || 'https://meet.jeevant.gov.in'}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary btn-block"
                        >
                          Launch Studio Classroom <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="dash-pane-content">
              <div className="dash-pane-title-row">
                <h2>Saved Handicrafts ({wishlistedProducts.length})</h2>
                <p>Authentic pieces you have bookmarked for your heritage collection.</p>
              </div>

              {wishlistedProducts.length === 0 ? (
                <div className="dash-empty-box">
                  <Heart size={48} />
                  <h3>Your Wishlist is Empty</h3>
                  <p>Browse authentic handicrafts and tap the heart icon to save your favorites.</p>
                  <Link to="/shop" className="btn btn-primary">
                    Browse Handicrafts
                  </Link>
                </div>
              ) : (
                <div className="products-grid-3">
                  {wishlistedProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SAVED CULTURES */}
          {activeTab === 'cultures' && (
            <div className="dash-pane-content">
              <div className="dash-pane-title-row">
                <h2>Saved Living Traditions ({savedTraditionItems.length})</h2>
                <p>Intangible cultural heritage entries and craft communities you are following.</p>
              </div>

              {savedTraditionItems.length === 0 ? (
                <div className="dash-empty-box">
                  <Bookmark size={48} />
                  <h3>No Saved Traditions Yet</h3>
                  <p>Explore living traditions and bookmark them to keep track of preservation efforts.</p>
                  <Link to="/explore" className="btn btn-primary">
                    Explore Traditions
                  </Link>
                </div>
              ) : (
                <div className="traditions-grid-3">
                  {savedTraditionItems.map((tradition) => (
                    <TraditionCard key={tradition.id} tradition={tradition} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="dash-pane-content">
              <div className="dash-pane-title-row">
                <h2>Preferences & Settings</h2>
                <p>Manage communication and language settings.</p>
              </div>

              <div className="settings-panel-card">
                <div className="settings-item-row">
                  <div>
                    <strong>Email Masterclass Reminders</strong>
                    <p>Receive Zoom studio links and workshop calendar invites.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                </div>

                <div className="settings-item-row">
                  <div>
                    <strong>SMS Order Status Updates</strong>
                    <p>Real-time dispatch updates directly from rural craft clusters.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                  />
                </div>

                <div className="settings-item-row">
                  <div>
                    <strong>Preferred Regional Language</strong>
                    <p>Select language for craft descriptions and certificates.</p>
                  </div>
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="form-input language-select"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">हिन्दी (Hindi)</option>
                    <option value="Bengali">বাংলা (Bengali)</option>
                    <option value="Tamil">தமிழ் (Tamil)</option>
                    <option value="Telugu">తెలుగు (Telugu)</option>
                    <option value="Marathi">मराठी (Marathi)</option>
                    <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                  </select>
                </div>

                <div className="settings-save-row">
                  <button
                    className="btn btn-primary"
                    onClick={() => showToast('Preferences updated.', 'success')}
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ─── Invoice Modal ─────────────────────────────────────────────── */}
      {selectedInvoice && (
        <div className="modal-backdrop">
          <div className="modal-dialog invoice-modal">
            <div className="modal-header">
              <div>
                <h3>Official DBT Fair-Trade Invoice</h3>
                <p>Order {selectedInvoice.id} · Smart India Hackathon 2026 Model</p>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedInvoice(null)}
              >
                ✕
              </button>
            </div>

            <div className="invoice-body">
              <div className="invoice-stamp-banner">
                <ShieldCheck size={20} className="text-forest" />
                <span>100% Direct Benefit Transfer Guaranteed (0% Intermediary Fee)</span>
              </div>

              <div className="invoice-meta-grid">
                <div>
                  <span>Date:</span>
                  <strong>{selectedInvoice.date}</strong>
                </div>
                <div>
                  <span>Payment Method:</span>
                  <strong>{selectedInvoice.paymentMethod}</strong>
                </div>
                <div>
                  <span>Delivery Destination:</span>
                  <strong>{selectedInvoice.shippingAddress}</strong>
                </div>
              </div>

              <div className="invoice-items-table">
                {selectedInvoice.items.map((item, i) => (
                  <div key={i} className="invoice-item-row">
                    <span>{item.name} × {item.quantity || 1}</span>
                    <strong>₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}</strong>
                  </div>
                ))}
              </div>

              <div className="invoice-total-summary">
                <div className="total-line">
                  <span>Gross Order Value:</span>
                  <strong>₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</strong>
                </div>
                <div className="total-line fee-line">
                  <span>Platform Fee Deducted:</span>
                  <strong className="text-forest">₹0.00 (0% SIH Commission)</strong>
                </div>
                <div className="total-line grand-total">
                  <span>Net Disbursed to Artisans:</span>
                  <strong>₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.print();
                }}
              >
                Print Official Receipt
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setSelectedInvoice(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
