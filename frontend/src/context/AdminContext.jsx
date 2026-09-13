import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService';
import * as artisanService from '../services/artisanService';
import * as userService from '../services/userService';
import * as traditionService from '../services/traditionService';
import * as workshopService from '../services/workshopService';
import * as productService from '../services/productService';
import * as bookingService from '../services/bookingService';
import * as orderService from '../services/orderService';
import * as savedCultureService from '../services/savedCultureService';
import * as reviewService from '../services/reviewService';
import * as paymentService from '../services/paymentService';
import * as reportService from '../services/reportService';
import * as dashboardService from '../services/dashboardService';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Check if token already exists in localStorage
  const storedUser = authService.getStoredUser();
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [adminUser, setAdminUser] = useState(
    storedUser && storedUser.role === 'admin'
      ? storedUser
      : {
          name: 'Ananya Deshmukh',
          role: 'admin',
          email: 'admin@jeevant.gov.in',
          region: 'Ministry of Culture, SIH 2026',
        }
  );

  // Active public user session
  const [currentUser, setCurrentUser] = useState(
    storedUser || {
      id: 'user-learner-1',
      _id: 'user-learner-1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      role: 'learner',
      phone: '+91 98111 22334',
      location: 'Bengaluru, Karnataka',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    }
  );

  // Core Dynamic Collections (Zero hardcoded data — fetched from API)
  const [artisans, setArtisans] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [users, setUsers] = useState([]);
  const [traditions, setTraditions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reports, setReports] = useState([]);
  const [products, setProducts] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Public User Dynamic Collections
  const [userOrders, setUserOrders] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [savedCultures, setSavedCultures] = useState([]);

  // E-Commerce Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('jeevant_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('jeevant_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Status & Metadata Flags
  const [isLiveDatabase, setIsLiveDatabase] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Header notifications queue
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'New Artisan Verification Request',
      message: 'Rabi Narayan Rath submitted Pattachitra GI registration documents.',
      time: '12 mins ago',
      read: false,
      type: 'artisan',
    },
    {
      id: 'notif-2',
      title: 'Workshop Registration Milestone',
      message: 'Cobalt & Quartz Blue Pottery workshop is 100% booked.',
      time: '1 hour ago',
      read: false,
      type: 'workshop',
    },
    {
      id: 'notif-3',
      title: 'Direct DBT Payout Successful',
      message: '₹42,800 transferred to Smt. Dulari Devi (Zero Deductions).',
      time: '3 hours ago',
      read: true,
      type: 'payment',
    },
  ]);

  // Dynamic / DB-computed Statistics
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtisans: 0,
    pendingVerifications: 0,
    pendingArtisans: 0,
    approvedArtisans: 0,
    verifiedArtisans: 0,
    totalProducts: 0,
    totalWorkshops: 0,
    totalBookings: 0,
    totalOrders: 0,
    totalTraditions: 0,
    totalReviews: 0,
    pendingReviews: 0,
    totalReports: 0,
    pendingReports: 0,
    totalRevenue: '₹0',
    totalRevenueRaw: 0,
  });

  /**
   * Fetch all live business data from backend APIs.
   */
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    let dbActive = false;

    // 1. Fetch Dashboard Stats
    try {
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) {
        setStats(statsRes.data.stats);
      }
      if (statsRes?.isLiveDatabase) {
        dbActive = true;
      }
    } catch (err) {
      console.warn('Could not load dashboard stats:', err.message);
    }

    // 2. Fetch Artisans
    try {
      const artisansRes = await artisanService.getArtisans({ limit: 100 });
      const rawArtisans = Array.isArray(artisansRes?.data)
        ? artisansRes.data
        : artisansRes?.data?.data || [];

      const normalized = rawArtisans.map((a) => ({
        ...a,
        id: a._id || a.id,
        status:
          a.verificationStatus === 'approved' || a.verificationStatus === 'verified'
            ? 'Verified'
            : a.verificationStatus === 'rejected'
            ? 'Rejected'
            : 'Pending',
      }));
      setArtisans(normalized);
    } catch (err) {
      console.warn('Could not load artisans:', err.message);
    }

    // 3. Fetch Traditions
    try {
      const traditionsRes = await traditionService.getTraditions({ limit: 100 });
      const rawTraditions = Array.isArray(traditionsRes?.data)
        ? traditionsRes.data
        : traditionsRes?.data?.data || [];

      const normalized = rawTraditions.map((t) => ({
        ...t,
        id: t._id || t.id,
        title: t.title || t.name,
      }));
      setTraditions(normalized);
    } catch (err) {
      console.warn('Could not load traditions:', err.message);
    }

    // 4. Fetch Products
    try {
      const productsRes = await productService.getProducts({ limit: 100 });
      const rawProducts = Array.isArray(productsRes?.data)
        ? productsRes.data
        : productsRes?.data?.data || [];

      const normalized = rawProducts.map((p) => ({
        ...p,
        id: p._id || p.id,
      }));
      setProducts(normalized);
    } catch (err) {
      console.warn('Could not load products:', err.message);
    }

    // 5. Fetch Workshops
    try {
      const workshopsRes = await workshopService.getWorkshops({ limit: 100 });
      const rawWorkshops = Array.isArray(workshopsRes?.data)
        ? workshopsRes.data
        : workshopsRes?.data?.data || [];

      const normalized = rawWorkshops.map((w) => ({
        ...w,
        id: w._id || w.id,
        availableSeats:
          w.availableSeats !== undefined
            ? w.availableSeats
            : (w.capacity || 30) - (w.enrolled || w.seatsBooked || 0),
      }));
      setWorkshops(normalized);
    } catch (err) {
      console.warn('Could not load workshops:', err.message);
    }

    // 6. Fetch Users
    try {
      const usersRes = await userService.getUsers({ limit: 100 });
      const rawUsers = Array.isArray(usersRes?.data)
        ? usersRes.data
        : usersRes?.data?.data || [];

      const normalized = rawUsers.map((u) => ({
        ...u,
        id: u._id || u.id,
        status: u.isActive ? 'Active' : 'Deactivated',
      }));
      setUsers(normalized);
    } catch (err) {
      console.warn('Could not load users:', err.message);
    }

    // 7. Fetch Reviews
    try {
      const reviewsRes = await reviewService.getReviews({ limit: 100 });
      const rawReviews = Array.isArray(reviewsRes?.data)
        ? reviewsRes.data
        : reviewsRes?.data?.data || [];

      const normalized = rawReviews.map((r) => ({
        ...r,
        id: r._id || r.id,
        reviewer: r.reviewerName || r.user?.name || r.reviewer?.name || 'Cultural Enthusiast',
        artisan: r.artisan?.name || (typeof r.artisan === 'string' ? r.artisan : 'Heritage Master'),
        date: r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN') : 'Recent',
        status: r.status?.toLowerCase() === 'published' ? 'Published' : 'Flagged',
      }));
      setReviews(normalized);
    } catch (err) {
      console.warn('Could not load reviews:', err.message);
    }

    // 8. Fetch Payments
    try {
      const paymentsRes = await paymentService.getPayments({ limit: 100 });
      const rawPayments = Array.isArray(paymentsRes?.data)
        ? paymentsRes.data
        : paymentsRes?.data?.data || [];

      const normalized = rawPayments.map((p) => ({
        ...p,
        id: p.transactionId || p._id || p.id,
        artisan: p.artisanName || p.artisan?.name || 'Master Artisan',
        grossAmount: p.grossAmount || (p.amount ? `₹${p.amount.toLocaleString('en-IN')}` : '₹0'),
        netPayout: p.netPayout || p.grossAmount || '₹0',
        fairPlatformFee: p.fairPlatformFee || '₹0 (0% SIH Model)',
        date: p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-IN') : 'Recent',
        status: p.status || (p.paymentStatus === 'completed' ? 'Disbursed' : 'Processing'),
      }));
      setPayments(normalized);
    } catch (err) {
      console.warn('Could not load payments:', err.message);
    }

    // 9. Fetch Reports
    try {
      const reportsRes = await reportService.getReports({ limit: 100 });
      const rawReports = Array.isArray(reportsRes?.data)
        ? reportsRes.data
        : reportsRes?.data?.data || [];
      setReports(rawReports);
    } catch (err) {
      console.warn('Could not load reports:', err.message);
    }

    // 10. Fetch User Orders & Bookings if user active
    const userId = currentUser?.id || currentUser?._id;
    if (userId) {
      try {
        const ordersRes = await orderService.getOrders({ userId });
        const rawOrders = Array.isArray(ordersRes?.data)
          ? ordersRes.data
          : ordersRes?.data?.data || [];
        setUserOrders(rawOrders.map((o) => ({ ...o, id: o._id || o.id })));
      } catch {}

      try {
        const bookingsRes = await bookingService.getBookings({ userId });
        const rawBookings = Array.isArray(bookingsRes?.data)
          ? bookingsRes.data
          : bookingsRes?.data?.data || [];
        setUserBookings(rawBookings.map((b) => ({ ...b, id: b._id || b.id })));
        setBookings(rawBookings);
      } catch {}

      try {
        const savedRes = await savedCultureService.getSavedCultures({ userId });
        const rawSaved = Array.isArray(savedRes?.data)
          ? savedRes.data
          : savedRes?.data?.data || [];
        setSavedCultures(rawSaved.map((s) => s.traditionId || s.tradition));
      } catch {}
    }

    setIsLiveDatabase(dbActive);
    setLoading(false);
  }, [currentUser]);

  // Initial mount fetch
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // ─── Artisan Actions (Connected to API) ───────────────────────────────────
  const approveArtisan = async (id, note = 'Approved by admin') => {
    try {
      await artisanService.approveArtisan(id, note);
      setArtisans((prev) =>
        prev.map((artisan) =>
          artisan.id === id || artisan._id === id
            ? { ...artisan, status: 'Verified', verificationStatus: 'approved' }
            : artisan
        )
      );
      // Refresh dynamic dashboard statistics
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) {
        setStats(statsRes.data.stats);
      }
      const target = artisans.find((a) => a.id === id || a._id === id);
      showToast(`Master Artisan ${target ? target.name : ''} has been Approved & GI Verified!`, 'success');
    } catch (err) {
      showToast(`Failed to approve artisan: ${err.message}`, 'error');
    }
  };

  const rejectArtisan = async (id, note = 'Application rejected by admin audit') => {
    try {
      await artisanService.rejectArtisan(id, note);
      setArtisans((prev) =>
        prev.map((artisan) =>
          artisan.id === id || artisan._id === id
            ? { ...artisan, status: 'Rejected', verificationStatus: 'rejected' }
            : artisan
        )
      );
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) {
        setStats(statsRes.data.stats);
      }
      const target = artisans.find((a) => a.id === id || a._id === id);
      showToast(`Application for ${target ? target.name : ''} marked as Rejected.`, 'error');
    } catch (err) {
      showToast(`Failed to reject artisan: ${err.message}`, 'error');
    }
  };

  const deleteArtisan = async (id) => {
    try {
      await artisanService.deleteArtisan(id);
      setArtisans((prev) => prev.filter((a) => a.id !== id && a._id !== id));
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) {
        setStats(statsRes.data.stats);
      }
      showToast('Artisan record deleted from registry.', 'info');
    } catch (err) {
      showToast(`Failed to delete artisan: ${err.message}`, 'error');
    }
  };

  const submitArtisanApplication = async (formData) => {
    try {
      const res = await artisanService.createArtisan(formData);
      const created = res.data || { ...formData, id: `artisan-${Date.now()}` };
      setArtisans((prev) => [created, ...prev]);

      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) {
        setStats(statsRes.data.stats);
      }

      const trackingId = created.trackingId || `JVT-ART-${Math.floor(10000 + Math.random() * 90000)}`;
      showToast(`Artisan application submitted! Tracking ID: ${trackingId}`, 'success');
      return trackingId;
    } catch (err) {
      showToast(`Failed to submit application: ${err.message}`, 'error');
      throw err;
    }
  };

  // ─── Tradition Actions (Connected to API) ─────────────────────────────────
  const addTradition = async (traditionData) => {
    try {
      const res = await traditionService.createTradition(traditionData);
      const created = res.data || { ...traditionData, id: `trad-${Date.now()}` };
      setTraditions((prev) => [created, ...prev]);
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) setStats(statsRes.data.stats);
      showToast(`Tradition "${created.title || created.name}" published!`, 'success');
      return true;
    } catch (err) {
      showToast(`Failed to add tradition: ${err.message}`, 'error');
      return false;
    }
  };

  const updateTradition = async (id, traditionData) => {
    try {
      await traditionService.updateTradition(id, traditionData);
      setTraditions((prev) =>
        prev.map((t) => (t.id === id || t._id === id ? { ...t, ...traditionData } : t))
      );
      showToast('Tradition updated successfully.', 'success');
      return true;
    } catch (err) {
      showToast(`Failed to update tradition: ${err.message}`, 'error');
      return false;
    }
  };

  const deleteTradition = async (id) => {
    try {
      await traditionService.deleteTradition(id);
      setTraditions((prev) => prev.filter((t) => t.id !== id && t._id !== id));
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) setStats(statsRes.data.stats);
      showToast('Tradition record removed.', 'info');
    } catch (err) {
      showToast(`Failed to delete tradition: ${err.message}`, 'error');
    }
  };

  // ─── Product Actions (Connected to API) ───────────────────────────────────
  const addProduct = async (productData) => {
    try {
      const res = await productService.createProduct(productData);
      const created = res.data || { ...productData, id: `prod-${Date.now()}` };
      setProducts((prev) => [created, ...prev]);
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) setStats(statsRes.data.stats);
      showToast(`Product "${created.name}" added to marketplace!`, 'success');
      return true;
    } catch (err) {
      showToast(`Failed to add product: ${err.message}`, 'error');
      return false;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      await productService.updateProduct(id, productData);
      setProducts((prev) =>
        prev.map((p) => (p.id === id || p._id === id ? { ...p, ...productData } : p))
      );
      showToast('Product updated successfully.', 'success');
      return true;
    } catch (err) {
      showToast(`Failed to update product: ${err.message}`, 'error');
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id && p._id !== id));
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) setStats(statsRes.data.stats);
      showToast('Product removed from shop.', 'info');
    } catch (err) {
      showToast(`Failed to delete product: ${err.message}`, 'error');
    }
  };

  // ─── Workshop Actions (Connected to API) ──────────────────────────────────
  const addWorkshop = async (workshopData) => {
    try {
      const res = await workshopService.createWorkshop(workshopData);
      const created = res.data || { ...workshopData, id: `ws-${Date.now()}` };
      setWorkshops((prev) => [created, ...prev]);
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) setStats(statsRes.data.stats);
      showToast(`Masterclass "${created.title}" scheduled successfully!`, 'success');
      return true;
    } catch (err) {
      showToast(`Failed to create workshop: ${err.message}`, 'error');
      return false;
    }
  };

  const updateWorkshop = async (id, workshopData) => {
    try {
      await workshopService.updateWorkshop(id, workshopData);
      setWorkshops((prev) =>
        prev.map((w) => (w.id === id || w._id === id ? { ...w, ...workshopData } : w))
      );
      showToast('Workshop updated successfully.', 'success');
      return true;
    } catch (err) {
      showToast(`Failed to update workshop: ${err.message}`, 'error');
      return false;
    }
  };

  const deleteWorkshop = async (id) => {
    try {
      await workshopService.deleteWorkshop(id);
      setWorkshops((prev) => prev.filter((w) => w.id !== id && w._id !== id));
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) setStats(statsRes.data.stats);
      showToast('Workshop deleted from schedule.', 'info');
    } catch (err) {
      showToast(`Failed to delete workshop: ${err.message}`, 'error');
    }
  };

  // ─── Workshop Booking Action (Connected to POST /api/bookings) ────────────
  const bookWorkshop = async (workshop, attendeeInfo = {}) => {
    const workshopId = workshop.id || workshop._id;
    const bookingPayload = {
      userId: currentUser?.id || currentUser?._id || 'user-learner-1',
      userName: attendeeInfo.name || currentUser?.name || 'Cultural Learner',
      userEmail: attendeeInfo.email || currentUser?.email || 'learner@jeevant.org',
      userPhone: attendeeInfo.phone || currentUser?.phone || '',
      workshopId,
      workshopTitle: workshop.title,
      artisanId: workshop.artisanId || workshop.artisan,
      artisanName: workshop.artisanName || 'Master Craftsperson',
      seats: Number(attendeeInfo.seats || 1),
      totalAmount: (workshop.price || 0) * Number(attendeeInfo.seats || 1),
      date: workshop.date,
      time: workshop.time,
      location: workshop.location,
    };

    try {
      const res = await bookingService.createBooking(bookingPayload);
      const newBooking = res.data || {
        ...bookingPayload,
        id: `bk-${Date.now()}`,
        bookingReference: `JVT-PASS-${Math.floor(10000 + Math.random() * 90000)}`,
      };

      setUserBookings((prev) => [newBooking, ...prev]);

      // Decrement seats locally on workshop
      setWorkshops((prev) =>
        prev.map((w) => {
          if (w.id === workshopId || w._id === workshopId) {
            const rem = Math.max(0, (w.availableSeats || 1) - bookingPayload.seats);
            return {
              ...w,
              availableSeats: rem,
              seatsBooked: (w.seatsBooked || 0) + bookingPayload.seats,
              status: rem === 0 ? 'Full' : w.status,
            };
          }
          return w;
        })
      );

      // Refresh dashboard stats
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) setStats(statsRes.data.stats);

      showToast(`Masterclass booked for ${workshop.title}! Digital pass generated.`, 'success');
      return newBooking;
    } catch (err) {
      showToast(`Booking failed: ${err.message}`, 'error');
      throw err;
    }
  };

  // ─── Order Checkout Action (Connected to POST /api/orders) ────────────────
  const placeOrder = async (orderData = {}) => {
    const items = orderData.items || [...cart];
    const total = orderData.totalAmount || cartTotal;

    const orderPayload = {
      userId: currentUser?.id || currentUser?._id || 'user-learner-1',
      userName: currentUser?.name || 'Cultural Patron',
      userEmail: currentUser?.email || 'learner@jeevant.org',
      items: items.map((item) => ({
        productId: item.id || item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
        artisanName: item.artisanName || 'Master Craftsperson',
        artisanId: item.artisanId || item.artisan,
        state: item.state,
        giTag: item.giTagNumber || item.giTag,
      })),
      totalAmount: total,
      subtotal: total,
      platformFee: 0,
      shippingFee: 0,
      directArtisanPayout: total,
      shippingAddress: orderData.address || {
        fullName: currentUser?.name || 'Aarav Sharma',
        addressLine: '12 Alwarpet High Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        phone: currentUser?.phone || '+91 98111 22334',
      },
      paymentMethod: orderData.paymentMethod || 'Direct DBT / UPI (0% Intermediary Fee)',
    };

    try {
      const res = await orderService.createOrder(orderPayload);
      const newOrder = res.data || {
        ...orderPayload,
        id: `ord-${Date.now()}`,
        orderNumber: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Processing',
      };

      setUserOrders((prev) => [newOrder, ...prev]);
      clearCart();
      setIsCartOpen(false);

      // Refresh dynamic dashboard stats (revenue and order count update)
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) setStats(statsRes.data.stats);

      showToast('Order confirmed! 100% payment credited directly to master artisans.', 'success');
      return newOrder;
    } catch (err) {
      showToast(`Order checkout failed: ${err.message}`, 'error');
      throw err;
    }
  };

  // ─── Public Cart Actions ──────────────────────────────────────────────────
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => (item.id || item._id) === (product.id || product._id));
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          (item.id || item._id) === (product.id || product._id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { ...product, id: product.id || product._id, quantity }];
      }
      try {
        localStorage.setItem('jeevant_cart', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setIsCartOpen(true);
    showToast(`Added "${product.name}" to cart!`, 'success');
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const updated = prev.filter((item) => (item.id || item._id) !== productId);
      try {
        localStorage.setItem('jeevant_cart', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast('Item removed from cart.', 'info');
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => {
      const updated = prev.map((item) =>
        (item.id || item._id) === productId ? { ...item, quantity } : item
      );
      try {
        localStorage.setItem('jeevant_cart', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem('jeevant_cart');
    } catch {}
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  // ─── Wishlist Actions ─────────────────────────────────────────────────────
  const toggleWishlist = (product) => {
    const prodId = typeof product === 'string' ? product : product.id || product._id;
    setWishlist((prev) => {
      const exists = prev.includes(prodId);
      const updated = exists ? prev.filter((id) => id !== prodId) : [...prev, prodId];
      try {
        localStorage.setItem('jeevant_wishlist', JSON.stringify(updated));
      } catch {}
      showToast(
        exists ? 'Removed from wishlist' : 'Saved to your wishlist!',
        exists ? 'info' : 'success'
      );
      return updated;
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // ─── Saved Cultures Actions (Connected to API) ────────────────────────────
  const toggleSaveCulture = async (traditionId) => {
    const userId = currentUser?.id || currentUser?._id || 'user-learner-1';
    try {
      const res = await savedCultureService.toggleSavedCulture(userId, traditionId);
      if (res.saved) {
        setSavedCultures((prev) => [...prev, traditionId]);
        showToast('Tradition saved to your collection!', 'success');
      } else {
        setSavedCultures((prev) => prev.filter((id) => id !== traditionId));
        showToast('Culture removed from saved collection', 'info');
      }
    } catch {
      // Local fallback
      setSavedCultures((prev) => {
        const exists = prev.includes(traditionId);
        return exists ? prev.filter((id) => id !== traditionId) : [...prev, traditionId];
      });
    }
  };

  const isCultureSaved = (traditionId) => savedCultures.includes(traditionId);

  // ─── Review Moderation Actions (Connected to API) ─────────────────────────
  const toggleReviewStatus = async (id) => {
    try {
      await reviewService.toggleReviewStatus(id);
      setReviews((prev) =>
        prev.map((r) =>
          r.id === id || r._id === id
            ? { ...r, status: r.status === 'Published' ? 'Flagged' : 'Published' }
            : r
        )
      );
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) setStats(statsRes.data.stats);
      showToast('Review moderation status updated.', 'info');
    } catch (err) {
      showToast(`Failed to update review: ${err.message}`, 'error');
    }
  };

  const deleteReview = async (id) => {
    try {
      await reviewService.deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id && r._id !== id));
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) setStats(statsRes.data.stats);
      showToast('Review deleted.', 'info');
    } catch (err) {
      showToast(`Failed to delete review: ${err.message}`, 'error');
    }
  };

  // ─── Report Actions (Connected to API) ────────────────────────────────────
  const resolveReport = async (id, note = 'Resolved by admin') => {
    try {
      await reportService.resolveReport(id, note);
      setReports((prev) =>
        prev.map((rep) =>
          rep._id === id || rep.id === id ? { ...rep, status: 'resolved' } : rep
        )
      );
      const statsRes = await dashboardService.getDashboardStats();
      if (statsRes?.data?.stats) setStats(statsRes.data.stats);
      showToast('Grievance report marked as resolved.', 'success');
    } catch (err) {
      showToast(`Failed to resolve report: ${err.message}`, 'error');
    }
  };

  const dismissReport = async (id, note = 'Dismissed by admin') => {
    try {
      await reportService.dismissReport(id, note);
      setReports((prev) =>
        prev.map((rep) =>
          rep._id === id || rep.id === id ? { ...rep, status: 'dismissed' } : rep
        )
      );
      showToast('Grievance report dismissed.', 'info');
    } catch (err) {
      showToast(`Failed to dismiss report: ${err.message}`, 'error');
    }
  };

  // ─── User Actions (Connected to API) ──────────────────────────────────────
  const deleteUser = async (id) => {
    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id && u._id !== id));
      showToast('User removed from registry.', 'info');
    } catch (err) {
      showToast(`Failed to delete user: ${err.message}`, 'error');
    }
  };

  const toggleUserActive = async (user) => {
    const userId = user.id || user._id;
    const newActiveState = user.status === 'Deactivated' || user.isActive === false;
    try {
      await userService.updateUser(userId, { isActive: newActiveState });
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId || u._id === userId
            ? { ...u, isActive: newActiveState, status: newActiveState ? 'Active' : 'Deactivated' }
            : u
        )
      );
      showToast(`User ${user.name} is now ${newActiveState ? 'Active' : 'Deactivated'}.`, 'success');
    } catch (err) {
      showToast(`Failed to update user: ${err.message}`, 'error');
    }
  };

  // ─── Authentication (Connected to POST /api/auth/login) ───────────────────
  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      if (response.user) {
        setAdminUser(response.user);
      }
      setIsAuthenticated(true);
      showToast(`Welcome, ${response.user?.name || 'Administrator'}! (Live JWT Session)`, 'success');
      fetchAllData();
      return { success: true };
    } catch {
      if (email) {
        setAdminUser((prev) => ({ ...prev, email }));
      }
      setIsAuthenticated(true);
      showToast('Welcome to JEEVANT Admin Console (Demo Session)', 'info');
      return { success: true, isDemo: true };
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    showToast('Logged out safely', 'info');
  };

  const loginUser = async (credentials) => {
    try {
      const res = await authService.login(credentials);
      if (res?.user) {
        setCurrentUser(res.user);
        if (res.user.role === 'admin') {
          setIsAuthenticated(true);
          setAdminUser(res.user);
        }
        showToast(`Welcome back, ${res.user.name}!`, 'success');
        return res;
      }
    } catch {}

    // Graceful demo login
    const isDemAdmin = credentials.email.includes('admin') || credentials.role === 'admin';
    const isDemArtisan = credentials.email.includes('artisan') || credentials.role === 'artisan';
    const demoUser = {
      id: isDemAdmin ? 'user-admin-1' : isDemArtisan ? 'artisan-1' : 'user-learner-1',
      _id: isDemAdmin ? 'user-admin-1' : isDemArtisan ? 'artisan-1' : 'user-learner-1',
      name: isDemAdmin ? 'Ananya Deshmukh' : isDemArtisan ? 'Smt. Dulari Devi' : 'Aarav Sharma',
      email: credentials.email,
      role: isDemAdmin ? 'admin' : isDemArtisan ? 'artisan' : 'learner',
      phone: '+91 98111 22334',
      location: isDemAdmin ? 'New Delhi' : isDemArtisan ? 'Madhubani, Bihar' : 'Bengaluru, Karnataka',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    };
    setCurrentUser(demoUser);
    if (isDemAdmin) {
      setIsAuthenticated(true);
      setAdminUser(demoUser);
    }
    showToast(`Logged in as ${demoUser.name} (${demoUser.role})`, 'success');
    return { success: true, user: demoUser };
  };

  const logoutUser = () => {
    authService.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
    showToast('Logged out successfully.', 'info');
  };

  const registerUser = async (userData) => {
    try {
      const res = await authService.register(userData);
      if (res?.user) {
        setCurrentUser(res.user);
        showToast(`Welcome to JEEVANT, ${res.user.name}!`, 'success');
        return res;
      }
    } catch {}

    const newUser = {
      id: `user-${Date.now()}`,
      _id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'learner',
      phone: userData.phone || '',
      location: userData.state || 'India',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    };
    setCurrentUser(newUser);
    showToast(`Account created for ${newUser.name}!`, 'success');
    return { success: true, user: newUser };
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AdminContext.Provider
      value={{
        // Auth
        adminUser,
        currentUser,
        isAuthenticated,
        login,
        logout,
        loginUser,
        logoutUser,
        registerUser,

        // Data Collections
        artisans,
        setArtisans,
        workshops,
        setWorkshops,
        users,
        setUsers,
        traditions,
        setTraditions,
        payments,
        setPayments,
        reviews,
        setReviews,
        reports,
        setReports,
        products,
        setProducts,
        bookings,
        setBookings,

        // Cart & Orders
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal,
        userOrders,
        placeOrder,

        // Workshop Passes
        userBookings,
        bookWorkshop,

        // Wishlist & Saved Cultures
        wishlist,
        toggleWishlist,
        isWishlisted,
        savedCultures,
        toggleSaveCulture,
        isCultureSaved,

        // Artisan Application
        submitArtisanApplication,

        // Administrative Stats & State
        stats,
        notifications,
        toast,
        loading,
        error,
        isLiveDatabase,

        // CRUD Mutations
        approveArtisan,
        rejectArtisan,
        deleteArtisan,
        addTradition,
        updateTradition,
        deleteTradition,
        addProduct,
        updateProduct,
        deleteProduct,
        addWorkshop,
        updateWorkshop,
        deleteWorkshop,
        toggleReviewStatus,
        deleteReview,
        resolveReport,
        dismissReport,
        deleteUser,
        toggleUserActive,
        markAllNotificationsAsRead,
        showToast,
        refreshData: fetchAllData,
      }}
    >
      {children}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background:
              toast.type === 'error'
                ? '#991b1b'
                : toast.type === 'info'
                ? '#1e3a8a'
                : '#14532d',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            fontSize: '13.5px',
            fontWeight: '600',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <span>{toast.type === 'error' ? '⚠️' : toast.type === 'info' ? 'ℹ️' : '✓'}</span>
          <span>{toast.message}</span>
        </div>
      )}
    </AdminContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = useAdmin;

export default AdminContext;
