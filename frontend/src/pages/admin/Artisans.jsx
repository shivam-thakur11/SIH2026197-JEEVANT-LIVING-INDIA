import { useState } from 'react';
import {
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  MapPin,
  Layers,
  Table as TableIcon,
  Phone,
  Mail,
  Trash2,
  RefreshCw,
  Award
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';

export const Artisans = () => {
  const {
    artisans,
    approveArtisan,
    rejectArtisan,
    deleteArtisan,
    refreshData,
    loading
  } = useAdmin();

  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete master artisan "${name}"?`)) {
      await deleteArtisan(id);
      if (selectedArtisan && (selectedArtisan.id === id || selectedArtisan._id === id)) {
        setSelectedArtisan(null);
      }
    }
  };

  // Filter artisans based on status and search query
  const filteredArtisans = artisans.filter((artisan) => {
    const statusStr = (artisan.status || artisan.verificationStatus || '').toLowerCase();
    const filterLower = filterStatus.toLowerCase();

    let matchesStatus = filterStatus === 'All';
    if (!matchesStatus) {
      if (filterLower === 'verified' || filterLower === 'approved') {
        matchesStatus = statusStr === 'verified' || statusStr === 'approved';
      } else {
        matchesStatus = statusStr === filterLower;
      }
    }

    const matchesSearch =
      (artisan.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artisan.craft || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artisan.region || artisan.state || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artisan.giTagNumber || '').toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const pendingCount = artisans.filter((a) => (a.status || a.verificationStatus || '').toLowerCase() === 'pending').length;
  const verifiedCount = artisans.filter((a) => {
    const s = (a.status || a.verificationStatus || '').toLowerCase();
    return s === 'verified' || s === 'approved';
  }).length;
  const rejectedCount = artisans.filter((a) => (a.status || a.verificationStatus || '').toLowerCase() === 'rejected').length;

  return (
    <div>
      {/* Top Banner / Summary Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--forest-900)' }}>
            Master Artisans & Cultural Guilds Registry
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Digital registry and GI verification portal for India’s traditional craft masters (PS 26197).
          </p>
        </div>

        {/* View Mode & Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            className="btn btn-secondary"
            style={{ padding: '7px 12px', fontSize: '12.5px' }}
            title="Reload latest records from MongoDB"
          >
            <RefreshCw size={14} className={isRefreshing ? 'spin-animation' : ''} />
            <span>Sync</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`btn ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '7px 12px', fontSize: '12.5px' }}
          >
            <TableIcon size={15} />
            <span>Table View</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`btn ${viewMode === 'cards' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '7px 12px', fontSize: '12.5px' }}
          >
            <Layers size={15} />
            <span>Card Grid</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <button
            onClick={() => setFilterStatus('All')}
            className={`filter-pill ${filterStatus === 'All' ? 'active' : ''}`}
          >
            All Artisans ({artisans.length})
          </button>
          <button
            onClick={() => setFilterStatus('Pending')}
            className={`filter-pill ${filterStatus === 'Pending' ? 'active' : ''}`}
          >
            Pending Verification ({pendingCount})
          </button>
          <button
            onClick={() => setFilterStatus('Verified')}
            className={`filter-pill ${filterStatus === 'Verified' ? 'active' : ''}`}
          >
            Verified Masters ({verifiedCount})
          </button>
          <button
            onClick={() => setFilterStatus('Rejected')}
            className={`filter-pill ${filterStatus === 'Rejected' ? 'active' : ''}`}
          >
            Rejected ({rejectedCount})
          </button>
        </div>

        <div className="search-input-wrapper">
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            placeholder="Filter by name, craft, state, GI ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' ? (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Master Artisan</th>
                <th>Traditional Craft</th>
                <th>Region & State</th>
                <th>Experience</th>
                <th>Verification Status</th>
                <th>GI Proof</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArtisans.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-secondary)' }}>
                    No master artisans found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredArtisans.map((artisan) => {
                  const artId = artisan.id || artisan._id;
                  const isVerified = (artisan.status || artisan.verificationStatus || '').toLowerCase() === 'verified' ||
                                    (artisan.status || artisan.verificationStatus || '').toLowerCase() === 'approved';
                  const isRejected = (artisan.status || artisan.verificationStatus || '').toLowerCase() === 'rejected';

                  return (
                    <tr key={artId}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={artisan.image || artisan.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'}
                            alt={artisan.name}
                            style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '1.5px solid var(--border-subtle)'
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--forest-900)' }}>
                              {artisan.name}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                              {artisan.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {artisan.craft}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--terracotta-500)' }}>
                          {artisan.category || 'Traditional Indian Craft'}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px' }}>
                          <MapPin size={13} color="var(--terracotta-500)" />
                          <span>{artisan.region || artisan.state}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{artisan.experience || '15+ Years'}</span>
                      </td>
                      <td>
                        <StatusBadge status={artisan.status || (isVerified ? 'Verified' : isRejected ? 'Rejected' : 'Pending')} />
                      </td>
                      <td>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontSize: '11px',
                            background: 'var(--beige-200)',
                            padding: '3px 7px',
                            borderRadius: '4px',
                            fontWeight: 600
                          }}
                        >
                          {artisan.giTagNumber || 'GI-VERIFIED'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          {!isVerified && (
                            <button
                              className="btn btn-approve"
                              onClick={() => approveArtisan(artId)}
                              title="Approve & Grant GI Verified Badge"
                            >
                              Approve
                            </button>
                          )}
                          {!isRejected && (
                            <button
                              className="btn btn-reject"
                              onClick={() => rejectArtisan(artId)}
                              title="Reject Application"
                            >
                              Reject
                            </button>
                          )}
                          <button
                            className="btn btn-details"
                            onClick={() => setSelectedArtisan(artisan)}
                            title="Inspect Details"
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            className="btn btn-reject"
                            onClick={() => handleDelete(artId, artisan.name)}
                            title="Delete artisan record"
                            style={{ padding: '6px 8px' }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Card Grid View */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredArtisans.map((artisan) => {
            const artId = artisan.id || artisan._id;
            const isVerified = (artisan.status || artisan.verificationStatus || '').toLowerCase() === 'verified' ||
                              (artisan.status || artisan.verificationStatus || '').toLowerCase() === 'approved';
            const isRejected = (artisan.status || artisan.verificationStatus || '').toLowerCase() === 'rejected';

            return (
              <div
                key={artId}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: isVerified
                    ? '4px solid var(--forest-600)'
                    : isRejected
                    ? '4px solid #dc2626'
                    : '4px solid var(--gold-500)'
                }}
              >
                <div style={{ padding: '20px', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                    <img
                      src={artisan.image || artisan.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'}
                      alt={artisan.name}
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '12px',
                        objectFit: 'cover',
                        border: '1.5px solid var(--border-subtle)'
                      }}
                    />
                    <div>
                      <h4 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--forest-900)' }}>
                        {artisan.name}
                      </h4>
                      <p style={{ fontSize: '12px', color: 'var(--terracotta-500)', fontWeight: 600 }}>
                        {artisan.craft}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                        <MapPin size={11} color="var(--terracotta-500)" />
                        <span>{artisan.region || artisan.state}</span>
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: '12.5px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      marginBottom: '14px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {artisan.description || artisan.bio || 'Preserving hereditary Indian craft traditions with regional GI documentation.'}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <StatusBadge status={artisan.status || (isVerified ? 'Verified' : isRejected ? 'Rejected' : 'Pending')} />
                    <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      Exp: <strong>{artisan.experience || '20+ Yrs'}</strong>
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    padding: '12px 16px',
                    background: 'var(--beige-50)',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <button
                    onClick={() => setSelectedArtisan(artisan)}
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    <Eye size={13} />
                    <span>Audit Dossier</span>
                  </button>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {!isVerified && (
                      <button
                        onClick={() => approveArtisan(artId)}
                        className="btn btn-approve"
                        style={{ padding: '6px 10px', fontSize: '12px' }}
                      >
                        Approve
                      </button>
                    )}
                    {!isRejected && (
                      <button
                        onClick={() => rejectArtisan(artId)}
                        className="btn btn-reject"
                        style={{ padding: '6px 10px', fontSize: '12px' }}
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(artId, artisan.name)}
                      className="btn btn-reject"
                      style={{ padding: '6px 8px' }}
                      title="Delete artisan"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Artisan Audit Detail Modal */}
      {selectedArtisan && (
        <Modal
          isOpen={!!selectedArtisan}
          onClose={() => setSelectedArtisan(null)}
          title={`Artisan Verification Audit: ${selectedArtisan.name}`}
          footer={
            <>
              {(selectedArtisan.status !== 'Verified' && selectedArtisan.verificationStatus !== 'approved') && (
                <button
                  className="btn btn-approve"
                  onClick={() => {
                    approveArtisan(selectedArtisan.id || selectedArtisan._id);
                    setSelectedArtisan(null);
                  }}
                >
                  <CheckCircle2 size={15} />
                  <span>Approve & Grant GI Badge</span>
                </button>
              )}
              {(selectedArtisan.status !== 'Rejected' && selectedArtisan.verificationStatus !== 'rejected') && (
                <button
                  className="btn btn-reject"
                  onClick={() => {
                    rejectArtisan(selectedArtisan.id || selectedArtisan._id);
                    setSelectedArtisan(null);
                  }}
                >
                  <XCircle size={15} />
                  <span>Reject Application</span>
                </button>
              )}
              <button
                className="btn btn-reject"
                onClick={() => {
                  handleDelete(selectedArtisan.id || selectedArtisan._id, selectedArtisan.name);
                }}
              >
                <Trash2 size={15} />
                <span>Delete</span>
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedArtisan(null)}
              >
                Close
              </button>
            </>
          }
        >
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '20px' }}>
            <img
              src={selectedArtisan.image || selectedArtisan.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'}
              alt={selectedArtisan.name}
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '14px',
                objectFit: 'cover',
                border: '2px solid var(--gold-500)',
                flexShrink: 0
              }}
            />
            <div>
              <h3 style={{ fontSize: '20px', color: 'var(--forest-900)' }}>{selectedArtisan.name}</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--terracotta-500)', fontWeight: 700 }}>
                {selectedArtisan.craft} • {selectedArtisan.category || 'Heritage Guild'}
              </p>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} />
                {selectedArtisan.region || selectedArtisan.state}
              </p>
              <div style={{ marginTop: '10px' }}>
                <StatusBadge status={selectedArtisan.status} />
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'var(--beige-50)',
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '18px'
            }}
          >
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '6px', color: 'var(--forest-900)' }}>
              Artisan Heritage Biography & Craft Lineage
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {selectedArtisan.description || selectedArtisan.bio || 'Preserving hereditary Indian craft traditions with regional GI documentation.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px',
              fontSize: '12.5px'
            }}
          >
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>CRAFT EXPERIENCE</span>
              <strong>{selectedArtisan.experience || '25+ Years'}</strong>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>GI REGISTRATION NUMBER</span>
              <strong style={{ fontFamily: 'monospace' }}>{selectedArtisan.giTagNumber || 'GI-IN-XXXX'}</strong>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>GOVERNMENT AWARDS & HONORS</span>
              <strong>{selectedArtisan.awards || 'State Master Craftsperson'}</strong>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>AADHAAR / E-SHRAM VERIFICATION</span>
              <strong style={{ color: selectedArtisan.aadhaarVerified ? '#166534' : '#991b1b' }}>
                {selectedArtisan.aadhaarVerified ? 'KYC Verified (Biometrics Matched)' : 'Document Verified'}
              </strong>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>DIRECT PHONE CONTACT</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <Phone size={13} color="var(--forest-700)" />
                <strong>{selectedArtisan.phone || '+91 98XXX XXXXX'}</strong>
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>OFFICIAL PORTAL EMAIL</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <Mail size={13} color="var(--forest-700)" />
                <strong>{selectedArtisan.email}</strong>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Artisans;
