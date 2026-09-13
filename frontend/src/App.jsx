import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';

// Layouts
import Layout from './components/layout/Layout';         // Admin layout (PRESERVED)
import LearnerLayout from './layouts/LearnerLayout';     // Public learner layout

// ─── Admin Pages (Existing — Fully Preserved) ────────────────────────────────
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Artisans from './pages/admin/Artisans';
import Users from './pages/admin/Users';
import Traditions from './pages/admin/Traditions';
import Workshops from './pages/admin/Workshops';
import Reports from './pages/admin/Reports';
import Payments from './pages/admin/Payments';
import Reviews from './pages/admin/Reviews';
import Settings from './pages/admin/Settings';

// ─── Public / Learner Pages (SIH 2026 Wireframe Architecture) ───────────────
import Home from './pages/learner/Home';
import Explore from './pages/learner/Explore';
import CultureMap from './pages/learner/CultureMap';
import ArtisanDirectory from './pages/learner/ArtisanDirectory';
import ArtisanProfile from './pages/learner/ArtisanProfile';
import Shop from './pages/learner/Shop';
import ProductDetail from './pages/learner/ProductDetail';
import WorkshopList from './pages/learner/WorkshopList';
import WorkshopDetail from './pages/learner/WorkshopDetail';
import Learn from './pages/learner/Learn';
import SearchResults from './pages/learner/SearchResults';
import UserDashboard from './pages/learner/UserDashboard';
import About from './pages/learner/About';
import HowItWorks from './pages/learner/HowItWorks';
import LoginPage from './pages/learner/LoginPage';
import SignupPage from './pages/learner/SignupPage';

// ─── Artisan Registration & Studio Dashboard ──────────────────────────────────
import ArtisanRegister from './pages/artisan/ArtisanRegister';
import ArtistDashboard from './pages/artisan/ArtistDashboard';

export function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>

          {/* ─── Public Learner Routes (Wrapped in LearnerLayout) ──────── */}
          <Route element={<LearnerLayout />}>
            <Route path="/" element={<Home />} />

            {/* Explore Culture & Cultural Map */}
            <Route path="/explore" element={<Explore />} />
            <Route path="/discover" element={<Explore />} />
            <Route path="/explore/map" element={<CultureMap />} />

            {/* Artists Directory & Profiles */}
            <Route path="/artists" element={<ArtisanDirectory />} />
            <Route path="/artisans" element={<ArtisanDirectory />} />
            <Route path="/artists/:id" element={<ArtisanProfile />} />
            <Route path="/artisans/:id" element={<ArtisanProfile />} />

            {/* Fair-Trade Shop & Product Details */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetail />} />

            {/* Masterclasses & Workshops */}
            <Route path="/workshops" element={<WorkshopList />} />
            <Route path="/workshops/:id" element={<WorkshopDetail />} />

            {/* Learning Hub & Knowledge Challenges */}
            <Route path="/learn" element={<Learn />} />

            {/* Cross-Entity Global Search */}
            <Route path="/search" element={<SearchResults />} />

            {/* Institutional About & How It Works */}
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />

            {/* Cultural User Dashboard & Saved Heritage */}
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/wishlist" element={<UserDashboard />} />
            <Route path="/saved-heritage" element={<UserDashboard />} />
            <Route path="/saved-cultures" element={<UserDashboard />} />

            {/* Dedicated Artist Studio & Dashboard */}
            <Route path="/artist/dashboard" element={<ArtistDashboard />} />
            <Route path="/artisan/dashboard" element={<ArtistDashboard />} />
          </Route>

          {/* ─── Standalone Auth & Artisan Onboarding ──────────────────── */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/artisan/register" element={<ArtisanRegister />} />

          {/* ─── Admin Governance Console (Fully Preserved) ─────────────── */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Shell */}
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="artisans" element={<Artisans />} />
            <Route path="users" element={<Users />} />
            <Route path="traditions" element={<Traditions />} />
            <Route path="workshops" element={<Workshops />} />
            <Route path="reports" element={<Reports />} />
            <Route path="payments" element={<Payments />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback — Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
