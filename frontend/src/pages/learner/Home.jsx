import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  Sparkles,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Users,
  BookOpen,
  Award,
  HeartHandshake,
  MapPin,
  X,
  ChevronRight,
  Layers,
  Shield,
  Globe,
  Palette,
  Calendar,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import { STORIES_DATA } from '../../data/mockData';
import SectionHeader from '../../components/common/SectionHeader';
import ArtistCard from '../../components/common/ArtistCard';
import ProductCard from '../../components/common/ProductCard';
import WorkshopCard from '../../components/common/WorkshopCard';
import RegionCard from '../../components/common/RegionCard';
import StoryCard from '../../components/common/StoryCard';
import CraftCard from '../../components/common/CraftCard';
import TraditionCard from '../../components/common/TraditionCard';
import TrustPillars from '../../components/common/TrustPillars';
import Modal from '../../components/common/Modal';
import HeritageCornerMotif from '../../components/common/HeritageCornerMotif';

/**
 * Home Page — JEEVANT: LIVING INDIA
 * ==============================================================================
 * Smart India Hackathon 2026 · Problem Statement 26197 · Heritage & Culture
 *
 * Polished 12-Section Cultural Architecture:
 *   1. Cinematic Hero with live search, direct CTAs & dynamic stats ticker
 *   2. Trust / Impact Strip (4 responsive pillars: Verified, Authentic, DBT, Preservation)
 *   3. Explore by Region (6 cultural zones of India)
 *   4. Featured Master Artisans (circular avatar quick bar + portrait cards)
 *   5. Cultural Traditions Showcase (Living intangible heritage registry)
 *   6. Cultural Stories (Editorial cultural magazine layout)
 *   7. Popular Handicrafts (Image-first craft showcase cards)
 *   8. Workshops / Learn from Artisans (Live masterclasses preview)
 *   9. Culture Map Preview (Geographical discovery preview)
 *  10. Marketplace Preview ("Crafts With a Story")
 *  11. Impact / Mission Section ("Why JEEVANT?")
 *  12. Final Call to Action
 * ==============================================================================
 */
const Home = () => {
  const navigate = useNavigate();
  const { artisans, workshops, products, traditions, stats } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStoryModal, setActiveStoryModal] = useState(null);
  const [selectedZone, setSelectedZone] = useState('All');

  // Dynamic slices from context / database
  const verifiedArtisans = (artisans || [])
    .filter((a) => a.status === 'Verified' || a.verificationStatus === 'approved' || a.verificationStatus === 'verified')
    .slice(0, 3);
  const featuredProducts = (products || []).slice(0, 4);
  const upcomingWorkshops = (workshops || []).slice(0, 3);
  const featuredTraditions = (traditions || []).slice(0, 6);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  // ─── 1. Explore by Region Data (6 Cultural Zones of Bharat) ───────────────
  const zonesList = ['All', 'North', 'South', 'East', 'West', 'Central', 'Northeast'];

  const regionsList = [
    {
      name: 'Rajasthan',
      zone: 'West',
      craftsCount: 14,
      desc: 'Land of Amer Blue Pottery, Bandhani tie-dye, miniature Mewar murals, and royal Jaipur block prints.',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Uttar Pradesh',
      zone: 'North',
      craftsCount: 16,
      desc: 'Cradle of ancient Varanasi Katan silk zari weaves, delicate Lucknowi Chikankari needlework, and Moradabad brass.',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Kerala',
      zone: 'South',
      craftsCount: 12,
      desc: 'Home of secret metallurgical Aranmula metal mirrors, ceremonial Kathakali crowns, and Kasavu golden border looms.',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'West Bengal',
      zone: 'East',
      craftsCount: 13,
      desc: 'Heritage of Shantiniketan embossed leather, Bankura burnt-clay terracotta horses, and Kantha embroidered quilts.',
      image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Gujarat',
      zone: 'West',
      craftsCount: 15,
      desc: 'Vibrant Kutch Ajrakh block printing, 400-year-old castor oil Rogan art, and geometric double-ikat Patola weaves.',
      image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Madhya Pradesh',
      zone: 'Central',
      craftsCount: 14,
      desc: 'Ancient Gond tribal animist murals, gossamer Chanderi silk muslins, and Bastar Dhokra bell-metal metallurgy.',
      image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Odisha',
      zone: 'East',
      craftsCount: 12,
      desc: 'Ancient Raghurajpur palm-leaf etched Pattachitra scrolls, Cuttack silver filigree Tarakasi, and Pipli applique banners.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Assam & Northeast',
      zone: 'Northeast',
      craftsCount: 11,
      desc: 'Golden wild Muga silk found nowhere else, ceremonial tribal backstrap looms, and microscopic bamboo architecture.',
      image: 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const filteredRegions = selectedZone === 'All'
    ? regionsList
    : regionsList.filter((r) => r.zone === selectedZone);

  // ─── 2. Popular Crafts Showcase ───────────────────────────────────────────
  const popularCrafts = [
    {
      name: 'Madhubani Painting',
      state: 'Bihar',
      desc: 'Sacred Mithila natural pigment murals painted using bamboo twigs.',
      count: '42+ Master Artisans',
      giTag: 'GI-IN-0012',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
      link: '/shop?category=Traditional+Painting',
    },
    {
      name: 'Banarasi Silk Weave',
      state: 'Uttar Pradesh',
      desc: 'Hand-loomed pure gold and silver zari brocades on pure mulberry silk.',
      count: '68+ Master Looms',
      giTag: 'GI-IN-0021',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
      link: '/shop?category=Heritage+Textiles',
    },
    {
      name: 'Jaipur Blue Pottery',
      state: 'Rajasthan',
      desc: 'Persian-origin quartz and fuller earth formulation fired without clay.',
      count: '34+ Guild Masters',
      giTag: 'GI-IN-0028',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80',
      link: '/shop?category=Ceramics+%26+Pottery',
    },
    {
      name: 'Warli Tribal Folk Art',
      state: 'Maharashtra',
      desc: 'Neolithic-origin rice paste pictograms capturing seasonal harvests and ritual dances.',
      count: '29+ Village Guilds',
      giTag: 'GI-IN-0114',
      image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&auto=format&fit=crop&q=80',
      link: '/shop?category=Tribal+Indigenous+Art',
    },
    {
      name: 'Pattachitra Scrolls',
      state: 'Odisha',
      desc: 'Intricate cloth and palm-leaf engravings colored with mineral and conch-shell pigments.',
      count: '38+ Living Masters',
      giTag: 'GI-IN-0039',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
      link: '/shop?category=Traditional+Painting',
    },
    {
      name: 'Bastar Dhokra Metallurgy',
      state: 'Chhattisgarh',
      desc: '4,000-year-old lost-wax bell metal casting using beeswax threads over anthill clay cores.',
      count: '24+ Tribal Casters',
      giTag: 'GI-IN-0082',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80',
      link: '/shop?category=Lost-Wax+Metallurgy',
    },
    {
      name: 'Kashmiri Sozni Needlework',
      state: 'Jammu & Kashmir',
      desc: 'Microscopic single-strand silk needle embroidery on featherweight hand-spun Pashmina.',
      count: '31+ Master Craftsmen',
      giTag: 'GI-IN-0045',
      image: 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?w=600&auto=format&fit=crop&q=80',
      link: '/shop?category=Heritage+Textiles',
    },
    {
      name: 'Rajasthani Kathputli',
      state: 'Rajasthan',
      desc: 'Hand-carved mango wood string puppets dressed in vintage Gota Patti brocades.',
      count: '19+ Troupe Masters',
      giTag: 'GI-IN-0103',
      image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&auto=format&fit=crop&q=80',
      link: '/shop?category=Sustainable+Fiber+%26+Woodcraft',
    },
  ];

  // ─── 3. Cultural Stories Layout ───────────────────────────────────────────
  const featuredStory = STORIES_DATA[0];
  const sideStories = STORIES_DATA.slice(1, 3);

  return (
    <div className="home-redesign-root">
      {/* ─── 1. CINEMATIC HERO SECTION ──────────────────────────────────────── */}
      <section className="cinematic-hero-section">
        <HeritageCornerMotif position="top-left" size={80} opacity={0.55} />
        <HeritageCornerMotif position="top-right" size={80} opacity={0.55} />
        <div className="cinematic-hero-backdrop" />
        <div className="cinematic-hero-pattern" />

        <div className="page-container cinematic-hero-inner">
          <div className="cinematic-eyebrow-pill">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Smart India Hackathon 2026 · PS 26197 · Heritage & Culture</span>
          </div>

          <h1 className="cinematic-hero-headline">
            Explore India's <span className="hero-gold-text">Living Heritage</span>
          </h1>

          <p className="cinematic-hero-subtitle">
            Discover culture, meet real artists, learn traditions, and support artisans directly with 100% Direct Benefit Transfer and zero intermediary deductions.
          </p>

          {/* Prominent Search Bar */}
          <form onSubmit={handleHeroSearch} className="cinematic-search-bar">
            <div className="cinematic-search-wrap">
              <Search size={22} className="cinematic-search-icon" />
              <input
                type="text"
                placeholder="Search art, craft, artisan, state, workshop..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cinematic-search-input"
              />
            </div>
            <button type="submit" className="btn btn-gold cinematic-search-btn">
              <span>Search Platform</span>
              <ArrowRight size={17} />
            </button>
          </form>

          {/* Explore by Region Quick Selector Pills */}
          <div className="explore-regions-icon-row">
            <span className="region-icon-pill-label">Explore by Region:</span>
            <Link to="/explore?state=Rajasthan" className="region-icon-pill">
              <span className="region-pill-dot dot-rajasthan" />
              <span>Rajasthan</span>
            </Link>
            <Link to="/explore?state=Gujarat" className="region-icon-pill">
              <span className="region-pill-dot dot-gujarat" />
              <span>Gujarat</span>
            </Link>
            <Link to="/explore?state=Madhya+Pradesh" className="region-icon-pill">
              <span className="region-pill-dot dot-mp" />
              <span>Madhya Pradesh</span>
            </Link>
            <Link to="/explore?state=Uttar+Pradesh" className="region-icon-pill">
              <span className="region-pill-dot dot-up" />
              <span>Uttar Pradesh</span>
            </Link>
            <Link to="/explore?state=Kerala" className="region-icon-pill">
              <span className="region-pill-dot dot-kerala" />
              <span>Kerala</span>
            </Link>
            <Link to="/explore" className="region-icon-pill more">
              <span>More...</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Primary Action Buttons */}
          <div className="cinematic-cta-actions">
            <Link to="/explore" className="btn btn-primary btn-large cta-primary-btn">
              <Compass size={18} />
              <span>Explore Culture</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/artists" className="btn btn-outline-light btn-large cta-secondary-btn">
              <Users size={18} />
              <span>Meet Artisans</span>
            </Link>
          </div>
        </div>

        {/* Real Dynamic Calculated Stats Bar */}
        <div className="cinematic-stats-ticker">
          <div className="page-container cinematic-stats-container">
            <div className="ticker-stat-block">
              <div className="ticker-stat-num">
                {(stats?.totalArtisans ?? (artisans ? artisans.length : 0)).toLocaleString('en-IN')}
              </div>
              <div className="ticker-stat-label">Registered Master Artisans</div>
            </div>

            <div className="ticker-divider" />

            <div className="ticker-stat-block">
              <div className="ticker-stat-num">
                {(stats?.totalTraditions ?? (traditions ? traditions.length : 0)).toLocaleString('en-IN')}
              </div>
              <div className="ticker-stat-label">Living Cultural Traditions</div>
            </div>

            <div className="ticker-divider" />

            <div className="ticker-stat-block">
              <div className="ticker-stat-num">
                {(stats?.totalWorkshops ?? (workshops ? workshops.length : 0)).toLocaleString('en-IN')}
              </div>
              <div className="ticker-stat-label">Masterclasses Scheduled</div>
            </div>

            <div className="ticker-divider" />

            <div className="ticker-stat-block">
              <div className="ticker-stat-num text-gold">
                {stats?.totalRevenue || (stats?.revenue ? `₹${Number(stats.revenue).toLocaleString('en-IN')}` : '₹0')}
              </div>
              <div className="ticker-stat-label">100% Direct DBT Disbursed</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. TRUST / IMPACT STRIP (Section 2 per SIH Guideline) ─────────── */}
      <section className="hero-trust-strip">
        <div className="page-container">
          <div className="hero-trust-grid">
            <div className="trust-strip-card">
              <div className="trust-strip-icon-box">
                <CheckCircle2 size={24} />
              </div>
              <div className="trust-strip-content">
                <h4 className="trust-strip-title">Verified Artisans</h4>
                <p className="trust-strip-desc">Official Geographical Indication (GI) verification authenticated by government nodal registries.</p>
              </div>
            </div>

            <div className="trust-strip-card">
              <div className="trust-strip-icon-box">
                <Shield size={24} />
              </div>
              <div className="trust-strip-content">
                <h4 className="trust-strip-title">Authentic Traditions</h4>
                <p className="trust-strip-desc">Preserving living generational crafts, ancient oral lore, and sacred natural material preparations.</p>
              </div>
            </div>

            <div className="trust-strip-card">
              <div className="trust-strip-icon-box">
                <HeartHandshake size={24} />
              </div>
              <div className="trust-strip-content">
                <h4 className="trust-strip-title">Direct Artisan Support</h4>
                <p className="trust-strip-desc">0% platform intermediary deductions — 100% of fair-trade payments transfer directly via DBT.</p>
              </div>
            </div>

            <div className="trust-strip-card">
              <div className="trust-strip-icon-box">
                <Sparkles size={24} />
              </div>
              <div className="trust-strip-content">
                <h4 className="trust-strip-title">Cultural Preservation</h4>
                <p className="trust-strip-desc">Safeguarding endangered tribal forms, rare natural pigments, and folk craftsmanship for posterity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. EXPLORE BY REGION (Visual Cards across 6 Zones) ─────────────── */}
      <section className="section-padding bg-warm-ivory">
        <div className="page-container">
          <SectionHeader
            badgeText="Geographical Diversity"
            title="Explore by Region"
            subtitle="Journey across India's vibrant states and historical provinces, each holding centuries of tangible and intangible heritage."
            linkTo="/explore"
            linkText="View All States & Regions"
          />

          {/* Regional Zone Filter Chips */}
          <div className="zone-filter-chips-row">
            {zonesList.map((zone) => (
              <button
                key={zone}
                type="button"
                className={`zone-chip-btn ${selectedZone === zone ? 'active' : ''}`}
                onClick={() => setSelectedZone(zone)}
              >
                {zone === 'All' ? 'All India' : `${zone} India`}
              </button>
            ))}
          </div>

          <div className="regions-showcase-grid">
            {filteredRegions.map((region) => (
              <RegionCard key={region.name} region={region} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURED MASTER ARTISANS ────────────────────────────────────── */}
      <section className="section-padding">
        <div className="page-container">
          <SectionHeader
            badgeText="Human Legacies"
            title="Meet the People Behind India's Heritage"
            subtitle="Connect directly with Padma Shri recipients, Shilp Guru honorees, and generational master craftspeople."
            linkTo="/artists"
            linkText="Meet All Verified Artisans"
          />

          {/* Circular Featured Artists Fast-Browse Bar */}
          <div className="circular-artists-row-wrap">
            <div className="circular-artists-header">
              <span className="circular-artists-label">Master Crafts Guild Practitioners</span>
              <Link to="/artists" className="circular-artists-link">Browse Directory →</Link>
            </div>
            <div className="circular-artists-scroll">
              {(artisans || []).slice(0, 8).map((artist) => (
                <Link
                  key={artist.id || artist._id}
                  to={`/artists/${artist.id || artist._id}`}
                  className="circular-artist-item"
                  title={`${artist.name} (${artist.craft})`}
                >
                  <div className="circular-avatar-box">
                    <img
                      src={artist.avatar || artist.image}
                      alt={artist.name}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=14532d&color=fff`;
                      }}
                    />
                    <span className="circular-verified-dot">✓</span>
                  </div>
                  <div className="circular-artist-name">{artist.name}</div>
                  <div className="circular-artist-state">{artist.state || 'Rajasthan'}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Large Detailed Portrait Cards */}
          <div className="artisans-portrait-grid">
            {verifiedArtisans.map((artist) => (
              <ArtistCard key={artist.id || artist._id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. CULTURAL TRADITIONS SHOWCASE ─────────────────────────────────── */}
      <section className="section-padding bg-warm-ivory">
        <div className="page-container">
          <SectionHeader
            badgeText="Intangible Cultural Repository"
            title="Recognized Cultural Traditions"
            subtitle="Explore recognized indigenous traditions protected by Geographical Indications and practiced by authentic master guilds."
            linkTo="/explore"
            linkText="View Cultural Registry"
          />

          <div className="traditions-showcase-grid">
            {featuredTraditions.length > 0 ? (
              featuredTraditions.map((tradition) => (
                <TraditionCard key={tradition.id || tradition._id} tradition={tradition} />
              ))
            ) : (
              popularCrafts.slice(0, 6).map((craft) => (
                <CraftCard key={craft.name} craft={craft} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS 5-STEP JOURNEY ───────────────────────────────────── */}
      <section className="section-padding">
        <div className="page-container">
          <SectionHeader
            badgeText="Simple 5-Step Process"
            title="How It Works"
            subtitle="Explore India's living cultural heritage from broad geographical overview directly to master artists."
            linkTo="/how-it-works"
            linkText="Learn More"
          />

          <div className="how-it-works-five-steps">
            <div className="five-step-card">
              <div className="five-step-icon">
                <Compass size={24} />
              </div>
              <h4>1. Explore India Map</h4>
              <p>Discover regional cultural zones</p>
            </div>
            <div className="five-step-connector"><ChevronRight size={18} /></div>

            <div className="five-step-card">
              <div className="five-step-icon">
                <MapPin size={24} />
              </div>
              <h4>2. Select State</h4>
              <p>Choose state craft heritage</p>
            </div>
            <div className="five-step-connector"><ChevronRight size={18} /></div>

            <div className="five-step-card">
              <div className="five-step-icon">
                <Layers size={24} />
              </div>
              <h4>3. Discover Region</h4>
              <p>Explore artisan clusters</p>
            </div>
            <div className="five-step-connector"><ChevronRight size={18} /></div>

            <div className="five-step-card">
              <div className="five-step-icon">
                <Sparkles size={24} />
              </div>
              <h4>4. Explore Tradition</h4>
              <p>Understand sacred craft lore</p>
            </div>
            <div className="five-step-connector"><ChevronRight size={18} /></div>

            <div className="five-step-card">
              <div className="five-step-icon">
                <Users size={24} />
              </div>
              <h4>5. Meet Artist</h4>
              <p>Connect & support directly</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. CULTURAL STORIES (Editorial Magazine Layout) ───────────────── */}
      <section className="section-padding bg-warm-sand">
        <div className="page-container">
          <SectionHeader
            badgeText="Intangible Chronicles"
            title="Stories That Keep Culture Alive"
            subtitle="Deep-dive into the sacred oral histories, material alchemy, and generational sagas behind authentic folk arts."
            linkTo="/learn"
            linkText="Open Heritage Magazine"
          />

          <div className="editorial-stories-layout">
            {/* Left: Large Featured Magazine Cover */}
            <div className="editorial-left-col">
              {featuredStory && (
                <StoryCard
                  story={featuredStory}
                  featured={true}
                  onRead={(s) => setActiveStoryModal(s)}
                />
              )}
            </div>

            {/* Right: Smaller Side Editorial Articles */}
            <div className="editorial-right-col">
              {sideStories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  featured={false}
                  onRead={(s) => setActiveStoryModal(s)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. POPULAR HANDICRAFTS (Image-First Cards) ────────────────────── */}
      <section className="section-padding">
        <div className="page-container">
          <SectionHeader
            badgeText="Living Traditions"
            title="Popular Crafts"
            subtitle="Explore recognized indigenous handicrafts protected by Geographical Indications and crafted by authentic guilds."
            linkTo="/shop"
            linkText="Browse Cultural Registry"
          />

          <div className="popular-crafts-grid">
            {popularCrafts.map((craft) => (
              <CraftCard key={craft.name} craft={craft} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. EXPERIENCE CULTURE FIRSTHAND (Workshops Preview) ─────────────── */}
      <section className="section-padding bg-warm-ivory">
        <div className="page-container">
          <SectionHeader
            badgeText="Interactive Knowledge"
            title="Experience Culture, Firsthand"
            subtitle="Learn ancestral techniques directly from national master artisans via live virtual ateliers and village studio residencies."
            linkTo="/workshops"
            linkText="View All Masterclasses"
          />

          <div className="workshops-showcase-grid">
            {upcomingWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.id || workshop._id} workshop={workshop} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. CULTURE MAP PREVIEW (Geographic Discovery Preview) ───────────── */}
      <section className="section-padding">
        <div className="page-container">
          <div className="culture-map-preview-card">
            <HeritageCornerMotif position="top-left" size={64} opacity={0.4} />
            <HeritageCornerMotif position="bottom-right" size={64} opacity={0.4} />
            <div className="culture-map-preview-info">
              <div className="map-preview-badge">
                <Compass size={15} />
                <span>Geographic Cultural Mapping</span>
              </div>
              <h2 className="map-preview-title">India Culture Map</h2>
              <p className="map-preview-desc">
                Trace living traditions across India's diverse landscapes. Filter by state clusters, geographical indications, and discover where authentic crafts are born.
              </p>
              <div className="map-preview-states-row">
                <span className="map-state-pill">Rajasthan (Marwar)</span>
                <span className="map-state-pill">Kerala (Malabar)</span>
                <span className="map-state-pill">Bihar (Mithila)</span>
                <span className="map-state-pill">Gujarat (Kutch)</span>
                <span className="map-state-pill">Assam (Brahmaputra)</span>
                <span className="map-state-pill">Odisha (Utkala)</span>
              </div>
              <div className="map-preview-action">
                <Link to="/explore/map" className="btn btn-gold btn-large">
                  <Compass size={18} />
                  <span>Launch Interactive Culture Map</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="culture-map-preview-visual">
              <div className="map-graphic-box">
                <div className="map-graphic-badge">
                  <span className="map-badge-dot" />
                  <span>28 States · 400+ Craft Clusters</span>
                </div>
                <div className="map-graphic-pins">
                  <div className="map-pin-pulse pin-1" title="Jaipur Blue Pottery"><span>North</span></div>
                  <div className="map-pin-pulse pin-2" title="Kutch Ajrakh"><span>West</span></div>
                  <div className="map-pin-pulse pin-3" title="Aranmula Mirror"><span>South</span></div>
                  <div className="map-pin-pulse pin-4" title="Madhubani Art"><span>East</span></div>
                </div>
                <div className="map-graphic-foot">
                  <span>Hierarchical Navigation: India → State → Cluster → Tradition → Artisan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. CRAFTS WITH A STORY (Shop Preview) ─────────────────────────── */}
      <section className="section-padding bg-warm-sand">
        <div className="page-container">
          <SectionHeader
            badgeText="Direct From Source"
            title="Crafts With a Story"
            subtitle="Every handcrafted piece is signed by a verified master, backed by GI documentation, and paid 100% via Direct Benefit Transfer."
            linkTo="/shop"
            linkText="Explore Complete Shop"
          />

          <div className="products-showcase-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>

          <div className="section-bottom-cta">
            <Link to="/shop" className="btn btn-gold btn-large">
              <span>Browse All Handcrafted Treasures</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 11. WHY JEEVANT? (Trust & Impact Section) ──────────────────────── */}
      <section className="section-padding bg-forest-gradient text-light">
        <div className="page-container">
          <div className="trust-section-header">
            <span className="eyebrow-pill-gold">Smart India Hackathon 2026 Core Mission</span>
            <h2 className="trust-section-title">Why JEEVANT?</h2>
            <p className="trust-section-sub">
              A comprehensive national cultural preservation ecosystem built to solve Problem Statement 26197.
              Eliminating intermediaries, authenticating geographical indications, and connecting cultural patrons with living masters.
            </p>
          </div>

          <TrustPillars />
        </div>
      </section>

      {/* ─── 12. FINAL CALL TO ACTION ───────────────────────────────────────── */}
      <section className="final-heritage-cta">
        <HeritageCornerMotif position="top-left" size={68} opacity={0.6} />
        <HeritageCornerMotif position="bottom-right" size={68} opacity={0.6} />
        <div className="page-container final-cta-container">
          <div className="final-cta-badge">
            <ShieldCheck size={16} />
            <span>Safeguarding India's Intangible Legacy</span>
          </div>

          <h2 className="final-cta-headline">Support Artisans, Celebrate Culture.</h2>

          <p className="final-cta-text">
            Join thousands of cultural patrons preserving living traditions with 100% Direct Benefit Transfer and zero intermediary deductions.
          </p>

          <div className="final-cta-button-group">
            <Link to="/explore" className="btn btn-primary btn-large">
              <span>Explore Culture Now</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/artisan/register" className="btn btn-outline-cream btn-large">
              <span>Join as Master Artisan</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Story Reader Modal ─────────────────────────────────────────────── */}
      {activeStoryModal && (
        <Modal
          isOpen={Boolean(activeStoryModal)}
          onClose={() => setActiveStoryModal(null)}
          title={activeStoryModal.title}
          maxWidth="760px"
        >
          <div className="story-reader-modal-body">
            <img
              src={activeStoryModal.image}
              alt={activeStoryModal.title}
              className="story-modal-img"
            />
            <div className="story-modal-meta">
              <span className="story-modal-tag">{activeStoryModal.tradition}</span>
              <span className="story-modal-loc">
                <MapPin size={13} /> {activeStoryModal.region || activeStoryModal.state}
              </span>
            </div>
            <p className="story-modal-lead">{activeStoryModal.summary || activeStoryModal.desc}</p>
            <div className="story-modal-content">
              {activeStoryModal.content ? (
                activeStoryModal.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>
                  This living chronicle preserves the ancestral methods, natural pigments, spiritual songs,
                  and ritual iconography passed down through unbroken master-disciple lineages across India.
                </p>
              )}
            </div>
            <div className="story-modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setActiveStoryModal(null)}
              >
                Close Chronicle
              </button>
              <Link
                to={`/explore?state=${encodeURIComponent(activeStoryModal.state || '')}`}
                className="btn btn-outline"
                onClick={() => setActiveStoryModal(null)}
              >
                Explore {activeStoryModal.state} Traditions
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;
