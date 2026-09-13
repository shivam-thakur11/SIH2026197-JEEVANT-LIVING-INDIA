import { Shield, Sparkles, HeartHandshake, BookOpen, Award, CheckCircle2 } from 'lucide-react';

/**
 * TrustPillars — 4 Visual Impact Pillars for "Why JEEVANT?"
 * Emphasizes heritage preservation, 0% platform fee direct DBT, authentic masterclasses, and GI verification.
 */
const TrustPillars = () => {
  const pillars = [
    {
      icon: Shield,
      title: 'Preserve Heritage',
      subtitle: 'Living Intangible Legacy',
      description:
        'Digitally archiving oral lore, natural pigment formulas, and endangered metallurgical traditions under official GI protection.',
      accent: 'var(--forest-700)',
      bg: 'var(--forest-50)',
    },
    {
      icon: HeartHandshake,
      title: 'Empower Artisans',
      subtitle: '0% Intermediary Deductions',
      description:
        '100% of e-commerce revenue and workshop fees transfer directly into verified master artisan bank accounts via Direct Benefit Transfer (DBT).',
      accent: 'var(--terracotta-500)',
      bg: 'var(--terracotta-100)',
    },
    {
      icon: BookOpen,
      title: 'Learn Culture',
      subtitle: 'Generational Knowledge',
      description:
        'Access curated chronicles, craft documentaries, material science glossaries, and interactive heritage challenges.',
      accent: 'var(--gold-600)',
      bg: 'var(--gold-100)',
    },
    {
      icon: Award,
      title: 'Experience Traditions',
      subtitle: 'Firsthand Masterclasses',
      description:
        'Participate in live virtual atelier sessions and hands-on village residencies taught exclusively by national award-winning Shilp Gurus.',
      accent: '#1e40af',
      bg: '#dbeafe',
    },
  ];

  return (
    <div className="trust-pillars-container">
      <div className="trust-pillars-grid">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div key={idx} className="trust-pillar-card">
              <div
                className="trust-pillar-icon-box"
                style={{ backgroundColor: pillar.bg, color: pillar.accent }}
              >
                <Icon size={26} />
              </div>
              <div className="trust-pillar-sub">{pillar.subtitle}</div>
              <h3 className="trust-pillar-title">{pillar.title}</h3>
              <p className="trust-pillar-desc">{pillar.description}</p>
              <div className="trust-pillar-guarantee">
                <CheckCircle2 size={13} color="var(--forest-700)" />
                <span>SIH 2026 Problem Statement 26197</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrustPillars;
