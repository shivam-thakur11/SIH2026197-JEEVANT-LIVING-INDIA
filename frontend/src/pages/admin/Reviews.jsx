import { useState } from 'react';
import { Star, Search, Sparkles, Trash2, RefreshCw, AlertCircle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import StatusBadge from '../../components/common/StatusBadge';

export const Reviews = () => {
  const { reviews, toggleReviewStatus, deleteReview, refreshData, loading } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  const handleDelete = async (id, reviewer) => {
    if (window.confirm(`Are you sure you want to remove the review by "${reviewer}"?`)) {
      await deleteReview(id);
    }
  };

  const filtered = reviews.filter((r) => {
    const status = (r.status || '').toLowerCase();
    const filterLower = statusFilter.toLowerCase();
    const matchesStatus = statusFilter === 'All' || status === filterLower;

    const searchLower = searchTerm.toLowerCase();
    const reviewer = (r.reviewer || '').toLowerCase();
    const artisan = (r.artisan || '').toLowerCase();
    const target = (r.target || '').toLowerCase();
    const comment = (r.comment || '').toLowerCase();

    const matchesSearch =
      reviewer.includes(searchLower) ||
      artisan.includes(searchLower) ||
      target.includes(searchLower) ||
      comment.includes(searchLower);

    return matchesStatus && matchesSearch;
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
            Community Ratings & Cultural Feedback Moderation
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Authenticity reviews from learners, collectors, and researchers with automated sentiment signals.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing || loading}
          className="btn btn-secondary"
          style={{ padding: '7px 14px', fontSize: '12.5px' }}
        >
          <RefreshCw size={14} className={isRefreshing ? 'spin-animation' : ''} />
          <span>Sync Reviews</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="filter-bar">
        <div className="filter-group">
          <button
            onClick={() => setStatusFilter('All')}
            className={`filter-pill ${statusFilter === 'All' ? 'active' : ''}`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setStatusFilter('Published')}
            className={`filter-pill ${statusFilter === 'Published' ? 'active' : ''}`}
          >
            Published
          </button>
          <button
            onClick={() => setStatusFilter('Flagged')}
            className={`filter-pill ${statusFilter === 'Flagged' ? 'active' : ''}`}
          >
            Flagged for Audit
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
            placeholder="Search review comments, artisans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Reviews Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.length === 0 ? (
          <div className="card" style={{ padding: '36px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No community feedback found matching filter criteria.
          </div>
        ) : (
          filtered.map((rev) => {
            const revId = rev.id || rev._id;
            const isPublished = (rev.status || '').toLowerCase() === 'published';

            return (
              <div key={revId} className="card" style={{ padding: '20px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '15px', color: 'var(--forest-900)' }}>{rev.reviewer}</strong>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>reviewed</span>
                      <strong style={{ fontSize: '13px', color: 'var(--terracotta-500)' }}>{rev.target}</strong>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Conducted / Created by: <strong>{rev.artisan}</strong> • {rev.date}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          fill={i < rev.rating ? 'var(--gold-500)' : '#e5e7eb'}
                          color={i < rev.rating ? 'var(--gold-500)' : '#e5e7eb'}
                        />
                      ))}
                    </div>
                    <StatusBadge status={isPublished ? 'Published' : 'Flagged'} />
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '13.5px',
                    color: 'var(--text-primary)',
                    lineHeight: '1.6',
                    background: 'var(--beige-50)',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  "{rev.comment}"
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '14px',
                    fontSize: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: 600 }}>
                    <Sparkles size={14} />
                    <span>AI Sentiment: {rev.sentiment || 'Positive (96%)'}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => toggleReviewStatus(revId)}
                      className={`btn ${isPublished ? 'btn-secondary' : 'btn-approve'}`}
                      style={{ padding: '5px 12px', fontSize: '12px' }}
                    >
                      {isPublished ? 'Flag for Audit' : 'Publish Review'}
                    </button>
                    <button
                      onClick={() => handleDelete(revId, rev.reviewer)}
                      className="btn btn-reject"
                      style={{ padding: '5px 8px', fontSize: '12px' }}
                      title="Delete review"
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
    </div>
  );
};

export default Reviews;
