import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Compass,
  ArrowRight,
  Sparkles,
  Palette,
  Sun,
  Utensils,
  Users,
  ChevronRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { REGIONS_DATA } from '../../data/mockData';
import { useApp } from '../../context/AdminContext';
import HeritageCornerMotif from '../../components/common/HeritageCornerMotif';

const CultureMap = () => {
  const [searchParams] = useSearchParams();
  const rawStateQuery = searchParams.get('state') || '';
  const stateQuery = decodeURIComponent(rawStateQuery).trim();

  const { artisans, traditions, products } = useApp();
  const [activeMapTab, setActiveMapTab] = useState('All');
  const [activeZone, setActiveZone] = useState('All');

  // Robust helper to match state by name, slug, code, or ID
  const findStateMatch = (query) => {
    if (!query) return null;
    const q = query.toLowerCase().trim();
    const qSlug = q.replace(/\s+/g, '-');
    return (
      REGIONS_DATA.find((s) => s.name.toLowerCase() === q) ||
      REGIONS_DATA.find((s) => s.slug && s.slug.toLowerCase() === q) ||
      REGIONS_DATA.find((s) => s.slug && s.slug.toLowerCase() === qSlug) ||
      REGIONS_DATA.find((s) => s.code && s.code.toLowerCase() === q) ||
      REGIONS_DATA.find((s) => s.id && s.id.toLowerCase() === q) ||
      REGIONS_DATA.find((s) => s.id && s.id.toLowerCase() === `state-${qSlug}`)
    );
  };

  const [selectedStateId, setSelectedStateId] = useState(() => {
    const match = findStateMatch(stateQuery);
    return match ? match.id : 'state-rajasthan';
  });

  const [selectedRegionIndex, setSelectedRegionIndex] = useState(0);

  // Sync if query param changes in URL
  useEffect(() => {
    if (stateQuery) {
      const match = findStateMatch(stateQuery);
      if (match) {
        setSelectedStateId(match.id);
        setSelectedRegionIndex(0);
      }
    }
  }, [stateQuery]);

  const activeState = useMemo(() => {
    return (
      REGIONS_DATA.find((s) => s.id === selectedStateId) ||
      findStateMatch(stateQuery) ||
      REGIONS_DATA[0]
    );
  }, [selectedStateId, stateQuery]);

  // Guaranteed safe region data
  const stateRegionsList = useMemo(() => {
    if (activeState.regions && Array.isArray(activeState.regions) && activeState.regions.length > 0) {
      return activeState.regions;
    }
    return [
      {
        id: `reg-${activeState.slug || 'core'}`,
        name: `${activeState.name} Heritage Corridor`,
        center: activeState.capital || activeState.name,
        description: activeState.description || activeState.tagline,
        crafts: activeState.majorCrafts || [],
        festivals: activeState.festivals || activeState.famousFestivals || [],
        culinary: ['Heritage Regional Flavors', 'Traditional Regional Delicacies'],
        artists: ['Generational Guild Masters', 'GI-Certified Lineage Bearers'],
      },
    ];
  }, [activeState]);

  const activeRegion = useMemo(() => {
    return stateRegionsList[selectedRegionIndex] || stateRegionsList[0];
  }, [stateRegionsList, selectedRegionIndex]);

  // Matched artists from context
  const regionalArtisans = useMemo(() => {
    return (artisans || []).filter(
      (a) => a.state && a.state.toLowerCase() === activeState.name.toLowerCase()
    );
  }, [artisans, activeState]);

  // Matched products from context
  const regionalProducts = useMemo(() => {
    return (products || []).filter(
      (p) => p.state && p.state.toLowerCase() === activeState.name.toLowerCase()
    );
  }, [products, activeState]);

  // Matched traditions from context
  const regionalTraditions = useMemo(() => {
    return (traditions || []).filter(
      (t) => t.state && t.state.toLowerCase() === activeState.name.toLowerCase()
    );
  }, [traditions, activeState]);

  // Dynamic Popular Hubs for active state
  const popularHubs = useMemo(() => {
    if (activeState.regions && activeState.regions.length > 1) {
      return activeState.regions.map((r) => ({
        name: r.name,
        state: activeState.name,
        crafts: (r.crafts || []).slice(0, 2).join(' & ') || activeState.tagline,
        img: activeState.heroImage || activeState.image,
      }));
    }
    const highlights = activeState.culturalHighlights || activeState.majorCrafts || [
      'Heritage Handlooms',
      'Indigenous Folk Arts',
      'Ceremonial Metalcraft',
      'Traditional Architecture',
    ];
    return highlights.slice(0, 4).map((h, idx) => ({
      name: h,
      state: activeState.name,
      crafts: (activeState.majorCrafts || [])[idx] || 'Living Heritage Tradition',
      img: idx % 2 === 0 ? (activeState.heroImage || activeState.image) : (activeState.image || activeState.heroImage),
    }));
  }, [activeState]);

  // Dynamic Featured Artists for active state
  const featuredRegionalArtists = useMemo(() => {
    if (regionalArtisans.length > 0) {
      return regionalArtisans.slice(0, 5).map((a) => ({
        name: a.name,
        craft: a.craft || (activeState.majorCrafts && activeState.majorCrafts[0]) || 'Master Artisan',
        state: activeState.name,
        img: a.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(a.name)}&background=14532d&color=fff`,
      }));
    }

    const defaultNames = [
      `Pt. Ram Kumar (${activeState.majorCrafts?.[0] || 'Master Artisan'})`,
      `Smt. Devi Sharma (${activeState.majorCrafts?.[1] || 'Textile Weaver'})`,
      `Ustad Rahim Bux (${activeState.majorCrafts?.[2] || 'Carver'})`,
      `Ananya Roy (${activeState.majorCrafts?.[3] || 'Folk Artist'})`,
      `K. Meenakshi (${activeState.majorCrafts?.[0] || 'Heritage Guild'})`,
    ];

    return defaultNames.map((name, idx) => {
      const craft = (activeState.majorCrafts || [])[idx % (activeState.majorCrafts?.length || 1)] || 'Traditional Art';
      return {
        name,
        craft,
        state: activeState.name,
        img: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=14532d&color=fff`,
      };
    });
  }, [regionalArtisans, activeState]);

  const zones = ['All', 'North', 'South', 'East', 'West', 'Central', 'North-East', 'Islands'];

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

          {/* Dynamic Interactive Top Tab Pills */}
          <div className="culture-map-top-tabs">
            {[
              { id: 'All', label: 'All India Atlas' },
              { id: activeState.name, label: activeState.name },
              { id: activeRegion.name, label: activeRegion.name },
              { id: 'Crafts', label: `${activeState.name} Heritage` },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`map-top-tab-pill ${activeMapTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveMapTab(tab.id);
                  if (tab.id === 'All') {
                    setActiveZone('All');
                  } else if (tab.id === activeState.name) {
                    setSelectedRegionIndex(0);
                  }
                }}
              >
                {tab.label}
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
              <span>
                State: <strong>{activeState.name}</strong>
              </span>
            </div>
            <ChevronRight size={16} className="crumb-arrow" />
            <div className="crumb-step active">
              <span className="crumb-num">3</span>
              <span>
                Region: <strong>{activeRegion.name}</strong>
              </span>
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
                <span className="legend-item">
                  <span className="legend-dot active" /> Selected Cluster
                </span>
                <span className="legend-item">
                  <span className="legend-dot" /> Heritage Hub
                </span>
              </div>

              {/* Stylized Interactive Map of India with pins */}
              <div className="india-map-canvas">
                {/* Active Popup Pin on Map */}
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
                    className={`map-pin-group ${selectedStateId === 'state-jammu-and-kashmir' || selectedStateId === 'state-kashmir' ? 'active' : ''}`}
                    onClick={() => {
                      const match = findStateMatch('Jammu and Kashmir');
                      if (match) setSelectedStateId(match.id);
                      setSelectedRegionIndex(0);
                    }}
                  >
                    <circle cx="210" cy="80" r={selectedStateId === 'state-jammu-and-kashmir' ? 12 : 8} className="map-pin-circle" />
                    <text x="210" y="65" textAnchor="middle" className="map-pin-text">Kashmir</text>
                  </g>

                  {/* Rajasthan */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-rajasthan' ? 'active' : ''}`}
                    onClick={() => {
                      const match = findStateMatch('Rajasthan');
                      if (match) setSelectedStateId(match.id);
                      setSelectedRegionIndex(0);
                    }}
                  >
                    <circle cx="150" cy="200" r={selectedStateId === 'state-rajasthan' ? 14 : 9} className="map-pin-circle" />
                    <text x="150" y="180" textAnchor="middle" className="map-pin-text">Rajasthan</text>
                  </g>

                  {/* Uttar Pradesh Pin */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-uttar-pradesh' ? 'active' : ''}`}
                    onClick={() => {
                      const match = findStateMatch('Uttar Pradesh');
                      if (match) setSelectedStateId(match.id);
                      setSelectedRegionIndex(0);
                    }}
                  >
                    <circle cx="245" cy="195" r={selectedStateId === 'state-uttar-pradesh' ? 14 : 9} className="map-pin-circle" />
                    <text x="245" y="175" textAnchor="middle" className="map-pin-text">Uttar Pradesh</text>
                  </g>

                  {/* Bihar */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-bihar' ? 'active' : ''}`}
                    onClick={() => {
                      const match = findStateMatch('Bihar');
                      if (match) setSelectedStateId(match.id);
                      setSelectedRegionIndex(0);
                    }}
                  >
                    <circle cx="330" cy="220" r={selectedStateId === 'state-bihar' ? 14 : 9} className="map-pin-circle" />
                    <text x="330" y="205" textAnchor="middle" className="map-pin-text">Bihar</text>
                  </g>

                  {/* Odisha */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-odisha' ? 'active' : ''}`}
                    onClick={() => {
                      const match = findStateMatch('Odisha');
                      if (match) setSelectedStateId(match.id);
                      setSelectedRegionIndex(0);
                    }}
                  >
                    <circle cx="330" cy="300" r={selectedStateId === 'state-odisha' ? 14 : 9} className="map-pin-circle" />
                    <text x="330" y="285" textAnchor="middle" className="map-pin-text">Odisha</text>
                  </g>

                  {/* Maharashtra */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-maharashtra' ? 'active' : ''}`}
                    onClick={() => {
                      const match = findStateMatch('Maharashtra');
                      if (match) setSelectedStateId(match.id);
                      setSelectedRegionIndex(0);
                    }}
                  >
                    <circle cx="180" cy="330" r={selectedStateId === 'state-maharashtra' ? 14 : 9} className="map-pin-circle" />
                    <text x="180" y="315" textAnchor="middle" className="map-pin-text">Maharashtra</text>
                  </g>

                  {/* Chhattisgarh */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-chhattisgarh' ? 'active' : ''}`}
                    onClick={() => {
                      const match = findStateMatch('Chhattisgarh');
                      if (match) setSelectedStateId(match.id);
                      setSelectedRegionIndex(0);
                    }}
                  >
                    <circle cx="265" cy="285" r={selectedStateId === 'state-chhattisgarh' ? 14 : 9} className="map-pin-circle" />
                    <text x="265" y="270" textAnchor="middle" className="map-pin-text">Chhattisgarh</text>
                  </g>

                  {/* Andhra Pradesh */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-andhra-pradesh' || selectedStateId === 'state-andhra' ? 'active' : ''}`}
                    onClick={() => {
                      const match = findStateMatch('Andhra Pradesh');
                      if (match) setSelectedStateId(match.id);
                      setSelectedRegionIndex(0);
                    }}
                  >
                    <circle cx="240" cy="395" r={selectedStateId === 'state-andhra-pradesh' ? 14 : 9} className="map-pin-circle" />
                    <text x="240" y="380" textAnchor="middle" className="map-pin-text">Andhra Pradesh</text>
                  </g>

                  {/* Tamil Nadu */}
                  <g
                    className={`map-pin-group ${selectedStateId === 'state-tamil-nadu' || selectedStateId === 'state-tamilnadu' ? 'active' : ''}`}
                    onClick={() => {
                      const match = findStateMatch('Tamil Nadu');
                      if (match) setSelectedStateId(match.id);
                      setSelectedRegionIndex(0);
                    }}
                  >
                    <circle cx="220" cy="470" r={selectedStateId === 'state-tamil-nadu' ? 14 : 9} className="map-pin-circle" />
                    <text x="220" y="495" textAnchor="middle" className="map-pin-text">Tamil Nadu</text>
                  </g>
                </svg>
              </div>

              {/* State Selection Grid below map */}
              <div className="state-selection-grid">
                {filteredStates.map((st) => (
                  <button
                    key={st.id || st.code}
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
                <p className="regional-tagline">{activeState.tagline || activeState.description}</p>
              </div>
              <div className="state-quick-stats">
                <div className="quick-stat">
                  <strong>{regionalTraditions.length || (activeState.majorCrafts?.length ? activeState.majorCrafts.length * 2 : 8)}</strong>
                  <span>Traditions</span>
                </div>
                <div className="quick-stat">
                  <strong>{regionalArtisans.length || ((activeState.majorCrafts?.length || 3) * 14)}</strong>
                  <span>Artisans</span>
                </div>
              </div>
            </div>

            {/* Sub-Regions Tab Selection */}
            {stateRegionsList.length > 1 && (
              <div className="sub-region-tabs">
                {stateRegionsList.map((reg, idx) => (
                  <button
                    key={reg.id || reg.name}
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
                <span className="region-center-badge">
                  <Building size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  Center: {activeRegion.center || activeState.capital}
                </span>
              </div>
              <p className="region-detailed-desc">{activeRegion.description || activeState.description}</p>

              {/* Crafts & Traditions in this Region */}
              <div className="region-attribute-section">
                <div className="attribute-header">
                  <Palette size={16} className="text-gold" />
                  <h4>Signature Crafts & Traditions</h4>
                </div>
                <div className="attribute-chips-list">
                  {(activeRegion.crafts && activeRegion.crafts.length > 0
                    ? activeRegion.crafts
                    : activeState.majorCrafts || ['Handloom Brocade', 'Pottery', 'Metalwork']
                  ).map((craft) => (
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
                  {(activeRegion.festivals && activeRegion.festivals.length > 0
                    ? activeRegion.festivals
                    : activeState.festivals || activeState.famousFestivals || ['Cultural Mahotsav', 'Spring Fair']
                  ).map((fest) => (
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
                  {(activeRegion.culinary && activeRegion.culinary.length > 0
                    ? activeRegion.culinary
                    : ['Traditional Festive Sweets', 'Heritage Delicacies', 'Indigenous Flavors']
                  ).map((food) => (
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
                            e.target.onerror = null;
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
                    <p>
                      Notable guild masters:{' '}
                      {(activeRegion.artists && activeRegion.artists.length > 0
                        ? activeRegion.artists
                        : ['Generational Craft Masters', 'National GI Awardees']
                      ).join(', ')}
                    </p>
                    <Link to="/artists" className="btn btn-outline btn-sm">
                      View all Master Artisans
                    </Link>
                  </div>
                )}
              </div>

              {/* Popular Regions / Heritage Hubs List */}
              <div className="popular-regions-list-card">
                <div className="popular-regions-header">
                  <h4>Popular Regions in {activeState.name}</h4>
                  <span className="count-tag">Province Hubs</span>
                </div>
                <div className="popular-regions-grid-list">
                  {popularHubs.map((pr) => (
                    <div key={pr.name} className="popular-region-row">
                      <img
                        src={pr.img}
                        alt={pr.name}
                        className="popular-region-thumb"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/regions/states/rajasthan/hero.jpg';
                        }}
                      />
                      <div className="popular-region-info">
                        <strong>{pr.name}</strong>
                        <span>
                          {pr.state} • {pr.crafts}
                        </span>
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
                <Link to="/workshops" className="btn btn-outline btn-sm">
                  Find Regional Masterclasses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Artists from this Region ───────────────────────────── */}
      <section className="map-featured-artists-section page-container">
        <div className="section-header-compact">
          <div>
            <h3>Featured Artists from {activeState.name}</h3>
            <p>Generational master craftspeople and GI-verified lineage bearers</p>
          </div>
          <Link to="/artists" className="view-all-link">
            View All →
          </Link>
        </div>

        <div className="circular-regional-artists-row">
          {featuredRegionalArtists.map((art) => (
            <Link key={art.name} to="/artists" className="map-artist-circle-card">
              <div className="circle-img-wrap">
                <img
                  src={art.img}
                  alt={art.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(art.name)}&background=14532d&color=fff`;
                  }}
                />
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
