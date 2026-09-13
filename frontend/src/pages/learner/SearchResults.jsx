import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Users,
  ShoppingBag,
  Calendar,
  Layers,
  BookOpen,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import * as searchService from '../../services/searchService';
import { STORIES_DATA } from '../../data/mockData';
import ArtistCard from '../../components/common/ArtistCard';
import ProductCard from '../../components/common/ProductCard';
import WorkshopCard from '../../components/common/WorkshopCard';
import TraditionCard from '../../components/common/TraditionCard';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { artisans, products, workshops, traditions } = useApp();

  const [inputQuery, setInputQuery] = useState(query);
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [apiResults, setApiResults] = useState(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      setSearching(true);
      searchService.search(query.trim())
        .then((res) => {
          if (res?.data) {
            setApiResults(res.data);
          }
        })
        .catch(() => {})
        .finally(() => setSearching(false));
    } else {
      setApiResults(null);
    }
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      setSearchParams({ q: inputQuery.trim() });
    }
  };

  // Compute matched items
  const matchedArtists = useMemo(() => {
    if (apiResults?.artisans) return apiResults.artisans;
    if (!query) return [];
    const q = query.toLowerCase();
    return (artisans || []).filter(
      (a) =>
        (a.name || '').toLowerCase().includes(q) ||
        (a.craft || '').toLowerCase().includes(q) ||
        (a.region && a.region.toLowerCase().includes(q)) ||
        (a.state && a.state.toLowerCase().includes(q)) ||
        (a.bio && a.bio.toLowerCase().includes(q))
    );
  }, [apiResults, artisans, query]);

  const matchedProducts = useMemo(() => {
    if (apiResults?.products) return apiResults.products;
    if (!query) return [];
    const q = query.toLowerCase();
    return (products || []).filter(
      (p) =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.craft || '').toLowerCase().includes(q) ||
        (p.tradition || '').toLowerCase().includes(q) ||
        (p.artisanName || p.artisan || '').toLowerCase().includes(q) ||
        (p.materials && Array.isArray(p.materials) ? p.materials.join(' ').toLowerCase().includes(q) : String(p.materials || '').toLowerCase().includes(q))
    );
  }, [apiResults, products, query]);

  const matchedWorkshops = useMemo(() => {
    if (apiResults?.workshops) return apiResults.workshops;
    if (!query) return [];
    const q = query.toLowerCase();
    return (workshops || []).filter(
      (w) =>
        (w.title || '').toLowerCase().includes(q) ||
        (w.craft || '').toLowerCase().includes(q) ||
        (w.artisanName || (typeof w.artisan === 'string' ? w.artisan : '')).toLowerCase().includes(q)
    );
  }, [apiResults, workshops, query]);

  const matchedTraditions = useMemo(() => {
    if (apiResults?.traditions) return apiResults.traditions;
    if (!query) return [];
    const q = query.toLowerCase();
    return (traditions || []).filter(
      (t) =>
        (t.title || t.name || '').toLowerCase().includes(q) ||
        (t.category || '').toLowerCase().includes(q) ||
        (t.state || '').toLowerCase().includes(q) ||
        (t.materials && String(t.materials).toLowerCase().includes(q))
    );
  }, [apiResults, traditions, query]);

  const matchedStories = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return (STORIES_DATA || []).filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.tradition.toLowerCase().includes(q) ||
        s.region.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q)
    );
  }, [query]);

  const totalResults =
    matchedArtists.length +
    matchedProducts.length +
    matchedWorkshops.length +
    matchedTraditions.length +
    matchedStories.length;

  return (
    <div className="search-results-page">
      {/* Search Header Banner */}
      <section className="search-results-hero">
        <div className="page-container">
          <h1 className="search-hero-title">Platform Search</h1>
          <p className="search-hero-subtitle">
            Cross-entity discovery across master artisans, authentic products, workshops, traditions, and chronicles.
          </p>

          <form onSubmit={handleSearchSubmit} className="search-bar-inline">
            <Search size={20} className="search-inline-icon" />
            <input
              type="text"
              placeholder="Search for culture, traditions, artisans, workshops..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="search-inline-input"
            />
            {inputQuery && (
              <button
                type="button"
                className="search-inline-clear"
                onClick={() => setInputQuery('')}
              >
                <X size={16} />
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          {/* Quick Query Pills */}
          <div className="search-quick-pills">
            <span>Try searching:</span>
            {['Madhubani', 'Blue Pottery', 'Pashmina', 'Warli', 'Dhokra', 'Kalamkari'].map(
              (term) => (
                <button
                  key={term}
                  type="button"
                  className="quick-pill"
                  onClick={() => {
                    setInputQuery(term);
                    setSearchParams({ q: term });
                  }}
                >
                  {term}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="search-results-content">
        <div className="page-container">
          <div className="search-meta-row">
            <div>
              <h2>Results for "{query}"</h2>
              <p>Found {totalResults} cultural items across cataloged entities.</p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="search-category-tabs">
            <button
              className={`cat-tab-btn ${activeCategoryTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategoryTab('all')}
            >
              All ({totalResults})
            </button>
            <button
              className={`cat-tab-btn ${activeCategoryTab === 'artists' ? 'active' : ''}`}
              onClick={() => setActiveCategoryTab('artists')}
            >
              <Users size={14} /> Artists ({matchedArtists.length})
            </button>
            <button
              className={`cat-tab-btn ${activeCategoryTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveCategoryTab('products')}
            >
              <ShoppingBag size={14} /> Products ({matchedProducts.length})
            </button>
            <button
              className={`cat-tab-btn ${activeCategoryTab === 'workshops' ? 'active' : ''}`}
              onClick={() => setActiveCategoryTab('workshops')}
            >
              <Calendar size={14} /> Workshops ({matchedWorkshops.length})
            </button>
            <button
              className={`cat-tab-btn ${activeCategoryTab === 'traditions' ? 'active' : ''}`}
              onClick={() => setActiveCategoryTab('traditions')}
            >
              <Layers size={14} /> Traditions ({matchedTraditions.length})
            </button>
            <button
              className={`cat-tab-btn ${activeCategoryTab === 'stories' ? 'active' : ''}`}
              onClick={() => setActiveCategoryTab('stories')}
            >
              <BookOpen size={14} /> Stories ({matchedStories.length})
            </button>
          </div>

          {totalResults === 0 ? (
            <div className="search-empty-box">
              <Search size={48} />
              <h3>No direct matches found for "{query}"</h3>
              <p>Try searching for craft keywords like "Painting", "Pottery", "Silk", or a state like "Rajasthan" or "Bihar".</p>
              <div className="empty-suggestions-links">
                <Link to="/artists" className="btn btn-outline">
                  Browse All Artists
                </Link>
                <Link to="/shop" className="btn btn-outline">
                  Browse All Products
                </Link>
                <Link to="/explore" className="btn btn-primary">
                  Explore Traditions
                </Link>
              </div>
            </div>
          ) : (
            <div className="search-results-groups">
              {/* 1. ARTISTS RESULTS */}
              {(activeCategoryTab === 'all' || activeCategoryTab === 'artists') &&
                matchedArtists.length > 0 && (
                  <div className="search-group-block">
                    <div className="group-title-row">
                      <h3>Master Artisans ({matchedArtists.length})</h3>
                      <Link to="/artists" className="group-link">
                        View directory <ArrowRight size={14} />
                      </Link>
                    </div>
                    <div className="artists-directory-grid">
                      {matchedArtists.map((artist) => (
                        <ArtistCard key={artist.id || artist._id} artist={artist} />
                      ))}
                    </div>
                  </div>
                )}

              {/* 2. PRODUCTS RESULTS */}
              {(activeCategoryTab === 'all' || activeCategoryTab === 'products') &&
                matchedProducts.length > 0 && (
                  <div className="search-group-block">
                    <div className="group-title-row">
                      <h3>Authentic Handicrafts ({matchedProducts.length})</h3>
                      <Link to="/shop" className="group-link">
                        Shop all <ArrowRight size={14} />
                      </Link>
                    </div>
                    <div className="products-grid-4">
                      {matchedProducts.map((prod) => (
                        <ProductCard key={prod.id} product={prod} />
                      ))}
                    </div>
                  </div>
                )}

              {/* 3. WORKSHOPS RESULTS */}
              {(activeCategoryTab === 'all' || activeCategoryTab === 'workshops') &&
                matchedWorkshops.length > 0 && (
                  <div className="search-group-block">
                    <div className="group-title-row">
                      <h3>Masterclasses & Workshops ({matchedWorkshops.length})</h3>
                      <Link to="/workshops" className="group-link">
                        All masterclasses <ArrowRight size={14} />
                      </Link>
                    </div>
                    <div className="workshops-grid-3">
                      {matchedWorkshops.map((ws) => (
                        <WorkshopCard key={ws.id || ws._id} workshop={ws} />
                      ))}
                    </div>
                  </div>
                )}

              {/* 4. TRADITIONS RESULTS */}
              {(activeCategoryTab === 'all' || activeCategoryTab === 'traditions') &&
                matchedTraditions.length > 0 && (
                  <div className="search-group-block">
                    <div className="group-title-row">
                      <h3>Living Traditions ({matchedTraditions.length})</h3>
                      <Link to="/explore" className="group-link">
                        Explore all <ArrowRight size={14} />
                      </Link>
                    </div>
                    <div className="traditions-grid-3">
                      {matchedTraditions.map((trad) => (
                        <TraditionCard key={trad.id} tradition={trad} />
                      ))}
                    </div>
                  </div>
                )}

              {/* 5. CULTURAL STORIES RESULTS */}
              {(activeCategoryTab === 'all' || activeCategoryTab === 'stories') &&
                matchedStories.length > 0 && (
                  <div className="search-group-block">
                    <div className="group-title-row">
                      <h3>Cultural Chronicles ({matchedStories.length})</h3>
                      <Link to="/learn" className="group-link">
                        Learn more <ArrowRight size={14} />
                      </Link>
                    </div>
                    <div className="stories-grid-2">
                      {matchedStories.map((story) => (
                        <div key={story.id} className="cultural-story-card">
                          <img
                            src={story.image}
                            alt={story.title}
                            className="story-card-thumb"
                          />
                          <div className="story-card-body">
                            <span className="story-tradition-tag">{story.tradition}</span>
                            <h4>{story.title}</h4>
                            <p>{story.shortDescription}</p>
                            <Link to="/learn" className="btn btn-outline btn-sm">
                              Read in Learn Hub
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResults;
