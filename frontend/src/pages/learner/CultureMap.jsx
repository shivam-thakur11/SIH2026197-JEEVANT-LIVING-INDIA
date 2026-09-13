import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Map,
  MapPin,
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  Palette,
  Sun,
  Utensils,
  Users,
  CheckCircle2,
  ChevronRight,
  Info,
} from 'lucide-react';
import { REGIONS_DATA } from '../../data/mockData';
import { useApp } from '../../context/AdminContext';
import HeritageCornerMotif from '../../components/common/HeritageCornerMotif';

const CultureMap = () => {
  const [searchParams] = useSearchParams();
  const stateQuery = searchParams.get('state');

  const { artisans, traditions, products } = useApp();
  const [activeMapTab, setActiveMapTab] = useState('India'); // India, Rajasthan, Marwar, Textiles

  const [activeZone, setActiveZone] = useState('All');
  const [selectedStateId, setSelectedStateId] = useState(() => {
    if (stateQuery) {
      const match = REGIONS_DATA.find(
        (s) => s.name.toLowerCase() === stateQuery.toLowerCase()
      );
      if (match) return match.id;
    }
    return 'state-rajasthan';
  });

  const [selectedRegionIndex, setSelectedRegionIndex] = useState(0);

  // Sync if query param changes
  useEffect(() => {
    if (stateQuery) {
      const match = REGIONS_DATA.find(
        (s) => s.name.toLowerCase() === stateQuery.toLowerCase()
      );
      if (match) {
        setSelectedStateId(match.id);
        setSelectedRegionIndex(0);
      }
    }
  }, [stateQuery]);

  const activeState =
    REGIONS_DATA.find((s) => s.id === selectedStateId) || REGIONS_DATA[0];

  const activeRegion =
    activeState.regions && activeState.regions[selectedRegionIndex]
      ? activeState.regions[selectedRegionIndex]
      : activeState.regions[0];

  // Matched artists from context
  const regionalArtisans = (artisans || []).filter(
    (a) => a.state && a.state.toLowerCase() === activeState.name.toLowerCase()
  );

  // Matched products from context
  const regionalProducts = (products || []).filter(
    (p) => p.state && p.state.toLowerCase() === activeState.name.toLowerCase()
  );

  // Matched traditions from context
  const regionalTraditions = (traditions || []).filter(
    (t) => t.state && t.state.toLowerCase() === activeState.name.toLowerCase()
  );

  const zones = ['All', 'North', 'West', 'East', 'South', 'Central'];

  const filteredStates =
    activeZone === 'All'
      ? REGIONS_DATA
      : REGIONS_DATA.filter((s) => s.zone === activeZone);

  return (
    <div className="culture-map-page">
      {/* ─── Header & Breadcrumb Flow ───────────────────────────────────── */}
      <section className="culture-map-header">
        <HeritageCornerMotif position="top-right" size={72} opacity={0.6} />
        <div className="page-container">
          <div className="culture-map-badge">
            <Compass size={15} />
            <span>Interactive Living Heritage Atlas</span>
          </div>
          <h1>Culture Map</h1>
          <p>
            Explore India's cultural regions, traditions and artistic heritage across an unbroken geographic hierarchy.
          </p>

          {/* Screen 3 Top Tab Pills */}
          <div className="culture-map-top-tabs">
            {['India', 'Rajasthan', 'Marwar', 'Textiles'].map((tab) => (
              <button
                key={tab}
                className={`map-top-tab-pill ${activeMapTab === tab ? 'active' : ''}`}
                onClick={() => {
                  setActiveMapTab(tab);
                  if (tab === 'Rajasthan') setSelectedStateId('state-rajasthan');
                  if (tab === 'Marwar') setSelectedRegionIndex(0);
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Interactive Flow Indicator */}
          <div className="hierarchy-breadcrumb-bar">
            <div className="crumb-step active">
              <span className="crumb-num">1</span>
              <span>India</span>
            </div>
            <ChevronRight size={16} className="crumb-arrow" />
            <div className="crumb-step active">
              <span className="crumb-num">2</span>
              <span>State: <strong>{activeState.name}</strong></span>
            </div>
            <ChevronRight size={16} className="crumb-arrow" />
            <div className="crumb-step active">
              <span className="crumb-num">3</span>
              <span>Region: <strong>{activeRegion.name}</strong></span>
            </div>
            <ChevronRight size={16} className="crumb-arrow" />
            <div className="crumb-step active">
              <span className="crumb-num">4</span>
              <span>Tradition & Local Artists</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Map & Regional Explorer Layout ─────────────────────────────── */}
      <section className="culture-map-content-section">
        <div className="page-container culture-map-grid">
          {/* Left Column: Interactive Map & State Clusters */}
          <div className="map-visual-container">
            {/* Zone Filter Tabs */}
            <div className="zone-filter-tabs">
              <span className="zone-filter-label">Zone:</span>
              {zones.map((zone) => (
                <button
                  key={zone}
                  className={`zone-pill ${activeZone === zone ? 'active' : ''}`}
                  onClick={() => setActiveZone(zone)}
                >
                  {zone}
                </button>
              ))}
            </div>

            {/* SVG Visual Map Canvas with Geographic Cluster Pins */}
            <div className="india-svg-map-card">
              <div className="svg-map-legend">
                <span className="legend-item"><span className="legend-dot active" /> Selected Cluster</span>
                <span className="legend-item"><span className="legend-dot" /> Heritage Hub</span>
              </div>

              {/* Stylized Interactive Map of India with pins */}
              <div className="india-map-canvas">
                {/* Screen 3 Popup Card on Map */}
                <div className="map-interactive-pin-popup">
                  <span className="pin-popup-state">{activeState.name}</span>
                  <Link
                    to={`/explore?state=${encodeURIComponent(activeState.name)}`}
                    className="pin-popup-explore"
                  >
                    <span>Explore</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
                <svg
                  viewBox="0 0 500 560"
                  className="india-svg-outline"
                  aria-label="Map of India Cultural Hubs"
                >
                  {/* Decorative India silhouette contour */}
                  <path
                    d="M 230 40 
                       C 270 45, 290 80, 280 120 
                       C 320 130, 360 160, 340 200 
                       C 390 190, 440 210, 470 240
                       C 450 270, 410 270, 390 300
                       C 360 300, 330 330, 320 370
                       C 300 420, 270 480, 240 540
                       C 220 540, 200 490, 180 430
                       C 150 380, 120 330, 130 280
                       C 90 280, 70 240, 90 210
                       C 110 180, 150 170, 170 140
                       C 180 100, 200 40, 230 40 Z"
                    fill="var(--forest-50)"
                    stroke="var(--forest-600)"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />

                  {/* Cultural Zone Rings */}
                  <circle cx="230" cy="110" r="45" fill="rgba(200, 149, 42, 0.08)" stroke="#c8952a" strokeWidth="1" />
                  <text x="230" y="115" textAnchor="middle" className="zone-svg-label">North Zone</text>

                  <circle cx="150" cy="230" r="50" fill="rgba(200, 90, 50, 0.08)" stroke="#c85a32" strokeWidth="1" />
                  <text x="150" y="235" textAnchor="middle" className="zone-svg-label">West Zone</text>

                  <circle cx="340" cy="240" r="50" fill="rgba(20, 83, 45, 0.08)" stroke="#14532d" strokeWidth="1" />
                  <text x="340" y="245" textAnchor="middle" className="zone-svg-label">East Zone</text>

                  <circle cx="250" cy="290" r="45" fill="rgba(154, 52, 18, 0.08)" stroke="#9a3412" strokeWidth="1" />
                  <text x="250" y="295" textAnchor="middle" className="zone-svg-label">Central</text>

                  <circle cx="230" cy="440" r="50" fill="rgba(47, 101, 70, 0.08)" stroke="#2f6546" strokeWidth="1" />
                  <text x="230" y="445" textAnchor="middle" className="zone-svg-label">South Zone</text>

                  {/* Interactive State Pins */}
                  {/* Kashmir */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-kashmir' ? 'active' : ''}`}
                    onClick={() => { setSelectedStateId('state-kashmir'); setSelectedRegionIndex(0); }}
                  >
                    <circle cx="210" cy="80" r={selectedStateId === 'state-kashmir' ? 12 : 8} className="map-pin-circle" />
                    <text x="210" y="65" textAnchor="middle" className="map-pin-text">Kashmir</text>
                  </g>

                  {/* Rajasthan */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-rajasthan' ? 'active' : ''}`}
                    onClick={() => { setSelectedStateId('state-rajasthan'); setSelectedRegionIndex(0); }}
                  >
                    <circle cx="150" cy="200" r={selectedStateId === 'state-rajasthan' ? 14 : 9} className="map-pin-circle" />
                    <text x="150" y="180" textAnchor="middle" className="map-pin-text">Rajasthan</text>
                  </g>

                  {/* Bihar */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-bihar' ? 'active' : ''}`}
                    onClick={() => { setSelectedStateId('state-bihar'); setSelectedRegionIndex(0); }}
                  >
                    <circle cx="330" cy="220" r={selectedStateId === 'state-bihar' ? 14 : 9} className="map-pin-circle" />
                    <text x="330" y="205" textAnchor="middle" className="map-pin-text">Bihar</text>
                  </g>

                  {/* Odisha */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-odisha' ? 'active' : ''}`}
                    onClick={() => { setSelectedStateId('state-odisha'); setSelectedRegionIndex(0); }}
                  >
                    <circle cx="330" cy="300" r={selectedStateId === 'state-odisha' ? 14 : 9} className="map-pin-circle" />
                    <text x="330" y="285" textAnchor="middle" className="map-pin-text">Odisha</text>
                  </g>

                  {/* Maharashtra */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-maharashtra' ? 'active' : ''}`}
                    onClick={() => { setSelectedStateId('state-maharashtra'); setSelectedRegionIndex(0); }}
                  >
                    <circle cx="180" cy="330" r={selectedStateId === 'state-maharashtra' ? 14 : 9} className="map-pin-circle" />
                    <text x="180" y="315" textAnchor="middle" className="map-pin-text">Maharashtra</text>
                  </g>

                  {/* Chhattisgarh */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-chhattisgarh' ? 'active' : ''}`}
                    onClick={() => { setSelectedStateId('state-chhattisgarh'); setSelectedRegionIndex(0); }}
                  >
                    <circle cx="265" cy="285" r={selectedStateId === 'state-chhattisgarh' ? 14 : 9} className="map-pin-circle" />
                    <text x="265" y="270" textAnchor="middle" className="map-pin-text">Chhattisgarh</text>
                  </g>

                  {/* Andhra Pradesh */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-andhra' ? 'active' : ''}`}
                    onClick={() => { setSelectedStateId('state-andhra'); setSelectedRegionIndex(0); }}
                  >
                    <circle cx="240" cy="395" r={selectedStateId === 'state-andhra' ? 14 : 9} className="map-pin-circle" />
                    <text x="240" y="380" textAnchor="middle" className="map-pin-text">Andhra Pradesh</text>
                  </g>

                  {/* Tamil Nadu */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-tamilnadu' ? 'active' : ''}`}
                    onClick={() => { setSelectedStateId('state-tamilnadu'); setSelectedRegionIndex(0); }}
                  >
                    <circle cx="220" cy="470" r={selectedStateId === 'state-tamilnadu' ? 14 : 9} className="map-pin-circle" />
                    <text x="220" y="495" textAnchor="middle" className="map-pin-text">Tamil Nadu</text>
                  </g>
                </svg>
              </div>

              {/* State Selection Grid below map */}
              <div className="state-selection-grid">
                {filteredStates.map((st) => (
                  <button
                    key={st.id}
                    className={`state-card-btn ${st.id === selectedStateId ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedStateId(st.id);
                      setSelectedRegionIndex(0);
                    }}
                  >
                    <MapPin size={14} />
                    <span className="state-btn-name">{st.name}</span>
                    <span className="state-btn-zone">{st.zone}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Deep Regional Drill-Down Panel */}
          <div className="regional-detail-panel">
            {/* State Top Banner */}
            <div className="regional-panel-header">
              <div className="regional-state-title-wrap">
                <span className="regional-zone-pill">{activeState.zone} India</span>
                <h2>{activeState.name}</h2>
                <p className="regional-tagline">{activeState.tagline}</p>
              </div>
              <div className="state-quick-stats">
                <div className="quick-stat">
                  <strong>{activeState.traditionsCount}</strong>
                  <span>Traditions</span>
                </div>
                <div className="quick-stat">
                  <strong>{activeState.artisansCount}</strong>
                  <span>Artisans</span>
                </div>
              </div>
            </div>

            {/* Sub-Regions Tab Selection */}
            {activeState.regions && activeState.regions.length > 1 && (
              <div className="sub-region-tabs">
                {activeState.regions.map((reg, idx) => (
                  <button
                    key={reg.id}
                    className={`sub-region-tab ${idx === selectedRegionIndex ? 'active' : ''}`}
                    onClick={() => setSelectedRegionIndex(idx)}
                  >
                    <Compass size={14} />
                    <span>{reg.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Active Region Deep Dive Card */}
            <div className="region-profile-card">
              <div className="region-profile-header">
                <h3>{activeRegion.name}</h3>
                <span className="region-center-badge">Center: {activeRegion.center}</span>
              </div>
              <p className="region-detailed-desc">{activeRegion.description}</p>

              {/* Crafts & Traditions in this Region */}
              <div className="region-attribute-section">
                <div className="attribute-header">
                  <Palette size={16} className="text-gold" />
                  <h4>Signature Crafts & Traditions</h4>
                </div>
                <div className="attribute-chips-list">
                  {activeRegion.crafts.map((craft) => (
                    <Link
                      key={craft}
                      to={`/shop?search=${encodeURIComponent(craft)}`}
                      className="craft-link-chip"
                    >
                      <Sparkles size={12} />
                      <span>{craft}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Regional Cultural Festivals */}
              <div className="region-attribute-section">
                <div className="attribute-header">
                  <Sun size={16} className="text-terracotta" />
                  <h4>Intangible Folk Festivals</h4>
                </div>
                <div className="attribute-chips-list">
                  {activeRegion.festivals.map((fest) => (
                    <span key={fest} className="festival-chip">
                      {fest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Regional Culinary Heritage */}
              <div className="region-attribute-section">
                <div className="attribute-header">
                  <Utensils size={16} className="text-forest" />
                  <h4>Traditional Culinary Heritage</h4>
                </div>
                <div className="attribute-chips-list">
                  {activeRegion.culinary.map((food) => (
                    <span key={food} className="culinary-chip">
                      {food}
                    </span>
                  ))}
                </div>
              </div>

              {/* Local Master Artists */}
              <div className="region-attribute-section">
                <div className="attribute-header">
                  <Users size={16} className="text-forest" />
                  <h4>Local Master Artisans</h4>
                </div>
                {regionalArtisans.length > 0 ? (
                  <div className="regional-artists-cards-grid">
                    {regionalArtisans.map((artist) => (
                      <Link
                        key={artist.id || artist._id}
                        to={`/artists/${artist.id || artist._id}`}
                        className="regional-artist-mini-card"
                      >
                        <img
                          src={artist.avatar}
                          alt={artist.name}
                          className="mini-avatar"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=14532d&color=fff`;
                          }}
                        />
                        <div className="mini-info">
                          <h5>{artist.name}</h5>
                          <p>{artist.craft}</p>
                          <span className="verified-tag">✓ {artist.giTagNumber || 'GI-Verified'}</span>
                        </div>
                        <ChevronRight size={16} className="mini-arrow" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="no-artist-preview">
                    <p>Notable guild masters: {activeRegion.artists.join(', ')}</p>
                    <Link to="/artists" className="btn btn-outline btn-sm">
                      View all Master Artisans
                    </Link>
                  </div>
                )}
              </div>

              {/* Screen 3 Spec: Popular Regions List */}
              <div className="popular-regions-list-card">
                <div className="popular-regions-header">
                  <h4>Popular Regions in {activeState.name}</h4>
                  <span className="count-tag">Province Hubs</span>
                </div>
                <div className="popular-regions-grid-list">
                  {[
                    { name: 'Marwar', state: 'Rajasthan', crafts: 'Ajrakh Block Print & Bell Metallurgy', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=200&auto=format&fit=crop&q=80' },
                    { name: 'Mewar', state: 'Rajasthan', crafts: 'Miniature Fresco & Silver Filigree', img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=200&auto=format&fit=crop&q=80' },
                    { name: 'Shekhawati', state: 'Rajasthan', crafts: 'Havali Fresco & Bandhani Tie-Dye', img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=200&auto=format&fit=crop&q=80' },
                    { name: 'Hadoti', state: 'Rajasthan', crafts: 'Kota Doria & Terracotta Pottery', img: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=200&auto=format&fit=crop&q=80' }
                  ].map((pr) => (
                    <div key={pr.name} className="popular-region-row">
                      <img src={pr.img} alt={pr.name} className="popular-region-thumb" />
                      <div className="popular-region-info">
                        <strong>{pr.name}</strong>
                        <span>{pr.state} • {pr.crafts}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Jump to Shop & Workshops for this Region */}
              <div className="region-action-shortcuts">
                <Link
                  to={`/shop?state=${encodeURIComponent(activeState.name)}`}
                  className="btn btn-primary btn-sm"
                >
                  Shop {activeState.name} Crafts <ArrowRight size={14} />
                </Link>
                <Link
                  to={`/workshops`}
                  className="btn btn-outline btn-sm"
                >
                  Find Regional Masterclasses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Screen 3 Spec: Featured Artists from this Region ───────────── */}
      <section className="map-featured-artists-section page-container">
        <div className="section-header-compact">
          <div>
            <h3>Featured Artists from this Region</h3>
            <p>Generational master craftspeople and GI-verified lineage bearers</p>
          </div>
          <Link to="/artists" className="view-all-link">View All →</Link>
        </div>

        <div className="circular-regional-artists-row">
          {[
            { name: 'Kishan Ram', craft: 'Block Print', state: 'Rajasthan', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
            { name: 'Sovitri Devi', craft: 'Tie & Dye', state: 'Rajasthan', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' },
            { name: 'Rahul Khan', craft: 'Embroidery', state: 'Rajasthan', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
            { name: 'Poonam Joshi', craft: 'Textiles', state: 'Rajasthan', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80' },
            { name: 'Arjun Lal', craft: 'Handicraft', state: 'Rajasthan', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' }
          ].map((art) => (
            <Link key={art.name} to="/artists" className="map-artist-circle-card">
              <div className="circle-img-wrap">
                <img src={art.img} alt={art.name} />
                <span className="gi-verified-check">✓</span>
              </div>
              <div className="artist-circle-name">{art.name}</div>
              <div className="artist-circle-craft">{art.craft}</div>
              <div className="artist-circle-state">{art.state}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CultureMap;
