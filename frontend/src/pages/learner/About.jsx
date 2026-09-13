import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Layers,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Globe2,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import HeritageCornerMotif from '../../components/common/HeritageCornerMotif';

const About = () => {
  const { artisans, traditions, stats } = useApp();
  const statesSet = new Set([
    ...(artisans || []).map((a) => a.state).filter(Boolean),
    ...(traditions || []).map((t) => t.state).filter(Boolean),
  ]);
  const statesCount = statesSet.size || 12;
  return (
    <div className="about-page">
      {/* ─── Hero Banner ──────────────────────────────────────────────── */}
      <section className="about-hero">
        <HeritageCornerMotif position="top-right" size={68} opacity={0.6} />
        <div className="page-container">
          <div className="about-hero-badge">
            <Sparkles size={16} />
            <span>Smart India Hackathon 2026 · Problem Statement PS 26197</span>
          </div>
          <h1 className="about-hero-title">About JEEVANT: Living India</h1>
          <p className="about-hero-subtitle">
            A national initiative to preserve India's intangible living cultural heritage, authenticate
            Geographical Indications (GI), and empower master craftspeople through direct-benefit governance.
          </p>
        </div>
      </section>

      {/* ─── Vision & Mission ─────────────────────────────────────────── */}
      <section className="vision-mission-section">
        <div className="page-container vision-mission-grid">
          <div className="vision-card">
            <div className="vision-icon-wrap bg-green-light">
              <Globe2 size={28} className="text-forest" />
            </div>
            <h2>Our Vision</h2>
            <p>
              To create an unshakeable, transparent digital bridge where India’s ancient crafts, oral traditions,
              and generational knowledge systems survive and prosper into the 22nd century—celebrated by global
              learners and sustained by thriving, dignified rural artisan communities.
            </p>
          </div>

          <div className="vision-card">
            <div className="vision-icon-wrap bg-gold-light">
              <HeartHandshake size={28} className="text-gold" />
            </div>
            <h2>Our Mission</h2>
            <p>
              To eradicate systemic exploitation by predatory middlemen through a verified 0% platform fee
              Direct Benefit Transfer (DBT) framework, authenticating genuine GI registration certificates,
              and offering immersive masterclasses that safeguard living heritage.
            </p>
          </div>
        </div>
      </section>

      {/* ─── The Problem Statement ─────────────────────────────────────── */}
      <section className="problem-statement-section">
        <div className="page-container">
          <div className="section-title-center">
            <span className="sub-badge text-terracotta">Systemic Cultural Challenges</span>
            <h2>The Crisis Facing Living Indian Heritage</h2>
            <p>Traditional Indian craft masters face existential economic and generational threats.</p>
          </div>

          <div className="problem-cards-grid">
            <div className="problem-box">
              <div className="problem-num">01</div>
              <h4>Middlemen Exploitation</h4>
              <p>
                Unorganized intermediary traders siphon 25% to 45% of retail craft revenues, leaving
                rural master craftspeople in perpetual poverty and debt cycles.
              </p>
            </div>

            <div className="problem-box">
              <div className="problem-num">02</div>
              <h4>Counterfeit Factory Flooding</h4>
              <p>
                Cheap industrial powerloom prints and synthetic plastic replicas flood domestic and
                international markets, misleading buyers and eroding genuine GI heritage.
              </p>
            </div>

            <div className="problem-box">
              <div className="problem-num">03</div>
              <h4>Extinction of Rare Techniques</h4>
              <p>
                Because younger rural generations cannot earn a dignified living from traditional crafts,
                millennia-old oral lineages and natural dye chemistry risk permanent extinction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The JEEVANT Solution ──────────────────────────────────────── */}
      <section className="solution-section">
        <div className="page-container">
          <div className="section-title-center">
            <span className="sub-badge text-forest">The JEEVANT Innovation</span>
            <h2>Our Multi-Pillar Solution</h2>
            <p>Built specifically to address the mandate of SIH Problem Statement ID: 26197.</p>
          </div>

          <div className="solution-pillars-grid">
            <div className="solution-pillar-card">
              <div className="pillar-icon">
                <ShieldCheck size={26} />
              </div>
              <h3>1. Official GI Verification Workflow</h3>
              <p>
                Rigorous administrative verification of Geographical Indication (GI) registration certificates
                and Aadhaar/e-Shram credentials ensures only authentic master artisans join the registry.
              </p>
            </div>

            <div className="solution-pillar-card">
              <div className="pillar-icon">
                <TrendingUp size={26} />
              </div>
              <h3>2. 0% Commission DBT Ledger</h3>
              <p>
                Guaranteed 100% payout to registered master artisans. The platform operates on a zero-fee
                model, with every rupee routed directly to verified bank accounts via Direct Benefit Transfer.
              </p>
            </div>

            <div className="solution-pillar-card">
              <div className="pillar-icon">
                <Users size={26} />
              </div>
              <h3>3. Real-Time Virtual Masterclasses</h3>
              <p>
                High-definition live virtual studios connecting rural craft clusters with learners worldwide,
                providing sustainable recurrent teaching income for master craftspeople.
              </p>
            </div>

            <div className="solution-pillar-card">
              <div className="pillar-icon">
                <Layers size={26} />
              </div>
              <h3>4. Living Cultural Repository</h3>
              <p>
                A comprehensive digital archive documenting folk antiquity, indigenous raw materials,
                preservation risk levels, and UNESCO citations for educational posterity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quantifiable Impact ────────────────────────────────────────── */}
      <section className="impact-section">
        <div className="page-container">
          <div className="impact-header-row">
            <div>
              <span className="sub-badge text-gold">Measurable Governance Outcomes</span>
              <h2>Our Documented Impact</h2>
              <p>Transparent metrics tracking cultural preservation and artisan livelihood upliftment.</p>
            </div>
          </div>

          <div className="impact-stats-grid">
            <div className="impact-stat-item">
              <div className="impact-number">{stats?.totalTraditions || (traditions ? traditions.length : 0)}</div>
              <div className="impact-label">Intangible Traditions Documented</div>
            </div>
            <div className="impact-stat-item">
              <div className="impact-number">{stats?.totalArtisans || (artisans ? artisans.length : 0)}</div>
              <div className="impact-label">Master Artisans in Living Registry</div>
            </div>
            <div className="impact-stat-item">
              <div className="impact-number">0%</div>
              <div className="impact-label">Platform Fee (100% Direct DBT)</div>
            </div>
            <div className="impact-stat-item">
              <div className="impact-number">{statesCount}+</div>
              <div className="impact-label">States & Union Territories Represented</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="about-actions-banner">
            <div>
              <h3>Support India's Living Heritage Today</h3>
              <p>Explore living traditions, book a masterclass, or apply for artisan verification.</p>
            </div>
            <div className="about-btn-group">
              <Link to="/explore" className="btn btn-primary">
                Explore Culture <ArrowRight size={16} />
              </Link>
              <Link to="/artisan/register" className="btn btn-outline">
                Artisan Registration
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
