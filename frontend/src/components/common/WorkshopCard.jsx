import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowRight, Video, MapPin, Sparkles } from 'lucide-react';

/**
 * WorkshopCard — Premium masterclass & workshop card.
 * Features photography, mode pill (Live Virtual / Studio Residency), date, time,
 * dynamic live seat availability tracking, artisan credentials, price, and "View Workshop" CTA.
 */
const WorkshopCard = ({ workshop }) => {
  const workshopId = workshop.id || workshop._id;

  const totalSeats = Number(workshop.capacity || workshop.seatsTotal || 30);
  const enrolled = Number(workshop.enrolled || workshop.seatsBooked || 0);
  const seatsAvailable = workshop.availableSeats !== undefined
    ? Number(workshop.availableSeats)
    : Math.max(0, totalSeats - enrolled);

  const percentBooked = totalSeats > 0 ? Math.min(100, Math.round(((totalSeats - seatsAvailable) / totalSeats) * 100)) : 0;
  const isFull = seatsAvailable <= 0;

  const isVirtual = (workshop.mode || '').toLowerCase().includes('virtual');

  const artisanName = workshop.artisanName || (typeof workshop.artisan === 'string' ? workshop.artisan : workshop.artisan?.name) || 'Master Craftsperson';

  const displayPrice = typeof workshop.price === 'number'
    ? workshop.price
    : parseInt(String(workshop.fee || workshop.price || '0').replace(/[^0-9]/g, ''), 10) || 0;

  return (
    <div className="premium-workshop-card">
      {/* Visual Thumbnail */}
      <div className="workshop-thumbnail-container">
        <Link to={`/workshops/${workshopId}`} className="workshop-img-link">
          <img
            src={workshop.image || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'}
            alt={workshop.title}
            className="workshop-cover-photo"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80';
            }}
          />
        </Link>

        {/* Mode Tag */}
        <div className="workshop-mode-badge">
          {isVirtual ? <Video size={12} /> : <MapPin size={12} />}
          <span>{workshop.mode || 'Live Virtual'}</span>
        </div>

        {/* Price Tag */}
        <div className="workshop-price-pill">
          {displayPrice === 0 ? 'Complimentary' : `₹${displayPrice.toLocaleString('en-IN')}`}
        </div>
      </div>

      {/* Workshop Details */}
      <div className="workshop-card-details">
        <div className="workshop-craft-header">
          <span className="workshop-craft-category">{workshop.craft || 'Living Tradition'}</span>
          <span className="workshop-sih-tag">SIH Masterclass</span>
        </div>

        <h3 className="workshop-card-title">
          <Link to={`/workshops/${workshopId}`}>{workshop.title}</Link>
        </h3>

        {/* Artisan Attribution */}
        <div className="workshop-instructor-row">
          <span className="taught-by">Conducted by </span>
          <strong className="instructor-name">{artisanName}</strong>
        </div>

        {/* Schedule & Location */}
        <div className="workshop-logistics-row">
          <div className="logistics-item">
            <Calendar size={13} />
            <span>{workshop.date || 'Upcoming'}</span>
          </div>
          <div className="logistics-item">
            <Clock size={13} />
            <span>{workshop.time ? workshop.time.split('-')[0] : '11:00 AM IST'}</span>
          </div>
        </div>

        {workshop.location && (
          <div className="workshop-location-note">
            <MapPin size={12} />
            <span>{workshop.location}</span>
          </div>
        )}

        {/* Live Seat Availability Progress */}
        <div className="workshop-seats-tracker">
          <div className="seats-counter-row">
            <span className="seats-status-text">
              <Users size={13} />
              {isFull ? (
                <strong className="text-danger">Registration Full</strong>
              ) : (
                <strong>{seatsAvailable} seat{seatsAvailable !== 1 ? 's' : ''} remaining</strong>
              )}
            </span>
            <span className="seats-percent">{percentBooked}% booked</span>
          </div>
          <div className="seats-bar-track">
            <div
              className={`seats-bar-progress ${isFull ? 'full' : percentBooked >= 80 ? 'urgent' : ''}`}
              style={{ width: `${percentBooked}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="workshop-action-footer">
          <Link
            to={`/workshops/${workshopId}`}
            className={`btn btn-block ${isFull ? 'btn-outline' : 'btn-primary'} btn-workshop-cta`}
          >
            <span>{isFull ? 'View Curriculum' : 'View Workshop & Reserve'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkshopCard;
