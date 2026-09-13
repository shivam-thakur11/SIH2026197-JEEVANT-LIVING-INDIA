# JEEVANT — LIVING INDIA
### Digital Cultural Heritage & Artisan Fair-Trade Ecosystem
**Smart India Hackathon 2026 | Problem Statement ID: 26197 | Theme: Heritage & Culture**

---

## 🌟 Overview & Vision

India's traditional art forms and master craftspeople represent thousands of years of living knowledge, yet many traditions face extinction due to commercial exploitation by middlemen, lack of digital discovery, and economic vulnerability.

**JEEVANT: Living India** is a production-grade full-stack digital platform engineered to preserve, celebrate, and economically sustain India's cultural heritage. The platform establishes a direct, transparent bridge between **Master Artisans (Shilp Gurus)**, **Citizens & Global Learners**, and the **Nodal Ministry (Ministry of Culture)**:

- **100% Direct Benefit Transfer (DBT)**: Real-time fair-trade commerce with **0% intermediary platform commission**.
- **Geographical Indication (GI) Verification**: Rigorous administrative verification of artisan authenticity, GI certifications, and lineages.
- **Living Heritage Masterclasses**: Interactive ateliers connecting citizens directly with master craftspeople.
- **Zero-Dependency Resilience**: Runs out of the box in **Offline Demo Mode** with an in-memory cultural registry, and automatically integrates with **MongoDB** when connected.

---

## 🏛️ Key Stakeholder Experiences

### 1. 🎓 Learner & Citizen Portal
- **Cinematic Heritage Hero**: Dynamic live search, cultural zones explorer, and live platform impact statistics.
- **Interactive Culture Map**: Geographic clustering of regional crafts and indigenous artisans across India's states.
- **Tradition Discover & Learn Hub**: Interactive knowledge challenges, antiquity records, and risk level classifications (Stable, Vulnerable, Critically Endangered).
- **Masterclass Atelier**: Browse and book hands-on workshops with master craftspeople with automatic capacity tracking.
- **Fair-Trade Shop**: Direct-to-artisan craft procurement with direct DBT ledger tracking and zero intermediary markup.
- **Cross-Entity Unified Search**: Instant search across traditions, artisans, crafts, and masterclasses.

### 2. 🎨 Artisan Studio & Onboarding
- **Public 4-Step Onboarding**: Prospective artisans submit personal identity, craft lineage, portfolio media, and GI credentials (`/artisan/register`).
- **Dedicated Artisan Dashboard**: Manage product inventories, schedule masterclasses, audit incoming orders, and track direct DBT earnings.

### 3. 🛡️ Nodal Governance & Admin Console
- **Administrative Governance Dashboard**: Live computed KPIs (preservation score, active artisans, verified crafts).
- **Artisan GI Verification Pipeline**: Audit pending applications, review documents, and approve/reject with tamper-evident notes.
- **Grievance & Authenticity Moderation**: Review reported listings and flag inappropriate content.
- **Direct DBT Ledger Review**: Audit payment disbursements and verify 0% fee compliance.

---

## 💻 Technology Stack

| Layer | Technologies | Role in System |
|---|---|---|
| **Frontend UI** | React 19, Vite 8 | High-performance reactive Single Page Application |
| **Routing** | React Router DOM v7 | Modular client-side route partitioning |
| **Styling** | Vanilla CSS, JEEVANT Cultural Tokens | Authentic Indian cultural aesthetic (`learner.css`) |
| **Icons** | Lucide React | Modern semantic vector iconography |
| **Backend API** | Node.js, Express 4 | RESTful service architecture |
| **Data Layer (Live)** | MongoDB, Mongoose 8 | Document persistence with robust error recovery |
| **Data Layer (Offline)** | In-Memory Cultural Store (`demoStore.js`) | Complete zero-dependency offline database simulator |
| **Validation** | Express-Validator | Schema validation on all data modification endpoints |
| **Security** | JWT, bcryptjs | Stateless token authentication with role authorization |

---

## 📁 Repository Structure

```
SIH2026197-JEEVANT-LIVING-INDIA/
├── frontend/                      # React 19 + Vite Application
│   ├── public/                    # Static assets & icons
│   ├── src/
│   │   ├── assets/                # Images & brand motifs
│   │   ├── components/            # Reusable UI components
│   │   │   ├── common/            # ProductCard, TraditionCard, Modals, etc.
│   │   │   └── layout/            # Admin Header, Sidebar, Layout Shell
│   │   ├── context/               # AdminContext.jsx (Central State Management)
│   │   ├── data/                  # Cultural reference data
│   │   ├── layouts/               # LearnerLayout.jsx (Public shell)
│   │   ├── pages/
│   │   │   ├── admin/             # 10 Admin Governance Pages
│   │   │   ├── artisan/           # Artisan Studio & Registration
│   │   │   └── learner/           # 17 Public Learner Pages
│   │   ├── services/              # 16 Centralized API Clients
│   │   ├── App.jsx                # Application Routing
│   │   ├── index.css              # Global styles & Admin theme
│   │   ├── learner.css            # Cultural design system styles
│   │   └── main.jsx               # Application entry point
│   ├── package.json
│   ├── vite.config.js             # Configured with /api proxy to :5000
│   └── .gitignore
│
├── backend/                       # Node.js + Express RESTful API
│   ├── config/                    # db.js (Dual-mode connection manager)
│   ├── controllers/               # 14 Domain Business Logic Controllers
│   ├── middleware/                # JWT Auth, Role Guard, Error Handler
│   ├── models/                    # 11 Mongoose Data Schemas
│   ├── routes/                    # 15 Domain Route Definitions
│   ├── services/                  # AI, Maps, and Storage Integrations
│   ├── utils/                     # AppError, In-Memory demoStore.js
│   ├── validators/                # Express-Validator rules
│   ├── database/
│   │   └── seed/                  # seed.js (MongoDB Database Seeder)
│   ├── server.js                  # Express application entry
│   ├── package.json
│   ├── .env.example               # Template environment configuration
│   └── .gitignore
│
├── database/                      # Root Database Utilities
│   └── seed/
│       └── seed.js
├── docs/                          # Comprehensive Technical Documentation
│   ├── PROJECT_AUDIT.md           # Security, architecture & audit report
│   ├── ARCHITECTURE.md            # System design, state flows & diagrams
│   └── API.md                     # Exhaustive endpoint reference manual
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

---

### 1. Installation

#### Clone the repository:
```bash
git clone https://github.com/shivam-thakur11/SIH2026197-JEEVANT-LIVING-INDIA.git
cd SIH2026197-JEEVANT-LIVING-INDIA
```

#### Install Backend Dependencies:
```bash
cd backend
npm install
```

#### Install Frontend Dependencies:
```bash
cd ../frontend
npm install
```

---

### 2. Running the Application

#### Option A: Offline Demo Mode (Recommended for Instant Evaluation)
No database installation required! The backend automatically activates the in-memory cultural store with zero configuration:

```bash
# Terminal 1 — Start Backend Server (:5000)
cd backend
npm run dev

# Terminal 2 — Start Frontend (:5173)
cd frontend
npm run dev
```

Visit the application at: **`http://localhost:5173`**

---

#### Option B: Live MongoDB Mode
1. In `backend/`, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set your `MONGO_URI` in `backend/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/jeevant
   JWT_SECRET=jeevant_super_secure_jwt_secret_sih2026_heritage_culture_portal
   CLIENT_URL=http://localhost:5173
   ```
3. Populate the MongoDB database using the seed script:
   ```bash
   npm run seed
   ```
4. Start both servers:
   ```bash
   # Terminal 1: Backend
   cd backend && npm run dev

   # Terminal 2: Frontend
   cd frontend && npm run dev
   ```

---

## 🔑 SIH 2026 Presentation Credentials

The platform is pre-loaded with authentic roles for jury evaluation:

| Role | Email | Password | Access Area |
|---|---|---|---|
| **Nodal Admin** | `admin@jeevant.gov.in` | `Admin@12345` | `/admin` (Governance, GI Verification, DBT Ledger) |
| **Learner / Patron** | `aarav.sharma@example.com` | `Learner@12345` | `/dashboard` (Masterclasses, Orders, Bookmarks) |
| **Master Artisan** | `dulari.devi@example.com` | `Artisan@12345` | `/artist/dashboard` (Studio, Workshops, DBT Payouts) |

---

## 🧪 Testing & Verification Commands

### Test Backend Syntax & Routes:
```bash
cd backend
node --check server.js
```

### Run Automated 20-Point API Test Suite:
With the backend server running:
```bash
cd backend
node ../C:/Users/dell/.gemini/antigravity-ide/brain/271bbde6-ba8b-4161-a5fd-48a91069c0fd/scratch/test_api.js
```
*(All 20 endpoints pass with 100% success rate: Health check, Auth, Artisans, Workshops, Traditions, Products, Orders, Bookings, DBT Payments, Reviews, Grievances, Search, and Validations).*

### Build Frontend for Production:
```bash
cd frontend
npm run build
```

---

## 🛡️ Fair-Trade & Security Standards
- **Zero Intermediary Exploitation**: 0% platform deductions guaranteed on all purchases and masterclasses.
- **Aadhaar / DBT Compliance**: Payment structures simulate direct Aadhaar-linked account disbursements with mock UTR generation.
- **Clean Environment Sanitation**: No secrets, Atlas credentials, or private keys are ever committed to version control.

---

## 📜 Documentation Reference
- [Project Audit & Security Report](docs/PROJECT_AUDIT.md)
- [System Architecture & Data Flows](docs/ARCHITECTURE.md)
- [Complete RESTful API Reference](docs/API.md)
