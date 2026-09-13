import { useState } from 'react';
import { ShieldCheck, Award, Bell, Save } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const Settings = () => {
  const { adminUser, showToast, isLiveDatabase } = useAdmin();

  const [requireAadhaar, setRequireAadhaar] = useState(true);
  const [autoVerifyGI, setAutoVerifyGI] = useState(true);
  const [instantDBT, setInstantDBT] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [highRiskWarning, setHighRiskWarning] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Platform governance & SIH presentation preferences saved.', 'success');
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--forest-900)' }}>
          Platform Governance & SIH 2026 Configurations
        </h2>
        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
          Administrative security policies, GI tag verification rules, and hackathon presentation presets.
        </p>
      </div>

      <form onSubmit={handleSave}>
        {/* SIH Hackathon Project Card */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-header">
            <div className="card-title">
              <Award size={18} color="var(--gold-500)" />
              <span>Smart India Hackathon 2026 Project Context</span>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                background: 'var(--forest-50)',
                color: 'var(--forest-700)',
                padding: '4px 10px',
                borderRadius: '20px'
              }}
            >
              PS 26197
            </span>
          </div>

          <div className="card-body">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px'
              }}
            >
              <div style={{ background: 'var(--beige-50)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>PROJECT NAME</span>
                <strong style={{ fontSize: '14px', color: 'var(--forest-900)' }}>JEEVANT: LIVING INDIA</strong>
              </div>
              <div style={{ background: 'var(--beige-50)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>PROBLEM STATEMENT</span>
                <strong style={{ fontSize: '14px', color: 'var(--forest-900)' }}>26197 (Intangible Cultural Heritage)</strong>
              </div>
              <div style={{ background: 'var(--beige-50)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>ADMINISTRATOR IN-CHARGE</span>
                <strong style={{ fontSize: '14px', color: 'var(--forest-900)' }}>{adminUser?.name || 'Administrator'}</strong>
              </div>
              <div style={{ background: 'var(--beige-50)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>SYSTEM STATUS</span>
                <strong style={{ fontSize: '14px', color: isLiveDatabase ? '#166534' : '#b45309' }}>
                  {isLiveDatabase ? 'Live MongoDB Connected' : 'Offline Demo Mode (In-Memory)'}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Verification & GI Tag Rules */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-header">
            <div className="card-title">
              <ShieldCheck size={18} color="var(--terracotta-500)" />
              <span>Artisan Verification & Fair Trade Automation</span>
            </div>
          </div>

          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--forest-900)' }}>
                    Mandatory Aadhaar e-KYC / e-Shram Matching
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Requires verified biometric citizen proof before granting Master Artisan status.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={requireAadhaar}
                  onChange={(e) => setRequireAadhaar(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--forest-700)' }}
                />
              </label>

              <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--forest-900)' }}>
                    Automated Geographical Indication (GI) Proof Cross-Check
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Connects with IP India GI Registry to validate regional provenance certificate numbers.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoVerifyGI}
                  onChange={(e) => setAutoVerifyGI(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--forest-700)' }}
                />
              </label>

              <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--forest-900)' }}>
                    Instant DBT Payout Release on Workshop Delivery
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Automatically trigger direct UPI/NEFT transfer immediately after masterclass completion with 0% platform fee.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={instantDBT}
                  onChange={(e) => setInstantDBT(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--forest-700)' }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Notifications Preference */}
        <div className="card" style={{ marginBottom: '28px' }}>
          <div className="card-header">
            <div className="card-title">
              <Bell size={18} color="var(--forest-700)" />
              <span>Admin Notification Dispatch</span>
            </div>
          </div>

          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--forest-900)' }}>
                    Real-time Artisan Application Alerts
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Send high-priority notifications when new artisans submit verification credentials.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--forest-700)' }}
                />
              </label>

              <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--forest-900)' }}>
                    Endangered Craft Depletion Early-Warning System
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Flag traditions where fewer than 200 living practitioners remain.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={highRiskWarning}
                  onChange={(e) => setHighRiskWarning(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--forest-700)' }}
                />
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
          <Save size={16} />
          <span>Save Administrative Preferences</span>
        </button>
      </form>
    </div>
  );
};

export default Settings;
