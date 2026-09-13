import { useState, useMemo } from 'react';
import { Search, Filter, X, Calendar, Video, MapPin, Users, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import WorkshopCard from '../../components/common/WorkshopCard';

import HeritageCornerMotif from '../../components/common/HeritageCornerMotif';

const WorkshopList = () => {
  const { workshops, artisans } = useApp();

  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState('');
  const [filterCraft, setFilterCraft] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const modes = useMemo(() => {
    return [...new Set((workshops || []).map((w) => w.mode).filter(Boolean))].sort();
  }, [workshops]);

  const crafts = useMemo(() => {
    return [...new Set((workshops || []).map((w) => w.craft).filter(Boolean))].sort();
  }, [workshops]);

  const states = useMemo(() => {
    const list = (workshops || []).map((w) => w.state || (w.location ? w.location.split(',').pop().trim() : null)).filter(Boolean);
    return [...new Set(list)].sort();
  }, [workshops]);

  const filteredWorkshops = useMemo(() => {
    return (workshops || []).filter((ws) => {
      const artName = ws.artisanName || (typeof ws.artisan === 'string' ? ws.artisan : ws.artisan?.name) || '';
      const wsState = ws.state || (ws.location ? ws.location.split(',').pop().trim() : '');
      const matchesSearch =
        !search ||
        (ws.title || '').toLowerCase().includes(search.toLowerCase()) ||
        artName.toLowerCase().includes(search.toLowerCase()) ||
        (ws.craft || '').toLowerCase().includes(search.toLowerCase());

      const matchesMode = !filterMode || ws.mode === filterMode;
      const matchesCraft = !filterCraft || ws.craft === filterCraft;
      const matchesState = !filterState || wsState.toLowerCase().includes(filterState.toLowerCase());

      return matchesSearch && matchesMode && matchesCraft && matchesState;
    });
  }, [workshops, search, filterMode, filterCraft, filterState]);

  const clearFilters = () => {
    setSearch('');
    setFilterMode('');
    setFilterCraft('');
    setFilterState('');
    setFilterDate('');
  };

  const hasActiveFilters = search || filterMode || filterCraft || filterState || filterDate;

  return (
    <div className="workshops-directory-page">
      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <section className="workshops-hero">
        <HeritageCornerMotif position="top-right" size={68} opacity={0.55} />
        <div className="page-container">
          <div className="workshops-hero-badge">
            <Calendar size={15} />
            <span>Interactive Living Masterclasses · 100% DBT</span>
          </div>
          <h1 className="workshops-hero-title">Learn From the Masters</h1>
          <p className="workshops-hero-subtitle">
            Hands-on masterclasses and living ateliers conducted directly by national award-winning Shilp Gurus and master craftspeople.
          </p>
        </div>
      </section>

      {/* ─── Filter Bar ───────────────────────────────────────────────── */}
      <section className="workshops-filter-bar">
        <div className="page-container">
          <div className="filter-controls-container">
            {/* Search */}
            <div className="filter-search-box">
              <Search size={18} className="search-box-icon" />
              <input
                type="text"
                placeholder="Search masterclasses by title, tradition, or artisan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-box-input"
              />
              {search && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="filter-dropdowns-group">
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="filter-select-input"
              >
                <option value="">All States</option>
                {states.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              <select
                value={filterCraft}
                onChange={(e) => setFilterCraft(e.target.value)}
                className="filter-select-input"
              >
                <option value="">All Traditions</option>
                {crafts.map((cr) => (
                  <option key={cr} value={cr}>
                    {cr}
                  </option>
                ))}
              </select>

              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="filter-select-input"
              >
                <option value="">All Formats (Virtual & In-Person)</option>
                {modes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <button onClick={clearFilters} className="btn-clear-filters">
                  <X size={15} /> Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Workshops Grid ───────────────────────────────────────────── */}
      <section className="workshops-grid-section">
        <div className="page-container">
          <div className="results-count-banner">
            <span>
              Showing <strong>{filteredWorkshops.length}</strong> masterclasses
            </span>
            <span className="results-subtext">Small batch sizes for personalized master-apprentice interaction</span>
          </div>

          {filteredWorkshops.length === 0 ? (
            <div className="workshops-empty-state">
              <Calendar size={48} />
              <h3>No workshops matched your criteria</h3>
              <p>Try resetting filters or search for another traditional art form.</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="workshops-grid-3">
              {filteredWorkshops.map((workshop) => (
                <WorkshopCard
                  key={workshop.id || workshop._id}
                  workshop={workshop}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WorkshopList;
