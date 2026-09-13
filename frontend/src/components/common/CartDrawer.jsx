import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AdminContext';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
    placeOrder,
    currentUser,
  } = useApp();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(
    currentUser?.location ? `42 Heritage Lane, ${currentUser.location}` : '42 Heritage Lane, Bengaluru, Karnataka 560001'
  );
  const [paymentMethod, setPaymentMethod] = useState('dbt_upi');
  const [orderSuccess, setOrderSuccess] = useState(null);

  if (!isCartOpen) return null;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const order = await placeOrder({
        items: [...cart],
        totalAmount: cartTotal,
        address: shippingAddress,
        paymentMethod:
          paymentMethod === 'dbt_upi'
            ? 'Test Mode: Simulated DBT / UPI'
            : 'Test Mode: Simulated Card / DBT',
      });
      setOrderSuccess(order);
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAll = () => {
    setCheckoutModalOpen(false);
    setOrderSuccess(null);
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="cart-drawer-backdrop"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="cart-drawer">
        <div className="cart-drawer-header">
          <div className="cart-drawer-title-wrap">
            <ShoppingBag size={20} className="text-gold" />
            <h3 className="cart-drawer-title">Authentic Heritage Cart</h3>
            <span className="cart-drawer-count">{cartCount}</span>
          </div>
          <button
            className="cart-drawer-close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* SIH Fair Trade Guarantee Banner */}
        <div className="cart-drawer-guarantee">
          <ShieldCheck size={16} />
          <span>100% Direct to Artisan (0% Platform Fee · DBT Protected)</span>
        </div>

        {/* Cart Item List */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">
                <ShoppingBag size={48} />
              </div>
              <h4>Your cultural cart is empty</h4>
              <p>Explore living traditions and support master artisans with authentic purchases.</p>
              <Link
                to="/shop"
                className="btn btn-primary"
                onClick={() => setIsCartOpen(false)}
              >
                Browse Handicrafts <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image || (item.images && item.images[0])}
                    alt={item.name}
                    className="cart-item-image"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="cart-item-details">
                    <h5 className="cart-item-name">{item.name}</h5>
                    <p className="cart-item-artisan">By {item.artisan}</p>
                    {item.giTagNumber && (
                      <span className="cart-item-gi">{item.giTagNumber}</span>
                    )}
                    <div className="cart-item-price-row">
                      <span className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</span>
                      <div className="cart-item-qty-control">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="qty-btn"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="qty-btn"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Summary & Checkout CTA */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="cart-summary-row fee-zero">
              <span>Platform Intermediary Fee</span>
              <span className="text-forest">₹0 (SIH PS 26197 Guarantee)</span>
            </div>
            <div className="cart-summary-row total-row">
              <span>Total Payout to Artisans</span>
              <span className="cart-total-amount">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              className="btn btn-primary btn-block cart-checkout-btn"
              onClick={() => setCheckoutModalOpen(true)}
            >
              Proceed to Direct Benefit Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog checkout-modal">
            {!orderSuccess ? (
              <>
                <div className="modal-header">
                  <div>
                    <h3 className="modal-title">Complete Fair-Trade Order</h3>
                    <p className="modal-subtitle">Direct Benefit Transfer directly to verified artisan bank accounts.</p>
                  </div>
                  <button
                    className="modal-close"
                    onClick={() => setCheckoutModalOpen(false)}
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                  <div className="checkout-order-summary">
                    <h4>Order Summary ({cartCount} Items)</h4>
                    <div className="checkout-items-preview">
                      {cart.map((item) => (
                        <div key={item.id} className="checkout-preview-item">
                          <span>{item.name} × {item.quantity}</span>
                          <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                        </div>
                      ))}
                    </div>
                    <div className="checkout-preview-total">
                      <span>Total Amount:</span>
                      <strong>₹{cartTotal.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Delivery Shipping Address</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label className="form-label" style={{ margin: 0 }}>Fair-Trade Payment Method</label>
                      <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(217, 119, 6, 0.15)', color: '#d97706', fontWeight: 600 }}>
                        ⚡ Test Payment Mode (Simulated DBT)
                      </span>
                    </div>
                    <div className="payment-options-grid">
                      <label className={`payment-option ${paymentMethod === 'dbt_upi' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="payment"
                          value="dbt_upi"
                          checked={paymentMethod === 'dbt_upi'}
                          onChange={() => setPaymentMethod('dbt_upi')}
                        />
                        <div>
                          <strong>Simulated BHIM UPI / Direct DBT</strong>
                          <p>0% Platform fee simulation. Transferred directly to artisan cluster in MongoDB.</p>
                        </div>
                      </label>
                      <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                        />
                        <div>
                          <strong>Simulated RuPay / Card</strong>
                          <p>Test mode transaction logged with cryptographic hash and authentic GI linkage.</p>
                        </div>
                      </label>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted, #71717a)', marginTop: '8px', fontStyle: 'italic' }}>
                      * Note: Sandbox / Test mode is active. No real monetary transactions are processed. Your order is recorded in the MongoDB database.
                    </p>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setCheckoutModalOpen(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Processing Order...' : `Confirm Test Order · ₹${cartTotal.toLocaleString('en-IN')}`}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="checkout-success-state">
                <div className="checkout-success-icon">
                  <CheckCircle2 size={56} />
                </div>
                <h3>Heritage Order Confirmed!</h3>
                <p className="order-id-badge">Order ID: {orderSuccess?.orderNumber || orderSuccess?._id || orderSuccess?.id || 'ORD-2026'}</p>
                <div style={{ margin: '8px 0 16px', display: 'inline-block', padding: '4px 12px', borderRadius: '4px', background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✓ Recorded in MongoDB Atlas (Simulated DBT 0% Fee)
                </div>
                <p className="checkout-success-msg">
                  Thank you for sustaining living Indian cultural heritage. Your order and simulated Direct Benefit Transfer (DBT) to the artisan cluster have been committed to the database.
                </p>
                <div className="checkout-success-actions">
                  <Link
                    to="/dashboard"
                    className="btn btn-primary"
                    onClick={handleCloseAll}
                  >
                    View in My Dashboard
                  </Link>
                  <button className="btn btn-outline" onClick={handleCloseAll}>
                    Continue Exploring
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartDrawer;
