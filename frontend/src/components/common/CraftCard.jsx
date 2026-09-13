import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

/**
 * CraftCard — Image-first card for Popular Crafts.
 * Used on Home Page, Explore Page, and Shop.
 */
const CraftCard = ({ craft }) => {
  return (
    <Link to={craft.link || `/shop?search=${encodeURIComponent(craft.name)}`} className="craft-showcase-card">
      <div className="craft-card-image-box">
        <img
          src={craft.image}
          alt={craft.name}
          className="craft-card-photo"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80';
          }}
        />
        <div className="craft-card-backdrop" />
        {craft.giTag && (
          <span className="craft-gi-stamp" title="GI Tag Registered">
            <ShieldCheck size={12} /> GI Tag
          </span>
        )}
      </div>

      <div className="craft-card-info">
        <span className="craft-region-label">{craft.state || craft.region}</span>
        <h4 className="craft-name-title">{craft.name}</h4>
        <p className="craft-one-liner">{craft.desc || craft.technique}</p>
        <div className="craft-card-foot">
          <span className="craft-items-count">{craft.count || 'Authentic Crafts'}</span>
          <span className="craft-action-icon">
            <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CraftCard;
