import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  ShieldCheck,
  Sparkles,
  Save,
  Image,
  Video,
  User,
  Layers,
  Award,
  MapPin,
} from 'lucide-react';
import { useApp } from '../../context/AdminContext';
import HeritageCornerMotif from '../../components/common/HeritageCornerMotif';

const ArtisanRegister = () => {
  const { submitArtisanApplication, showToast } = useApp();

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    // Step 1: Personal Information
    name: '',
    email: '',
    phone: '',
    state: 'Rajasthan',
    district: '',
    city: '',
    bio: '',
    experience: '15',

    // Step 2: Craft
    craft: '',
    category: 'Traditional Painting',
    tradition: '',
    materials: '',
    lineageGenerations: '3rd Generation',

    // Step 3: Media
    photo: '',
    portfolioImage1: '',
    portfolioImage2: '',
    videoLink: '',

    // Step 4: Documents
    aadhaarNumber: '',
    giTagNumber: '',
    giCertificateName: '',
    awards: '',
  });

  const [errors, setErrors] = useState({});

  // Restore draft if saved
  useEffect(() => {
    try {
      const draft = localStorage.getItem('jeevant_artisan_draft');
      if (draft) {
        setForm(JSON.parse(draft));
        showToast('Restored saved application draft.', 'info');
      }
    } catch {}
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem('jeevant_artisan_draft', JSON.stringify(form));
      showToast('Application draft saved locally!', 'success');
    } catch {
      showToast('Failed to save draft.', 'error');
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!form.name.trim()) newErrors.name = 'Full name is required';
      if (!form.email.trim()) newErrors.email = 'Valid email is required';
      if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!form.state) newErrors.state = 'State is required';
      if (!form.district.trim()) newErrors.district = 'District is required';
    } else if (currentStep === 2) {
      if (!form.craft.trim()) newErrors.craft = 'Craft / Tradition name is required';
      if (!form.category) newErrors.category = 'Craft category is required';
    } else if (currentStep === 4) {
      if (!form.aadhaarNumber.trim()) newErrors.aadhaarNumber = 'Aadhaar / e-Shram ID is required for DBT';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(4, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setLoading(true);
    try {
      const generatedId = await submitArtisanApplication(form);
      setTrackingId(generatedId);
      localStorage.removeItem('jeevant_artisan_draft');
      setSubmitted(true);
    } catch (err) {
      showToast(err.message || 'Submission failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const STATES = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const CATEGORIES = [
    'Traditional Painting',
    'Textiles & Hand Block',
    'Ceramics & Pottery',
    'Lost-Wax Metallurgy',
    'Tribal Indigenous Art',
    'Heritage Textiles',
    'Sustainable Fiber & Woodcraft',
    'Jewelry & Metal Work',
    'Culinary Heritage',
    'Other Living Craft'
  ];

  return (
    <div className="artisan-register-page">
      <div className="page-container">
        {/* Header */}
        <div className="register-header-banner">
          <HeritageCornerMotif position="top-right" size={68} opacity={0.6} />
          <Link to="/" className="back-link">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="register-hero-title-wrap">
            <span className="register-pill">Official Government & SIH 2026 Registry</span>
            <h1>Master Artisan Onboarding Portal</h1>
            <p>
              Join JEEVANT's verified directory. Share your generational craft, conduct masterclasses,
              and receive 100% direct benefit transfers with 0% platform intermediary commission.
            </p>
          </div>
        </div>

        {!submitted ? (
          <div className="artisan-register-two-col-layout">
            <div className="register-card-wrapper">
            {/* Step Progress Bar */}
            <div className="wizard-progress-bar">
              <div className={`wizard-step-node ${step >= 1 ? 'active' : ''}`}>
                <div className="node-circle">1</div>
                <span className="node-label">Personal Info</span>
              </div>
              <div className={`wizard-connector ${step >= 2 ? 'active' : ''}`} />
              <div className={`wizard-step-node ${step >= 2 ? 'active' : ''}`}>
                <div className="node-circle">2</div>
                <span className="node-label">Craft & Lineage</span>
              </div>
              <div className={`wizard-connector ${step >= 3 ? 'active' : ''}`} />
              <div className={`wizard-step-node ${step >= 3 ? 'active' : ''}`}>
                <div className="node-circle">3</div>
                <span className="node-label">Media & Atelier</span>
              </div>
              <div className={`wizard-connector ${step >= 4 ? 'active' : ''}`} />
              <div className={`wizard-step-node ${step >= 4 ? 'active' : ''}`}>
                <div className="node-circle">4</div>
                <span className="node-label">Verification Docs</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="wizard-form-body">
              {/* STEP 1: PERSONAL INFORMATION */}
              {step === 1 && (
                <div className="wizard-step-content">
                  <div className="step-title-row">
                    <User size={20} className="text-forest" />
                    <h3>Step 1: Personal Information</h3>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'input-error' : ''}`}
                        placeholder="e.g. Smt. Dulari Devi"
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                        placeholder="artisan@guild.in"
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Phone Number (Aadhaar Linked) *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className={`form-input ${errors.phone ? 'input-error' : ''}`}
                        placeholder="+91 98352 10842"
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Years of Experience *</label>
                      <input
                        type="text"
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g. 25 Years"
                      />
                    </div>
                  </div>

                  <div className="form-grid-3">
                    <div className="form-group">
                      <label className="form-label">State *</label>
                      <select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="form-input"
                      >
                        {STATES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">District *</label>
                      <input
                        type="text"
                        name="district"
                        value={form.district}
                        onChange={handleChange}
                        className={`form-input ${errors.district ? 'input-error' : ''}`}
                        placeholder="e.g. Madhubani / Jaipur"
                      />
                      {errors.district && <span className="error-text">{errors.district}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Village / Town / Ward</label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g. Ranti Village"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Biographical Background & Tradition Story</label>
                    <textarea
                      name="bio"
                      rows={4}
                      value={form.bio}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Describe your family's craft lineage, notable community initiatives, and traditions you preserve..."
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: CRAFT & TRADITION */}
              {step === 2 && (
                <div className="wizard-step-content">
                  <div className="step-title-row">
                    <Layers size={20} className="text-gold" />
                    <h3>Step 2: Craft & Generational Lineage</h3>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Craft / Tradition Name *</label>
                      <input
                        type="text"
                        name="craft"
                        value={form.craft}
                        onChange={handleChange}
                        className={`form-input ${errors.craft ? 'input-error' : ''}`}
                        placeholder="e.g. Madhubani Painting, Blue Pottery"
                      />
                      {errors.craft && <span className="error-text">{errors.craft}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Craft Category *</label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="form-input"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Generational Lineage</label>
                      <input
                        type="text"
                        name="lineageGenerations"
                        value={form.lineageGenerations}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g. 4th Generation, Guru-Shishya trained"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Natural Raw Materials Used</label>
                      <input
                        type="text"
                        name="materials"
                        value={form.materials}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g. Soot ink, river mud, quartz stone, turmeric dyes"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: MEDIA & ATELIER */}
              {step === 3 && (
                <div className="wizard-step-content">
                  <div className="step-title-row">
                    <Image size={20} className="text-terracotta" />
                    <h3>Step 3: Atelier & Portfolio Media</h3>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Artisan Portrait / Photo URL</label>
                    <input
                      type="url"
                      name="photo"
                      value={form.photo}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="https://... (or leave blank for automatic cultural avatar)"
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Sample Product / Masterwork Photo 1</label>
                      <input
                        type="url"
                        name="portfolioImage1"
                        value={form.portfolioImage1}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Image URL of your craft piece"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Sample Product / Masterwork Photo 2</label>
                      <input
                        type="url"
                        name="portfolioImage2"
                        value={form.portfolioImage2}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Image URL of your craft piece"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Video Demonstration or Workshop Link (Optional)</label>
                    <input
                      type="url"
                      name="videoLink"
                      value={form.videoLink}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="YouTube / Vimeo demonstration link"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: VERIFICATION DOCUMENTS */}
              {step === 4 && (
                <div className="wizard-step-content">
                  <div className="step-title-row">
                    <ShieldCheck size={20} className="text-forest" />
                    <h3>Step 4: Government & GI Verification Documents</h3>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Aadhaar or e-Shram Registration Number *</label>
                      <input
                        type="text"
                        name="aadhaarNumber"
                        value={form.aadhaarNumber}
                        onChange={handleChange}
                        className={`form-input ${errors.aadhaarNumber ? 'input-error' : ''}`}
                        placeholder="•••• •••• •••• 4018"
                      />
                      {errors.aadhaarNumber && (
                        <span className="error-text">{errors.aadhaarNumber}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Geographical Indication (GI) Certificate ID (If assigned)</label>
                      <input
                        type="text"
                        name="giTagNumber"
                        value={form.giTagNumber}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g. GI-IN-0012 or Pending Application"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">GI / KYC Certificate Document</label>
                    <div className="file-upload-dropzone">
                      <FileText size={32} className="text-forest" />
                      <p>
                        <strong>Upload GI Registration Certificate / Artisan Card</strong>
                      </p>
                      <span>PDF, PNG, JPG accepted (Max 5MB)</span>
                      <input
                        type="file"
                        className="hidden-file-input"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            setForm({
                              ...form,
                              giCertificateName: e.target.files[0].name,
                            });
                          }
                        }}
                      />
                    </div>
                    {form.giCertificateName && (
                      <div className="uploaded-file-indicator">
                        <CheckCircle2 size={16} className="text-forest" />
                        <span>{form.giCertificateName} attached</span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">State / National Awards & Honors</label>
                    <input
                      type="text"
                      name="awards"
                      value={form.awards}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g. Padma Shri (2021), Shilp Guru, State Master Award"
                    />
                  </div>
                </div>
              )}

              {/* Wizard Navigation & Action Controls */}
              <div className="wizard-controls-footer">
                <div className="controls-left">
                  {step > 1 && (
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={handleBack}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={handleSaveDraft}
                  >
                    <Save size={16} /> Save Draft
                  </button>
                </div>

                <div className="controls-right">
                  {step < 4 ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleNext}
                    >
                      Next Step <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary btn-submit-app"
                      disabled={loading}
                    >
                      {loading ? 'Submitting Application...' : 'Submit Official Application'}
                    </button>
                  )}
                </div>
              </div>
            </form>
            </div>

            {/* Right Side Artisan Preview Card (Screen 12 Spec) */}
            <aside className="artisan-preview-sidebar-card" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e9dfcc', padding: '24px', boxShadow: '0 8px 24px rgba(18,53,39,0.06)', position: 'sticky', top: '100px' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{ width: '130px', height: '130px', borderRadius: '50%', margin: '0 auto 16px', overflow: 'hidden', border: '4px solid #c8952a', boxShadow: '0 6px 16px rgba(0,0,0,0.12)' }}>
                  <img
                    src={form.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80'}
                    alt="Artisan Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
                <div className="badge badge-primary" style={{ marginBottom: '8px' }}>
                  <ShieldCheck size={13} /> Verified Master Craftsperson
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#123527', margin: '4px 0' }}>
                  {form.name || 'Master Artisan Name'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#c85a32', fontWeight: '600' }}>
                  {form.craft || 'Traditional Handcraft'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                  <MapPin size={13} />
                  <span>{form.district ? `${form.district}, ` : ''}{form.state || 'India'}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f1ece1', paddingTop: '16px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Craft Lineage:</span>
                  <strong>{form.lineageGenerations || 'Generational'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Experience:</span>
                  <strong>{form.experience} Years</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>GI Certification:</span>
                  <strong style={{ color: '#123527' }}>{form.giTagNumber || 'Pending Review'}</strong>
                </div>
              </div>

              <div style={{ background: '#fcfaf6', borderRadius: '10px', padding: '14px', border: '1px solid #ebdcc5', marginTop: '16px' }}>
                <strong style={{ display: 'block', fontSize: '0.82rem', color: '#123527', marginBottom: '6px' }}>
                  ⚡ Why Register on JEEVANT?
                </strong>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.78rem', color: '#555', lineHeight: '1.5' }}>
                  <li>100% Direct Benefit Transfer (DBT)</li>
                  <li>0% platform intermediary commission</li>
                  <li>Nationwide workshops & craft sales</li>
                  <li>Official GI accreditation protection</li>
                </ul>
              </div>
            </aside>
          </div>
        ) : (
          /* Submission Success State */
          <div className="registration-success-card">
            <div className="success-icon-wrap">
              <CheckCircle2 size={56} className="text-forest" />
            </div>
            <h2>Application Submitted Successfully!</h2>
            <p className="app-tracking-badge">Official Tracking ID: <strong>{trackingId}</strong></p>

            <div className="app-status-box">
              <div className="status-indicator-line">
                <span className="status-ping" />
                <span>Current Status: <strong>Under Administrative Review (Pending GI Verification)</strong></span>
              </div>
              <p>
                Your dossier has been registered in the JEEVANT verification queue under the
                Smart India Hackathon 2026 administrative governance system. Ministry officers will
                review your Aadhaar credentials and GI documentation.
              </p>
            </div>

            <div className="success-action-buttons">
              <Link to="/artists" className="btn btn-primary">
                View Public Artists Directory
              </Link>
              <Link to="/admin" className="btn btn-outline">
                Inspect in Admin Verification Queue
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisanRegister;
