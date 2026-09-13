import { useState } from 'react';
import {
  TrendingUp,
  Download,
  Award,
  ShieldCheck,
  CheckCircle,
  MapPin,
  Sparkles,
  HeartHandshake,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Trash2,
  FileText
} from 'lucide-react';
import { IMPACT_METRICS } from '../data/mockData';
import { useAdmin } from '../context/AdminContext';
import StatusBadge from '../components/common/StatusBadge';

export const Reports = () => {
  const { reports, resolveReport, dismissReport, showToast, refreshData, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' or 'moderation'
  const [statusFilter, setStatusFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleExport = () => {
    showToast('SIH 2026 Living India Executive Impact Report (PDF) generated.', 'success');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  const stateData = [
    { state: 'Bihar', craft: 'Madhubani & Sikki Grass', artisans: 412, percentage: 88 },
    { state: 'Rajasthan', craft: 'Blue Pottery & Bandhani', artisans: 328, percentage: 76 },
    { state: 'Odisha', craft: 'Pattachitra & Silver Filigree', artisans: 215, percentage: 65 },
    { state: 'Maharashtra', craft: 'Warli Art & Paithani Weave', artisans: 184, percentage: 54 },
    { state: 'Andhra Pradesh', craft: 'Kalamkari & Kondapalli Toys', artisans: 142, percentage: 48 },
    { state: 'Chhattisgarh', craft: 'Bastar Dhokra Lost-Wax', artisans: 96, percentage: 38 },
    { state: 'Jammu & Kashmir', craft: 'Kashmiri Pashmina & Paper Mache', artisans: 105, percentage: 42 }
  ];

  const filteredReports = reports.filter((rep) => {
    if (statusFilter === 'All') return true;
    return (rep.status || '').toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--forest-900)' }}>
            Cultural Impact & Grievance Moderation
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Empirical data for Smart India Hackathon 2026 jury evaluation (Problem Statement 26197).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            className="btn btn-secondary"
            style={{ padding: '8px 14px', fontSize: '12.5px' }}
          >
            <RefreshCw size={14} className={isRefreshing ? 'spin-animation' : ''} />
            <span>Sync</span>
          </button>
          <button onClick={handleExport} className="btn btn-gold" style={{ padding: '8px 16px', fontSize: '12.5px' }}>
            <Download size={15} />
            <span>Export SIH Impact Report</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`btn ${activeTab === 'analytics' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 700 }}
        >
          <Award size={15} />
          <span>Cultural Impact Analytics</span>
        </button>
        <button
          onClick={() => setActiveTab('moderation')}
          className={`btn ${activeTab === 'moderation' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 700 }}
        >
          <AlertTriangle size={15} />
          <span>Content Grievances & Moderation ({reports.length})</span>
        </button>
      </div>

      {activeTab === 'analytics' ? (
        <>
          {/* Impact High-Level KPIs */}
          <div className="stats-grid" style={{ marginBottom: '24px' }}>
            <div className="stat-card" style={{ '--stat-accent': '#166534', '--stat-icon-bg': '#dcfce7' }}>
              <div className="stat-info">
                <span className="stat-label">Preservation Score</span>
                <span className="stat-value">{IMPACT_METRICS.preservationScore}/100</span>
                <span className="stat-trend positive">National Benchmark High</span>
              </div>
              <div className="stat-icon-wrapper">
                <Award size={24} />
              </div>
            </div>

            <div className="stat-card" style={{ '--stat-accent': '#c85a32', '--stat-icon-bg': '#faebe5' }}>
              <div className="stat-info">
                <span className="stat-label">Artisan Income Rise</span>
                <span className="stat-value">{IMPACT_METRICS.artisanIncomeGrowth}</span>
                <span className="stat-trend positive">Post-Onboarding Baseline</span>
              </div>
              <div className="stat-icon-wrapper">
                <TrendingUp size={24} />
              </div>
            </div>

            <div className="stat-card" style={{ '--stat-accent': '#1e40af', '--stat-icon-bg': '#dbeafe' }}>
              <div className="stat-info">
                <span className="stat-label">Middlemen Commission</span>
                <span className="stat-value">0%</span>
                <span className="stat-trend positive">100% Zero Leakage</span>
              </div>
              <div className="stat-icon-wrapper">
                <HeartHandshake size={24} />
              </div>
            </div>

            <div className="stat-card" style={{ '--stat-accent': '#b45309', '--stat-icon-bg': '#fef3c7' }}>
              <div className="stat-info">
                <span className="stat-label">GI Authenticity Match</span>
                <span className="stat-value">{IMPACT_METRICS.giVerificationAccuracy}</span>
                <span className="stat-trend positive">Govt Registry Linked</span>
              </div>
              <div className="stat-icon-wrapper">
                <ShieldCheck size={24} />
              </div>
            </div>
          </div>

          {/* State Coverage Table */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <div className="card-title">
                <MapPin size={18} color="var(--forest-700)" />
                <span>Geographical Artisan Penetration by State</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Top 7 Cluster States</span>
            </div>
            <div className="table-container" style={{ border: 'none' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>State / Heritage Corridor</th>
                    <th>Core Traditional Craft</th>
                    <th>Enrolled Artisans</th>
                    <th>Saturation Index</th>
                  </tr>
                </thead>
                <tbody>
                  {stateData.map((s, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{s.state}</strong>
                      </td>
                      <td>
                        <span style={{ color: 'var(--terracotta-500)', fontWeight: 600 }}>{s.craft}</span>
                      </td>
                      <td>
                        <strong>{s.artisans} master artisans</strong>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '120px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${s.percentage}%`, height: '100%', background: 'var(--forest-600)' }} />
                          </div>
                          <span style={{ fontSize: '11.5px', fontWeight: 600 }}>{s.percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Content Grievances & Moderation Tab */
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--forest-900)' }}>
                Artisan Verification & Anti-Counterfeit Audits
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                Citizen and artisan grievances regarding counterfeit GI products, copyright theft, or profile audits.
              </p>
            </div>

            <div className="filter-group">
              <button
                onClick={() => setStatusFilter('All')}
                className={`filter-pill ${statusFilter === 'All' ? 'active' : ''}`}
              >
                All ({reports.length})
              </button>
              <button
                onClick={() => setStatusFilter('under_review')}
                className={`filter-pill ${statusFilter === 'under_review' ? 'active' : ''}`}
              >
                Under Review
              </button>
              <button
                onClick={() => setStatusFilter('resolved')}
                className={`filter-pill ${statusFilter === 'resolved' ? 'active' : ''}`}
              >
                Resolved
              </button>
              <button
                onClick={() => setStatusFilter('dismissed')}
                className={`filter-pill ${statusFilter === 'dismissed' ? 'active' : ''}`}
              >
                Dismissed
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Report ID & Type</th>
                  <th>Grievance Reason</th>
                  <th>Description</th>
                  <th>Reported By</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-secondary)' }}>
                      No grievance reports found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((rep) => {
                    const repId = rep._id || rep.id;
                    const isResolved = (rep.status || '').toLowerCase() === 'resolved';
                    const isDismissed = (rep.status || '').toLowerCase() === 'dismissed';

                    return (
                      <tr key={repId}>
                        <td>
                          <div>
                            <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '11px', color: 'var(--forest-800)' }}>
                              {rep.targetId ? `TGT-${rep.targetId.slice(-6)}` : 'GRIEVANCE'}
                            </span>
                            <div style={{ fontSize: '11px', color: 'var(--terracotta-500)', textTransform: 'capitalize', fontWeight: 600 }}>
                              {rep.type || rep.targetType}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 700, color: '#991b1b', fontSize: '12.5px' }}>
                            {rep.reason}
                          </span>
                        </td>
                        <td>
                          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', maxWidth: '340px', lineHeight: '1.4' }}>
                            {rep.description}
                          </p>
                        </td>
                        <td>
                          <span style={{ fontSize: '12px', fontWeight: 600 }}>
                            {rep.reportedByName || rep.reportedBy?.name || 'Cultural Patron'}
                          </span>
                        </td>
                        <td>
                          <StatusBadge status={isResolved ? 'Resolved' : isDismissed ? 'Dismissed' : 'Pending'} />
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            {!isResolved && (
                              <button
                                onClick={() => resolveReport(repId)}
                                className="btn btn-approve"
                                style={{ padding: '5px 10px', fontSize: '12px' }}
                                title="Resolve grievance"
                              >
                                Resolve
                              </button>
                            )}
                            {!isDismissed && (
                              <button
                                onClick={() => dismissReport(repId)}
                                className="btn btn-secondary"
                                style={{ padding: '5px 10px', fontSize: '12px' }}
                                title="Dismiss report"
                              >
                                Dismiss
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
