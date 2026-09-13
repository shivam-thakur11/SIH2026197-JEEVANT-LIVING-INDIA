import { Link } from 'react-router-dom';
import { MapPin, Users, Bookmark, CheckCircle2, History, Layers } from 'lucide-react';
import { useApp } from '../../context/AdminContext';

const TraditionCard = ({ tradition }) => {
  const { toggleSaveCulture, isCultureSaved } = useApp();
  const isSaved = isCultureSaved(tradition.id);

  const getRiskClass = (color) => {
    switch (color) {
      case 'verified':
      case 'green':
        return 'risk-badge-stable';
      case 'pending':
      case 'gold':
        return 'risk-badge-vulnerable';
      case 'rejected':
      case 'red':
        return 'risk-badge-endangered';
      default:
        return 'risk-badge-stable';
    }
  };

  return (
    <div className="tradition-directory-card">
      <div className="tradition-card-header">
        <span className={`tradition-risk-badge ${getRiskClass(tradition.riskColor)}`}>
          {tradition.riskLevel}
        </span>
        <button
          className={`tradition-save-btn ${isSaved ? 'active' : ''}`}
          onClick={() => toggleSaveCulture(tradition.id)}
          title={isSaved ? 'Remove from saved' : 'Save tradition'}
        >
          <Bookmark size={15} fill={isSaved ? '#c85a32' : 'none'} color={isSaved ? '#c85a32' : 'currentColor'} />
        </button>
      </div>

      <h4 className="tradition-name">
        <Link to={`/explore?state=${encodeURIComponent(tradition.state)}`}>
          {tradition.name}
        </Link>
      </h4>

      <div className="tradition-meta-row">
        <div className="tradition-state">
          <MapPin size={12} />
          <span>{tradition.state}</span>
        </div>
        <span className="tradition-category">{tradition.category}</span>
      </div>

      <div className="tradition-details-block">
        {tradition.antiquity && (
          <div className="tradition-detail-line">
            <History size={12} />
            <span><strong>Antiquity:</strong> {tradition.antiquity}</span>
          </div>
        )}
        {tradition.materials && (
          <div className="tradition-detail-line">
            <Layers size={12} />
            <span><strong>Materials:</strong> {tradition.materials}</span>
          </div>
        )}
      </div>

      <div className="tradition-card-footer">
        <div className="tradition-gi-status" title={tradition.giStatus}>
          <CheckCircle2 size={12} className="text-forest" />
          <span>{tradition.giStatus.split(' ')[0]}</span>
        </div>
        <div className="tradition-artisans-count">
          <Users size={12} />
          <span>{tradition.activeArtisans} practitioners</span>
        </div>
      </div>
    </div>
  );
};

export default TraditionCard;
