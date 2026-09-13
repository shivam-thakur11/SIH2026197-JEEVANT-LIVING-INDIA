import { Link } from 'react-router-dom';
import { MapPin, Star, Award, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

/**
 * ArtistCard — Premium human-centric artisan card.
 * Features large portrait photo, floating GI verified badge, craft pill,
 * location, short story snippet, experience, rating, and "View Artisan" CTA.
 */
const ArtistCard = ({ artist }) => {
  const isVerified =
    artist.status === 'Verified' ||
    artist.verificationStatus === 'approved' ||
    artist.verificationStatus === 'verified';

  const artisanId = artist.id || artist._id;

  return (
    <div className="premium-artisan-card">
      {/* Large Portrait Image Wrap */}
      <div className="artisan-portrait-container">
        <Link to={`/artists/${artisanId}`} className="artisan-portrait-link">
          <img
            src={artist.image || artist.avatar || artist.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80'}
            alt={artist.name}
            className="artisan-portrait-photo"
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                artist.name
              )}&background=14532d&color=fff&size=300`;
            }}
          />
        </Link>
        <div className="artisan-portrait-gradient" />

        {/* Verified Badge */}
        {isVerified && (
          <div className="artisan-verified-stamp" title="Official GI-Tagged Master Artisan">
            <CheckCircle2 size={13} />
            <span>Verified Master</span>
          </div>
        )}

        {/* Experience Pill */}
        <span className="artisan-lineage-pill">
          {artist.experience || 'Generational Lineage'}
        </span>
      </div>

      {/* Artisan Details */}
      <div className="artisan-card-content">
        <div className="artisan-craft-row">
          <span className="artisan-craft-badge">{artist.craft}</span>
          <div className="artisan-rating-pill">
            <Star size={12} fill="#c8952a" color="#c8952a" />
            <span>{artist.rating || '4.9'}</span>
          </div>
        </div>

        <h3 className="artisan-card-name">
          <Link to={`/artists/${artisanId}`}>{artist.name}</Link>
        </h3>

        <div className="artisan-card-location">
          <MapPin size={13} />
          <span>{artist.region || artist.state || 'India'}</span>
        </div>

        {/* Authentic Short Story Quote */}
        <p className="artisan-short-story">
          "{artist.bio
            ? artist.bio.length > 115
              ? `${artist.bio.slice(0, 115)}...`
              : artist.bio
            : 'Carrying forward centuries of ancestral craft wisdom and sacred natural pigment preparations.'}"
        </p>

        {artist.awards && (
          <div className="artisan-honor-chip">
            <Award size={12} />
            <span>{artist.awards.split(',')[0]}</span>
          </div>
        )}

        <div className="artisan-card-footer">
          <Link
            to={`/artists/${artisanId}`}
            className="btn btn-outline btn-block btn-artisan-view"
          >
            <span>View Artisan</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
