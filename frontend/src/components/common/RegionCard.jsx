import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * RegionCard — Premium visual card for Indian Heritage Regions & States.
 * Used in "Explore by Region" on the Home Page and Explore portal.
 */
const RegionCard = ({ region }) => {
  return (
    <Link to={`/explore?state=${encodeURIComponent(region.name)}`} className="region-visual-card">
      <div className="region-card-img-wrap">
        <img
          src={region.image}
          alt={region.name}
          className="region-card-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&auto=format&fit=crop&q=80';
          }}
        />
        <div className="region-card-overlay" />
        <span className="region-card-zone-badge">{region.zone || 'Heritage Region'}</span>
      </div>

      <div className="region-card-content">
        <div className="region-card-top-row">
          <h3 className="region-card-title">{region.name}</h3>
          <span className="region-card-crafts-pill">
            <Sparkles size={12} /> {region.craftsCount || '10+'} Crafts
          </span>
        </div>
        <p className="region-card-desc">{region.desc}</p>
        <div className="region-card-action">
          <span>Explore Traditions</span>
          <ArrowRight size={14} className="region-card-arrow" />
        </div>
      </div>
    </Link>
  );
};

export default RegionCard;
