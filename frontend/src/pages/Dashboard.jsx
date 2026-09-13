import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Palette,
  Users,
  BookOpen,
  IndianRupee,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sparkles,
  MapPin,
  Award,
  FileText,
  MessageSquare,
  AlertTriangle,
  Database
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';

export const Dashboard = () => {
  const {
    stats,
    artisans,
    bookings,
    approveArtisan,
    rejectArtisan,
    isLiveDatabase
  } = useAdmin();
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  // Pending artisans for verification queue
  const pendingArtisans = artisans.filter(
    (a) => a.status === 'Pending' || a.verificationStatus === 'pending'
  );

  return (
    <div>
      {/* Heritage Hero Banner */}
      <div className="heritage-hero-banner">
        <div className="heritage-hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
            <div className="heritage-tag">
              <Sparkles size={14} />
              <span>Problem Statement 26197 • SIH 2026</span>
            </div>

            {/* Database Connection Status Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '11.5px',
                fontWeight: 700,
                background: isLiveDatabase ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.25)',
                color: isLiveDatabase ? '#bbf7d0' : '#fef08a',
                border: `1px solid ${isLiveDatabase ? 'rgba(34, 197, 94, 0.4)' : 'rgba(234, 179, 8, 0.4)'}`
              }}
            >
              <Database size={13} />
              <span>{isLiveDatabase ? 'Live MongoDB Connected' : 'Demo / Local Database Mode'}</span>
            </div>
          </div>

          <h2 className="heritage-hero-title">
            JEEVANT: Safeguarding India’s Living Cultural Heritage
          </h2>
          <p className="heritage-hero-desc">
            Empowering master artisans across 24 states with direct GI-tagged verification,
            transparent fair-trade earnings, and global community masterclasses. Zero intermediary fee model.
          </p>
        </div>
      </div>

      {/* Primary Calculated Metric Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Master Artisans"
          value={stats.totalArtisans ? stats.totalArtisans.toLocaleString('en-IN') : '0'}
          trend="Database Registry"
          icon={Palette}
          accentColor="#1a3826"
          iconBg="#e2ede6"
        />
        <StatCard
          title="Cultural Patrons / Users"
          value={stats.totalUsers ? stats.totalUsers.toLocaleString('en-IN') : '0'}
          trend="Active Community"
          icon={Users}
          accentColor="#1e40af"
          iconBg="#dbeafe"
        />
        <StatCard
          title="Pending Verifications"
          value={stats.pendingVerifications !== undefined ? stats.pendingVerifications : 0}
          trend={stats.pendingVerifications > 0 ? "Immediate Action Needed" : "All Caught Up"}
          trendWarning={stats.pendingVerifications > 0}
          icon={Clock}
          accentColor="#c85a32"
          iconBg="#faebe5"
        />
        <StatCard
          title="Approved Artisans"
          value={stats.approvedArtisans !== undefined ? stats.approvedArtisans : stats.verifiedArtisans || 0}
          trend="GI Authenticated"
          icon={ShieldCheck}
          accentColor="#15803d"
          iconBg="#dcfce7"
        />
        <StatCard
          title="Total Platform GMV"
          value={stats.totalRevenue || '₹0'}
          trend="100% Direct DBT"
          icon={IndianRupee}
          accentColor="#15803d"
          iconBg="#dcfce7"
        />
      </div>

      {/* Secondary Metric Strip: Workshops, Traditions, Reviews, Reports */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309' }}>
            <BookOpen size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 600 }}>Active Workshops</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--forest-900)' }}>{stats.totalWorkshops || 0}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534' }}>
            <Award size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 600 }}>Cataloged Traditions</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--forest-900)' }}>{stats.totalTraditions || 0}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
            <MessageSquare size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 600 }}>Community Reviews</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--forest-900)' }}>{stats.totalReviews || 0}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b91c1c' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 600 }}>Audit & Grievances</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--forest-900)' }}>{stats.totalReports || 0}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Pending Artisan Verifications & Recent Bookings */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
          gap: '24px',
          marginBottom: '28px'
        }}
      >
        {/* Verification Requests Card */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <ShieldCheck size={18} color="var(--terracotta-500)" />
              <span>Pending Artisan Verifications</span>
            </div>
            <Link
              to="/admin/artisans"
              style={{
                fontSize: '12.5px',
                color: 'var(--forest-700)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>View All ({artisans.length})</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ padding: '0', overflowX: 'auto' }}>
            {pendingArtisans.length === 0 ? (
              <div
                style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: 'var(--text-secondary)'
                }}
              >
                <CheckCircle2 size={36} color="#166534" style={{ margin: '0 auto 8px' }} />
                <p style={{ fontWeight: 600 }}>All artisan applications are verified!</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  New submissions from artisan clusters will appear here automatically.
                </p>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Artisan & Craft</th>
                    <th>Region</th>
                    <th>GI Tag Proof</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingArtisans.slice(0, 4).map((artisan) => (
                    <tr key={artisan.id || artisan._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={artisan.image || artisan.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'}
                            alt={artisan.name}
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '1px solid var(--border-subtle)'
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--forest-900)' }}>
                              {artisan.name}
                            </div>
                            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                              {artisan.craft}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px' }}>
                          <MapPin size={13} color="var(--terracotta-500)" />
                          <span>{artisan.state}</span>
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: '11px',
                            fontFamily: 'monospace',
                            background: 'var(--beige-200)',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontWeight: 600
                          }}
                        >
                          {artisan.giTagNumber || 'GI-VERIFY-REQ'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            className="btn btn-approve"
                            onClick={() => approveArtisan(artisan.id || artisan._id)}
                            title="Approve & Grant Verified Badge"
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-reject"
                            onClick={() => rejectArtisan(artisan.id || artisan._id)}
                            title="Reject Application"
                          >
                            Reject
                          </button>
                          <button
                            className="btn btn-details"
                            onClick={() => setSelectedArtisan(artisan)}
                            title="Inspect Details"
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Bookings Card */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <BookOpen size={18} color="var(--forest-700)" />
              <span>Recent Heritage Bookings</span>
            </div>
            <Link
              to="/admin/workshops"
              style={{
                fontSize: '12.5px',
                color: 'var(--forest-700)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Workshops & Passes</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ padding: '0', overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Masterclass / Craft</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b.id}>
                    <td>
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          color: 'var(--forest-800)'
                        }}
                      >
                        {b.id}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.user}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{b.userEmail}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '12.5px', fontWeight: 500 }}>{b.item}</div>
                      <div style={{ fontSize: '11px', color: 'var(--terracotta-500)' }}>
                        By {b.artisan}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--forest-900)' }}>{b.amount}</span>
                    </td>
                    <td>
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cultural Heritage Craft Preservation Progress */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Award size={18} color="var(--gold-500)" />
            <span>Preserved Intangible Traditions & GI Geographic Clusters</span>
          </div>
          <Link
            to="/admin/traditions"
            style={{
              fontSize: '12.5px',
              color: 'var(--forest-700)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>Explore Heritage Registry</span>
            <ExternalLink size={14} />
          </Link>
        </div>
        <div className="card-body">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}
          >
            {[
              { name: 'Madhubani Painting', state: 'Bihar', gi: 'GI-0012', health: '98% Active' },
              { name: 'Jaipur Blue Pottery', state: 'Rajasthan', gi: 'GI-0028', health: '82% Active' },
              { name: 'Raghurajpur Pattachitra', state: 'Odisha', gi: 'GI-0039', health: '94% Active' },
              { name: 'Warli Tribal Art', state: 'Maharashtra', gi: 'GI-0114', health: '91% Active' },
              { name: 'Srikalahasti Kalamkari', state: 'Andhra Pradesh', gi: 'GI-0019', health: '95% Active' },
              { name: 'Kashmir Pashmina', state: 'J&K', gi: 'GI-0045', health: '88% Active' }
            ].map((craft, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--beige-50)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '14px',
                  borderLeft: '4px solid var(--forest-700)'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--forest-900)' }}>
                  {craft.name}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {craft.state} • {craft.gi}
                </div>
                <div
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: 'var(--forest-800)',
                    marginTop: '8px'
                  }}
                >
                  Lineage Health: <span style={{ color: '#166534' }}>{craft.health}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Artisan Detail Modal */}
      {selectedArtisan && (
        <Modal
          isOpen={!!selectedArtisan}
          onClose={() => setSelectedArtisan(null)}
          title={`Artisan Verification Audit: ${selectedArtisan.name}`}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
            <img
              src={selectedArtisan.image || selectedArtisan.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'}
              alt={selectedArtisan.name}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--gold-500)'
              }}
            />
            <div>
              <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--forest-900)' }}>
                {selectedArtisan.name}
              </h4>
              <div style={{ fontSize: '13px', color: 'var(--terracotta-500)', fontWeight: 600 }}>
                {selectedArtisan.craft} • {selectedArtisan.state}
              </div>
              <div style={{ marginTop: '4px' }}>
                <StatusBadge status={selectedArtisan.status} />
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'var(--beige-50)',
              padding: '14px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '16px'
            }}
          >
            <h5 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--forest-900)' }}>
              Master Artisan Biography & Lineage
            </h5>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {selectedArtisan.description || selectedArtisan.bio || 'Preserving hereditary Indian craft traditions with regional GI documentation.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              fontSize: '12.5px'
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Experience</span>
              <strong>{selectedArtisan.experience || '20+ Years'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>GI Tag ID</span>
              <strong style={{ fontFamily: 'monospace' }}>{selectedArtisan.giTagNumber || 'Registered'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>National / State Honors</span>
              <strong>{selectedArtisan.awards || 'State Craft Master'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Aadhaar / e-Shram</span>
              <strong style={{ color: selectedArtisan.aadhaarVerified ? '#166534' : '#991b1b' }}>
                {selectedArtisan.aadhaarVerified ? 'KYC Verified' : 'Document Verified'}
              </strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Direct Contact</span>
              <strong>{selectedArtisan.phone || '+91 98XXX XXXXX'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Official Email</span>
              <strong>{selectedArtisan.email}</strong>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
