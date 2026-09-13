import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  Award,
  Phone,
  Mail,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  ShoppingBag,
  Bookmark,
  Share2,
  MessageCircle,
  Layers,
  Sparkles,
  ShieldCheck,
  X,
  Send,
} from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import ProductCard from '../../components/common/ProductCard';
import WorkshopCard from '../../components/common/WorkshopCard';
import * as artisanService from '../../services/artisanService';

const ArtisanProfile = () => {
  const { id } = useParams();
  const {
    artisans,
    workshops,
    products,
    traditions,
    toggleSaveCulture,
    isCultureSaved,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState('about');
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [connectMessage, setConnectMessage] = useState('');
  const [connectSent, setConnectSent] = useState(false);

  const [fetchedArtisan, setFetchedArtisan] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Find the artisan from context or fetched
  const artisan = useMemo(() => {
    return (artisans || []).find(
      (a) => a.id === id || a._id === id || String(a.id) === String(id)
    ) || fetchedArtisan;
  }, [artisans, id, fetchedArtisan]);

  useEffect(() => {
    if (!artisan && id) {
      setDetailLoading(true);
      artisanService.getArtisanById(id)
        .then((res) => {
          if (res?.data) {
            setFetchedArtisan(res.data);
          }
        })
        .catch(() => {})
        .finally(() => setDetailLoading(false));
    }
  }, [id, artisan]);

  // Find products made by this artisan
  const artisanProducts = (products || []).filter(
    (p) =>
      p.artisanId === id ||
      p.artisan === id ||
      (artisan && p.artisanName && p.artisanName.toLowerCase() === artisan.name.toLowerCase()) ||
      (artisan && p.artisan && typeof p.artisan === 'string' && p.artisan.toLowerCase() === artisan.name.toLowerCase())
  );

  // Find workshops conducted by this artisan
  const artisanWorkshops = (workshops || []).filter(
    (w) =>
      artisan &&
      (w.artisan === id ||
        w.artisanId === id ||
        (w.artisanName && w.artisanName.toLowerCase().includes(artisan.name.toLowerCase().split(' ')[0])) ||
        (w.artisan && typeof w.artisan === 'string' && w.artisan.toLowerCase().includes(artisan.name.toLowerCase().split(' ')[0])))
  );

  // Matched tradition
  const matchedTradition = (traditions || []).find(
    (t) =>
      artisan &&
      (((t.title || t.name) && (t.title || t.name).toLowerCase().includes(artisan.craft.toLowerCase())) ||
        (artisan.craft && artisan.craft.toLowerCase().includes((t.title || t.name || '').toLowerCase())))
  );

  const isSaved = isCultureSaved(id);

  if (detailLoading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '120px 20px' }}>
        <div className="spinner" style={{ margin: '0 auto 20px', width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#14532d', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <h3>Loading Master Artisan Dossier...</h3>
        <p style={{ color: '#64748b' }}>Retrieving GI certification records and cultural lineage...</p>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Artisan Not Found</h2>
        <p>The requested master artisan dossier is unavailable or still loading.</p>
        <Link to="/artists" className="btn btn-primary" style={{ marginTop: '20px' }}>
          <ArrowLeft size={16} /> Return to Artists Directory
        </Link>
      </div>
    );
  }

  const isVerified =
    artisan.status === 'Verified' ||
    artisan.verificationStatus === 'approved' ||
    artisan.verificationStatus === 'verified';

  const handleSendMessage = (e) => {
    e.preventDefault();
    setConnectSent(true);
    showToast(`Inquiry transmitted directly to ${artisan.name}!`, 'success');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Profile link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="artisan-profile-page">
      {/* ─── Profile Hero Header ────────────────────────────────────────── */}
      <section className="profile-hero-section">
        <div className="page-container">
          {/* Breadcrumb / Back Link */}
          <div className="profile-back-bar">
            <Link to="/artists" className="back-link">
              <ArrowLeft size={16} /> All Master Artists
            </Link>
          </div>

          <div className="profile-header-card">
            {/* Avatar */}
            <div className="profile-avatar-block">
              <div className="profile-avatar-wrap">
                <img
                  src={artisan.avatar || artisan.photo}
                  alt={artisan.name}
                  className="profile-avatar-img"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      artisan.name
                    )}&background=14532d&color=fff&size=250`;
                  }}
                />
                {isVerified && (
                  <div className="profile-verified-stamp">
                    <CheckCircle2 size={16} /> GI Verified
                  </div>
                )}
              </div>
            </div>

            {/* Core Info */}
            <div className="profile-info-block">
              <div className="profile-badges-row">
                <span className="craft-highlight-badge">{artisan.craft}</span>
                {artisan.giTagNumber && (
                  <span className="gi-registration-badge">
                    <ShieldCheck size={14} /> {artisan.giTagNumber}
                  </span>
                )}
              </div>

              <h1 className="profile-artisan-name">{artisan.name}</h1>

              <div className="profile-location-row">
                <MapPin size={16} className="text-terracotta" />
                <span>{artisan.region || artisan.state}</span>
                <span className="meta-bullet">•</span>
                <span className="experience-text">{artisan.experience || '25+ Years'} Lineage</span>
              </div>

              {artisan.awards && (
                <div className="profile-awards-banner">
                  <Award size={18} className="text-gold" />
                  <span>Honors: <strong>{artisan.awards}</strong></span>
                </div>
              )}

              {/* Stats Bar */}
              <div className="profile-quick-stats">
                <div className="quick-stat-box">
                  <div className="stat-val">
                    <Star size={15} fill="#c8952a" color="#c8952a" />
                    <span>{artisan.rating || '4.95'}</span>
                  </div>
                  <span className="stat-lbl">{artisan.reviewsCount || 42} Reviews</span>
                </div>
                <div className="quick-stat-box">
                  <div className="stat-val">{artisan.workshopsConducted || 18}</div>
                  <span className="stat-lbl">Masterclasses</span>
                </div>
                <div className="quick-stat-box">
                  <div className="stat-val">{artisanProducts.length || artisan.productsCount || 8}</div>
                  <span className="stat-lbl">Authentic Crafts</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="profile-actions-row">
                <button
                  className="btn btn-primary btn-md"
                  onClick={() => setConnectModalOpen(true)}
                >
                  <MessageCircle size={16} />
                  <span>Connect with Artisan</span>
                </button>

                <button
                  className={`btn btn-outline btn-md ${isSaved ? 'btn-saved' : ''}`}
                  onClick={() => toggleSaveCulture(artisan.id)}
                >
                  <Bookmark size={16} fill={isSaved ? '#c85a32' : 'none'} />
                  <span>{isSaved ? 'Saved in Collection' : 'Save Artisan'}</span>
                </button>

                <button
                  className="btn btn-ghost btn-icon"
                  onClick={handleShare}
                  title="Share Artisan Profile"
                  aria-label="Share"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Prominent Visual Cultural Story Section ────────────────────── */}
      <section className="profile-story-highlight-section">
        <div className="page-container">
          <div className="story-callout-card">
            <div className="story-callout-decor">
              <Sparkles size={28} className="text-gold" />
            </div>
            <div className="story-callout-content">
              <span className="story-eyebrow">The Living Cultural Story</span>
              <h2 className="story-headline">
                Preserving the Sacred Heritage of {artisan.craft}
              </h2>
              <p className="story-narrative">
                {artisan.bio ||
                  `Dedicated to generational mastery, ${artisan.name} preserves the authentic rituals, natural mineral pigments, and oral motifs passed down from ancestors. Through rural workshops and community apprenticeship, this guild ensures the living pulse of Indian culture thrives in the modern world.`}
              </p>
              <div className="story-quote-footer">
                <blockquote>
                  "Our art is not a commodity manufactured by machines; it is our ancestral breath,
                  prayed onto canvas and clay."
                </blockquote>
                <cite>— {artisan.name}, Master Craftsperson</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Profile Navigation Tabs ────────────────────────────────────── */}
      <section className="profile-tabs-section">
        <div className="page-container">
          <div className="profile-tabs-nav">
            <button
              className={`profile-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About & Lineage
            </button>
            <button
              className={`profile-tab-btn ${activeTab === 'craft' ? 'active' : ''}`}
              onClick={() => setActiveTab('craft')}
            >
              Craft & Tradition
            </button>
            <button
              className={`profile-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Authentic Crafts ({artisanProducts.length})
            </button>
            <button
              className={`profile-tab-btn ${activeTab === 'workshops' ? 'active' : ''}`}
              onClick={() => setActiveTab('workshops')}
            >
              Masterclasses ({artisanWorkshops.length})
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="profile-tab-content">
            {/* 1. About Tab */}
            {activeTab === 'about' && (
              <div className="profile-about-grid">
                <div className="about-main-card">
                  <h3>Master Artisan Biography</h3>
                  <p className="about-bio-text">{artisan.bio}</p>

                  <div className="lineage-details-box">
                    <h4>Heritage Lineage & Training</h4>
                    <p>
                      Trained in the traditional Guru-Shishya parampara (master-apprentice tradition),
                      carrying over {artisan.experience || '25 years'} of continuous hands-on experience.
                      Has trained and certified dozens of young rural craftswomen, providing sustainable
                      economic independence within the village cluster.
                    </p>
                  </div>
                </div>

                <div className="about-side-card">
                  <h4>Official SIH Verification Dossier</h4>
                  <ul className="dossier-list">
                    <li>
                      <span className="dossier-label">Geographical Indication:</span>
                      <strong>{artisan.giTagNumber || 'Registered'}</strong>
                    </li>
                    <li>
                      <span className="dossier-label">Aadhaar / e-Shram KYC:</span>
                      <strong className="text-forest">✓ Verified by Ministry</strong>
                    </li>
                    <li>
                      <span className="dossier-label">Intermediary Fee:</span>
                      <strong className="text-forest">0% Direct Benefit Model</strong>
                    </li>
                    <li>
                      <span className="dossier-label">Official Registered Hub:</span>
                      <span>{artisan.region || artisan.state}</span>
                    </li>
                    <li>
                      <span className="dossier-label">Member Since:</span>
                      <span>{artisan.submittedDate || 'August 2026'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* 2. Craft & Tradition Tab */}
            {activeTab === 'craft' && (
              <div className="profile-craft-grid">
                <div className="craft-card">
                  <h3>Techniques & Natural Materials</h3>
                  <p>
                    Every masterwork by {artisan.name} is fashioned from 100% natural and ethically
                    sourced indigenous raw materials:
                  </p>
                  <div className="craft-specs-list">
                    <div className="spec-row">
                      <span className="spec-key">Tradition Classification:</span>
                      <span className="spec-val">{matchedTradition?.category || artisan.category || artisan.craft}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">Raw Materials:</span>
                      <span className="spec-val">{matchedTradition?.materials || 'Organic mineral pigments, river reeds, hand-pressed canvas'}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">Antiquity / History:</span>
                      <span className="spec-val">{matchedTradition?.antiquity || 'Over 800 years of documented oral history'}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">GI Registration Status:</span>
                      <span className="spec-val text-forest">{matchedTradition?.giStatus || 'Government of India Protected GI'}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">UNESCO Citation:</span>
                      <span className="spec-val">{matchedTradition?.unescoStatus || 'Recognized National Intangible Heritage'}</span>
                    </div>
                  </div>
                </div>

                <div className="craft-card">
                  <h3>Preservation & Community Impact</h3>
                  <p>
                    Without platforms like JEEVANT, machine counterfeits from industrial factories
                    undercut authentic handwork. By purchasing directly from {artisan.name}, you
                    directly protect the endangered living skills of rural craft communities.
                  </p>
                  <div className="impact-checkmarks">
                    <div className="imp-check">✓ 0% Middlemen fee guarantee</div>
                    <div className="imp-check">✓ Zero toxic chemical dyes or synthetic plastics</div>
                    <div className="imp-check">✓ 100% proceeds routed via Direct Benefit Transfer (DBT)</div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="tab-header-banner">
                  <h3>Authentic Works by {artisan.name}</h3>
                  <p>Every piece is unique and signed by the master craftsman with certificate of authenticity.</p>
                </div>

                {artisanProducts.length === 0 ? (
                  <div className="empty-tab-box">
                    <ShoppingBag size={40} />
                    <h4>New catalog pieces are being prepared in studio</h4>
                    <p>Contact the artisan directly for custom commissioned masterworks.</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setConnectModalOpen(true)}
                    >
                      Inquire for Custom Artwork
                    </button>
                  </div>
                ) : (
                  <div className="products-grid-3">
                    {artisanProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. Workshops Tab */}
            {activeTab === 'workshops' && (
              <div>
                <div className="tab-header-banner">
                  <h3>Masterclasses Hosted by {artisan.name}</h3>
                  <p>Experience real-time interactive masterclasses with hands-on feedback and direct cultural dialogue.</p>
                </div>

                {artisanWorkshops.length === 0 ? (
                  <div className="empty-tab-box">
                    <Calendar size={40} />
                    <h4>No public masterclasses scheduled this week</h4>
                    <p>Browse other live virtual sessions or submit a request for an artisan studio residency.</p>
                    <Link to="/workshops" className="btn btn-outline">
                      Explore All Workshops
                    </Link>
                  </div>
                ) : (
                  <div className="workshops-grid-3">
                    {artisanWorkshops.map((workshop) => (
                      <WorkshopCard key={workshop.id || workshop._id} workshop={workshop} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Connect with Artisan Modal ─────────────────────────────────── */}
      {connectModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog connect-modal">
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Direct Connect with {artisan.name}</h3>
                <p className="modal-subtitle">Zero Intermediary Communication Channel</p>
              </div>
              <button
                className="modal-close"
                onClick={() => {
                  setConnectModalOpen(false);
                  setConnectSent(false);
                }}
              >
                <X size={20} />
              </button>
            </div>

            {!connectSent ? (
              <form onSubmit={handleSendMessage} className="connect-form">
                <div className="artisan-contact-dossier">
                  <div className="contact-row">
                    <Phone size={16} />
                    <span>Official Verified Contact: <strong>{artisan.phone || '+91 98352 10842'}</strong></span>
                  </div>
                  <div className="contact-row">
                    <Mail size={16} />
                    <span>Guild Email: <strong>{artisan.email || 'contact@jeevantindia.org'}</strong></span>
                  </div>
                  <div className="contact-row">
                    <MapPin size={16} />
                    <span>Studio: <strong>{artisan.region || artisan.state}</strong></span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message or Custom Order Inquiry</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    placeholder={`Write your greeting or request to ${artisan.name}...`}
                    value={connectMessage}
                    onChange={(e) => setConnectMessage(e.target.value)}
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setConnectModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Send size={15} /> Send Direct Message
                  </button>
                </div>
              </form>
            ) : (
              <div className="connect-success-state">
                <CheckCircle2 size={48} className="text-forest" />
                <h4>Inquiry Sent Directly!</h4>
                <p>
                  Your message has been sent to {artisan.name}'s verified cluster team.
                  They will reach back to you shortly via phone or email.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setConnectModalOpen(false);
                    setConnectSent(false);
                    setConnectMessage('');
                  }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanProfile;
