import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Video,
  Award,
  BookOpen,
  Sparkles,
  QrCode,
  X,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import * as workshopService from '../../services/workshopService';

const WorkshopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    workshops,
    artisans,
    bookWorkshop,
    currentUser,
    isAuthenticated,
    showToast,
  } = useApp();

  const [fetchedWorkshop, setFetchedWorkshop] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const workshop = useMemo(() => {
    return (workshops || []).find((w) => w.id === id || w._id === id) || fetchedWorkshop;
  }, [workshops, id, fetchedWorkshop]);

  useEffect(() => {
    if (!workshop && id) {
      setDetailLoading(true);
      workshopService.getWorkshopById(id)
        .then((res) => {
          if (res?.data) {
            setFetchedWorkshop(res.data);
          }
        })
        .catch(() => {})
        .finally(() => setDetailLoading(false));
    }
  }, [id, workshop]);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [attendeeName, setAttendeeName] = useState(currentUser?.name || '');
  const [attendeeEmail, setAttendeeEmail] = useState(currentUser?.email || '');

  // Associated artisan
  const artisan = useMemo(() => {
    if (!workshop) return null;
    return (artisans || []).find(
      (a) =>
        (a.id || a._id) === workshop.artisan ||
        (a.id || a._id) === workshop.artisanId ||
        (a.name && workshop.artisanName && a.name.toLowerCase() === workshop.artisanName.toLowerCase()) ||
        (a.name && workshop.artisan && typeof workshop.artisan === 'string' && a.name.toLowerCase() === workshop.artisan.toLowerCase()) ||
        (a.craft && workshop.craft && a.craft.toLowerCase() === workshop.craft.toLowerCase())
    );
  }, [workshop, artisans]);

  if (detailLoading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '120px 20px' }}>
        <div className="spinner" style={{ margin: '0 auto 20px', width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#14532d', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <h3>Loading Masterclass Details...</h3>
        <p style={{ color: '#64748b' }}>Connecting to master artisan studio schedule...</p>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Masterclass Not Found</h2>
        <p>The requested cultural workshop could not be located or is still loading.</p>
        <Link to="/workshops" className="btn btn-primary" style={{ marginTop: '20px' }}>
          <ArrowLeft size={16} /> Return to Workshops
        </Link>
      </div>
    );
  }

  const seatsBooked = workshop.seatsBooked || 0;
  const seatsTotal = workshop.seatsTotal || 50;
  const seatsLeft = Math.max(0, seatsTotal - seatsBooked);
  const percentFilled = Math.min(100, Math.round((seatsBooked / seatsTotal) * 100));

  const isVirtual = (workshop.mode || '').toLowerCase().includes('virtual');

  const curriculumPoints = [
    'Cultural origin & ritual antiquity of the craft motifs',
    'Traditional preparation of natural mineral and vegetal pigments',
    'Hands-on brushwork and quill stroke exercises under master observation',
    'Creation of a complete authentic art piece on traditional primed canvas',
    'Live Q&A and cultural preservation dialogue directly with the artisan',
    'Downloadable official SIH Verified Certificate of Completion',
  ];

  const handleOpenBooking = () => {
    // If not logged in, prompt or allow quick login / redirect
    if (!currentUser && !isAuthenticated) {
      navigate(`/login?redirect=/workshops/${id}`);
      return;
    }
    setAttendeeName(currentUser?.name || 'Aarav Sharma');
    setAttendeeEmail(currentUser?.email || 'learner@jeevant.org');
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    const result = await bookWorkshop(workshop, {
      name: attendeeName,
      email: attendeeEmail,
    });
    setConfirmedBooking(result);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Workshop link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="workshop-detail-page">
      <div className="page-container">
        {/* Back Link */}
        <div className="detail-breadcrumb-bar">
          <Link to="/workshops" className="detail-breadcrumb-link">
            <ArrowLeft size={15} /> All Masterclasses
          </Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{workshop.title}</span>
        </div>

        {/* Masterclass Showcase Hero */}
        <div className="workshop-detail-grid">
          {/* Main Content Column */}
          <div className="workshop-main-column">
            <div className="workshop-mode-badge-row">
              <span className="workshop-detail-mode-pill">
                {isVirtual ? <Video size={14} /> : <MapPin size={14} />}
                <span>{workshop.mode || 'Live Virtual Studio'}</span>
              </span>
              <span className="workshop-craft-tag">{workshop.craft}</span>
              <button
                className="workshop-share-btn"
                onClick={handleShare}
                title="Share Masterclass"
                aria-label="Share"
              >
                <Share2 size={16} />
              </button>
            </div>

            <h1 className="workshop-detail-title">{workshop.title}</h1>

            <div className="workshop-instructor-lead">
              <span>Taught by Master Artisan </span>
              {artisan ? (
                <Link to={`/artists/${artisan.id || artisan._id}`} className="instructor-link">
                  <strong>{workshop.artisan}</strong>
                  <CheckCircle2 size={15} className="text-forest" />
                </Link>
              ) : (
                <strong>{workshop.artisan}</strong>
              )}
            </div>

            {/* Description */}
            <div className="workshop-desc-block">
              <h3>About this Masterclass</h3>
              <p>
                Step inside the authentic studio of master craftsperson {workshop.artisan}.
                This interactive masterclass bridges centuries-old folk wisdom with modern virtual
                classrooms, offering a rare opportunity to learn intricate craft techniques through
                hands-on guidance.
              </p>
              <p>
                Unlike pre-recorded video tutorials, JEEVANT masterclasses are live, intimate
                sessions where students ask questions, receive real-time stroke feedback, and gain
                direct insight into intangible Indian cultural heritage.
              </p>
            </div>

            {/* What You Will Learn */}
            <div className="workshop-curriculum-block">
              <h3>What You Will Learn</h3>
              <div className="curriculum-list">
                {curriculumPoints.map((point, index) => (
                  <div key={index} className="curriculum-item">
                    <CheckCircle2 size={18} className="curriculum-check" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About the Artisan Card */}
            <div className="workshop-artisan-spotlight">
              <h3>About the Artisan</h3>
              <div className="artisan-bio-card">
                <img
                  src={artisan?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'}
                  alt={workshop.artisan}
                  className="artisan-spotlight-photo"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(workshop.artisan)}&background=14532d&color=fff`;
                  }}
                />
                <div className="artisan-spotlight-text">
                  <div className="spotlight-title-line">
                    <h4>{workshop.artisan}</h4>
                    {artisan?.status === 'Verified' && (
                      <span className="gi-verified-tag">✓ GI Verified</span>
                    )}
                  </div>
                  <p className="spotlight-craft-meta">{workshop.craft} · {artisan?.region || 'National Master Artisan'}</p>
                  <p className="spotlight-snippet">
                    {artisan?.bio ||
                      'Generational master craftsperson dedicated to sustaining indigenous Indian arts through traditional knowledge sharing and apprenticeships.'}
                  </p>
                  {artisan?.awards && (
                    <div className="spotlight-award">
                      <Award size={14} />
                      <span>{artisan.awards}</span>
                    </div>
                  )}
                  {artisan && (
                    <Link to={`/artists/${artisan.id || artisan._id}`} className="view-profile-link">
                      View Full Dossier <ArrowRight size={13} />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Cultural Background */}
            <div className="workshop-heritage-background">
              <div className="heritage-icon-pill">
                <Sparkles size={16} />
                <span>Living Heritage Safeguarding</span>
              </div>
              <h3>Cultural Background of {workshop.craft}</h3>
              <p>
                Practiced for centuries across regional craft corridors in India, {workshop.craft} is an
                intangible heritage system rooted in deep environmental harmony. Traditional artisans use
                reclaimed organic materials and ritual motifs that celebrate agricultural harvests, celestial
                seasons, and ancient sacred folklore.
              </p>
              <div className="dbt-safeguard-banner">
                <ShieldCheck size={20} />
                <div>
                  <strong>Direct Benefit Guarantee</strong>
                  <p>100% of masterclass enrollment fees are disbursed directly to {workshop.artisan} with 0% platform fee.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Booking Sidebar Card */}
          <aside className="workshop-booking-sidebar">
            <div className="booking-card-sticky">
              <div className="booking-card-top">
                <span className="booking-fee-label">Enrollment Fee</span>
                <div className="booking-fee-amount">{workshop.fee || '₹899'}</div>
                <div className="fee-dbt-pill">0% Platform Fee · Direct DBT</div>
              </div>

              {/* Date, Time & Logistics */}
              <div className="booking-logistics-list">
                <div className="logistic-item">
                  <Calendar size={18} className="text-gold" />
                  <div>
                    <strong>Date</strong>
                    <span>{workshop.date}</span>
                  </div>
                </div>

                <div className="logistic-item">
                  <Clock size={18} className="text-forest" />
                  <div>
                    <strong>Session Time</strong>
                    <span>{workshop.time || '11:00 AM - 01:30 PM IST'}</span>
                  </div>
                </div>

                <div className="logistic-item">
                  <Video size={18} className="text-terracotta" />
                  <div>
                    <strong>Format</strong>
                    <span>{workshop.mode || 'Live Virtual Studio (HD)'}</span>
                  </div>
                </div>
              </div>

              {/* Seats Progress */}
              <div className="booking-seats-block">
                <div className="seats-text-line">
                  <div className="seats-count-wrap">
                    <Users size={16} />
                    <span>
                      {seatsLeft === 0 ? (
                        <strong className="text-red">Class Sold Out</strong>
                      ) : (
                        <strong>{seatsLeft} Seats Remaining</strong>
                      )}
                    </span>
                  </div>
                  <span>Total {seatsTotal}</span>
                </div>
                <div className="seats-track">
                  <div
                    className="seats-bar-fill"
                    style={{ width: `${percentFilled}%` }}
                  />
                </div>
              </div>

              {/* Booking CTA Button */}
              <button
                className="btn btn-primary btn-block btn-large"
                onClick={handleOpenBooking}
                disabled={seatsLeft === 0}
              >
                {seatsLeft === 0 ? 'Waitlist Full' : 'Book Masterclass Pass'}
              </button>

              <div className="booking-guarantee-footer">
                <CheckCircle2 size={15} />
                <span>Instant confirmation pass with video studio access</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ─── Interactive Booking Pass Modal ─────────────────────────────── */}
      {bookingModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog booking-pass-modal">
            {!confirmedBooking ? (
              <>
                <div className="modal-header">
                  <div>
                    <h3 className="modal-title">Book Masterclass Pass</h3>
                    <p className="modal-subtitle">{workshop.title}</p>
                  </div>
                  <button
                    className="modal-close"
                    onClick={() => setBookingModalOpen(false)}
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleConfirmBooking} className="booking-modal-form">
                  <div className="booking-pass-preview-card">
                    <div className="preview-row">
                      <span>Instructor:</span>
                      <strong>{workshop.artisan}</strong>
                    </div>
                    <div className="preview-row">
                      <span>Date & Time:</span>
                      <strong>{workshop.date} · {workshop.time}</strong>
                    </div>
                    <div className="preview-row">
                      <span>Enrollment Fee:</span>
                      <strong className="text-forest">{workshop.fee} (Zero Platform Deductions)</strong>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Attendee Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Attendee Email (Pass & Studio Link Delivery)</label>
                    <input
                      type="email"
                      className="form-input"
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-notice">
                    <ShieldCheck size={16} />
                    <span>Proceeds disburse immediately to {workshop.artisan}'s verified cluster account.</span>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setBookingModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Confirm & Generate Pass ({workshop.fee})
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="booking-pass-success">
                <div className="pass-card-digital">
                  <div className="pass-header">
                    <div className="pass-brand">
                      <Sparkles size={16} />
                      <span>JEEVANT MASTERCLASS PASS</span>
                    </div>
                    <div className="pass-id">{confirmedBooking.id}</div>
                  </div>

                  <div className="pass-body">
                    <h4 className="pass-title">{workshop.title}</h4>
                    <p className="pass-instructor">Led by <strong>{workshop.artisan}</strong></p>

                    <div className="pass-details-grid">
                      <div className="pass-detail">
                        <span>Date</span>
                        <strong>{workshop.date}</strong>
                      </div>
                      <div className="pass-detail">
                        <span>Time</span>
                        <strong>{workshop.time}</strong>
                      </div>
                      <div className="pass-detail">
                        <span>Format</span>
                        <strong>{workshop.mode || 'Live Virtual'}</strong>
                      </div>
                      <div className="pass-detail">
                        <span>Attendee</span>
                        <strong>{confirmedBooking.attendeeName}</strong>
                      </div>
                    </div>

                    <div className="pass-qr-row">
                      <div className="qr-box">
                        <QrCode size={56} />
                      </div>
                      <div className="qr-info">
                        <strong>Studio Verification QR</strong>
                        <p>Present this digital pass upon entering the virtual studio or physical masterclass.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pass-footer">
                    <span>100% DBT Verified · SIH 2026 PS 26197</span>
                  </div>
                </div>

                <div className="pass-actions">
                  <Link
                    to="/dashboard"
                    className="btn btn-primary"
                    onClick={() => setBookingModalOpen(false)}
                  >
                    View in My Dashboard
                  </Link>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      setBookingModalOpen(false);
                      setConfirmedBooking(null);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopDetail;
