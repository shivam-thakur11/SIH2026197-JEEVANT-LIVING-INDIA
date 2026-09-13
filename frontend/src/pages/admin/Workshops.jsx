import { useState } from 'react';
import { Video, MapPin, Search, Plus, Edit2, Trash2, Eye, RefreshCw, Users, Calendar, Clock } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';

export const Workshops = () => {
  const {
    workshops,
    artisans,
    addWorkshop,
    updateWorkshop,
    deleteWorkshop,
    refreshData,
    loading
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [modeFilter, setModeFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [viewingWorkshop, setViewingWorkshop] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    artisan: '',
    craft: '',
    mode: 'Live Virtual',
    location: 'Online Virtual Studio',
    date: '',
    time: '11:00 AM - 01:30 PM IST',
    price: 899,
    fee: '₹899',
    capacity: 30,
    seatsTotal: 30,
    status: 'Upcoming',
    image: '',
    description: '',
  });

  const handleOpenCreateModal = () => {
    setEditingWorkshop(null);
    const defaultArtisan = artisans.length > 0 ? (artisans[0].id || artisans[0]._id) : '';
    setFormData({
      title: '',
      artisan: defaultArtisan,
      craft: artisans.length > 0 ? artisans[0].craft : '',
      mode: 'Live Virtual',
      location: 'Online Virtual Studio',
      date: '20 Sep 2026',
      time: '11:00 AM - 01:30 PM IST',
      price: 899,
      fee: '₹899',
      capacity: 30,
      seatsTotal: 30,
      status: 'Upcoming',
      image: '',
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (workshop) => {
    setEditingWorkshop(workshop);
    setFormData({
      title: workshop.title || '',
      artisan: workshop.artisan?.id || workshop.artisan?._id || (typeof workshop.artisan === 'string' ? workshop.artisan : ''),
      craft: workshop.craft || '',
      mode: workshop.mode || 'Live Virtual',
      location: workshop.location || 'Online Virtual Studio',
      date: workshop.date || '',
      time: workshop.time || '11:00 AM - 01:30 PM IST',
      price: workshop.price !== undefined ? workshop.price : 899,
      fee: workshop.fee || '₹899',
      capacity: workshop.capacity || workshop.seatsTotal || 30,
      seatsTotal: workshop.seatsTotal || workshop.capacity || 30,
      status: workshop.status || 'Upcoming',
      image: workshop.image || '',
      description: workshop.description || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      capacity: Number(formData.capacity),
      seatsTotal: Number(formData.capacity),
      fee: formData.price === 0 ? 'Free' : `₹${Number(formData.price).toLocaleString('en-IN')}`,
    };

    if (editingWorkshop) {
      const id = editingWorkshop.id || editingWorkshop._id;
      await updateWorkshop(id, payload);
    } else {
      await addWorkshop(payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to cancel and remove masterclass "${title}"?`)) {
      await deleteWorkshop(id);
      if (viewingWorkshop && (viewingWorkshop.id === id || viewingWorkshop._id === id)) {
        setViewingWorkshop(null);
      }
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  const filtered = workshops.filter((w) => {
    const mode = (w.mode || '').toLowerCase();
    const matchesMode =
      modeFilter === 'All' ||
      (modeFilter === 'Virtual' && mode.includes('virtual')) ||
      (modeFilter === 'In-Person' && mode.includes('in-person')) ||
      (modeFilter === 'Residency' && mode.includes('residency'));

    const searchLower = searchTerm.toLowerCase();
    const title = (w.title || '').toLowerCase();
    const craft = (w.craft || '').toLowerCase();
    const artisanName = typeof w.artisan === 'string' ? w.artisan.toLowerCase() : (w.artisan?.name || '').toLowerCase();
    const loc = (w.location || '').toLowerCase();

    const matchesSearch =
      title.includes(searchLower) ||
      craft.includes(searchLower) ||
      artisanName.includes(searchLower) ||
      loc.includes(searchLower);

    return matchesMode && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
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
            Artisan-Led Masterclasses & Residencies
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Live interactive learning modules connecting rural master craftspeople with global learners.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            className="btn btn-secondary"
            style={{ padding: '8px 14px', fontSize: '13px' }}
          >
            <RefreshCw size={14} className={isRefreshing ? 'spin-animation' : ''} />
            <span>Sync</span>
          </button>
          <button
            onClick={handleOpenCreateModal}
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <Plus size={16} />
            <span>Schedule Masterclass</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <button
            onClick={() => setModeFilter('All')}
            className={`filter-pill ${modeFilter === 'All' ? 'active' : ''}`}
          >
            All Masterclasses ({workshops.length})
          </button>
          <button
            onClick={() => setModeFilter('Virtual')}
            className={`filter-pill ${modeFilter === 'Virtual' ? 'active' : ''}`}
          >
            Live Virtual
          </button>
          <button
            onClick={() => setModeFilter('In-Person')}
            className={`filter-pill ${modeFilter === 'In-Person' ? 'active' : ''}`}
          >
            Studio / In-Person
          </button>
          <button
            onClick={() => setModeFilter('Residency')}
            className={`filter-pill ${modeFilter === 'Residency' ? 'active' : ''}`}
          >
            Hybrid Residency
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
            placeholder="Search masterclass, artisan, craft, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Workshop Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Workshop Title & Craft</th>
              <th>Artisan Mentor</th>
              <th>Session Mode</th>
              <th>Scheduled Date & Time</th>
              <th>Registration Fee</th>
              <th>Seat Occupancy</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-secondary)' }}>
                  No workshops found matching criteria.
                </td>
              </tr>
            ) : (
              filtered.map((w) => {
                const wsId = w.id || w._id;
                const artisanDisplay = typeof w.artisan === 'string' ? w.artisan : (w.artisan?.name || 'Master Artisan');
                const booked = w.seatsBooked !== undefined ? w.seatsBooked : (w.enrolled || 0);
                const total = w.seatsTotal || w.capacity || 30;
                const percentage = Math.min(100, Math.round((booked / (total || 1)) * 100));

                return (
                  <tr key={wsId}>
                    <td>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--forest-900)' }}>{w.title}</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--terracotta-500)' }}>{w.craft}</div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, fontSize: '13px' }}>{artisanDisplay}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px' }}>
                        {w.mode?.toLowerCase().includes('virtual') ? (
                          <Video size={13} color="var(--forest-700)" />
                        ) : (
                          <MapPin size={13} color="var(--terracotta-500)" />
                        )}
                        <span>{w.mode}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '12.5px' }}>{w.date}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{w.time}</div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--forest-900)' }}>{w.fee}</span>
                    </td>
                    <td>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '3px' }}>
                          {booked} / {total} seats
                        </div>
                        <div
                          style={{
                            width: '90px',
                            height: '5px',
                            background: '#e2e8f0',
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}
                        >
                          <div
                            style={{
                              width: `${percentage}%`,
                              height: '100%',
                              background: percentage >= 100 ? '#dc2626' : 'var(--forest-600)'
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={w.status} />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setViewingWorkshop(w)}
                          title="View Details"
                          style={{ padding: '6px 8px' }}
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleOpenEditModal(w)}
                          title="Edit Workshop"
                          style={{ padding: '6px 8px' }}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          className="btn btn-reject"
                          onClick={() => handleDelete(wsId, w.title)}
                          title="Delete Workshop"
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

      {/* Workshop Details Modal */}
      {viewingWorkshop && (
        <Modal
          isOpen={!!viewingWorkshop}
          onClose={() => setViewingWorkshop(null)}
          title={`Masterclass Dossier: ${viewingWorkshop.title}`}
          footer={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  const current = viewingWorkshop;
                  setViewingWorkshop(null);
                  handleOpenEditModal(current);
                }}
              >
                <Edit2 size={14} />
                <span>Edit Workshop</span>
              </button>
              <button
                className="btn btn-reject"
                onClick={() => {
                  handleDelete(viewingWorkshop.id || viewingWorkshop._id, viewingWorkshop.title);
                }}
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setViewingWorkshop(null)}
              >
                Close
              </button>
            </>
          }
        >
          {viewingWorkshop.image && (
            <img
              src={viewingWorkshop.image}
              alt={viewingWorkshop.title}
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '14px' }}
            />
          )}

          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', color: 'var(--terracotta-500)', fontWeight: 700 }}>
              {viewingWorkshop.craft} • {viewingWorkshop.mode}
            </span>
            <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--forest-900)', marginTop: '2px' }}>
              {viewingWorkshop.title}
            </h3>
            <div style={{ marginTop: '6px' }}>
              <StatusBadge status={viewingWorkshop.status} />
            </div>
          </div>

          <div style={{ background: 'var(--beige-50)', padding: '14px', borderRadius: '8px', marginBottom: '14px' }}>
            <h5 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--forest-900)' }}>
              Curriculum & Practical Hands-on Learning
            </h5>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {viewingWorkshop.description || 'Interactive hands-on session exploring indigenous Indian crafts directly with a registered GI craft lineage master.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '12.5px' }}>
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>SCHEDULED DATE & TIME</span>
              <strong>{viewingWorkshop.date} • {viewingWorkshop.time}</strong>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>LOCATION / PLATFORM</span>
              <strong>{viewingWorkshop.location || 'Online Virtual Studio'}</strong>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>REGISTRATION FEE</span>
              <strong style={{ color: '#166534' }}>{viewingWorkshop.fee}</strong>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>SEAT CAPACITY</span>
              <strong>{viewingWorkshop.seatsBooked || viewingWorkshop.enrolled || 0} / {viewingWorkshop.seatsTotal || viewingWorkshop.capacity} Registered</strong>
            </div>
          </div>
        </Modal>
      )}

      {/* Create / Edit Workshop Modal Form */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingWorkshop ? 'Edit Masterclass' : 'Schedule New Artisan Masterclass'}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                Workshop Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Royal Jaipur Blue Pottery Studio"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  Artisan Mentor *
                </label>
                {artisans.length > 0 ? (
                  <select
                    required
                    value={formData.artisan}
                    onChange={(e) => {
                      const selected = artisans.find((a) => (a.id === e.target.value || a._id === e.target.value));
                      setFormData({
                        ...formData,
                        artisan: e.target.value,
                        craft: selected ? selected.craft : formData.craft
                      });
                    }}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                  >
                    <option value="">Select an artisan</option>
                    {artisans.map((artisan) => (
                      <option key={artisan.id || artisan._id} value={artisan.id || artisan._id}>
                        {artisan.name} ({artisan.craft})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    required
                    value={formData.artisan}
                    onChange={(e) => setFormData({ ...formData, artisan: e.target.value })}
                    placeholder="Artisan Name / ID"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                  />
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  Craft Lineage
                </label>
                <input
                  type="text"
                  value={formData.craft}
                  onChange={(e) => setFormData({ ...formData, craft: e.target.value })}
                  placeholder="e.g. Blue Pottery"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  Session Mode
                </label>
                <select
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                >
                  <option value="Live Virtual">Live Virtual</option>
                  <option value="In-Person">In-Person Studio</option>
                  <option value="Hybrid Residency">Hybrid Residency</option>
                  <option value="Recorded">Recorded</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  Location / Studio Address
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Amer Road, Jaipur or Zoom Studio"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  Scheduled Date *
                </label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g. 24 Sep 2026"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  Time Slot
                </label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="e.g. 10:00 AM - 01:00 PM IST"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  Fee (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  Total Capacity
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Full">Full</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                Workshop Description
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Session objectives, materials needed, prerequisites..."
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {editingWorkshop ? 'Update Masterclass' : 'Publish Masterclass'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Workshops;
