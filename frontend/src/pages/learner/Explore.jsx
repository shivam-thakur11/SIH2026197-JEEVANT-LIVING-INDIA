import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Search,
  ArrowRight,
  Filter,
  Sparkles,
  Users,
  Award,
  Layers,
  CheckCircle2,
  ChevronRight,
  Map,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import * as regionService from '../../services/regionService';
import { ALL_INDIA_REGIONS } from '../../data/regionsData';
import TraditionCard from '../../components/common/TraditionCard';
import HeritageCornerMotif from '../../components/common/HeritageCornerMotif';

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlStateParam = searchParams.get('state');

  const { traditions, artisans } = useApp();

  // All 36 States & UTs state management
  const [regions, setRegions] = useState(ALL_INDIA_REGIONS);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [regionsError, setRegionsError] = useState(null);

  // States panel filtering
  const [stateTypeTab, setStateTypeTab] = useState('ALL'); // 'ALL' | 'STATE' | 'UT'
  const [stateSearchTerm, setStateSearchTerm] = useState('');

  // Main page filtering
  const [selectedState, setSelectedState] = useState(urlStateParam || 'Rajasthan');
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [craftFilterTab, setCraftFilterTab] = useState('All');

  // Synchronize state selection when URL changes
  useEffect(() => {
    const param = searchParams.get('state');
    if (param) {
      setSelectedState(param);
    }
  }, [searchParams]);

  // Fetch live database-backed regions from backend API
  const fetchRegions = useCallback(async () => {
    setLoadingRegions(true);
    setRegionsError(null);
    try {
      const res = await regionService.getRegions();
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        setRegions(res.data);
      } else {
        setRegions(ALL_INDIA_REGIONS);
      }
    } catch (err) {
      console.warn('Using authentic client-side India regions dataset:', err.message);
      setRegions(ALL_INDIA_REGIONS);
    } finally {
      setLoadingRegions(false);
    }
  }, []);

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  // Craft category filter tabs for screen 2 top bar
  const craftTabs = ['All', 'Textiles', 'Pottery', 'Woodwork', 'Paintings', 'Metalcraft', 'More'];

  // Handle user state selection with URL update
  const handleStateSelect = (stateName) => {
    setSelectedState(stateName);
    if (stateName === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ state: stateName });
    }
  };

  // Filter the 36 states and UTs in the left panel
  const filteredStatesList = useMemo(() => {
    return regions.filter((r) => {
      const matchesType =
        stateTypeTab === 'ALL' ||
        (stateTypeTab === 'STATE' && r.type === 'STATE') ||
        (stateTypeTab === 'UT' && r.type === 'UT');

      const matchesSearch =
        !stateSearchTerm ||
        r.name.toLowerCase().includes(stateSearchTerm.toLowerCase()) ||
        r.capital.toLowerCase().includes(stateSearchTerm.toLowerCase()) ||
        (r.code && r.code.toLowerCase().includes(stateSearchTerm.toLowerCase()));

      return matchesType && matchesSearch;
    });
  }, [regions, stateTypeTab, stateSearchTerm]);

  // Active Region data: MUST reflect selectedState accurately without fallback to Rajasthan
  const activeRegion = useMemo(() => {
    if (!selectedState || selectedState === 'All') {
      // If 'All' is selected, feature Rajasthan as the pan-India cultural anchor
      return (
        regions.find((r) => r.name.toLowerCase() === 'rajasthan') ||
        regions[0] ||
        ALL_INDIA_REGIONS[0]
      );
    }

    const clean = selectedState.trim().toLowerCase();
    const match = regions.find(
      (r) =>
        r.name.toLowerCase() === clean ||
        (r.slug && r.slug.toLowerCase() === clean) ||
        (r.code && r.code.toLowerCase() === clean)
    );

    return match || regions[0] || ALL_INDIA_REGIONS[0];
  }, [regions, selectedState]);

  // Calculate actual verified craft count for the active region from the database
  const activeStateTraditions = useMemo(() => {
    return (traditions || []).filter(
      (t) => t.state && t.state.toLowerCase() === activeRegion.name.toLowerCase()
    );
  }, [traditions, activeRegion]);

  const activeCraftCount = useMemo(() => {
    if (activeRegion.craftCount !== undefined && activeRegion.craftCount !== null) {
      return activeRegion.craftCount;
    }
    return activeStateTraditions.length;
  }, [activeRegion, activeStateTraditions]);

  // Filtered traditions list for bottom catalog
  const filteredTraditions = useMemo(() => {
    return (traditions || []).filter((t) => {
      const stateName = t.state || '';
      const matchesState =
        !selectedState ||
        selectedState === 'All' ||
        stateName.toLowerCase() === selectedState.toLowerCase();

      const nameStr = t.title || t.name || '';
      const catStr = t.category || '';
      const matStr = Array.isArray(t.materials) ? t.materials.join(' ') : t.materials || '';

      const matchesSearch =
        !searchTerm ||
        nameStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        catStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        matStr.toLowerCase().includes(searchTerm.toLowerCase());

      const riskStr = t.riskLevel || '';
      const matchesRisk =
        !riskFilter ||
        t.riskColor === riskFilter ||
        (riskFilter === 'verified' && riskStr.toLowerCase().includes('stable')) ||
        (riskFilter === 'pending' && riskStr.toLowerCase().includes('vulnerable')) ||
        (riskFilter === 'rejected' && riskStr.toLowerCase().includes('endangered'));

      const matchesCraftTab =
        !craftFilterTab ||
        craftFilterTab === 'All' ||
        catStr.toLowerCase().includes(craftFilterTab.toLowerCase()) ||
        nameStr.toLowerCase().includes(craftFilterTab.toLowerCase()) ||
        matStr.toLowerCase().includes(craftFilterTab.toLowerCase());

      return matchesState && matchesSearch && matchesRisk && matchesCraftTab;
    });
  }, [traditions, selectedState, searchTerm, riskFilter, craftFilterTab]);

  return (
    <div className="explore-page-wrapper">
      {/* ─── Explore Hero Banner ────────────────────────────────────────── */}
      <section className="explore-hero">
        <HeritageCornerMotif position="top-right" size={72} opacity={0.6} />
        <div className="page-container">
          <div className="explore-hero-badge">
            <Compass size={16} />
            <span>Pan-India Cultural Discovery System · 36 States & Union Territories</span>
          </div>
          <h1 className="explore-hero-title">Explore India's Living Heritage</h1>
          <p className="explore-hero-subtitle">
            Journey through all 28 States and 8 Union Territories. Discover verified living traditions,
            indigenous crafts, and master lineages protected under the Geographical Indications (GI) Registry of India.
          </p>

          {/* Screen 2 Top Filter Tab Chips */}
          <div className="explore-top-tab-chips">
            {craftTabs.map((tab) => (
              <button
                key={tab}
                className={`craft-tab-chip ${craftFilterTab === tab ? 'active' : ''}`}
                onClick={() => setCraftFilterTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Screen 2: 3-Column Core Discovery Section ─────────────────── */}
      <section className="explore-three-col-section">
        <div className="page-container explore-three-col-grid">
          {/* ── Left Column: States & UTs Scrollable List ─────────────────── */}
          <div className="explore-col-states">
            <div className="col-header-small">
              <h3>States & UTs</h3>
              <span className="count-tag">36 Total (28 States · 8 UTs)</span>
            </div>

            {/* State Category Tabs: ALL (36) | STATES (28) | UTs (8) */}
            <div className="state-type-filter-tabs">
              <button
                className={`state-type-tab-btn ${stateTypeTab === 'ALL' ? 'active' : ''}`}
                onClick={() => setStateTypeTab('ALL')}
              >
                All (36)
              </button>
              <button
                className={`state-type-tab-btn ${stateTypeTab === 'STATE' ? 'active' : ''}`}
                onClick={() => setStateTypeTab('STATE')}
              >
                States (28)
              </button>
              <button
                className={`state-type-tab-btn ${stateTypeTab === 'UT' ? 'active' : ''}`}
                onClick={() => setStateTypeTab('UT')}
              >
                UTs (8)
              </button>
            </div>

            {/* Real-time State Name / Capital Search Box */}
            <div className="state-search-box">
              <Search size={14} />
              <input
                type="text"
                placeholder="Search state or capital..."
                value={stateSearchTerm}
                onChange={(e) => setStateSearchTerm(e.target.value)}
                className="state-search-input"
              />
            </div>

            {/* Pan-India 'All' Selection Row */}
            <button
              className={`state-row-pill ${selectedState === 'All' ? 'active' : ''}`}
              onClick={() => handleStateSelect('All')}
              style={{ marginBottom: '6px', borderBottom: '1px dashed var(--beige-300)' }}
            >
              <div className="state-pill-left">
                <span className={`state-bullet ${selectedState === 'All' ? 'active' : ''}`} />
                <span className="state-pill-name">All India (Pan-India)</span>
              </div>
              <span className="state-pill-count">{(traditions || []).length} crafts</span>
            </button>

            {/* Scrollable List of States and UTs */}
            <div className="states-vertical-scroll">
              {filteredStatesList.length === 0 ? (
                <div className="state-empty-hint">
                  <p>No state matched "{stateSearchTerm}".</p>
                </div>
              ) : (
                filteredStatesList.map((st) => {
                  const isActive = selectedState.toLowerCase() === st.name.toLowerCase();
                  const count = st.craftCount !== undefined ? st.craftCount : 0;
                  return (
                    <button
                      key={st.code || st.name}
                      className={`state-row-pill ${isActive ? 'active' : ''}`}
                      onClick={() => handleStateSelect(st.name)}
                    >
                      <div className="state-pill-left">
                        <span className={`state-bullet ${isActive ? 'active' : ''}`} />
                        <span className="state-pill-name">{st.name}</span>
                        <span className="state-type-pill">{st.type}</span>
                      </div>
                      <span className="state-pill-count">
                        {count > 0 ? `${count} craft${count > 1 ? 's' : ''}` : '0 crafts'}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* ── Middle Column: Featured Region Card (DYNAMIC FROM SELECTED STATE) ── */}
          <div className="explore-col-featured">
            <div className="col-header-small">
              <h3>Featured Region</h3>
              <span className="count-tag">{activeRegion.name}</span>
            </div>

            <div className="featured-region-hero-card">
              <HeritageCornerMotif position="top-left" size={54} opacity={0.5} />

              <div className="featured-card-img-wrap">
                <img
                  src={activeRegion.heroImage || activeRegion.image}
                  alt={activeRegion.name}
                  className="featured-region-main-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/regions/states/rajasthan/hero.jpg';
                  }}
                />
                <span className="featured-zone-pill">
                  {activeRegion.zone} India · {activeRegion.type === 'UT' ? 'Union Territory' : 'State'}
                </span>
              </div>

              <div className="featured-card-body">
                <div className="featured-card-state-label">
                  Heritage Cluster · {activeRegion.code}
                </div>
                <h2>{activeRegion.name}</h2>
                <p className="featured-card-tagline">
                  {activeRegion.tagline || activeRegion.shortDescription || activeRegion.description}
                </p>

                {/* Key Crafts Derived from Authentic Records */}
                <div className="featured-card-crafts-row">
                  <span className="craft-label">Key Crafts:</span>
                  <div className="craft-tags-inline">
                    {activeRegion.majorCrafts && activeRegion.majorCrafts.length > 0 ? (
                      activeRegion.majorCrafts.slice(0, 4).map((craft) => (
                        <span key={craft} className="craft-pill-xs">
                          {craft}
                        </span>
                      ))
                    ) : (
                      <span className="craft-pill-xs">Regional Folk Arts</span>
                    )}
                  </div>
                </div>

                {/* Official Sourced Provenance Badge */}
                <div className="state-provenance-badge">
                  <ShieldCheck size={14} />
                  <span>
                    {activeRegion.sourceReferences?.[0]?.sourceName ||
                      activeRegion.sourceName ||
                      'Source Referenced · Official GI Registry of India'}
                  </span>
                </div>

                {/* Explore Region Action Link */}
                <Link
                  to={`/explore/map?state=${encodeURIComponent(activeRegion.name)}`}
                  className="btn btn-primary explore-region-btn"
                  style={{ marginTop: '14px' }}
                >
                  <span>Explore {activeRegion.name}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right Column: Regional Highlight Card (DYNAMIC FROM SELECTED STATE) ── */}
          <div className="explore-col-subregion">
            <div className="col-header-small">
              <h3>Regional Highlight</h3>
              <span className="count-tag">{activeRegion.type === 'UT' ? 'Territory' : 'Province'}</span>
            </div>

            <div className="marwar-region-card">
              <HeritageCornerMotif position="top-right" size={48} opacity={0.4} />
              <img
                src={activeRegion.image || activeRegion.heroImage}
                alt={`${activeRegion.name} Heritage`}
                className="marwar-card-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/regions/states/rajasthan/highlight.jpg';
                }}
              />
              <div className="marwar-card-body">
                <span className="marwar-state-tag">
                  {activeRegion.name} · Capital: {activeRegion.capital}
                </span>
                <h4>
                  {activeRegion.regions && activeRegion.regions[0]
                    ? activeRegion.regions[0].name
                    : `${activeRegion.name} Cultural Heartland`}
                </h4>
                <p>
                  {activeRegion.regions && activeRegion.regions[0]
                    ? activeRegion.regions[0].description
                    : activeRegion.description}
                </p>

                {/* Real Database Calculated Craft Count */}
                <div className="marwar-footer-meta">
                  <span className="craft-count-highlight">
                    {activeCraftCount > 0
                      ? `${activeCraftCount} Living Craft${activeCraftCount > 1 ? 's' : ''}`
                      : '0 Verified Crafts in Database'}
                  </span>
                  <Link
                    to={`/explore/map?state=${encodeURIComponent(activeRegion.name)}`}
                    className="link-green-sm"
                  >
                    View Map →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── "How It Works" 5-Step Visual Flow ──────────────────────────── */}
      <section className="how-discovery-works-section">
        <div className="page-container">
          <div className="section-title-center">
            <span className="sub-badge">Seamless Heritage Journey</span>
            <h2>How Cultural Discovery Works</h2>
            <p>A structured, interactive methodology to connect learners directly with indigenous knowledge systems.</p>
          </div>

          <div className="discovery-steps-grid">
            <div className="discovery-step-card">
              <div className="step-number-badge">1</div>
              <div className="step-icon-wrap">
                <Map size={24} />
              </div>
              <h4>1. Explore India Map</h4>
              <p>Browse regional cultural zones across North, South, East, West, Central, North-East, and Islands.</p>
            </div>

            <div className="discovery-step-arrow">
              <ChevronRight size={20} />
            </div>

            <div className="discovery-step-card">
              <div className="step-number-badge">2</div>
              <div className="step-icon-wrap">
                <MapPin size={24} />
              </div>
              <h4>2. Select State / UT</h4>
              <p>Choose from 28 States and 8 UTs to unlock verified living traditions, folk antiquity, and GI tags.</p>
            </div>

            <div className="discovery-step-arrow">
              <ChevronRight size={20} />
            </div>

            <div className="discovery-step-card">
              <div className="step-number-badge">3</div>
              <div className="step-icon-wrap">
                <Compass size={24} />
              </div>
              <h4>3. Discover Region</h4>
              <p>Zoom into distinct artisan clusters such as Awadh, Kutch, Mithila, Raghurajpur, or Bastar.</p>
            </div>

            <div className="discovery-step-arrow">
              <ChevronRight size={20} />
            </div>

            <div className="discovery-step-card">
              <div className="step-number-badge">4</div>
              <div className="step-icon-wrap">
                <Layers size={24} />
              </div>
              <h4>4. Explore Tradition</h4>
              <p>Investigate organic raw materials, preservation status, UNESCO listings, and historical antiquity.</p>
            </div>

            <div className="discovery-step-arrow">
              <ChevronRight size={20} />
            </div>

            <div className="discovery-step-card">
              <div className="step-number-badge">5</div>
              <div className="step-icon-wrap">
                <Users size={24} />
              </div>
              <h4>5. Meet Artist</h4>
              <p>Connect with master craftspeople, book live masterclasses, and support livelihoods via 0% fee DBT.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Living Traditions Directory & Filters ──────────────────────── */}
      <section className="traditions-directory-section">
        <div className="page-container">
          <div className="directory-header-row">
            <div>
              <h2>
                Cataloged Living Traditions ({filteredTraditions.length})
                {selectedState !== 'All' && (
                  <span style={{ fontSize: '18px', fontWeight: 500, color: 'var(--terracotta-600)', marginLeft: '10px' }}>
                    in {activeRegion.name}
                  </span>
                )}
              </h2>
              <p>
                Intangible heritage entries verified with official GI registration data from the Controller General of Patents,
                Designs and Trade Marks (IP India).
              </p>
            </div>

            {/* Filter and Search Controls */}
            <div className="directory-filter-controls">
              <div className="filter-search-wrap">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search traditions, materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="filter-search-input"
                />
              </div>

              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="filter-dropdown"
              >
                <option value="">All Risk Levels</option>
                <option value="verified">Stable & Thriving</option>
                <option value="pending">Vulnerable</option>
                <option value="rejected">Critically Endangered</option>
              </select>
            </div>
          </div>

          {/* Traditions Grid */}
          {filteredTraditions.length === 0 ? (
            <div className="empty-results-box">
              <Compass size={40} />
              <h4>
                {selectedState !== 'All'
                  ? `No verified traditions cataloged yet for ${activeRegion.name}`
                  : 'No traditions matched your filter'}
              </h4>
              <p>
                {selectedState !== 'All'
                  ? 'Our research cell is continually verifying and archiving new Geographical Indications across all 36 States & UTs.'
                  : 'Try clearing filters or selecting another cultural state.'}
              </p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  handleStateSelect('All');
                  setSearchTerm('');
                  setRiskFilter('');
                }}
              >
                View All Traditions (Pan-India)
              </button>
            </div>
          ) : (
            <div className="traditions-grid-3">
              {filteredTraditions.map((tradition) => (
                <TraditionCard key={tradition.id || tradition._id} tradition={tradition} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Explore;
