import { CheckCircle2, Clock, XCircle, AlertTriangle } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const getBadgeConfig = () => {
    switch (status?.toLowerCase()) {
      case 'verified':
      case 'active':
      case 'disbursed':
      case 'confirmed':
      case 'completed':
      case 'published':
        return {
          className: 'badge-verified',
          icon: <CheckCircle2 size={12} strokeWidth={2.5} />
        };
      case 'pending':
      case 'processing':
      case 'upcoming':
      case 'vulnerable':
        return {
          className: 'badge-pending',
          icon: <Clock size={12} strokeWidth={2.5} />
        };
      case 'rejected':
      case 'inactive':
      case 'flagged':
      case 'critically endangered':
        return {
          className: 'badge-rejected',
          icon: <XCircle size={12} strokeWidth={2.5} />
        };
      case 'full':
        return {
          className: 'badge-active',
          icon: <AlertTriangle size={12} strokeWidth={2.5} />
        };
      default:
        return {
          className: 'badge-active',
          icon: <CheckCircle2 size={12} strokeWidth={2.5} />
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <span className={`badge ${config.className}`}>
      {config.icon}
      <span>{status}</span>
    </span>
  );
};

export default StatusBadge;
