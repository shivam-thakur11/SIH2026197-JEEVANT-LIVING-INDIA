import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  GraduationCap,
  MessageCircle,
  ShoppingBag,
  FileCheck,
  ShieldCheck,
  UserCheck,
  Coins,
  ShieldAlert,
  BarChart3,
  Scale,
  ArrowRight,
  Sparkles,
  Users,
  Building2,
} from 'lucide-react';
import HeritageCornerMotif from '../../components/common/HeritageCornerMotif';

const HowItWorks = () => {
  const [activePersona, setActivePersona] = useState('learners');

  const learnerSteps = [
    {
      num: '01',
      title: 'Discover',
      icon: Compass,
      desc: 'Browse India’s living cultural map, regional craft belts, and documented oral traditions filterable by state and risk level.',
      link: '/explore',
      linkText: 'Explore Directory',
    },
    {
      num: '02',
      title: 'Learn',
      icon: GraduationCap,
      desc: 'Explore in-depth material sciences, illustrated folk chronicles, documentary videos, and interactive heritage quizzes.',
      link: '/learn',
      linkText: 'Open Learn Hub',
    },
    {
      num: '03',
      title: 'Connect',
      icon: MessageCircle,
      desc: 'Meet verified master craftspeople, inspect their genealogical lineage, and initiate direct communication without brokers.',
      link: '/artists',
      linkText: 'Meet Master Artists',
    },
    {
      num: '04',
      title: 'Book / Buy',
      icon: ShoppingBag,
      desc: 'Enroll in live virtual masterclasses or purchase GI-tagged authentic crafts with 100% direct payment via Direct Benefit Transfer.',
      link: '/shop',
      linkText: 'Visit Fair-Trade Shop',
    },
  ];

  const artisanSteps = [
    {
      num: '01',
      title: 'Register',
      icon: Users,
      desc: 'Submit personal credentials, artisan cluster address, and generational lineage through our simple 4-step wizard.',
      link: '/artisan/register',
      linkText: 'Start Registration',
    },
    {
      num: '02',
      title: 'Verification',
      icon: ShieldCheck,
      desc: 'Ministry administrators audit uploaded Geographical Indication (GI) registration documents and Aadhaar identity for authenticity.',
      link: '/artisan/register',
      linkText: 'Learn Verification',
    },
    {
      num: '03',
      title: 'Create Profile',
      icon: UserCheck,
      desc: 'Receive an official GI-verified profile badge, publish your artistic bio, showcase atelier photos, and catalog authentic pieces.',
      link: '/artists',
      linkText: 'View Artist Dossiers',
    },
    {
      num: '04',
      title: 'Sell & Teach',
      icon: Coins,
      desc: 'Host live interactive masterclasses and sell handcrafted pieces with guaranteed 0% platform fee and immediate DBT payouts.',
      link: '/workshops',
      linkText: 'Browse Classes',
    },
  ];

  const adminSteps = [
    {
      num: '01',
      title: 'Verify',
      icon: FileCheck,
      desc: 'Review incoming artisan applications, inspect Aadhaar/e-Shram credentials, and authenticate official GI registration certificates.',
      link: '/admin/login',
      linkText: 'Admin Queue',
    },
    {
      num: '02',
      title: 'Moderate',
      icon: ShieldAlert,
      desc: 'Audit community reviews and resolve grievance reports regarding counterfeit industrial copies or copyright infringements.',
      link: '/admin/login',
      linkText: 'Audit Reports',
    },
    {
      num: '03',
      title: 'Monitor',
      icon: BarChart3,
      desc: 'Track live MongoDB metrics including verified artisans, masterclasses hosted, occupancy rates, and gross fair-trade revenue.',
      link: '/admin/login',
      linkText: 'Live Statistics',
    },
    {
      num: '04',
      title: 'Govern',
      icon: Scale,
      desc: 'Manage transparent fair-trade ledger tracking 0% platform commissions and 100% Direct Benefit Transfer disbursements.',
      link: '/admin/login',
      linkText: 'DBT Ledger',
    },
  ];

  return (
    <div className="how-it-works-page">
      {/* ─── Hero Banner ──────────────────────────────────────────────── */}
      <section className="how-hero">
        <HeritageCornerMotif position="top-right" size={68} opacity={0.6} />
        <div className="page-container">
          <div className="how-hero-badge">
            <Sparkles size={16} />
            <span>Process & Architecture · SIH 2026</span>
          </div>
          <h1 className="how-hero-title">How JEEVANT Works</h1>
          <p className="how-hero-subtitle">
            A transparent ecosystem connecting cultural patrons, master artisans, and government
            governance through verifiable digital workflows.
          </p>

          {/* Persona Switcher Tabs */}
          <div className="persona-nav-tabs">
            <button
              className={`persona-tab-btn ${activePersona === 'learners' ? 'active' : ''}`}
              onClick={() => setActivePersona('learners')}
            >
              <Users size={16} />
              <span>For Cultural Learners</span>
            </button>
            <button
              className={`persona-tab-btn ${activePersona === 'artisans' ? 'active' : ''}`}
              onClick={() => setActivePersona('artisans')}
            >
              <Sparkles size={16} />
              <span>For Master Artisans</span>
            </button>
            <button
              className={`persona-tab-btn ${activePersona === 'admin' ? 'active' : ''}`}
              onClick={() => setActivePersona('admin')}
            >
              <Building2 size={16} />
              <span>For Governance & Admin</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Steps Grid Section ───────────────────────────────────────── */}
      <section className="how-steps-section">
        <div className="page-container">
          {/* Persona 1: Learners */}
          {activePersona === 'learners' && (
            <div className="persona-flow-pane">
              <div className="flow-lead-text">
                <h2>The Cultural Learner Journey</h2>
                <p><strong>Discover → Learn → Connect → Book / Buy</strong></p>
              </div>

              <div className="flow-steps-grid">
                {learnerSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.num} className="flow-step-card">
                      <div className="step-num-pill">{step.num}</div>
                      <div className="step-icon-circle bg-green-light">
                        <Icon size={26} className="text-forest" />
                      </div>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                      <Link to={step.link} className="step-link-btn">
                        <span>{step.linkText}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Persona 2: Artisans */}
          {activePersona === 'artisans' && (
            <div className="persona-flow-pane">
              <div className="flow-lead-text">
                <h2>The Master Artisan Journey</h2>
                <p><strong>Register → Verification → Create Profile → Sell / Teach</strong></p>
              </div>

              <div className="flow-steps-grid">
                {artisanSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.num} className="flow-step-card">
                      <div className="step-num-pill">{step.num}</div>
                      <div className="step-icon-circle bg-gold-light">
                        <Icon size={26} className="text-gold" />
                      </div>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                      <Link to={step.link} className="step-link-btn">
                        <span>{step.linkText}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Persona 3: Admin */}
          {activePersona === 'admin' && (
            <div className="persona-flow-pane">
              <div className="flow-lead-text">
                <h2>The Institutional Governance Journey</h2>
                <p><strong>Verify → Moderate → Monitor → Govern</strong></p>
              </div>

              <div className="flow-steps-grid">
                {adminSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.num} className="flow-step-card">
                      <div className="step-num-pill">{step.num}</div>
                      <div className="step-icon-circle bg-terra-light">
                        <Icon size={26} className="text-terracotta" />
                      </div>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                      <Link to={step.link} className="step-link-btn">
                        <span>{step.linkText}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Bottom Fair-Trade Banner ─────────────────────────────────── */}
      <section className="how-bottom-banner">
        <div className="page-container">
          <div className="how-guarantee-card">
            <ShieldCheck size={36} className="text-forest" />
            <div className="how-guarantee-text">
              <h3>Empowering India's Cultural Custodians</h3>
              <p>
                By replacing exploitative middlemen networks with an authenticated, zero-commission
                Direct Benefit Transfer platform, JEEVANT honors the true vision of the
                Smart India Hackathon 2026.
              </p>
            </div>
            <Link to="/explore" className="btn btn-primary">
              Begin Exploring <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
