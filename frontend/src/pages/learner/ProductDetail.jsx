import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Heart,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Sparkles,
  Award,
  Layers,
  Truck,
  RotateCcw,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import ProductCard from '../../components/common/ProductCard';
import * as productService from '../../services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    artisans,
    addToCart,
    toggleWishlist,
    isWishlisted,
    showToast,
    setIsCartOpen,
  } = useApp();

  const [fetchedProduct, setFetchedProduct] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Check context first, or use fetchedProduct
  const product = useMemo(() => {
    return (products || []).find((p) => p.id === id || p._id === id) || fetchedProduct;
  }, [products, id, fetchedProduct]);

  // If not found in context, fetch from API directly
  useEffect(() => {
    if (!product && id) {
      setDetailLoading(true);
      productService.getProductById(id)
        .then((res) => {
          if (res?.data) {
            setFetchedProduct(res.data);
          }
        })
        .catch(() => {})
        .finally(() => setDetailLoading(false));
    }
  }, [id, product]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const wishlisted = product ? isWishlisted(product.id || product._id) : false;

  // Find the associated artisan
  const artisan = useMemo(() => {
    if (!product) return null;
    return (artisans || []).find(
      (a) =>
        (a.id || a._id) === product.artisanId ||
        (a.id || a._id) === product.artisan ||
        (product.artisanName && a.name.toLowerCase() === product.artisanName.toLowerCase()) ||
        (product.artisan && typeof product.artisan === 'string' && a.name.toLowerCase() === product.artisan.toLowerCase())
    );
  }, [product, artisans]);

  // Related products from same category or state
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return (products || [])
      .filter(
        (p) =>
          (p.id || p._id) !== (product.id || product._id) &&
          (p.category === product.category || p.state === product.state)
      )
      .slice(0, 4);
  }, [product, products]);

  if (detailLoading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '120px 20px' }}>
        <div className="spinner" style={{ margin: '0 auto 20px', width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#14532d', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <h3>Loading Authentic Handicraft...</h3>
        <p style={{ color: '#64748b' }}>Authenticating GI tag and artisan provenance...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Authentic Craft Not Found</h2>
        <p>The requested handicraft item is unavailable or still loading.</p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>
          <ArrowLeft size={16} /> Return to Shop
        </Link>
      </div>
    );
  }

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="product-detail-page">
      <div className="page-container">
        {/* Breadcrumb Navigation */}
        <div className="detail-breadcrumb-bar">
          <Link to="/shop" className="detail-breadcrumb-link">
            <ArrowLeft size={15} /> Back to Shop
          </Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-text">{product.category}</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{product.name}</span>
        </div>

        {/* Top Product Showcase Grid */}
        <div className="product-showcase-grid">
          {/* Gallery Column */}
          <div className="product-gallery-column">
            <div className="product-gallery-main">
              <img
                src={galleryImages[selectedImageIndex] || product.image}
                alt={product.name}
                className="gallery-main-image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80';
                }}
              />
              {product.giTagNumber && (
                <div className="gallery-gi-badge">
                  <CheckCircle2 size={13} /> {product.giTagNumber}
                </div>
              )}
            </div>

            {/* Thumbnail Selector */}
            {galleryImages.length > 1 && (
              <div className="gallery-thumbnails-strip">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    className={`gallery-thumb-btn ${idx === selectedImageIndex ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Purchasing Actions Column */}
          <div className="product-info-column">
            <div className="product-info-header">
              <div className="product-tags-cluster" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="badge badge-primary">Handmade</span>
                <span className="badge badge-accent">{product.state || 'Rajasthan'}</span>
                <span className="badge badge-outline">Traditional</span>
                {product.craft && <span className="product-craft-pill">{product.craft}</span>}
              </div>
              <button
                className="product-share-btn"
                onClick={handleShare}
                title="Share product"
                aria-label="Share"
              >
                <Share2 size={18} />
              </button>
            </div>

            <h1 className="product-detail-title">{product.name}</h1>

            {/* Artisan & Location Line */}
            <div className="product-artisan-lead">
              <span>Handcrafted by </span>
              {artisan ? (
                <Link to={`/artists/${artisan.id || artisan._id}`} className="artisan-lead-link">
                  <strong>{product.artisan}</strong>
                  <CheckCircle2 size={14} className="text-forest" />
                </Link>
              ) : (
                <strong>{product.artisan}</strong>
              )}
            </div>

            <div className="product-location-tag">
              <MapPin size={14} className="text-terracotta" />
              <span>{product.region || product.state}</span>
              <span className="meta-sep">•</span>
              <span>Tradition: <strong>{product.tradition}</strong></span>
            </div>

            {/* Rating & Reviews */}
            <div className="product-rating-reviews">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="#c8952a"
                    color="#c8952a"
                  />
                ))}
              </div>
              <span className="rating-score"><strong>{product.rating || '4.9'}</strong></span>
              <span className="rating-divider">|</span>
              <span className="reviews-count-text">{product.reviewsCount || 24} Certified Reviews</span>
            </div>

            {/* Pricing Block */}
            <div className="product-pricing-block">
              <div className="price-main-row">
                <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="original-price">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="discount-tag">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <div className="fair-trade-dbt-note">
                <ShieldCheck size={16} className="text-forest" />
                <span>100% of price disbursed directly to {product.artisan} via DBT (0% Commission)</span>
              </div>
            </div>

            {/* Stock status */}
            <div className="product-stock-status">
              <span className="stock-dot" />
              <span>In Stock — Ready to ship from rural artisan cluster ({product.stockCount || 5} units available)</span>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="product-actions-group">
              <div className="quantity-selector-box">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-change-btn"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-change-btn"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button className="btn btn-primary btn-add-cart" onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>

              <button className="btn btn-gold btn-buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>

              <button
                className={`btn btn-outline btn-wishlist-toggle ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={18} fill={wishlisted ? '#c85a32' : 'none'} color={wishlisted ? '#c85a32' : 'currentColor'} />
              </button>
            </div>

            {/* Trust Assurance Pillars */}
            <div className="product-trust-pillars">
              <div className="trust-pillar-item">
                <Truck size={18} />
                <div>
                  <strong>Insured Heritage Courier</strong>
                  <span>Eco-friendly straw packing from artisan cluster</span>
                </div>
              </div>
              <div className="trust-pillar-item">
                <CheckCircle2 size={18} />
                <div>
                  <strong>GI Certificate of Authenticity</strong>
                  <span>Includes QR tag verified by Ministry of Culture</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Detailed Tabs Section ───────────────────────────────────── */}
        <div className="product-tabs-container">
          <div className="product-tabs-header">
            <button
              className={`product-tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description & Specifications
            </button>
            <button
              className={`product-tab-btn ${activeTab === 'artist' ? 'active' : ''}`}
              onClick={() => setActiveTab('artist')}
            >
              Master Artisan Information
            </button>
            <button
              className={`product-tab-btn ${activeTab === 'story' ? 'active' : ''}`}
              onClick={() => setActiveTab('story')}
            >
              Cultural Heritage Story
            </button>
          </div>

          <div className="product-tab-panel">
            {/* Tab 1: Description */}
            {activeTab === 'description' && (
              <div className="tab-description-layout">
                <div className="desc-main-text">
                  <h3>About this Masterpiece</h3>
                  <p>{product.description}</p>
                </div>
                <div className="desc-specs-card">
                  <h4>Product Specifications</h4>
                  <div className="specs-table">
                    <div className="spec-item">
                      <span className="spec-label">Craft & Style:</span>
                      <span className="spec-value">{product.craft}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Materials:</span>
                      <span className="spec-value">{product.materials || '100% natural pigments and fibers'}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Dimensions:</span>
                      <span className="spec-value">{product.dimensions || 'Standard Traditional Size'}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Provenance Hub:</span>
                      <span className="spec-value">{product.provenance || product.region}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">GI Tag Accreditation:</span>
                      <span className="spec-value text-forest">{product.giTagNumber || 'GI-Certified'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Artist */}
            {activeTab === 'artist' && (
              <div className="tab-artist-layout">
                {artisan ? (
                  <div className="artisan-spotlight-card">
                    <img
                      src={artisan.avatar}
                      alt={artisan.name}
                      className="artisan-spotlight-avatar"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(artisan.name)}&background=14532d&color=fff`;
                      }}
                    />
                    <div className="artisan-spotlight-info">
                      <div className="spotlight-badge">
                        <CheckCircle2 size={13} /> Verified Master Craftsperson
                      </div>
                      <h3>{artisan.name}</h3>
                      <p className="spotlight-craft">{artisan.craft} · {artisan.region}</p>
                      <p className="spotlight-bio">{artisan.bio}</p>
                      {artisan.awards && (
                        <div className="spotlight-awards">
                          <Award size={15} />
                          <span>{artisan.awards}</span>
                        </div>
                      )}
                      <Link
                        to={`/artists/${artisan.id || artisan._id}`}
                        className="btn btn-outline btn-sm"
                      >
                        View Full Artist Dossier <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="artisan-spotlight-card">
                    <div className="artisan-spotlight-info">
                      <h3>{product.artisan}</h3>
                      <p className="spotlight-craft">{product.craft} · {product.region}</p>
                      <p>
                        A dedicated traditional master craftsperson continuing centuries of generational handwork.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Cultural Story */}
            {activeTab === 'story' && (
              <div className="tab-story-layout">
                <div className="story-panel-card">
                  <div className="story-header-pill">
                    <Sparkles size={14} />
                    <span>Living Cultural Lineage</span>
                  </div>
                  <h3>The Intangible Story Behind {product.name}</h3>
                  <p className="story-body-text">
                    {product.culturalStory ||
                      `This piece embodies generations of cultural storytelling in ${product.state}. Unlike machine-made commercial imitations, every curve, motif, and natural stroke carries ceremonial meaning celebrating nature, cosmic rhythms, and community celebrations.`}
                  </p>
                  <div className="story-highlight-box">
                    <strong>Living Knowledge Safeguarding</strong>
                    <p>
                      Purchasing through JEEVANT directly contributes to documentation, cluster apprenticeship,
                      and fair livelihood sustenance for rural artists under the Smart India Hackathon 2026 mandate.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── Related Products Carousel / Grid ────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <div className="related-header">
              <h2>You May Also Like</h2>
              <p>Authentic crafts from related Indian traditions and artisan clusters.</p>
            </div>
            <div className="products-grid-4">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
