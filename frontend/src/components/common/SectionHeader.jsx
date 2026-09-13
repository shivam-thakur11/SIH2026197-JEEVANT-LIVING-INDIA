import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SectionHeader = ({ title, subtitle, linkTo, linkText, badgeText }) => {
  return (
    <div className="section-header-component">
      <div className="section-header-text">
        {badgeText && <span className="section-header-badge">{badgeText}</span>}
        <h2 className="section-header-title">{title}</h2>
        {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo} className="section-header-link">
          <span>{linkText || 'View All'}</span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
