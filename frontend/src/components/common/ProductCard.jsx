import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AdminContext';

/**
 * ProductCard — Premium e-commerce handcrafted product card.
 * Features large aspect-ratio imagery, authentic GI badge, artisan lineage link,
 * direct DBT price payout indicator, wishlist button, and quick-add to cart.
 */
const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useApp();
  const prodId = product.id || product._id;
  const wishlisted = isWishlisted(prodId);

  const artisanName = product.artisanName || (typeof product.artisan === 'string' ? product.artisan : product.artisan?.name) || 'Master Artisan';
  const artisanId = product.artisanId || (typeof product.artisan === 'object' ? product.artisan?._id || product.artisan?.id : product.artisan);

  const displayPrice = typeof product.price === 'number' ? product.price : parseInt(String(product.price).replace(/[^0-9]/g, ''), 10) || 0;
  const originalPrice = product.originalPrice ? (typeof product.originalPrice === 'number' ? product.originalPrice : parseInt(String(product.originalPrice).replace(/[^0-9]/g, ''), 10)) : null;

  return (
    <div className="premium-product-card">
      {/* Visual Image Wrap */}
      <div className="product-image-container">
        <Link to={`/shop/${prodId}`} className="product-image-link">
          <img
            src={product.image || (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'}
            alt={product.name}
            className="product-main-image"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80';
            }}
          />
        </Link>

        {/* GI Authenticity Badge */}
        {(product.giTagNumber || product.isGiCertified) && (
          <div className="product-gi-badge" title="Geographical Indication Protected">
            <CheckCircle2 size={12} />
            <span>{product.giTagNumber || 'GI Certified'}</span>
          </div>
        )}

        {/* Wishlist Heart */}
        <button
          type="button"
          className={`product-wishlist-toggle ${wishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(prodId);
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={17}
            fill={wishlisted ? '#c85a32' : 'none'}
            color={wishlisted ? '#c85a32' : '#4a5568'}
          />
        </button>

        {/* 100% Direct DBT Pill */}
        <div className="product-dbt-pill">
          <Sparkles size={11} />
          <span>100% Direct DBT</span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="product-card-details">
        <div className="product-category-row">
          <span className="product-craft-category">{product.category || product.craft || 'Heritage Craft'}</span>
          <div className="product-rating-badge">
            <Star size={12} fill="#c8952a" color="#c8952a" />
            <span>{product.rating || '4.9'}</span>
            <span className="rating-volume">({product.reviewsCount || 18})</span>
          </div>
        </div>

        <h3 className="product-name-heading">
          <Link to={`/shop/${prodId}`} title={product.name}>
            {product.name}
          </Link>
        </h3>

        {/* Master Artisan Lineage Line */}
        <div className="product-maker-row">
          <span className="by-label">By </span>
          {artisanId ? (
            <Link to={`/artists/${artisanId}`} className="maker-link">
              {artisanName}
            </Link>
          ) : (
            <span className="maker-static">{artisanName}</span>
          )}
        </div>

        <div className="product-origin-location">
          <MapPin size={12} />
          <span>{product.region || product.state || 'India'}</span>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="product-price-action-row">
          <div className="price-stack">
            <span className="price-current">₹{displayPrice.toLocaleString('en-IN')}</span>
            {originalPrice && originalPrice > displayPrice && (
              <span className="price-strikethrough">₹{originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>

          <button
            type="button"
            className="btn-add-cart-primary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart({ ...product, id: prodId, price: displayPrice }, 1);
            }}
            title="Add to Fair-Trade Cart"
          >
            <ShoppingBag size={15} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
