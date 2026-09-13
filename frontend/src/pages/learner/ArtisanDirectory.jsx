import { useState } from 'react';
import { Search, Filter, X, Users, MapPin, CheckCircle2, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import ArtistCard from '../../components/common/ArtistCard';
import HeritageCornerMotif from '../../components/common/HeritageCornerMotif';

const ArtisanDirectory = () => {
  const { artisans, traditions } = useApp();

  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterCraft, setFilterCraft] = useState('');
  const [filterTradition, setFilterTradition] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // States & crafts for filters
  const states = [...new Set((artisans || []).map((a) => a.state).filter(Boolean))].sort();
  const crafts = [...new Set((artisans || []).map((a) => a.craft).filter(Boolean))].sort();
  const traditionsList = [...new Set((traditions || []).map((t) => t.title || t.name).filter(Boolean))].sort();

  const filteredArtisans = (artisans || []).filter((artist) => {
    const isVerified =
      artist.status === 'Verified' ||
      artist.verificationStatus === 'approved' ||
      artist.verificationStatus === 'verified';

    const matchesSearch =
      !search ||
      (artist.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (artist.craft || '').toLowerCase().includes(search.toLowerCase()) ||
      (artist.bio && artist.bio.toLowerCase().includes(search.toLowerCase())) ||
      (artist.region && artist.region.toLowerCase().includes(search.toLowerCase())) ||
      (artist.state && artist.state.toLowerCase().includes(search.toLowerCase()));

    const matchesState = !filterState || artist.state === filterState;
    const matchesCraft = !filterCraft || artist.craft === filterCraft;
    const matchesTradition = !filterTradition || (artist.craft && artist.craft.toLowerCase().includes(filterTradition.toLowerCase()));
    const matchesVerified = !verifiedOnly || isVerified;

    return matchesSearch && matchesState && matchesCraft && matchesTradition && matchesVerified;
  });

  const clearFilters = () => {
    setSearch('');
    setFilterState('');
    setFilterCraft('');
    setFilterTradition('');
    setVerifiedOnly(false);
  };

  const hasActiveFilters = search || filterState || filterCraft || filterTradition || verifiedOnly;

  return (
    <div className="artists-directory-page">
      {/* Page Header (Screen 4 Spec) */}
      <section className="artists-hero">
        <HeritageCornerMotif position="top-right" size={68} opacity={0.6} />
        <div className="page-container">
          <div className="artists-hero-badge">
            <Users size={16} />
            <span>Verified Master Craftsmen & Living Legacies</span>
          </div>
          <h1 className="artists-hero-title">Artists</h1>
          <p className="artists-hero-subtitle">
            Meet the people behind the craft.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="artists-filter-bar">
        <div className="page-container">
          <div className="filter-controls-container">
            {/* Search Input */}
            <div className="filter-search-box">
              <Search size={18} className="search-box-icon" />
              <input
                type="text"
                placeholder="Search artists by name, craft, or village..."
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

            {/* Dropdown Filters (Screen 4: State / Tradition / Craft Type) */}
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
                value={filterTradition}
                onChange={(e) => setFilterTradition(e.target.value)}
                className="filter-select-input"
              >
                <option value="">All Traditions</option>
                {traditionsList.map((tr) => (
                  <option key={tr} value={tr}>
                    {tr}
                  </option>
                ))}
              </select>

              <select
                value={filterCraft}
                onChange={(e) => setFilterCraft(e.target.value)}
                className="filter-select-input"
              >
                <option value="">Craft Type</option>
                {crafts.map((cr) => (
                  <option key={cr} value={cr}>
                    {cr}
                  </option>
                ))}
              </select>

              {/* Verified Only Checkbox Button */}
              <button
                className={`filter-toggle-pill ${verifiedOnly ? 'active' : ''}`}
                onClick={() => setVerifiedOnly(!verifiedOnly)}
              >
                <CheckCircle2 size={15} />
                <span>GI Verified Only</span>
              </button>

              {hasActiveFilters && (
                <button onClick={clearFilters} className="btn-clear-filters">
                  <X size={15} /> Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="artists-grid-section">
        <div className="page-container">
          <div className="results-count-banner">
            <span>Showing <strong>{filteredArtisans.length}</strong> master artisans</span>
            <span className="results-subtext">100% direct contact with zero commission fees</span>
          </div>

          {filteredArtisans.length === 0 ? (
            <div className="artists-empty-state">
              <Users size={48} />
              <h3>No master artists found</h3>
              <p>Try modifying your search or clearing active filters.</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="artists-directory-grid">
                {filteredArtisans.map((artist) => (
                  <ArtistCard key={artist.id || artist._id} artist={artist} />
                ))}
              </div>

              {/* Screen 4 Numbered Pagination */}
              <div className="pagination-bar">
                <button
                  className="pagination-arrow"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className={`pagination-num ${currentPage === 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </button>
                <button
                  className={`pagination-num ${currentPage === 2 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(2)}
                >
                  2
                </button>
                <button
                  className={`pagination-num ${currentPage === 3 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(3)}
                >
                  3
                </button>
                <button className="pagination-num ellipsis" disabled>
                  …
                </button>
                <button
                  className="pagination-arrow"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArtisanDirectory;
