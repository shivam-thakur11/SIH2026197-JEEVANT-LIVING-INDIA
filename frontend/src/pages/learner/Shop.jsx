import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  X,
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import ProductCard from '../../components/common/ProductCard';
import HeritageCornerMotif from '../../components/common/HeritageCornerMotif';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialState = searchParams.get('state') || '';

  const { products } = useApp();

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [priceFilter, setPriceFilter] = useState('all'); // all, under3k, 3k-7k, above7k
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(8);

  // Screen 6 Exact Categories
  const categories = [
    'All Categories',
    'Textiles',
    'Pottery',
    'Jewellery',
    'Woodwork',
    'Paintings',
    'Home Decor',
  ];

  const states = useMemo(() => {
    return [...new Set((products || []).map((p) => p.state).filter(Boolean))].sort();
  }, [products]);

  const regions = useMemo(() => {
    return ['All Regions', 'Marwar', 'Mewar', 'Shekhawati', 'Mithila', 'Kutch', 'Bastar'];
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...(products || [])];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name || '').toLowerCase().includes(q) ||
          (p.craft || '').toLowerCase().includes(q) ||
          (typeof p.tradition === 'string' ? p.tradition : p.tradition?.name || '').toLowerCase().includes(q) ||
          (p.artisanName || (typeof p.artisan === 'string' ? p.artisan : p.artisan?.name) || '').toLowerCase().includes(q) ||
          (Array.isArray(p.materials) ? p.materials.join(' ') : (p.materials || '')).toLowerCase().includes(q)
      );
    }

    if (selectedCategory && selectedCategory !== 'All Categories') {
      result = result.filter(
        (p) => (p.category || '').toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedState) {
      result = result.filter(
        (p) => (p.state || '').toLowerCase() === selectedState.toLowerCase()
      );
    }

    if (priceFilter === 'under3k') {
      result = result.filter((p) => p.price < 3000);
    } else if (priceFilter === '3k-7k') {
      result = result.filter((p) => p.price >= 3000 && p.price <= 7000);
    } else if (priceFilter === 'above7k') {
      result = result.filter((p) => p.price > 7000);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [products, search, selectedCategory, selectedState, priceFilter, sortBy]);

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedState('');
    setSelectedRegion('');
    setPriceFilter('all');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search || selectedCategory || selectedState || selectedRegion || priceFilter !== 'all';

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="shop-page">
      {/* ─── Shop Hero Banner (Screen 6 Spec) ─────────────────────────── */}
      <section className="shop-hero">
        <HeritageCornerMotif position="top-right" size={68} opacity={0.6} />
        <div className="page-container">
          <div className="shop-hero-badge">
            <ShoppingBag size={15} />
            <span>SIH 2026 Guaranteed 0% Platform Fee · DBT Protected</span>
          </div>
          <h1 className="shop-hero-title">Shop</h1>
          <p className="shop-hero-subtitle">Authentic products. Directly from artists.</p>
        </div>
      </section>

      {/* ─── Main Shop Layout (Sidebar Filters + Products Grid) ────────── */}
      <section className="shop-main-section">
        <div className="page-container shop-layout-grid">
          {/* Sidebar Filters */}
          <aside className="shop-sidebar">
            <div className="sidebar-sticky-wrap">
              <div className="sidebar-header">
                <div className="sidebar-title">
                  <Filter size={18} />
                  <h3>Filters</h3>
                </div>
                {hasActiveFilters && (
                  <button onClick={clearAllFilters} className="btn-clear-text">
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="filter-group">
                <h4 className="filter-group-title">Categories</h4>
                <div className="filter-categories-list">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`filter-category-btn ${
                        (cat === 'All Categories' && !selectedCategory) ||
                        selectedCategory === cat
                          ? 'active'
                          : ''
                      }`}
                      onClick={() =>
                        setSelectedCategory(cat === 'All Categories' ? '' : cat)
                      }
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="filter-group">
                <h4 className="filter-group-title">Price Range</h4>
                <div className="filter-radio-list">
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="price"
                      value="all"
                      checked={priceFilter === 'all'}
                      onChange={() => setPriceFilter('all')}
                    />
                    <span>All Prices</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="price"
                      value="under3k"
                      checked={priceFilter === 'under3k'}
                      onChange={() => setPriceFilter('under3k')}
                    />
                    <span>Under ₹3,000</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="price"
                      value="3k-7k"
                      checked={priceFilter === '3k-7k'}
                      onChange={() => setPriceFilter('3k-7k')}
                    />
                    <span>₹3,000 – ₹7,000</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="price"
                      value="above7k"
                      checked={priceFilter === 'above7k'}
                      onChange={() => setPriceFilter('above7k')}
                    />
                    <span>Above ₹7,000</span>
                  </label>
                </div>
              </div>

              {/* State Filter */}
              <div className="filter-group">
                <h4 className="filter-group-title">Origin State</h4>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="filter-sidebar-select"
                >
                  <option value="">All States</option>
                  {states.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region Filter (Screen 6 Spec) */}
              <div className="filter-group">
                <h4 className="filter-group-title">Cultural Region</h4>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="filter-sidebar-select"
                >
                  {regions.map((rg) => (
                    <option key={rg} value={rg === 'All Regions' ? '' : rg}>
                      {rg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Direct Guarantee Card */}
              <div className="sidebar-guarantee-card">
                <ShieldCheck size={24} className="text-forest" />
                <h5>Fair-Trade GI Guarantee</h5>
                <p>
                  Zero middlemen take a cut. 100% of your payment is disbursed
                  directly to verified master artisans via Direct Benefit Transfer.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="shop-content-area">
            {/* Top Controls Bar */}
            <div className="shop-controls-bar">
              {/* Search Bar */}
              <div className="shop-search-wrap">
                <Search size={18} className="shop-search-icon" />
                <input
                  type="text"
                  placeholder="Search authentic crafts, materials, artisans..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="shop-search-input"
                />
                {search && (
                  <button
                    className="shop-search-clear"
                    onClick={() => setSearch('')}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="shop-sort-wrap">
                <span className="sort-label">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="shop-sort-select"
                >
                  <option value="featured">Featured Masterpieces</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Results Count Banner */}
            <div className="shop-results-meta">
              <span>
                Showing <strong>{displayedProducts.length}</strong> of{' '}
                <strong>{filteredProducts.length}</strong> authentic products
              </span>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="shop-empty-state">
                <ShoppingBag size={48} />
                <h3>No authentic crafts matched your criteria</h3>
                <p>Try resetting filters or searching with a different craft term.</p>
                <button onClick={clearAllFilters} className="btn btn-primary">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="shop-products-grid">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Numbered Pagination Bar (Screen 6 Spec) */}
                {totalPages > 1 && (
                  <div className="pagination-bar" style={{ marginTop: '2.5rem' }}>
                    <button
                      className="page-btn page-arrow"
                      onClick={() => {
                        setCurrentPage((p) => Math.max(1, p - 1));
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                    >
                      ‹
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`page-btn ${currentPage === page ? 'active' : ''}`}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="page-btn page-arrow"
                      onClick={() => {
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
