import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  Calendar,
  DollarSign,
  Plus,
  ShieldCheck,
  Award,
  MapPin,
  Sparkles,
  Layers,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Package,
  Eye,
  Edit3,
  Trash2,
  X,
  Upload,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import HeritageCornerMotif from '../../components/common/HeritageCornerMotif';
import Modal from '../../components/common/Modal';

/**
 * ArtistDashboard
 * Dedicated control center for verified master craftspeople, Shilp Gurus, and tradition bearers.
 * Enables artisans to manage products, schedule masterclasses, monitor orders, and audit 100% DBT earnings.
 */
const ArtistDashboard = () => {
  const {
    currentUser,
    artisans,
    products,
    workshops,
    orders,
    payments,
    traditions,
    addProduct,
    addWorkshop,
  } = useApp();

  const [activeTab, setActiveTab] = useState('profile'); // profile, products, workshops, orders, earnings
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddWorkshopModalOpen, setIsAddWorkshopModalOpen] = useState(false);

  // Fallback to active artisan Dulari Devi if not logged in as artisan
  const currentArtisan = useMemo(() => {
    if (currentUser && currentUser.role === 'artisan') {
      const match = (artisans || []).find(
        (a) => a.email === currentUser.email || a.userId === currentUser.id
      );
      if (match) return match;
    }
    // Default demo master artisan
    return (
      (artisans || []).find((a) => a.name.includes('Dulari')) ||
      (artisans && artisans[0]) || {
        name: 'Smt. Dulari Devi',
        craft: 'Madhubani Painting',
        state: 'Bihar',
        region: 'Mithila Region, Ranti Village',
        bio: 'Padma Shri recipient & master of the traditional Kachni line-art style. Passing down three generations of sacred natural pigment alchemy.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
        giTagNumber: 'GI-IN-0028',
        verificationStatus: 'approved',
        status: 'Verified',
        experience: '42 years',
      }
    );
  }, [currentUser, artisans]);

  // Artisan products
  const artisanProducts = useMemo(() => {
    return (products || []).filter(
      (p) =>
        p.artisanName === currentArtisan.name ||
        (typeof p.artisan === 'string' && p.artisan === currentArtisan.name) ||
        (p.artisan && p.artisan.name === currentArtisan.name)
    );
  }, [products, currentArtisan]);

  // Artisan workshops
  const artisanWorkshops = useMemo(() => {
    return (workshops || []).filter(
      (w) =>
        w.instructor === currentArtisan.name ||
        w.artisanName === currentArtisan.name ||
        (w.artisan && w.artisan.name === currentArtisan.name)
    );
  }, [workshops, currentArtisan]);

  // Metrics
  const totalRevenue = useMemo(() => {
    const directSales = artisanProducts.reduce((sum, p) => sum + (p.price * 3), 0);
    const workshopSales = artisanWorkshops.reduce(
      (sum, w) => sum + (w.price * (w.enrolled || 6)),
      0
    );
    return directSales + workshopSales;
  }, [artisanProducts, artisanWorkshops]);

  // Form states
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'Traditional Painting',
    craft: currentArtisan.craft || 'Folk Craft',
    price: '',
    materials: '',
    description: '',
    story: '',
    image: '',
  });

  const [newWorkshopForm, setNewWorkshopForm] = useState({
    title: '',
    tradition: currentArtisan.craft || '',
    date: '2026-10-15',
    duration: '2 Days Atelier',
    price: '2500',
    capacity: '12',
    description: '',
    image: '',
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) return;

    const prod = {
      name: newProductForm.name,
      category: newProductForm.category,
      craft: newProductForm.craft,
      state: currentArtisan.state || 'Bihar',
      price: Number(newProductForm.price),
      rating: 5.0,
      reviewsCount: 0,
      inStock: true,
      image:
        newProductForm.image ||
        'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
      artisanName: currentArtisan.name,
      artisan: currentArtisan.id || currentArtisan._id,
      materials: newProductForm.materials ? newProductForm.materials.split(',') : ['Natural Organic Pigments'],
      description: newProductForm.description,
      culturalStory: newProductForm.story,
    };

    if (addProduct) addProduct(prod);
    setIsAddProductModalOpen(false);
    setNewProductForm({
      name: '',
      category: 'Traditional Painting',
      craft: currentArtisan.craft || 'Folk Craft',
      price: '',
      materials: '',
      description: '',
      story: '',
      image: '',
    });
  };

  const handleCreateWorkshop = (e) => {
    e.preventDefault();
    if (!newWorkshopForm.title || !newWorkshopForm.price) return;

    const ws = {
      title: newWorkshopForm.title,
      instructor: currentArtisan.name,
      tradition: newWorkshopForm.tradition,
      state: currentArtisan.state || 'Bihar',
      date: newWorkshopForm.date,
      duration: newWorkshopForm.duration,
      price: Number(newWorkshopForm.price),
      capacity: Number(newWorkshopForm.capacity),
      enrolled: 0,
      availableSeats: Number(newWorkshopForm.capacity),
      image:
        newWorkshopForm.image ||
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
      description: newWorkshopForm.description,
    };

    if (addWorkshop) addWorkshop(ws);
    setIsAddWorkshopModalOpen(false);
    setNewWorkshopForm({
      title: '',
      tradition: currentArtisan.craft || '',
      date: '2026-10-15',
      duration: '2 Days Atelier',
      price: '2500',
      capacity: '12',
      description: '',
      image: '',
    });
  };

  return (
    <div className="artist-dashboard-page page-container">
      {/* ─── Header Profile Banner ────────────────────────────────────────── */}
      <div className="artist-profile-banner">
        <HeritageCornerMotif position="top-right" size={64} opacity={0.6} />
        <HeritageCornerMotif position="bottom-left" size={64} opacity={0.6} />

        <div className="artist-banner-content">
          <div className="artist-banner-avatar-wrap">
            <img
              src={currentArtisan.avatar}
              alt={currentArtisan.name}
              className="artist-banner-avatar"
            />
            <span className="artist-verified-seal" title="Government GI Verified Master">
              <ShieldCheck size={20} />
            </span>
          </div>

          <div className="artist-banner-info">
            <div className="artist-title-row">
              <h2>{currentArtisan.name}</h2>
              <span className="badge-gi-verified">
                <CheckCircle2 size={13} /> {currentArtisan.giTagNumber || 'GI-IN-0028'} Verified
              </span>
              <span className="badge-pill-light">{currentArtisan.experience || '40+ Yrs Mastery'}</span>
            </div>

            <p className="artist-banner-craft">
              <span>{currentArtisan.craft}</span> •{' '}
              <span>
                <MapPin size={13} /> {currentArtisan.region || currentArtisan.state}
              </span>
            </p>

            <p className="artist-banner-bio">{currentArtisan.bio}</p>
          </div>

          <div className="artist-banner-quick-actions">
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="btn btn-gold btn-sm"
            >
              <Plus size={15} /> Add Handcrafted Product
            </button>
            <button
              onClick={() => setIsAddWorkshopModalOpen(true)}
              className="btn btn-outline-cream btn-sm"
            >
              <Calendar size={15} /> Schedule Masterclass
            </button>
          </div>
        </div>
      </div>

      {/* ─── Metric Tickers Bar ────────────────────────────────────────────── */}
      <div className="artist-metric-grid">
        <div className="artist-stat-card">
          <div className="stat-card-icon green">
            <Package size={22} />
          </div>
          <div>
            <div className="stat-card-number">{artisanProducts.length || 3}</div>
            <div className="stat-card-label">Active Handcrafted Artifacts</div>
          </div>
        </div>

        <div className="artist-stat-card">
          <div className="stat-card-icon gold">
            <Calendar size={22} />
          </div>
          <div>
            <div className="stat-card-number">{artisanWorkshops.length || 2}</div>
            <div className="stat-card-label">Scheduled Masterclasses</div>
          </div>
        </div>

        <div className="artist-stat-card">
          <div className="stat-card-icon terracotta">
            <User size={22} />
          </div>
          <div>
            <div className="stat-card-number">84</div>
            <div className="stat-card-label">Cultural Learners Mentored</div>
          </div>
        </div>

        <div className="artist-stat-card">
          <div className="stat-card-icon forest">
            <DollarSign size={22} />
          </div>
          <div>
            <div className="stat-card-number text-forest">₹{totalRevenue.toLocaleString('en-IN')}</div>
            <div className="stat-card-label">100% Direct DBT Payout (0% Fee)</div>
          </div>
        </div>
      </div>

      {/* ─── Navigation Tabs ──────────────────────────────────────────────── */}
      <div className="artist-tabs-bar">
        <button
          className={`artist-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={16} /> Heritage Profile & Lineage
        </button>
        <button
          className={`artist-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={16} /> My Products ({artisanProducts.length})
        </button>
        <button
          className={`artist-tab-btn ${activeTab === 'workshops' ? 'active' : ''}`}
          onClick={() => setActiveTab('workshops')}
        >
          <Calendar size={16} /> Masterclasses & Workshops ({artisanWorkshops.length})
        </button>
        <button
          className={`artist-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <ShoppingBag size={16} /> Orders & Logistics
        </button>
        <button
          className={`artist-tab-btn ${activeTab === 'earnings' ? 'active' : ''}`}
          onClick={() => setActiveTab('earnings')}
        >
          <TrendingUp size={16} /> Fair-Trade DBT Ledger
        </button>
      </div>

      {/* ─── Tab Content ──────────────────────────────────────────────────── */}
      <div className="artist-tab-content-panel">
        {/* 1. Profile Tab */}
        {activeTab === 'profile' && (
          <div className="artist-profile-details-grid">
            <div className="profile-detail-card">
              <h3>Lineage & Cultural Attribution</h3>
              <div className="detail-row">
                <span className="detail-label">Master Craft:</span>
                <span className="detail-val">{currentArtisan.craft}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Geographical Indication:</span>
                <span className="detail-val text-forest font-semibold">{currentArtisan.giTagNumber || 'GI-IN-0028'} (Authenticated)</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Ancestral Clan / Lineage:</span>
                <span className="detail-val">Generational Mithila Kayastha tradition, passed maternal line</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Raw Material Alchemy:</span>
                <span className="detail-val">Organic cow-dung wash, soot carbon lampblack, crushed marigold petals, neem gum</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Registered Studio:</span>
                <span className="detail-val">{currentArtisan.region || 'Ranti Village, Madhubani District, Bihar'}</span>
              </div>
            </div>

            <div className="profile-detail-card">
              <h3>Official Government KYC & Honors</h3>
              <div className="detail-row">
                <span className="detail-label">National Honors:</span>
                <span className="detail-val font-semibold text-gold">Padma Shri (President of India)</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Ministry KYC:</span>
                <span className="detail-val text-forest">✓ Aadhaar & e-Shram Authenticated</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Direct DBT Account:</span>
                <span className="detail-val">State Bank of India •••• 4128 (Direct Disbursal Active)</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Platform Commission:</span>
                <span className="detail-val text-forest font-bold">0.00% (Guaranteed Zero Intermediary Cut)</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Public Status:</span>
                <span className="badge-gi-verified">Active Public Guild Master</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="tab-actions-header">
              <div>
                <h3>Handcrafted Artifacts Registry</h3>
                <p>All items created and authenticated with master artisan provenance.</p>
              </div>
              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="btn btn-primary btn-sm"
              >
                <Plus size={15} /> Add New Handcrafted Product
              </button>
            </div>

            {artisanProducts.length > 0 ? (
              <div className="artist-products-table-wrap">
                <table className="artist-data-table">
                  <thead>
                    <tr>
                      <th>Artifact</th>
                      <th>Category & Craft</th>
                      <th>Price</th>
                      <th>Inventory</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {artisanProducts.map((p) => (
                      <tr key={p.id || p._id}>
                        <td className="artifact-cell">
                          <img src={p.image} alt={p.name} className="table-thumb" />
                          <div>
                            <strong>{p.name}</strong>
                            <span className="sub-text">{p.state}</span>
                          </div>
                        </td>
                        <td>
                          <span>{p.category}</span>
                          <span className="sub-text">{p.craft}</span>
                        </td>
                        <td className="price-cell font-bold text-forest">₹{p.price.toLocaleString('en-IN')}</td>
                        <td>
                          <span className="stock-pill in-stock">Handmade to Order</span>
                        </td>
                        <td>
                          <span className="badge-gi-verified">Live / Verified</span>
                        </td>
                        <td className="actions-cell">
                          <Link to={`/shop/${p.id || p._id}`} className="action-icon-btn" title="View Public Page">
                            <Eye size={16} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state-card">
                <Package size={40} className="empty-icon" />
                <h4>No artifacts listed yet</h4>
                <p>Add your first handcrafted artifact to connect directly with patrons worldwide.</p>
                <button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="btn btn-gold btn-sm"
                >
                  <Plus size={15} /> Add Handcrafted Product
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. Workshops Tab */}
        {activeTab === 'workshops' && (
          <div>
            <div className="tab-actions-header">
              <div>
                <h3>Scheduled Heritage Masterclasses</h3>
                <p>Virtual ateliers and village studio residencies conducted directly by you.</p>
              </div>
              <button
                onClick={() => setIsAddWorkshopModalOpen(true)}
                className="btn btn-primary btn-sm"
              >
                <Plus size={15} /> Schedule Masterclass
              </button>
            </div>

            {artisanWorkshops.length > 0 ? (
              <div className="workshops-admin-grid">
                {artisanWorkshops.map((w) => (
                  <div key={w.id || w._id} className="workshop-manage-card">
                    <img src={w.image} alt={w.title} className="manage-card-img" />
                    <div className="manage-card-body">
                      <h4>{w.title}</h4>
                      <p className="card-meta">
                        <Clock size={13} /> {w.duration} • <MapPin size={13} /> {w.state}
                      </p>
                      <div className="occupancy-bar-wrap">
                        <div className="occupancy-labels">
                          <span>Occupancy: {w.enrolled || 6} / {w.capacity || 12}</span>
                          <span className="seats-badge">{w.availableSeats || 6} seats left</span>
                        </div>
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${Math.min(100, Math.round(((w.enrolled || 6) / (w.capacity || 12)) * 100))}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="manage-card-footer">
                        <span className="price-tag font-bold text-forest">₹{w.price.toLocaleString('en-IN')} / Seat</span>
                        <Link to={`/workshops/${w.id || w._id}`} className="btn btn-outline btn-xs">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state-card">
                <Calendar size={40} className="empty-icon" />
                <h4>No masterclasses scheduled</h4>
                <p>Schedule a live session to teach ancestral techniques and earn direct income.</p>
                <button
                  onClick={() => setIsAddWorkshopModalOpen(true)}
                  className="btn btn-gold btn-sm"
                >
                  <Plus size={15} /> Schedule Masterclass
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <div className="tab-actions-header">
              <div>
                <h3>Orders & Patron Logistics</h3>
                <p>Track purchases directly made by buyers, with zero broker interference.</p>
              </div>
            </div>

            <div className="artist-products-table-wrap">
              <table className="artist-data-table">
                <thead>
                  <tr>
                    <th>Order Ref</th>
                    <th>Patron</th>
                    <th>Item Description</th>
                    <th>Gross Amount</th>
                    <th>DBT Payout (100%)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-mono text-sm">#JVNT-8821</td>
                    <td>Aarav Sharma (Bangalore)</td>
                    <td>Madhubani Tree of Life Handcrafted Scroll</td>
                    <td>₹4,500</td>
                    <td className="font-bold text-forest">₹4,500 (Direct Bank Transfer)</td>
                    <td><span className="badge-gi-verified">Dispatched via India Post</span></td>
                  </tr>
                  <tr>
                    <td className="font-mono text-sm">#JVNT-8794</td>
                    <td>Pooja Iyer (Mumbai)</td>
                    <td>Mithila Ritual Sun God Mineral Pigment Canvas</td>
                    <td>₹3,200</td>
                    <td className="font-bold text-forest">₹3,200 (Direct Bank Transfer)</td>
                    <td><span className="badge-gi-verified">Delivered</span></td>
                  </tr>
                  <tr>
                    <td className="font-mono text-sm">#JVNT-8610</td>
                    <td>Dr. David Miller (Cambridge, UK)</td>
                    <td>Traditional Natural Pigment Atelier Masterclass Pass</td>
                    <td>₹2,500</td>
                    <td className="font-bold text-forest">₹2,500 (Direct Bank Transfer)</td>
                    <td><span className="badge-pill-light">Completed Session</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. Earnings Tab */}
        {activeTab === 'earnings' && (
          <div>
            <div className="tab-actions-header">
              <div>
                <h3>100% Direct Benefit Transfer (DBT) Ledger</h3>
                <p>Institutional guarantee: 0% platform fee, 0% middleman commission.</p>
              </div>
            </div>

            <div className="dbt-ledger-summary-banner">
              <div className="dbt-summary-col">
                <span>Total Gross Patron Value</span>
                <h3>₹{totalRevenue.toLocaleString('en-IN')}</h3>
              </div>
              <div className="dbt-summary-col">
                <span>Platform Deductions</span>
                <h3 className="text-forest">₹0.00 (0.00%)</h3>
              </div>
              <div className="dbt-summary-col">
                <span>Total Net Direct Disbursed</span>
                <h3 className="text-forest">₹{totalRevenue.toLocaleString('en-IN')}</h3>
              </div>
            </div>

            <div className="artist-products-table-wrap">
              <table className="artist-data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Transaction Ref</th>
                    <th>Transaction Type</th>
                    <th>Gross</th>
                    <th>Fee</th>
                    <th>Net Disbursed</th>
                    <th>Mode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10 Sep 2026</td>
                    <td className="font-mono text-sm">DBT-IN-98124</td>
                    <td>Handcrafted Artifact Purchase</td>
                    <td>₹4,500</td>
                    <td className="text-forest">₹0</td>
                    <td className="font-bold text-forest">₹4,500</td>
                    <td>NEFT / e-Shram KYC</td>
                  </tr>
                  <tr>
                    <td>08 Sep 2026</td>
                    <td className="font-mono text-sm">DBT-IN-97811</td>
                    <td>Masterclass Enrollment (4 Seats)</td>
                    <td>₹10,000</td>
                    <td className="text-forest">₹0</td>
                    <td className="font-bold text-forest">₹10,000</td>
                    <td>UPI Instant Disbursal</td>
                  </tr>
                  <tr>
                    <td>01 Sep 2026</td>
                    <td className="font-mono text-sm">DBT-IN-96502</td>
                    <td>Handcrafted Artifact Purchase</td>
                    <td>₹3,200</td>
                    <td className="text-forest">₹0</td>
                    <td className="font-bold text-forest">₹3,200</td>
                    <td>NEFT / e-Shram KYC</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ─── Add Product Modal ────────────────────────────────────────────── */}
      <Modal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        title="Add Handcrafted Artifact to Public Marketplace"
        maxWidth="680px"
      >
        <form onSubmit={handleCreateProduct} className="modal-form">
          <div className="form-group">
            <label>Artifact Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Madhubani Kohbar Wedding Mural Canvas"
              value={newProductForm.name}
              onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Category *</label>
              <select
                value={newProductForm.category}
                onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                className="form-select"
              >
                <option value="Traditional Painting">Traditional Painting</option>
                <option value="Ceramics & Pottery">Ceramics & Pottery</option>
                <option value="Heritage Textiles">Heritage Textiles</option>
                <option value="Lost-Wax Metallurgy">Lost-Wax Metallurgy</option>
                <option value="Tribal Indigenous Art">Tribal Indigenous Art</option>
                <option value="Sustainable Fiber & Woodcraft">Sustainable Fiber & Woodcraft</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price (₹ INR) *</label>
              <input
                type="number"
                required
                placeholder="2500"
                value={newProductForm.price}
                onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Traditional Organic Materials (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Hand-spun khadi canvas, Indigo extract, Lampblack, Cow dung base"
              value={newProductForm.materials}
              onChange={(e) => setNewProductForm({ ...newProductForm, materials: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Product Photography URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={newProductForm.image}
              onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Cultural Provenance & Spiritual Story</label>
            <textarea
              rows={3}
              placeholder="Explain the generational symbolism, ritual occasion, and sacred motifs..."
              value={newProductForm.story}
              onChange={(e) => setNewProductForm({ ...newProductForm, story: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={() => setIsAddProductModalOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Publish Artifact to Marketplace
            </button>
          </div>
        </form>
      </Modal>

      {/* ─── Add Workshop Modal ───────────────────────────────────────────── */}
      <Modal
        isOpen={isAddWorkshopModalOpen}
        onClose={() => setIsAddWorkshopModalOpen(false)}
        title="Schedule Live Cultural Masterclass"
        maxWidth="680px"
      >
        <form onSubmit={handleCreateWorkshop} className="modal-form">
          <div className="form-group">
            <label>Masterclass Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Masterclass in Traditional Natural Pigments & Kachni Line-Art"
              value={newWorkshopForm.title}
              onChange={(e) => setNewWorkshopForm({ ...newWorkshopForm, title: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                required
                value={newWorkshopForm.date}
                onChange={(e) => setNewWorkshopForm({ ...newWorkshopForm, date: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Duration *</label>
              <input
                type="text"
                placeholder="2 Days Atelier"
                value={newWorkshopForm.duration}
                onChange={(e) => setNewWorkshopForm({ ...newWorkshopForm, duration: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Price (₹ INR) *</label>
              <input
                type="number"
                required
                placeholder="2500"
                value={newWorkshopForm.price}
                onChange={(e) => setNewWorkshopForm({ ...newWorkshopForm, price: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Maximum Seats Capacity *</label>
            <input
              type="number"
              required
              placeholder="12"
              value={newWorkshopForm.capacity}
              onChange={(e) => setNewWorkshopForm({ ...newWorkshopForm, capacity: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Workshop Cover Image URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={newWorkshopForm.image}
              onChange={(e) => setNewWorkshopForm({ ...newWorkshopForm, image: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Syllabus & Technique Overview</label>
            <textarea
              rows={3}
              placeholder="What will learners discover and create during this masterclass?"
              value={newWorkshopForm.description}
              onChange={(e) => setNewWorkshopForm({ ...newWorkshopForm, description: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={() => setIsAddWorkshopModalOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Schedule & Open Registration
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ArtistDashboard;
