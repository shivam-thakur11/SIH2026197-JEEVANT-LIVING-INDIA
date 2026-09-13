import { useState } from 'react';
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
} from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import { REGIONS_DATA } from '../../data/mockData';
import TraditionCard from '../../components/common/TraditionCard';
import HeritageCornerMotif from '../../components/common/HeritageCornerMotif';

const Explore = () => {
  const [searchParams] = useSearchParams();
  const initialSelectedState = searchParams.get('state') || 'Rajasthan';

  const { traditions, artisans } = useApp();
  const [selectedState, setSelectedState] = useState(initialSelectedState);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [craftFilterTab, setCraftFilterTab] = useState('All');

  const craftTabs = ['All', 'Textiles', 'Pottery', 'Woodwork', 'Paintings', 'More'];

  const INDIAN_STATES = [
    { name: 'Rajasthan', craftsCount: 14, zone: 'West' },
    { name: 'Bihar', craftsCount: 9, zone: 'East' },
    { name: 'Odisha', craftsCount: 11, zone: 'East' },
    { name: 'Maharashtra', craftsCount: 12, zone: 'West' },
    { name: 'Jammu & Kashmir', craftsCount: 10, zone: 'North' },
    { name: 'Tamil Nadu', craftsCount: 15, zone: 'South' },
    { name: 'Andhra Pradesh', craftsCount: 8, zone: 'South' },
    { name: 'Chhattisgarh', craftsCount: 7, zone: 'Central' },
    { name: 'Uttar Pradesh', craftsCount: 16, zone: 'North' },
    { name: 'West Bengal', craftsCount: 13, zone: 'East' },
    { name: 'Gujarat', craftsCount: 11, zone: 'West' },
    { name: 'Karnataka', craftsCount: 12, zone: 'South' },
    { name: 'Assam', craftsCount: 8, zone: 'North-East' },
    { name: 'Kerala', craftsCount: 9, zone: 'South' },
  ];

  // Active region data from REGIONS_DATA
  const currentRegionInfo =
    REGIONS_DATA.find((r) => r.name.toLowerCase() === selectedState.toLowerCase()) ||
    REGIONS_DATA[0];

  // Filtered traditions
  const filteredTraditions = (traditions || []).filter((t) => {
    const stateName = t.state || '';
    const matchesState =
      !selectedState ||
      selectedState === 'All' ||
      stateName.toLowerCase() === selectedState.toLowerCase();

    const nameStr = t.title || t.name || '';
    const catStr = t.category || '';
    const matStr = Array.isArray(t.materials) ? t.materials.join(' ') : (t.materials || '');

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

    return matchesState && matchesSearch && matchesRisk;
  });

  // Local artists in this selected state
  const stateArtisans = (artisans || []).filter(
    (a) => a.state && a.state.toLowerCase() === selectedState.toLowerCase()
  );

  return (
    <div className="explore-page-wrapper">
      {/* ─── Explore Hero Banner ────────────────────────────────────────── */}
      <section className="explore-hero">
        <HeritageCornerMotif position="top-right" size={72} opacity={0.6} />
        <div className="page-container">
          <div className="explore-hero-badge">
            <Compass size={16} />
            <span>Pan-India Cultural Discovery System</span>
          </div>
          <h1 className="explore-hero-title">Explore India's Culture</h1>
          <p className="explore-hero-subtitle">
            Journey through India's states, heritage regions, living traditions, and generational master craftspeople.
            Every region carries centuries of tangible and intangible heritage protected by Geographical Indications.
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
          {/* Left Column: States Scrollable List */}
          <div className="explore-col-states">
            <div className="col-header-small">
              <h3>States</h3>
              <span className="count-tag">{statesList.length} States</span>
            </div>
            <div className="states-vertical-scroll">
              {statesList.map((st) => (
                <button
                  key={st.name}
                  className={`state-row-pill ${selectedState === st.name ? 'active' : ''}`}
                  onClick={() => setSelectedState(st.name)}
                >
                  <div className="state-pill-left">
                    <span className={`state-bullet ${selectedState === st.name ? 'active' : ''}`} />
                    <span className="state-pill-name">{st.name}</span>
                  </div>
                  <span className="state-pill-count">{st.craftsCount} crafts</span>
                </button>
              ))}
            </div>
          </div>

          {/* Middle Column: Featured Region Card */}
          <div className="explore-col-featured">
            <div className="col-header-small">
              <h3>Featured Region</h3>
              <span className="count-tag">{currentRegionInfo.name}</span>
            </div>
            <div className="featured-region-hero-card">
              <HeritageCornerMotif position="top-left" size={54} opacity={0.5} />
              <div className="featured-card-img-wrap">
                <img
                  src={currentRegionInfo.image}
                  alt={currentRegionInfo.name}
                  className="featured-region-main-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&auto=format&fit=crop&q=80';
                  }}
                />
                <span className="featured-zone-pill">{currentRegionInfo.zone} India</span>
              </div>

              <div className="featured-card-body">
                <span className="featured-card-state-label">Heritage Cluster</span>
                <h2>{currentRegionInfo.name}</h2>
                <p className="featured-card-tagline">{currentRegionInfo.tagline}</p>

                <div className="featured-card-crafts-row">
                  <span className="craft-label">Key Crafts:</span>
                  <div className="craft-tags-inline">
                    {currentRegionInfo.regions && currentRegionInfo.regions[0] &&
                      currentRegionInfo.regions[0].crafts.slice(0, 3).map((craft) => (
                        <span key={craft} className="craft-pill-xs">{craft}</span>
                      ))
                    }
                  </div>
                </div>

                <Link
                  to={`/explore/map?state=${encodeURIComponent(currentRegionInfo.name)}`}
                  className="btn btn-primary explore-region-btn"
                >
                  <span>Explore Region</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Marwar Region Highlight Card */}
          <div className="explore-col-subregion">
            <div className="col-header-small">
              <h3>Regional Highlight</h3>
              <span className="count-tag">Province</span>
            </div>

            <div className="marwar-region-card">
              <HeritageCornerMotif position="top-right" size={48} opacity={0.4} />
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80"
                alt="Marwar Region"
                className="marwar-card-img"
              />
              <div className="marwar-card-body">
                <span className="marwar-state-tag">{currentRegionInfo.name}</span>
                <h4>{currentRegionInfo.regions && currentRegionInfo.regions[0] ? currentRegionInfo.regions[0].name : 'Marwar Region'}</h4>
                <p>
                  {currentRegionInfo.regions && currentRegionInfo.regions[0]
                    ? currentRegionInfo.regions[0].description
                    : 'Famed for natural Indigo Ajrakh block prints and desert brass craft.'}
                </p>
                <div className="marwar-footer-meta">
                  <span className="craft-count-highlight">
                    {currentRegionInfo.regions && currentRegionInfo.regions[0]
                      ? `${currentRegionInfo.regions[0].crafts.length} Living Crafts`
                      : '4 Living Crafts'}
                  </span>
                  <Link
                    to={`/explore/map?state=${encodeURIComponent(currentRegionInfo.name)}`}
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
              <p>Browse regional cultural zones across North, South, East, West, Central, and North-East India.</p>
            </div>

            <div className="discovery-step-arrow">
              <ChevronRight size={20} />
            </div>

            <div className="discovery-step-card">
              <div className="step-number-badge">2</div>
              <div className="step-icon-wrap">
                <MapPin size={24} />
              </div>
              <h4>2. Select State</h4>
              <p>Choose specific state archives to unlock verified living traditions, folk antiquity, and GI tags.</p>
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
              <p>Zoom into distinct artisan clusters such as Marwar, Mithila, Raghurajpur, or Bastar.</p>
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
              <h2>Cataloged Living Traditions ({filteredTraditions.length})</h2>
              <p>Intangible heritage entries verified with official GI registration data and risk level audits.</p>
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
              <h4>No traditions matched your filter</h4>
              <p>Try clearing filters or selecting another cultural state.</p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSelectedState('All');
                  setSearchTerm('');
                  setRiskFilter('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="traditions-grid-3">
              {filteredTraditions.map((tradition) => (
                <TraditionCard key={tradition.id} tradition={tradition} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Explore;
