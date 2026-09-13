
export const StatCard = ({
  title,
  value,
  trend,
  trendPositive = true,
  trendWarning = false,
  icon: Icon,
  accentColor = '#1a3826',
  iconBg = '#f0f7f2'
}) => {
  return (
    <div
      className="stat-card"
      style={{
        '--stat-accent': accentColor,
        '--stat-icon-bg': iconBg
      }}
    >
      <div className="stat-info">
        <span className="stat-label">{title}</span>
        <span className="stat-value">{value}</span>
        {trend && (
          <span
            className={`stat-trend ${
              trendWarning ? 'warning' : trendPositive ? 'positive' : ''
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      {Icon && (
        <div className="stat-icon-wrapper">
          <Icon size={24} strokeWidth={2.2} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
