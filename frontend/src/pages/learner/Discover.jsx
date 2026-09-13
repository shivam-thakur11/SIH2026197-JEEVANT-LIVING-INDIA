import { useState, useMemo } from 'react';
import { MapPin, Users, Search, Filter, X } from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import { TRADITIONS_DATA } from '../../data/mockData';
import StatusBadge from '../../components/common/StatusBadge';

/**
 * Discover Page — Browse all Indian cultural traditions
 * Dynamically populated from backend API via context.
 */
const Discover = () => {
  const { traditions: contextTraditions } = useApp();
  const traditionsList = (contextTraditions && contextTraditions.length > 0)
    ? contextTraditions
    : TRADITIONS_DATA;

  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterRisk, setFilterRisk] = useState('');

  // Get unique states for the filter dropdown
  const states = useMemo(() => {
    return [...new Set(traditionsList.map((t) => t.state).filter(Boolean))].sort();
  }, [traditionsList]);

  // Filter traditions based on user inputs
  const filtered = useMemo(() => {
    return traditionsList.filter((tradition) => {
      const name = tradition.title || tradition.name || '';
      const category = tradition.category || '';
      const materials = Array.isArray(tradition.materials) ? tradition.materials.join(' ') : (tradition.materials || '');
      const state = tradition.state || '';
      const risk = (tradition.riskLevel || '').toLowerCase();

      const matchesSearch =
        !search ||
        name.toLowerCase().includes(search.toLowerCase()) ||
        category.toLowerCase().includes(search.toLowerCase()) ||
        materials.toLowerCase().includes(search.toLowerCase());

      const matchesState = !filterState || state === filterState;

      let matchesRisk = !filterRisk;
      if (filterRisk === 'verified') matchesRisk = risk.includes('stable');
      else if (filterRisk === 'pending') matchesRisk = risk.includes('vulnerable');
      else if (filterRisk === 'rejected') matchesRisk = risk.includes('endangered');
      else if (filterRisk) matchesRisk = tradition.riskColor === filterRisk;

      return matchesSearch && matchesState && matchesRisk;
    });
  }, [traditionsList, search, filterState, filterRisk]);

  const clearFilters = () => {
    setSearch('');
    setFilterState('');
    setFilterRisk('');
  };

  const hasFilters = search || filterState || filterRisk;

  return (
    <div className="discover-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-container">
          <h1 className="page-title">Discover India's Traditions</h1>
          <p className="page-subtitle">
            Explore India's intangible cultural heritage — from ancient folk arts to
            endangered metallurgical crafts — each with a living community of practitioners.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="filter-bar">
        <div className="filter-bar-container">
          <div className="search-input-wrap">
            <Search size={17} className="search-icon" />
            <input
              type="text"
              placeholder="Search traditions, materials, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-selects">
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="filter-select"
            >
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="filter-select"
            >
              <option value="">All Risk Levels</option>
              <option value="verified">Stable</option>
              <option value="pending">Vulnerable</option>
              <option value="rejected">Critically Endangered</option>
            </select>

            {hasFilters && (
              <button onClick={clearFilters} className="btn-clear-filters">
                <X size={15} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="section-container">
        <p className="results-count">{filtered.length} tradition{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <Filter size={40} />
            <h3>No traditions match your search</h3>
            <p>Try adjusting your filters or search term.</p>
            <button onClick={clearFilters} className="btn btn-outline">Clear filters</button>
          </div>
        ) : (
          <div className="discover-grid">
            {filtered.map((tradition) => (
              <div key={tradition.id} className="discover-card">
                {/* Risk Level Badge */}
                <div className={`discover-card-risk risk-${tradition.riskColor}`}>
                  {tradition.riskLevel}
                </div>

                <h3 className="discover-card-name">{tradition.title || tradition.name}</h3>

                <div className="discover-card-meta">
                  <div className="discover-card-location">
                    <MapPin size={13} />
                    <span>{tradition.state}</span>
                  </div>
                  <div className="discover-card-artisans">
                    <Users size={13} />
                    <span>{tradition.activeArtisans || '120+'} artisans</span>
                  </div>
                </div>

                <p className="discover-card-category">{tradition.category}</p>

                <div className="discover-card-antiquity">
                  <span className="label">Antiquity:</span>
                  <span>{tradition.antiquity || 'Century Old'}</span>
                </div>

                <div className="discover-card-materials">
                  <span className="label">Materials:</span>
                  <span>{Array.isArray(tradition.materials) ? tradition.materials.join(', ') : tradition.materials}</span>
                </div>

                <div className="discover-card-footer">
                  <span className="discover-card-gi">{tradition.giStatus}</span>
                  {tradition.unescoStatus && (
                    <span className="discover-card-unesco">{tradition.unescoStatus}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
