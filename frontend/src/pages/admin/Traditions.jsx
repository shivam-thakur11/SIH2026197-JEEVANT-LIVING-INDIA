import { useState } from 'react';
import {
  Search,
  ShieldCheck,
  Award,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Eye,
  RefreshCw,
  Tag,
  BookOpen
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';

export const Traditions = () => {
  const {
    traditions,
    addTradition,
    updateTradition,
    deleteTradition,
    refreshData,
    loading
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTradition, setEditingTradition] = useState(null);
  const [viewingTradition, setViewingTradition] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    state: '',
    category: '',
    description: '',
    history: '',
    image: '',
    tags: '',
    riskLevel: 'Stable & Thriving',
    giStatus: 'Registered GI',
  });

  const handleOpenCreateModal = () => {
    setEditingTradition(null);
    setFormData({
      title: '',
      state: '',
      category: '',
      description: '',
      history: '',
      image: '',
      tags: '',
      riskLevel: 'Stable & Thriving',
      giStatus: 'Registered GI',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (tradition) => {
    setEditingTradition(tradition);
    setFormData({
      title: tradition.title || tradition.name || '',
      state: tradition.state || '',
      category: tradition.category || '',
      description: tradition.description || '',
      history: tradition.history || '',
      image: tradition.image || '',
      tags: Array.isArray(tradition.tags) ? tradition.tags.join(', ') : tradition.tags || '',
      riskLevel: tradition.riskLevel || 'Stable & Thriving',
      giStatus: tradition.giStatus || 'Registered GI',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      name: formData.title,
      tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    };

    if (editingTradition) {
      const id = editingTradition.id || editingTradition._id;
      await updateTradition(id, payload);
    } else {
      await addTradition(payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      await deleteTradition(id);
      if (viewingTradition && (viewingTradition.id === id || viewingTradition._id === id)) {
        setViewingTradition(null);
      }
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  const filtered = traditions.filter((t) => {
    const risk = (t.riskLevel || '').toLowerCase();
    const matchesRisk =
      riskFilter === 'All' ||
      (riskFilter === 'Endangered' && risk.includes('endangered')) ||
      (riskFilter === 'Stable' && risk.includes('stable')) ||
      (riskFilter === 'Vulnerable' && risk.includes('vulnerable'));

    const searchLower = searchTerm.toLowerCase();
    const title = (t.title || t.name || '').toLowerCase();
    const state = (t.state || '').toLowerCase();
    const category = (t.category || '').toLowerCase();
    const gi = (t.giStatus || '').toLowerCase();
    const tagsStr = Array.isArray(t.tags) ? t.tags.join(' ').toLowerCase() : '';

    const matchesSearch =
      title.includes(searchLower) ||
      state.includes(searchLower) ||
      category.includes(searchLower) ||
      gi.includes(searchLower) ||
      tagsStr.includes(searchLower);

    return matchesRisk && matchesSearch;
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
            Intangible Cultural Heritage & GI Registry
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Preservation repository archiving India's GI-tagged folk traditions, endangered lineages, and antiquity timelines.
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
            <span>Archive New Tradition</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <button
            onClick={() => setRiskFilter('All')}
            className={`filter-pill ${riskFilter === 'All' ? 'active' : ''}`}
          >
            All Traditions ({traditions.length})
          </button>
          <button
            onClick={() => setRiskFilter('Stable')}
            className={`filter-pill ${riskFilter === 'Stable' ? 'active' : ''}`}
          >
            Stable & Thriving
          </button>
          <button
            onClick={() => setRiskFilter('Vulnerable')}
            className={`filter-pill ${riskFilter === 'Vulnerable' ? 'active' : ''}`}
          >
            Vulnerable
          </button>
          <button
            onClick={() => setRiskFilter('Endangered')}
            className={`filter-pill ${riskFilter === 'Endangered' ? 'active' : ''}`}
          >
            Critically Endangered
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
            placeholder="Search craft, state, GI tag, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Traditions Grid Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '22px'
        }}
      >
        {filtered.length === 0 ? (
          <div className="card" style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-muted)' }}>
            No cultural traditions found matching your filter criteria.
          </div>
        ) : (
          filtered.map((tradition) => {
            const tradId = tradition.id || tradition._id;
            const displayName = tradition.title || tradition.name;
            const isEndangered = (tradition.riskLevel || '').toLowerCase().includes('endangered');

            return (
              <div
                key={tradId}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderTop: isEndangered ? '4px solid #dc2626' : '4px solid var(--forest-600)'
                }}
              >
                {/* Tradition Image Header if available */}
                {tradition.image && (
                  <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={tradition.image}
                      alt={displayName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(0,0,0,0.6)',
                        color: '#fff',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600
                      }}
                    >
                      {tradition.state}
                    </div>
                  </div>
                )}

                <div
                  style={{
                    padding: '20px',
                    background: 'linear-gradient(180deg, var(--beige-50) 0%, #ffffff 100%)',
                    borderBottom: '1px solid var(--border-subtle)',
                    flex: 1
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                    <div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: 'var(--terracotta-500)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {tradition.category || 'Traditional Heritage Craft'}
                      </span>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--forest-900)', marginTop: '2px' }}>
                        {displayName}
                      </h3>
                    </div>
                    <StatusBadge status={tradition.riskLevel || 'Stable'} />
                  </div>

                  <p
                    style={{
                      fontSize: '12.5px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      marginBottom: '14px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {tradition.description}
                  </p>

                  {/* Tags */}
                  {Array.isArray(tradition.tags) && tradition.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      {tradition.tags.map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '11px',
                            background: 'var(--beige-200)',
                            color: 'var(--forest-900)',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontWeight: 600
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px',
                      fontSize: '11.5px',
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '12px'
                    }}
                  >
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>GI STATUS</span>
                      <strong style={{ fontFamily: 'monospace', color: 'var(--forest-800)' }}>
                        {tradition.giStatus || 'Registered GI'}
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>GEOGRAPHY</span>
                      <strong style={{ color: 'var(--forest-800)' }}>{tradition.state}</strong>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div
                  style={{
                    padding: '12px 18px',
                    background: '#ffffff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--border-subtle)'
                  }}
                >
                  <button
                    onClick={() => setViewingTradition(tradition)}
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    <Eye size={13} />
                    <span>View Dossier</span>
                  </button>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleOpenEditModal(tradition)}
                      className="btn btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '12px' }}
                      title="Edit tradition"
                    >
                      <Edit2 size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(tradId, displayName)}
                      className="btn btn-reject"
                      style={{ padding: '6px 10px', fontSize: '12px' }}
                      title="Delete tradition"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* View Detail Modal */}
      {viewingTradition && (
        <Modal
          isOpen={!!viewingTradition}
          onClose={() => setViewingTradition(null)}
          title={`Cultural Heritage Dossier: ${viewingTradition.title || viewingTradition.name}`}
          footer={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  const trad = viewingTradition;
                  setViewingTradition(null);
                  handleOpenEditModal(trad);
                }}
              >
                <Edit2 size={14} />
                <span>Edit Record</span>
              </button>
              <button
                className="btn btn-reject"
                onClick={() => {
                  handleDelete(viewingTradition.id || viewingTradition._id, viewingTradition.title || viewingTradition.name);
                }}
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setViewingTradition(null)}
              >
                Close
              </button>
            </>
          }
        >
          {viewingTradition.image && (
            <img
              src={viewingTradition.image}
              alt={viewingTradition.title || viewingTradition.name}
              style={{
                width: '100%',
                maxHeight: '220px',
                objectFit: 'cover',
                borderRadius: '10px',
                marginBottom: '16px'
              }}
            />
          )}
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', color: 'var(--terracotta-500)', fontWeight: 700 }}>
              {viewingTradition.category} • {viewingTradition.state}
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--forest-900)' }}>
              {viewingTradition.title || viewingTradition.name}
            </h3>
            <div style={{ marginTop: '6px' }}>
              <StatusBadge status={viewingTradition.riskLevel} />
            </div>
          </div>

          <div style={{ background: 'var(--beige-50)', padding: '14px', borderRadius: '8px', marginBottom: '14px' }}>
            <h5 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--forest-900)' }}>
              Living Practice & Techniques
            </h5>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {viewingTradition.description}
            </p>
          </div>

          {viewingTradition.history && (
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', marginBottom: '14px', border: '1px solid #e2e8f0' }}>
              <h5 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#1e293b' }}>
                Historical Lineage & Antiquity
              </h5>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                {viewingTradition.history}
              </p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '12.5px' }}>
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>GI REGISTRATION</span>
              <strong>{viewingTradition.giStatus || 'Registered'}</strong>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>PRESERVATION RISK</span>
              <strong>{viewingTradition.riskLevel}</strong>
            </div>
          </div>
        </Modal>
      )}

      {/* Create / Edit Tradition Modal Form */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingTradition ? 'Edit Heritage Tradition' : 'Archive New Cultural Tradition'}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                Tradition Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Madhubani & Mithila Painting"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  State / Region *
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="e.g. Bihar"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  Craft Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Folk Art & Wall Fresco"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                Description / Practice Techniques *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed description of materials, methods, and significance..."
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px', resize: 'vertical' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                Historical Lineage / Antiquity
              </label>
              <textarea
                rows={2}
                value={formData.history}
                onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                placeholder="Origins, centuries practiced, historical patrons..."
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  Representative Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Madhubani, Mithila, Folk Art"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  GI Registration Status
                </label>
                <input
                  type="text"
                  value={formData.giStatus}
                  onChange={(e) => setFormData({ ...formData, giStatus: e.target.value })}
                  placeholder="Registered GI-IN-0012"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '4px' }}>
                  Preservation Risk Level
                </label>
                <select
                  value={formData.riskLevel}
                  onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
                >
                  <option value="Stable & Thriving">Stable & Thriving</option>
                  <option value="Vulnerable">Vulnerable</option>
                  <option value="Critically Endangered">Critically Endangered</option>
                </select>
              </div>
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
                {editingTradition ? 'Update Tradition' : 'Save to Registry'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Traditions;
