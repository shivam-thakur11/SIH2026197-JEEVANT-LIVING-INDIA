/**
 * JEEVANT: Living India — In-Memory Demo Data Store (SIH 2026 PS 26197)
 * ==============================================================================
 * Serves live, fully functional, database-like CRUD operations when MongoDB is
 * not connected (Local Development / Offline Demo Mode).
 *
 * Implements:
 *   - Create, Read, Update, Delete for all entities
 *   - Server-side Filtering by multiple query parameters
 *   - Server-side Pagination
 *   - Relational references between Users, Artisans, Products, Workshops, Bookings, Orders
 *   - Dynamic Workshop seat management (auto-decrements availableSeats upon booking)
 *   - Direct DBT payment ledger calculations (0% platform commission)
 *   - Full-text cross-entity search
 *   - Live computed administrative dashboard metrics
 * ==============================================================================
 */

const bcrypt = require('bcryptjs');
const INDIA_REGIONS = require('../database/seed/indiaRegionsData');

class DemoStore {
  constructor() {
    this.reset();
  }

  reset() {
    // ─── 0. Indian States & UTs (36 Total) ───────────────────────────────────
    this.regions = INDIA_REGIONS.map((r, idx) => ({
      _id: `reg-seed-${idx + 1}`,
      id: `reg-seed-${idx + 1}`,
      ...r,
      createdAt: new Date('2026-01-01T00:00:00Z'),
      updatedAt: new Date('2026-01-01T00:00:00Z'),
    }));

    // ─── 1. Users ─────────────────────────────────────────────────────────────
    this.users = [
      {
        _id: 'user-admin-1',
        id: 'user-admin-1',
        name: 'Ananya Deshmukh',
        email: 'admin@jeevant.gov.in',
        passwordHash: bcrypt.hashSync('Admin@12345', 10),
        role: 'admin',
        phone: '+91 98765 00001',
        location: 'Ministry of Culture, New Delhi',
        isActive: true,
        createdAt: new Date('2026-01-15T10:00:00Z'),
        updatedAt: new Date('2026-01-15T10:00:00Z'),
      },
      {
        _id: 'user-learner-1',
        id: 'user-learner-1',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@example.com',
        passwordHash: bcrypt.hashSync('Learner@12345', 10),
        role: 'learner',
        phone: '+91 98111 22334',
        location: 'Bengaluru, Karnataka',
        isActive: true,
        createdAt: new Date('2026-02-10T14:30:00Z'),
        updatedAt: new Date('2026-02-10T14:30:00Z'),
      },
      {
        _id: 'user-learner-2',
        id: 'user-learner-2',
        name: 'Pooja Iyer',
        email: 'pooja.iyer@example.com',
        passwordHash: bcrypt.hashSync('Learner@12345', 10),
        role: 'learner',
        phone: '+91 98222 33445',
        location: 'Chennai, Tamil Nadu',
        isActive: true,
        createdAt: new Date('2026-03-01T09:15:00Z'),
        updatedAt: new Date('2026-03-01T09:15:00Z'),
      },
      {
        _id: 'user-artisan-1',
        id: 'user-artisan-1',
        name: 'Smt. Dulari Devi',
        email: 'dulari.madhubani@jeevantindia.org',
        passwordHash: bcrypt.hashSync('Artisan@12345', 10),
        role: 'artisan',
        phone: '+91 98352 10842',
        location: 'Madhubani, Bihar',
        isActive: true,
        createdAt: new Date('2026-01-20T11:00:00Z'),
        updatedAt: new Date('2026-01-20T11:00:00Z'),
      },
      {
        _id: 'user-artisan-2',
        id: 'user-artisan-2',
        name: 'Kripal Singh Shekhawat Heritage Guild',
        email: 'jaipur.bluepottery@jeevantindia.org',
        passwordHash: bcrypt.hashSync('Artisan@12345', 10),
        role: 'artisan',
        phone: '+91 94140 38291',
        location: 'Jaipur, Rajasthan',
        isActive: true,
        createdAt: new Date('2026-01-25T16:00:00Z'),
        updatedAt: new Date('2026-01-25T16:00:00Z'),
      },
    ];

    // ─── 2. Master Artisans (12+ Artisans across 10+ States) ──────────────────
    this.artisans = [
      {
        _id: 'artisan-1',
        id: 'artisan-1',
        user: 'user-artisan-1',
        userId: 'user-artisan-1',
        name: 'Smt. Dulari Devi',
        email: 'dulari.madhubani@jeevantindia.org',
        phone: '+91 98352 10842',
        state: 'Bihar',
        city: 'Madhubani',
        district: 'Madhubani',
        region: 'Mithila Region, Bihar',
        craft: 'Madhubani Painting',
        tradition: 'trad-1',
        category: 'Traditional Painting',
        description: 'Renowned Mithila painter from Ranti village, specializing in the Kachni and Bharni styles. Has trained over 800 rural women in self-reliance through traditional art.',
        experience: '38 Years',
        giTagNumber: 'GI-IN-0012',
        aadhaarVerified: true,
        verificationStatus: 'approved',
        status: 'Verified',
        awards: 'Padma Shri (2021), National Master Craftsperson Award',
        rating: 4.95,
        reviewsCount: 142,
        workshopsConducted: 46,
        productsCount: 38,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-01-20T11:00:00Z'),
        updatedAt: new Date('2026-01-20T11:00:00Z'),
      },
      {
        _id: 'artisan-2',
        id: 'artisan-2',
        user: 'user-artisan-2',
        userId: 'user-artisan-2',
        name: 'Kripal Singh Shekhawat Heritage Guild',
        email: 'jaipur.bluepottery@jeevantindia.org',
        phone: '+91 94140 38291',
        state: 'Rajasthan',
        city: 'Jaipur',
        district: 'Jaipur',
        region: 'Jaipur, Rajasthan',
        craft: 'Blue Pottery',
        tradition: 'trad-5',
        category: 'Ceramics & Pottery',
        description: 'Preserving the Persian-origin quartz and fuller earth pottery of Jaipur without clay, fired using traditional kiln formulations with cobalt oxide.',
        experience: '32 Years',
        giTagNumber: 'GI-IN-0028',
        aadhaarVerified: true,
        verificationStatus: 'approved',
        status: 'Verified',
        awards: 'Shilp Guru Award, State Master Craftsperson',
        rating: 4.88,
        reviewsCount: 210,
        workshopsConducted: 54,
        productsCount: 64,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-01-25T16:00:00Z'),
        updatedAt: new Date('2026-01-25T16:00:00Z'),
      },
      {
        _id: 'artisan-3',
        id: 'artisan-3',
        name: 'Rabi Narayan Rath',
        email: 'rabi.pattachitra@jeevantindia.org',
        phone: '+91 97780 12450',
        state: 'Odisha',
        city: 'Puri',
        district: 'Puri',
        region: 'Raghurajpur Heritage Crafts Village, Odisha',
        craft: 'Pattachitra & Palm Leaf Engraving',
        tradition: 'trad-6',
        category: 'Scroll Painting & Engraving',
        description: '5th generation master Chitrakar from the heritage village of Raghurajpur. Expert in preparing hand-processed canvas with tamarind seed gum and chalk, using natural river-stone burnishers.',
        experience: '26 Years',
        giTagNumber: 'GI-IN-0044',
        aadhaarVerified: true,
        verificationStatus: 'pending',
        status: 'Pending',
        awards: 'State Craft Excellence Award (2018)',
        rating: 4.92,
        reviewsCount: 88,
        workshopsConducted: 22,
        productsCount: 29,
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-05T08:30:00Z'),
        updatedAt: new Date('2026-02-05T08:30:00Z'),
      },
      {
        _id: 'artisan-4',
        id: 'artisan-4',
        name: 'Khatri Abdul Rahim',
        email: 'abdul.ajrakh@jeevantindia.org',
        phone: '+91 98251 77340',
        state: 'Gujarat',
        city: 'Bhuj',
        district: 'Kutch',
        region: 'Dhamadka, Kutch, Gujarat',
        craft: 'Ajrakh Block Printing',
        tradition: 'trad-7',
        category: 'Textile Block Printing',
        description: 'Practicing the 16-stage resist block printing process using natural indigo, madder root, harda, and iron rust on handspun cotton.',
        experience: '29 Years',
        giTagNumber: 'GI-IN-0056',
        aadhaarVerified: true,
        verificationStatus: 'pending',
        status: 'Pending',
        awards: 'National Merit Certificate',
        rating: 4.8,
        reviewsCount: 65,
        workshopsConducted: 18,
        productsCount: 42,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-14T12:00:00Z'),
        updatedAt: new Date('2026-02-14T12:00:00Z'),
      },
      {
        _id: 'artisan-5',
        id: 'artisan-5',
        name: 'Mohd. Dilshad',
        email: 'dilshad.banarasi@jeevantindia.org',
        phone: '+91 94152 88102',
        state: 'Uttar Pradesh',
        city: 'Varanasi',
        district: 'Varanasi',
        region: 'Madanpura, Varanasi, Uttar Pradesh',
        craft: 'Banarasi Zari Brocade Weaving',
        tradition: 'trad-2',
        category: 'Handloom Textiles',
        description: 'Lineage pit-loom master weaver specializing in pure silver and gold zari brocade, Kadhwa weave, and intricate floral meenakari borders.',
        experience: '35 Years',
        giTagNumber: 'GI-IN-0099',
        aadhaarVerified: true,
        verificationStatus: 'approved',
        status: 'Verified',
        awards: 'Sant Kabir Award Nominee',
        rating: 4.9,
        reviewsCount: 175,
        workshopsConducted: 39,
        productsCount: 50,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-01-22T10:00:00Z'),
        updatedAt: new Date('2026-01-22T10:00:00Z'),
      },
      {
        _id: 'artisan-6',
        id: 'artisan-6',
        name: 'Gulam Nabi Dar',
        email: 'gulam.pashmina@jeevantindia.org',
        phone: '+91 94190 28419',
        state: 'Jammu & Kashmir',
        city: 'Srinagar',
        district: 'Srinagar',
        region: 'Downtown Srinagar, Kashmir',
        craft: 'Kani Pashmina Shawl Weaving',
        tradition: 'trad-8',
        category: 'Heritage Handlooms',
        description: 'Master artisan executing microscopic wooden spool needle-weaving (Kani) on Changthangi goat pashmina fibers.',
        experience: '40 Years',
        giTagNumber: 'GI-IN-0045',
        aadhaarVerified: true,
        verificationStatus: 'approved',
        status: 'Verified',
        awards: 'Padma Shri (2024)',
        rating: 4.98,
        reviewsCount: 220,
        workshopsConducted: 30,
        productsCount: 24,
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-01-18T10:00:00Z'),
        updatedAt: new Date('2026-01-18T10:00:00Z'),
      },
      {
        _id: 'artisan-7',
        id: 'artisan-7',
        name: 'Shah Rasheed Ahmed Quadri',
        email: 'quadri.bidriware@jeevantindia.org',
        phone: '+91 98450 12891',
        state: 'Karnataka',
        city: 'Bidar',
        district: 'Bidar',
        region: 'Bidar Heritage Cluster, Karnataka',
        craft: 'Bidriware Silver Inlay',
        tradition: 'trad-9',
        category: 'Metalcraft & Metallurgy',
        description: 'National Shilp Guru renowned for embedding pure 99.9% silver sheets and wires into blackened zinc-copper alloys oxidized with 15th-century Bidar Fort soil.',
        experience: '42 Years',
        giTagNumber: 'GI-IN-0010',
        aadhaarVerified: true,
        verificationStatus: 'approved',
        status: 'Verified',
        awards: 'Padma Shri (2023), Shilp Guru (2006)',
        rating: 4.96,
        reviewsCount: 190,
        workshopsConducted: 40,
        productsCount: 35,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-01-15T09:00:00Z'),
        updatedAt: new Date('2026-01-15T09:00:00Z'),
      },
      {
        _id: 'artisan-8',
        id: 'artisan-8',
        name: 'Suresh Kumar Sharma',
        email: 'suresh.kathputli@jeevantindia.org',
        phone: '+91 98290 41234',
        state: 'Rajasthan',
        city: 'Udaipur',
        district: 'Udaipur',
        region: 'Bhat Basti, Udaipur, Rajasthan',
        craft: 'Rajasthani Kathputli String Puppets',
        tradition: 'trad-10',
        category: 'Woodcraft & Puppetry',
        description: 'Carving traditional mango wood string puppets dressed in hand-stitched Gota Patti textiles, narrating Amar Singh Rathore folk sagas.',
        experience: '24 Years',
        giTagNumber: 'GI-IN-0210',
        aadhaarVerified: true,
        verificationStatus: 'approved',
        status: 'Verified',
        awards: 'Sangeet Natak Akademi Yuva Puraskar',
        rating: 4.82,
        reviewsCount: 94,
        workshopsConducted: 32,
        productsCount: 22,
        image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-01T10:00:00Z'),
        updatedAt: new Date('2026-02-01T10:00:00Z'),
      },
      {
        _id: 'artisan-9',
        id: 'artisan-9',
        name: 'Jivya Soma Mashe Guild',
        email: 'warli.heritage@jeevantindia.org',
        phone: '+91 98230 77123',
        state: 'Maharashtra',
        city: 'Dahanu',
        district: 'Palghar',
        region: 'Jawhar-Dahanu Tribal Belt, Maharashtra',
        craft: 'Warli Tribal Wall Art',
        tradition: 'trad-11',
        category: 'Folk Art & Wall Fresco',
        description: 'Indigenous geometric tribal murals painted with rice paste and gum on mud-cowdung plastered surfaces depicting Tarpa dance rituals.',
        experience: '30 Years',
        giTagNumber: 'GI-IN-0168',
        aadhaarVerified: true,
        verificationStatus: 'approved',
        status: 'Verified',
        awards: 'Tribal Master Heritage Distinction',
        rating: 4.89,
        reviewsCount: 110,
        workshopsConducted: 28,
        productsCount: 30,
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-08T11:00:00Z'),
        updatedAt: new Date('2026-02-08T11:00:00Z'),
      },
      {
        _id: 'artisan-10',
        id: 'artisan-10',
        name: 'Babu Rao Channapatna',
        email: 'channapatna.toys@jeevantindia.org',
        phone: '+91 98440 55192',
        state: 'Karnataka',
        city: 'Channapatna',
        district: 'Ramanagara',
        region: 'Channapatna Craft Town, Karnataka',
        craft: 'Channapatna Lacquerware Woodcraft',
        tradition: 'trad-12',
        category: 'Woodcraft & Lacquerware',
        description: 'Safe organic wooden toys hand-turned on lathe machines from Wrightia tinctoria (Aale mara) wood, coated with natural vegetable resin lac.',
        experience: '28 Years',
        giTagNumber: 'GI-IN-0016',
        aadhaarVerified: true,
        verificationStatus: 'approved',
        status: 'Verified',
        awards: 'Karnataka Rajyotsava Award',
        rating: 4.87,
        reviewsCount: 135,
        workshopsConducted: 26,
        productsCount: 40,
        image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-12T10:00:00Z'),
        updatedAt: new Date('2026-02-12T10:00:00Z'),
      },
      {
        _id: 'artisan-11',
        id: 'artisan-11',
        name: 'Ramanathan Achary',
        email: 'aranmula.mirror@jeevantindia.org',
        phone: '+91 94470 19823',
        state: 'Kerala',
        city: 'Aranmula',
        district: 'Pathanamthitta',
        region: 'Aranmula Heritage Village, Kerala',
        craft: 'Aranmula Kannadi Metal Mirror',
        tradition: 'trad-13',
        category: 'Metalcraft & Metallurgy',
        description: 'Alchemist family guild hand-casting front-surface reflective bronze mirrors without silvered glass, polished over days with velvet cloth.',
        experience: '36 Years',
        giTagNumber: 'GI-IN-0001',
        aadhaarVerified: true,
        verificationStatus: 'approved',
        status: 'Verified',
        awards: 'National Award for Master Craftsperson',
        rating: 4.97,
        reviewsCount: 160,
        workshopsConducted: 14,
        productsCount: 18,
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-15T09:00:00Z'),
        updatedAt: new Date('2026-02-15T09:00:00Z'),
      },
      {
        _id: 'artisan-12',
        id: 'artisan-12',
        name: 'Pranab Saikia',
        email: 'assam.muga@jeevantindia.org',
        phone: '+91 94350 71829',
        state: 'Assam',
        city: 'Sualkuchi',
        district: 'Kamrup',
        region: 'Sualkuchi Silk Village, Assam',
        craft: 'Assam Muga Golden Silk Weaving',
        tradition: 'trad-14',
        category: 'Handloom Textiles',
        description: 'Cultivating wild Antheraea assamensis silkworms and weaving naturally golden, ultra-durable Mekhela Chador bridal handlooms.',
        experience: '31 Years',
        giTagNumber: 'GI-IN-0055',
        aadhaarVerified: true,
        verificationStatus: 'pending',
        status: 'Pending',
        awards: 'Northeast Craft Icon Award',
        rating: 4.85,
        reviewsCount: 78,
        workshopsConducted: 16,
        productsCount: 22,
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-24T10:00:00Z'),
        updatedAt: new Date('2026-02-24T10:00:00Z'),
      },
    ];

    // ─── 3. Living Cultural Traditions (16 Traditions) ────────────────────────
    this.traditions = [
      {
        _id: 'trad-1',
        id: 'trad-1',
        title: 'Madhubani & Mithila Painting',
        name: 'Madhubani Painting',
        state: 'Bihar',
        category: 'Folk Art & Wall Fresco',
        description: 'Ancient ritualistic wall and canvas art practiced in the Mithila region. Traditionally made using fingers, twigs, brushes, and matchsticks with natural mineral and vegetable dyes.',
        history: 'Dating back to the Ramayana era when King Janaka commissioned artists to paint his daughter Sita’s wedding.',
        giStatus: 'Registered GI-IN-0012',
        riskLevel: 'Stable & Thriving',
        antiquity: '2,500+ Years',
        materials: 'Natural mineral pigments, twig pens, hand-beaten rice paper',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
        tags: ['Madhubani', 'Mithila', 'Folk Art', 'Bihar', 'GI-Tagged'],
        status: 'published',
        createdAt: new Date('2026-01-10T10:00:00Z'),
        updatedAt: new Date('2026-01-10T10:00:00Z'),
      },
      {
        _id: 'trad-2',
        id: 'trad-2',
        title: 'Banarasi Silk Weaving & Brocade',
        name: 'Banarasi Weaving',
        state: 'Uttar Pradesh',
        category: 'Handloom Textiles',
        description: 'Fine silk sarees renowned for gold and silver brocade (Zari), fine silk weave, and opulent Mughal-inspired floral engravings (Kalga and Bel).',
        history: 'Mentioned in ancient Buddhist literature and flourished under the patronage of Mughal Emperor Akbar.',
        giStatus: 'Registered GI-IN-0099',
        riskLevel: 'Stable & Thriving',
        antiquity: '1,000+ Years',
        materials: 'Mulberry silk, metallic gold & silver threads (Zari), wooden drawlooms',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
        tags: ['Banarasi', 'Silk Weaving', 'Zari', 'Varanasi', 'Uttar Pradesh'],
        status: 'published',
        createdAt: new Date('2026-01-12T10:00:00Z'),
        updatedAt: new Date('2026-01-12T10:00:00Z'),
      },
      {
        _id: 'trad-3',
        id: 'trad-3',
        title: 'Lucknowi Chikankari Embroidery',
        name: 'Chikankari',
        state: 'Uttar Pradesh',
        category: 'Textile Needlecraft',
        description: 'Delicate and artfully shadow needlecraft embroidery done on sheer fabrics like muslin, organza, and silk. Features 32 traditional stitches.',
        history: 'Introduced by Empress Nur Jahan in the Mughal court and nurtured under the Nawabs of Awadh.',
        giStatus: 'Registered GI-IN-0119',
        riskLevel: 'Vulnerable',
        antiquity: '400+ Years',
        materials: 'Cotton thread, fine mulmul cloth, needle carving blocks',
        image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80',
        tags: ['Chikankari', 'Awadh', 'Embroidery', 'Lucknow', 'Needlework'],
        status: 'published',
        createdAt: new Date('2026-01-15T10:00:00Z'),
        updatedAt: new Date('2026-01-15T10:00:00Z'),
      },
      {
        _id: 'trad-4',
        id: 'trad-4',
        title: 'Bastar Dhokra Lost-Wax Casting',
        name: 'Dhokra',
        state: 'Chhattisgarh',
        category: 'Tribal Metallurgy',
        description: 'Non-ferrous lost-wax metal casting using bell metal and beeswax coils. Primitive, rustic animal figures, tribal deities, and lamps.',
        history: 'One of the earliest known metal casting techniques, traceable back to the Dancing Girl of Mohenjo-Daro (~2500 BCE).',
        giStatus: 'Registered GI-IN-0082',
        riskLevel: 'Critically Endangered',
        antiquity: '4,000+ Years',
        materials: 'Bronze, brass scrap, natural beeswax, ant-hill clay, rice husk',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80',
        tags: ['Dhokra', 'Lost-Wax', 'Tribal Art', 'Bastar', 'Chhattisgarh'],
        status: 'published',
        createdAt: new Date('2026-01-18T10:00:00Z'),
        updatedAt: new Date('2026-01-18T10:00:00Z'),
      },
      {
        _id: 'trad-5',
        id: 'trad-5',
        title: 'Jaipur Blue Pottery Craft',
        name: 'Blue Pottery',
        state: 'Rajasthan',
        category: 'Non-Clay Quartz Ceramics',
        description: 'Traditional glazed pottery that uniquely uses no clay. Made from ground quartz, glass, multani mitti, and natural gum, decorated with cobalt oxide blue hues.',
        history: 'Persian craft introduced to Jaipur in the 17th century by Maharaja Sawai Ram Singh II.',
        giStatus: 'Registered GI-IN-0028',
        riskLevel: 'Vulnerable',
        antiquity: '350+ Years',
        materials: 'Powdered quartz stone, Fuller earth, cobalt oxide pigment, copper glaze',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80',
        tags: ['Blue Pottery', 'Jaipur', 'Quartz Ceramics', 'Rajasthan', 'Cobalt'],
        status: 'published',
        createdAt: new Date('2026-01-20T10:00:00Z'),
        updatedAt: new Date('2026-01-20T10:00:00Z'),
      },
      {
        _id: 'trad-6',
        id: 'trad-6',
        title: 'Odisha Pattachitra & Palm Leaf Etching',
        name: 'Pattachitra',
        state: 'Odisha',
        category: 'Scroll Painting & Engraving',
        description: 'Cloth-based scroll painting capturing mythological narratives, Jagannath temple rituals, and Gita Govinda verses with natural mineral pigments.',
        history: 'Dating back to the 5th century BCE in the sacred temple town of Puri.',
        giStatus: 'Registered GI-IN-0044',
        riskLevel: 'Stable & Thriving',
        antiquity: '1,200+ Years',
        materials: 'Cotton canvas, tamarind seed paste, chalk powder, conch shell white',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
        tags: ['Pattachitra', 'Odisha', 'Raghurajpur', 'Palm Leaf', 'Temple Art'],
        status: 'published',
        createdAt: new Date('2026-01-22T10:00:00Z'),
        updatedAt: new Date('2026-01-22T10:00:00Z'),
      },
      {
        _id: 'trad-7',
        id: 'trad-7',
        title: 'Kutch Ajrakh Resist Block Printing',
        name: 'Ajrakh Printing',
        state: 'Gujarat',
        category: 'Textile Block Printing',
        description: 'Complex 16-stage resist block printing technique using hand-carved teakwood blocks and natural indigo, madder root, and pomegranate peel.',
        history: 'Traced to the ancient Indus Valley Civilization and nurtured by the Khatri community of Kutch.',
        giStatus: 'Registered GI-IN-0056',
        riskLevel: 'Vulnerable',
        antiquity: '4,000+ Years',
        materials: 'Handspun cotton, natural indigo, madder root, carved teak blocks',
        image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80',
        tags: ['Ajrakh', 'Kutch', 'Block Print', 'Natural Indigo', 'Gujarat'],
        status: 'published',
        createdAt: new Date('2026-01-24T10:00:00Z'),
        updatedAt: new Date('2026-01-24T10:00:00Z'),
      },
      {
        _id: 'trad-8',
        id: 'trad-8',
        title: 'Kashmir Pashmina & Kani Weaving',
        name: 'Kashmiri Pashmina',
        state: 'Jammu & Kashmir',
        category: 'Heritage Handlooms',
        description: 'Ultra-fine Cashmere wool spun from the underfleece of high-altitude Changthangi goats, hand-woven with wooden needle spools (Tujis).',
        history: 'Patronized by Zain-ul-Abidin in the 15th century and European royalty in the 18th century.',
        giStatus: 'Registered GI-IN-0045',
        riskLevel: 'Endangered',
        antiquity: '600+ Years',
        materials: 'Changthangi Cashmere fibers, wooden Kani needles, handlooms',
        image: 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?w=600&auto=format&fit=crop&q=80',
        tags: ['Pashmina', 'Kashmir', 'Kani Shawl', 'Changthangi', 'Handloom'],
        status: 'published',
        createdAt: new Date('2026-01-26T10:00:00Z'),
        updatedAt: new Date('2026-01-26T10:00:00Z'),
      },
      {
        _id: 'trad-9',
        id: 'trad-9',
        title: 'Bidriware Silver Inlay Metallurgy',
        name: 'Bidriware',
        state: 'Karnataka',
        category: 'Metalcraft & Metallurgy',
        description: 'Inlaying pure silver wires and sheets into an alloy of zinc and copper, which is blackened using unique soil found only in the ruins of Bidar Fort.',
        history: 'Originated in the 14th century during the Bahmani Sultanate rule in Bidar.',
        giStatus: 'Registered GI-IN-0010',
        riskLevel: 'Critically Endangered',
        antiquity: '600+ Years',
        materials: 'Zinc, copper alloy, 99.9% pure silver wire, Bidar fort soil',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80',
        tags: ['Bidriware', 'Bidar', 'Silver Inlay', 'Karnataka', 'Alloy'],
        status: 'published',
        createdAt: new Date('2026-01-28T10:00:00Z'),
        updatedAt: new Date('2026-01-28T10:00:00Z'),
      },
      {
        _id: 'trad-10',
        id: 'trad-10',
        title: 'Rajasthani Kathputli String Puppetry',
        name: 'Kathputli Puppets',
        state: 'Rajasthan',
        category: 'Woodcraft & Puppetry',
        description: 'Traditional string puppet theater carved from indigenous mango wood and adorned in vivid bandhani and gota-patti fabrics.',
        history: 'Practiced by the nomadic Bhat community for over a millennium to narrate medieval heroism.',
        giStatus: 'Registered GI-IN-0210',
        riskLevel: 'Vulnerable',
        antiquity: '1,000+ Years',
        materials: 'Mango wood, natural lac paints, vintage textile scraps, cotton strings',
        image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=600&auto=format&fit=crop&q=80',
        tags: ['Kathputli', 'Puppets', 'Rajasthan', 'Folk Theater', 'Woodcraft'],
        status: 'published',
        createdAt: new Date('2026-01-30T10:00:00Z'),
        updatedAt: new Date('2026-01-30T10:00:00Z'),
      },
      {
        _id: 'trad-11',
        id: 'trad-11',
        title: 'Warli Tribal Geometric Murals',
        name: 'Warli Painting',
        state: 'Maharashtra',
        category: 'Folk Art & Wall Fresco',
        description: 'Rhythmic indigenous wall art using basic geometric shapes — circles, triangles, and squares — depicting mother nature and the Tarpa harvest dance.',
        history: 'One of the oldest tribal living traditions, dating back to 2500–3000 BCE.',
        giStatus: 'Registered GI-IN-0168',
        riskLevel: 'Stable & Thriving',
        antiquity: '4,500+ Years',
        materials: 'Rice flour paste, water, gum, bamboo twig brushes, red ochre mud',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80',
        tags: ['Warli', 'Maharashtra', 'Tribal Art', 'Folk Fresco', 'Rice Paste'],
        status: 'published',
        createdAt: new Date('2026-02-02T10:00:00Z'),
        updatedAt: new Date('2026-02-02T10:00:00Z'),
      },
      {
        _id: 'trad-12',
        id: 'trad-12',
        title: 'Channapatna Non-Toxic Lacquerware Toys',
        name: 'Channapatna Toys',
        state: 'Karnataka',
        category: 'Woodcraft & Lacquerware',
        description: 'Smooth, child-safe wooden toys and home decor handcrafted from ivory wood (Aale Mara) and finished with natural non-toxic vegetable dyes.',
        history: 'Tipu Sultan invited master artisans from Persia in the 18th century to train local craftsmen.',
        giStatus: 'Registered GI-IN-0016',
        riskLevel: 'Stable & Thriving',
        antiquity: '250+ Years',
        materials: 'Wrightia tinctoria ivory wood, natural lac resin, turmeric, indigo dyes',
        image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80',
        tags: ['Channapatna', 'Wooden Toys', 'Karnataka', 'Lacquerware', 'Non-Toxic'],
        status: 'published',
        createdAt: new Date('2026-02-04T10:00:00Z'),
        updatedAt: new Date('2026-02-04T10:00:00Z'),
      },
      {
        _id: 'trad-13',
        id: 'trad-13',
        title: 'Aranmula Kannadi Front-Surface Metal Mirror',
        name: 'Aranmula Mirror',
        state: 'Kerala',
        category: 'Metalcraft & Metallurgy',
        description: 'Flawless non-glass reflective mirrors cast from a secret sacred alloy of copper and tin, eliminating secondary reflection.',
        history: 'Preserved by eight lineage families of the Parthasarathy Temple for centuries.',
        giStatus: 'Registered GI-IN-0001',
        riskLevel: 'Critically Endangered',
        antiquity: '500+ Years',
        materials: 'Bell metal alloy (copper & tin), mud crucible, velvet polishing cloth',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
        tags: ['Aranmula', 'Kerala', 'Metal Mirror', 'Front Surface', 'GI-0001'],
        status: 'published',
        createdAt: new Date('2026-02-06T10:00:00Z'),
        updatedAt: new Date('2026-02-06T10:00:00Z'),
      },
      {
        _id: 'trad-14',
        id: 'trad-14',
        title: 'Assam Muga Golden Silk Handlooms',
        name: 'Assam Muga Silk',
        state: 'Assam',
        category: 'Handloom Textiles',
        description: 'Rare shimmering golden wild silk exclusive to the Brahmaputra valley, known for tensile strength that outlives the wearer.',
        history: 'Royal fabric of the Ahom dynasty for over 600 years.',
        giStatus: 'Registered GI-IN-0055',
        riskLevel: 'Vulnerable',
        antiquity: '800+ Years',
        materials: 'Muga silkworm cocoons, indigenous hand-throw shuttle looms',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
        tags: ['Muga Silk', 'Assam', 'Golden Silk', 'Sualkuchi', 'Handloom'],
        status: 'published',
        createdAt: new Date('2026-02-08T10:00:00Z'),
        updatedAt: new Date('2026-02-08T10:00:00Z'),
      },
      {
        _id: 'trad-15',
        id: 'trad-15',
        title: 'Kalamkari Hand-Painted Textile Scrolls',
        name: 'Kalamkari',
        state: 'Andhra Pradesh',
        category: 'Folk Art & Wall Fresco',
        description: 'Freehand bamboo pen drawing and block printing depicting Hindu epics, colored strictly using organic roots, myrobalan milk, and river water.',
        history: 'Flourished under the Golconda Sultanate and Vijayanagara Empire in Srikalahasti.',
        giStatus: 'Registered GI-IN-0018',
        riskLevel: 'Stable & Thriving',
        antiquity: '1,500+ Years',
        materials: 'Handwoven cotton, bamboo pen (kalam), buffalo milk, natural plant dyes',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
        tags: ['Kalamkari', 'Andhra Pradesh', 'Bamboo Pen', 'Natural Dyes', 'Textile Art'],
        status: 'published',
        createdAt: new Date('2026-02-10T10:00:00Z'),
        updatedAt: new Date('2026-02-10T10:00:00Z'),
      },
      {
        _id: 'trad-16',
        id: 'trad-16',
        title: 'Toda Tribal Red & Black Embroidery',
        name: 'Toda Embroidery',
        state: 'Tamil Nadu',
        category: 'Textile Needlecraft',
        description: 'Distinctive geometric count-stitch embroidery (Poothkuli) done exclusively by pastoral Toda women on unbleached white cotton shawls.',
        history: 'Practiced since antiquity in the sacred Nilgiri biosphere hills.',
        giStatus: 'Registered GI-IN-0135',
        riskLevel: 'Critically Endangered',
        antiquity: '1,000+ Years',
        materials: 'Coarse unbleached cotton fabric, black and red wool threads, darning needle',
        image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80',
        tags: ['Toda', 'Nilgiris', 'Tamil Nadu', 'Tribal Embroidery', 'Poothkuli'],
        status: 'published',
        createdAt: new Date('2026-02-12T10:00:00Z'),
        updatedAt: new Date('2026-02-12T10:00:00Z'),
      },
    ];

    // ─── 4. Fair-Trade Products (20+ Authentic GI Crafts) ─────────────────────
    this.products = [
      {
        _id: 'prod-001',
        id: 'prod-001',
        name: 'Mithila Kohbar Vivah Sacred Canvas',
        price: 7800,
        originalPrice: 9500,
        discount: 18,
        artisan: 'artisan-1',
        artisanId: 'artisan-1',
        artisanName: 'Smt. Dulari Devi',
        tradition: 'trad-1',
        traditionId: 'trad-1',
        category: 'Folk Art & Paintings',
        state: 'Bihar',
        district: 'Madhubani',
        region: 'Mithila, Bihar',
        stock: 4,
        rating: 4.95,
        reviewsCount: 38,
        giTagNumber: 'GI-IN-0012',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
        images: [
          'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
        ],
        description: 'Authentic Kachni style hand-drawn Kohbar motif on handmade rice paper treated with cow-dung wash. Painted using fine bamboo pens and natural pigments extracted from marigold petals, soot, and turmeric.',
        materials: ['Handmade rice paper', 'Bamboo nib pen', 'Vegetable and mineral extracts'],
        dimensions: '22 x 30 inches',
        weight: '450 grams',
        craftingTime: '21 Days of Handwork',
        status: 'available',
        featured: true,
        createdAt: new Date('2026-01-22T10:00:00Z'),
        updatedAt: new Date('2026-01-22T10:00:00Z'),
      },
      {
        _id: 'prod-002',
        id: 'prod-002',
        name: 'Jaipur Royal Blue Pottery Hexagonal Vase',
        price: 4850,
        originalPrice: 5800,
        discount: 16,
        artisan: 'artisan-2',
        artisanId: 'artisan-2',
        artisanName: 'Kripal Singh Shekhawat Heritage Guild',
        tradition: 'trad-5',
        traditionId: 'trad-5',
        category: 'Ceramics & Pottery',
        state: 'Rajasthan',
        district: 'Jaipur',
        region: 'Jaipur, Rajasthan',
        stock: 9,
        rating: 4.88,
        reviewsCount: 52,
        giTagNumber: 'GI-IN-0028',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80',
        images: [
          'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80',
        ],
        description: 'Glazed non-clay quartz ceramic vase adorned with cobalt floral arabesques and Persian bird motifs. Fired once in an open-wood updraft kiln.',
        materials: ['Ground quartz stone', 'Fuller earth', 'Cobalt oxide', 'Copper glaze'],
        dimensions: '14 x 6 x 6 inches',
        weight: '1.6 kg',
        craftingTime: '12 Days',
        status: 'available',
        featured: true,
        createdAt: new Date('2026-01-26T10:00:00Z'),
        updatedAt: new Date('2026-01-26T10:00:00Z'),
      },
      {
        _id: 'prod-003',
        id: 'prod-003',
        name: 'Banarasi Pure Kadhwa Zari Silk Saree',
        price: 24500,
        originalPrice: 29000,
        discount: 15,
        artisan: 'artisan-5',
        artisanId: 'artisan-5',
        artisanName: 'Mohd. Dilshad',
        tradition: 'trad-2',
        traditionId: 'trad-2',
        category: 'Heritage Handlooms',
        state: 'Uttar Pradesh',
        district: 'Varanasi',
        region: 'Varanasi, Uttar Pradesh',
        stock: 3,
        rating: 4.98,
        reviewsCount: 44,
        giTagNumber: 'GI-IN-0099',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
        images: [
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80',
        ],
        description: 'Magnificent bridal handloom woven on a wooden drawloom over 45 days. Every gold zari buta is hand-locked individually using the heirloom Kadhwa technique.',
        materials: ['100% Mulberry silk', 'Tested electroplated silver & gold zari'],
        dimensions: '6.5 meters with blouse piece',
        weight: '820 grams',
        craftingTime: '45 Days of Handloom Weaving',
        status: 'available',
        featured: true,
        createdAt: new Date('2026-01-28T10:00:00Z'),
        updatedAt: new Date('2026-01-28T10:00:00Z'),
      },
      {
        _id: 'prod-004',
        id: 'prod-004',
        name: 'Bidriware Silver Teardrop Aftaba Pitcher',
        price: 11200,
        originalPrice: 13500,
        discount: 17,
        artisan: 'artisan-7',
        artisanId: 'artisan-7',
        artisanName: 'Shah Rasheed Ahmed Quadri',
        tradition: 'trad-9',
        traditionId: 'trad-9',
        category: 'Metalcraft & Metallurgy',
        state: 'Karnataka',
        district: 'Bidar',
        region: 'Bidar, Karnataka',
        stock: 2,
        rating: 4.96,
        reviewsCount: 29,
        giTagNumber: 'GI-IN-0010',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80',
        images: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80',
        ],
        description: 'Imperial decorative ceremonial pitcher. 99.9% pure silver inlay chiseled into a zinc-copper alloy vessel, blackened using ancient Bidar Fort earthen salts.',
        materials: ['Zinc alloy', '99.9% Pure Silver Wire', 'Bidar Fort Soil'],
        dimensions: '11 x 5 inches',
        weight: '1.2 kg',
        craftingTime: '18 Days',
        status: 'available',
        featured: true,
        createdAt: new Date('2026-02-01T10:00:00Z'),
        updatedAt: new Date('2026-02-01T10:00:00Z'),
      },
      {
        _id: 'prod-005',
        id: 'prod-005',
        name: 'Kashmir Hand-Spun Pashmina Sozni Stole',
        price: 18900,
        originalPrice: 22000,
        discount: 14,
        artisan: 'artisan-6',
        artisanId: 'artisan-6',
        artisanName: 'Gulam Nabi Dar',
        tradition: 'trad-8',
        traditionId: 'trad-8',
        category: 'Heritage Handlooms',
        state: 'Jammu & Kashmir',
        district: 'Srinagar',
        region: 'Srinagar, Kashmir',
        stock: 5,
        rating: 4.97,
        reviewsCount: 31,
        giTagNumber: 'GI-IN-0045',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1528458876861-544fd1761a91?w=600&auto=format&fit=crop&q=80'],
        description: 'Featherlight 100% Pashmina stole hand-spun on a traditional Charkha and embellished with microscopic Sozni floral needlework embroidery.',
        materials: ['Pure Changthangi Pashmina wool', 'Silk embroidery threads'],
        dimensions: '80 x 28 inches',
        weight: '160 grams',
        craftingTime: '30 Days',
        status: 'available',
        featured: true,
        createdAt: new Date('2026-02-03T10:00:00Z'),
        updatedAt: new Date('2026-02-03T10:00:00Z'),
      },
      {
        _id: 'prod-006',
        id: 'prod-006',
        name: 'Bastar Lost-Wax Dhokra Tribal Bull Idol',
        price: 5200,
        originalPrice: 6200,
        discount: 16,
        artisan: 'artisan-3',
        artisanId: 'artisan-3',
        artisanName: 'Rabi Narayan Rath',
        tradition: 'trad-4',
        traditionId: 'trad-4',
        category: 'Metalcraft & Metallurgy',
        state: 'Chhattisgarh',
        district: 'Bastar',
        region: 'Bastar, Chhattisgarh',
        stock: 7,
        rating: 4.88,
        reviewsCount: 19,
        giTagNumber: 'GI-IN-0082',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80'],
        description: 'Lost-wax cast bell metal statuette of the Nandi bull crafted by Bastar forest artisans using beeswax thread coils over an ant-hill clay core.',
        materials: ['Recycled bronze & brass', 'Forest beeswax', 'Anthill clay'],
        dimensions: '8 x 7 x 4 inches',
        weight: '1.4 kg',
        craftingTime: '10 Days',
        status: 'available',
        featured: false,
        createdAt: new Date('2026-02-05T10:00:00Z'),
        updatedAt: new Date('2026-02-05T10:00:00Z'),
      },
      {
        _id: 'prod-007',
        id: 'prod-007',
        name: 'Kutch Natural Indigo Ajrakh Cotton Dupatta',
        price: 2950,
        originalPrice: 3500,
        discount: 15,
        artisan: 'artisan-4',
        artisanId: 'artisan-4',
        artisanName: 'Khatri Abdul Rahim',
        tradition: 'trad-7',
        traditionId: 'trad-7',
        category: 'Heritage Handlooms',
        state: 'Gujarat',
        district: 'Kutch',
        region: 'Kutch, Gujarat',
        stock: 14,
        rating: 4.84,
        reviewsCount: 42,
        giTagNumber: 'GI-IN-0056',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80'],
        description: 'Hand block-printed modal silk dupatta dyed across 16 stages using organic indigo leaf extract, rust iron solution, and madder root.',
        materials: ['Pure handloom cotton', 'Natural fermented indigo', 'Madder root'],
        dimensions: '2.5 meters',
        weight: '240 grams',
        craftingTime: '14 Days',
        status: 'available',
        featured: false,
        createdAt: new Date('2026-02-08T10:00:00Z'),
        updatedAt: new Date('2026-02-08T10:00:00Z'),
      },
      {
        _id: 'prod-008',
        id: 'prod-008',
        name: 'Raghurajpur Palm Leaf Engraved Dashavatara',
        price: 6400,
        originalPrice: 7500,
        discount: 14,
        artisan: 'artisan-3',
        artisanId: 'artisan-3',
        artisanName: 'Rabi Narayan Rath',
        tradition: 'trad-6',
        traditionId: 'trad-6',
        category: 'Folk Art & Paintings',
        state: 'Odisha',
        district: 'Puri',
        region: 'Puri, Odisha',
        stock: 6,
        rating: 4.93,
        reviewsCount: 27,
        giTagNumber: 'GI-IN-0044',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80'],
        description: 'Dried palmyra leaves seasoned in turmeric water, stitched with thread and engraved with an iron stylus illustrating Lord Vishnu’s ten avatars, blackened with bean paste.',
        materials: ['Palmyra palm leaves', 'Iron needle stylus', 'Lamp black soot'],
        dimensions: '18 x 14 inches',
        weight: '320 grams',
        craftingTime: '16 Days',
        status: 'available',
        featured: true,
        createdAt: new Date('2026-02-10T10:00:00Z'),
        updatedAt: new Date('2026-02-10T10:00:00Z'),
      },
      {
        _id: 'prod-009',
        id: 'prod-009',
        name: 'Channapatna Eco-Wooden Stacking Tower',
        price: 1450,
        originalPrice: 1800,
        discount: 19,
        artisan: 'artisan-10',
        artisanId: 'artisan-10',
        artisanName: 'Babu Rao Channapatna',
        tradition: 'trad-12',
        traditionId: 'trad-12',
        category: 'Woodcraft & Lacquerware',
        state: 'Karnataka',
        district: 'Ramanagara',
        region: 'Channapatna, Karnataka',
        stock: 25,
        rating: 4.88,
        reviewsCount: 68,
        giTagNumber: 'GI-IN-0016',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80'],
        description: 'Vibrant organic stacking toy set hand-turned on wooden lathes. Coloured naturally with vegetable resins and polished with talc leaf.',
        materials: ['Ivory wood (Wrightia tinctoria)', 'Natural lac', 'Turmeric dye'],
        dimensions: '9 x 4.5 inches',
        weight: '550 grams',
        craftingTime: '3 Days',
        status: 'available',
        featured: false,
        createdAt: new Date('2026-02-12T10:00:00Z'),
        updatedAt: new Date('2026-02-12T10:00:00Z'),
      },
      {
        _id: 'prod-010',
        id: 'prod-010',
        name: 'Aranmula Sacred Handcrafted Metal Mirror (Valkannadi)',
        price: 16500,
        originalPrice: 19000,
        discount: 13,
        artisan: 'artisan-11',
        artisanId: 'artisan-11',
        artisanName: 'Ramanathan Achary',
        tradition: 'trad-13',
        traditionId: 'trad-13',
        category: 'Metalcraft & Metallurgy',
        state: 'Kerala',
        district: 'Pathanamthitta',
        region: 'Aranmula, Kerala',
        stock: 3,
        rating: 4.99,
        reviewsCount: 35,
        giTagNumber: 'GI-IN-0001',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80'],
        description: 'Authentic front-reflection bronze handheld mirror cast in Kerala temple tradition. Cast in solid brass frame with intricate filigree peacock handles.',
        materials: ['Sacred copper-tin alloy', 'Solid brass handle', 'Velvet polishing cloth'],
        dimensions: '10 x 5 inches',
        weight: '680 grams',
        craftingTime: '25 Days of Casting & Polishing',
        status: 'available',
        featured: true,
        createdAt: new Date('2026-02-14T10:00:00Z'),
        updatedAt: new Date('2026-02-14T10:00:00Z'),
      },
      {
        _id: 'prod-011',
        id: 'prod-011',
        name: 'Warli Tarpa Harvest Festival Mud Canvas',
        price: 3600,
        originalPrice: 4200,
        discount: 14,
        artisan: 'artisan-9',
        artisanId: 'artisan-9',
        artisanName: 'Jivya Soma Mashe Guild',
        tradition: 'trad-11',
        traditionId: 'trad-11',
        category: 'Folk Art & Paintings',
        state: 'Maharashtra',
        district: 'Palghar',
        region: 'Palghar, Maharashtra',
        stock: 8,
        rating: 4.87,
        reviewsCount: 33,
        giTagNumber: 'GI-IN-0168',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80'],
        description: 'Framed ritual canvas painted in rice paste over a treated terracotta and cow dung base, depicting village folk dancing in spirals around the Tarpa player.',
        materials: ['Handloom canvas', 'Rice paste', 'Acacia gum', 'Geru clay'],
        dimensions: '20 x 20 inches',
        weight: '600 grams',
        craftingTime: '8 Days',
        status: 'available',
        featured: false,
        createdAt: new Date('2026-02-16T10:00:00Z'),
        updatedAt: new Date('2026-02-16T10:00:00Z'),
      },
      {
        _id: 'prod-012',
        id: 'prod-012',
        name: 'Assam Muga Golden Silk Mekhela Chador',
        price: 28000,
        originalPrice: 32500,
        discount: 13,
        artisan: 'artisan-12',
        artisanId: 'artisan-12',
        artisanName: 'Pranab Saikia',
        tradition: 'trad-14',
        traditionId: 'trad-14',
        category: 'Heritage Handlooms',
        state: 'Assam',
        district: 'Kamrup',
        region: 'Sualkuchi, Assam',
        stock: 2,
        rating: 4.94,
        reviewsCount: 22,
        giTagNumber: 'GI-IN-0055',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80'],
        description: 'Heirloom two-piece traditional Assamese attire hand-woven from wild golden Muga silk with traditional red Kingkhap (lion and peacock) motif borders.',
        materials: ['100% Wild Muga golden silk', 'Eri silk motifs'],
        dimensions: 'Standard Mekhela (2.4m) + Chador (2.8m)',
        weight: '900 grams',
        craftingTime: '35 Days',
        status: 'available',
        featured: true,
        createdAt: new Date('2026-02-18T10:00:00Z'),
        updatedAt: new Date('2026-02-18T10:00:00Z'),
      },
      {
        _id: 'prod-013',
        id: 'prod-013',
        name: 'Srikalahasti Tree of Life Kalamkari Hanging',
        price: 8500,
        originalPrice: 9800,
        discount: 13,
        artisan: 'artisan-1',
        artisanId: 'artisan-1',
        artisanName: 'Smt. Dulari Devi',
        tradition: 'trad-15',
        traditionId: 'trad-15',
        category: 'Folk Art & Paintings',
        state: 'Andhra Pradesh',
        district: 'Tirupati',
        region: 'Srikalahasti, Andhra Pradesh',
        stock: 5,
        rating: 4.91,
        reviewsCount: 30,
        giTagNumber: 'GI-IN-0018',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80'],
        description: 'Tapestry wall hanging rendered with tamarind twig pens and washed in the sacred Swarnamukhi river water. Rich organic indigo and madder reds.',
        materials: ['Handspun organic cotton', 'Bamboo stylus', 'River milk wash'],
        dimensions: '36 x 24 inches',
        weight: '480 grams',
        craftingTime: '18 Days',
        status: 'available',
        featured: false,
        createdAt: new Date('2026-02-20T10:00:00Z'),
        updatedAt: new Date('2026-02-20T10:00:00Z'),
      },
      {
        _id: 'prod-014',
        id: 'prod-014',
        name: 'Rajasthani Royal Kathputli Pair (Raja & Rani)',
        price: 2100,
        originalPrice: 2600,
        discount: 19,
        artisan: 'artisan-8',
        artisanId: 'artisan-8',
        artisanName: 'Suresh Kumar Sharma',
        tradition: 'trad-10',
        traditionId: 'trad-10',
        category: 'Woodcraft & Puppetry',
        state: 'Rajasthan',
        district: 'Udaipur',
        region: 'Udaipur, Rajasthan',
        stock: 12,
        rating: 4.86,
        reviewsCount: 47,
        giTagNumber: 'GI-IN-0210',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=600&auto=format&fit=crop&q=80'],
        description: 'Pair of traditional handcrafted wooden string puppets representing royal Rajput folklore, embellished in vibrant gota borders and sequin turbans.',
        materials: ['Mango wood', 'Vintage fabric', 'Gota patti', 'Brass bells'],
        dimensions: '20 inches height each',
        weight: '750 grams pair',
        craftingTime: '5 Days',
        status: 'available',
        featured: false,
        createdAt: new Date('2026-02-22T10:00:00Z'),
        updatedAt: new Date('2026-02-22T10:00:00Z'),
      },
      {
        _id: 'prod-015',
        id: 'prod-015',
        name: 'Lucknowi Hand-Embroidered Georgette Kurta Set',
        price: 6800,
        originalPrice: 8200,
        discount: 17,
        artisan: 'artisan-5',
        artisanId: 'artisan-5',
        artisanName: 'Mohd. Dilshad',
        tradition: 'trad-3',
        traditionId: 'trad-3',
        category: 'Heritage Handlooms',
        state: 'Uttar Pradesh',
        district: 'Lucknow',
        region: 'Lucknow, Uttar Pradesh',
        stock: 7,
        rating: 4.92,
        reviewsCount: 39,
        giTagNumber: 'GI-IN-0119',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80'],
        description: 'Artisanal sheer kurta hand-embroidered with Bakhiya (shadow work), Phanda, and Keel Kangan stitches by women artisans of Old Lucknow.',
        materials: ['Viscose georgette', 'Fine cotton embroidery thread'],
        dimensions: 'Custom sizing S - XXL',
        weight: '320 grams',
        craftingTime: '15 Days',
        status: 'available',
        featured: false,
        createdAt: new Date('2026-02-24T10:00:00Z'),
        updatedAt: new Date('2026-02-24T10:00:00Z'),
      },
      {
        _id: 'prod-016',
        id: 'prod-016',
        name: 'Toda Hand-Embroidered Tribal Poothkuli Shawl',
        price: 9400,
        originalPrice: 11000,
        discount: 14,
        artisan: 'artisan-11',
        artisanId: 'artisan-11',
        artisanName: 'Ramanathan Achary',
        tradition: 'trad-16',
        traditionId: 'trad-16',
        category: 'Heritage Handlooms',
        state: 'Tamil Nadu',
        district: 'Nilgiris',
        region: 'Nilgiris, Tamil Nadu',
        stock: 3,
        rating: 4.96,
        reviewsCount: 16,
        giTagNumber: 'GI-IN-0135',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80'],
        description: 'Coarse handspun cotton ceremonial mantle intricately embroidered with geometric black and red wool bands by Toda tribal women.',
        materials: ['Unbleached cotton', 'Pure wool threads'],
        dimensions: '2 x 1.2 meters',
        weight: '620 grams',
        craftingTime: '28 Days',
        status: 'available',
        featured: false,
        createdAt: new Date('2026-02-26T10:00:00Z'),
        updatedAt: new Date('2026-02-26T10:00:00Z'),
      },
      {
        _id: 'prod-017',
        id: 'prod-017',
        name: 'Jaipur Turquoise Blue Pottery Serving Bowl',
        price: 2400,
        originalPrice: 2900,
        discount: 17,
        artisan: 'artisan-2',
        artisanId: 'artisan-2',
        artisanName: 'Kripal Singh Shekhawat Heritage Guild',
        tradition: 'trad-5',
        traditionId: 'trad-5',
        category: 'Ceramics & Pottery',
        state: 'Rajasthan',
        district: 'Jaipur',
        region: 'Jaipur, Rajasthan',
        stock: 15,
        rating: 4.85,
        reviewsCount: 40,
        giTagNumber: 'GI-IN-0028',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80'],
        description: 'Hand-painted turquoise fruit and salad bowl decorated with lotus petal motifs in cobalt and copper oxide hues.',
        materials: ['Ground quartz', 'Fuller earth', 'Copper glaze'],
        dimensions: '8 inches diameter, 3.5 inches depth',
        weight: '900 grams',
        craftingTime: '6 Days',
        status: 'available',
        featured: false,
        createdAt: new Date('2026-02-28T10:00:00Z'),
        updatedAt: new Date('2026-02-28T10:00:00Z'),
      },
      {
        _id: 'prod-018',
        id: 'prod-018',
        name: 'Bastar Dhokra Lost-Wax Diya Oil Lamp',
        price: 3400,
        originalPrice: 4000,
        discount: 15,
        artisan: 'artisan-3',
        artisanId: 'artisan-3',
        artisanName: 'Rabi Narayan Rath',
        tradition: 'trad-4',
        traditionId: 'trad-4',
        category: 'Metalcraft & Metallurgy',
        state: 'Chhattisgarh',
        district: 'Bastar',
        region: 'Bastar, Chhattisgarh',
        stock: 9,
        rating: 4.89,
        reviewsCount: 25,
        giTagNumber: 'GI-IN-0082',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80'],
        description: 'Seven-wick traditional peacock lamp cast in bell metal using ancient tribal wax-thread coils.',
        materials: ['Bell metal', 'Beeswax', 'Clay core'],
        dimensions: '9 x 6 x 6 inches',
        weight: '1.1 kg',
        craftingTime: '9 Days',
        status: 'available',
        featured: false,
        createdAt: new Date('2026-03-01T10:00:00Z'),
        updatedAt: new Date('2026-03-01T10:00:00Z'),
      },
      {
        _id: 'prod-019',
        id: 'prod-019',
        name: 'Mithila Matsya (Fish Fertility) Miniature',
        price: 2800,
        originalPrice: 3400,
        discount: 17,
        artisan: 'artisan-1',
        artisanId: 'artisan-1',
        artisanName: 'Smt. Dulari Devi',
        tradition: 'trad-1',
        traditionId: 'trad-1',
        category: 'Folk Art & Paintings',
        state: 'Bihar',
        district: 'Madhubani',
        region: 'Madhubani, Bihar',
        stock: 11,
        rating: 4.93,
        reviewsCount: 36,
        giTagNumber: 'GI-IN-0012',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'],
        description: 'Bharni style miniature painting symbolizing fertility, prosperity, and cosmic abundance with vibrant natural dyes on handmade paper.',
        materials: ['Handmade rag paper', 'Natural berry and soot pigments'],
        dimensions: '12 x 16 inches',
        weight: '250 grams',
        craftingTime: '7 Days',
        status: 'available',
        featured: false,
        createdAt: new Date('2026-03-03T10:00:00Z'),
        updatedAt: new Date('2026-03-03T10:00:00Z'),
      },
      {
        _id: 'prod-020',
        id: 'prod-020',
        name: 'Bidriware Floral Silver Inlay Coaster Set (6 pcs)',
        price: 4900,
        originalPrice: 5800,
        discount: 15,
        artisan: 'artisan-7',
        artisanId: 'artisan-7',
        artisanName: 'Shah Rasheed Ahmed Quadri',
        tradition: 'trad-9',
        traditionId: 'trad-9',
        category: 'Metalcraft & Metallurgy',
        state: 'Karnataka',
        district: 'Bidar',
        region: 'Bidar, Karnataka',
        stock: 8,
        rating: 4.95,
        reviewsCount: 28,
        giTagNumber: 'GI-IN-0010',
        isGiCertified: true,
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80'],
        description: 'Set of 6 handcrafted metallic drink coasters with embedded pure silver floral wirework and velvety non-scratch bottoms.',
        materials: ['Blackened zinc-copper alloy', '99.9% fine silver wire'],
        dimensions: '3.5 inches diameter each',
        weight: '580 grams set',
        craftingTime: '10 Days',
        status: 'available',
        featured: false,
        createdAt: new Date('2026-03-05T10:00:00Z'),
        updatedAt: new Date('2026-03-05T10:00:00Z'),
      },
    ];

    // ─── 5. Workshops (10+ Masterclasses with dynamic seats) ───────────────────
    this.workshops = [
      {
        _id: 'ws-1',
        id: 'ws-1',
        title: 'Mastering Mithila: Kachni & Bharni Lineage Painting',
        artisan: 'artisan-1',
        artisanId: 'artisan-1',
        artisanName: 'Smt. Dulari Devi',
        tradition: 'trad-1',
        traditionId: 'trad-1',
        craft: 'Madhubani Painting',
        state: 'Bihar',
        description: 'Deep-dive 2-day virtual residency exploring sacred Kohbar motifs, bamboo pen handling, and extracting natural pigments from marigold and indigo leaves.',
        mode: 'Live Virtual',
        location: 'Live Interactive Studio (Zoom HD)',
        date: '18 Sep 2026',
        time: '10:00 AM - 01:00 PM IST',
        price: 899,
        fee: '₹899',
        capacity: 35,
        seatsTotal: 35,
        enrolled: 29,
        seatsBooked: 29,
        availableSeats: 6,
        status: 'Upcoming',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-01T10:00:00Z'),
        updatedAt: new Date('2026-02-01T10:00:00Z'),
      },
      {
        _id: 'ws-2',
        id: 'ws-2',
        title: 'Royal Blue Pottery of Amer: Non-Clay Formulation',
        artisan: 'artisan-2',
        artisanId: 'artisan-2',
        artisanName: 'Kripal Singh Shekhawat Heritage Guild',
        tradition: 'trad-5',
        traditionId: 'trad-5',
        craft: 'Blue Pottery',
        state: 'Rajasthan',
        description: 'Studio masterclass on crafting quartz dough, traditional brush hand-painting with Egyptian blue and cobalt, followed by low-temperature wood kiln firing.',
        mode: 'In-Person',
        location: 'Heritage Pottery Guild, Sanganer, Jaipur',
        date: '25 Sep 2026',
        time: '11:00 AM - 04:00 PM IST',
        price: 1850,
        fee: '₹1,850',
        capacity: 20,
        seatsTotal: 20,
        enrolled: 20,
        seatsBooked: 20,
        availableSeats: 0,
        status: 'Full',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-05T10:00:00Z'),
        updatedAt: new Date('2026-02-05T10:00:00Z'),
      },
      {
        _id: 'ws-3',
        id: 'ws-3',
        title: 'Banarasi Brocade & Zari Weave Appreciation',
        artisan: 'artisan-5',
        artisanId: 'artisan-5',
        artisanName: 'Mohd. Dilshad',
        tradition: 'trad-2',
        traditionId: 'trad-2',
        craft: 'Banarasi Weaving',
        state: 'Uttar Pradesh',
        description: 'An interactive seminar tracing how pure gold zari motifs are hand-drafted on naksha pattern cards and hand-loomed over months by veteran weavers.',
        mode: 'Live Virtual',
        location: 'Online Webinar Studio',
        date: '02 Oct 2026',
        time: '04:00 PM - 06:30 PM IST',
        price: 0,
        fee: 'Free',
        capacity: 100,
        seatsTotal: 100,
        enrolled: 74,
        seatsBooked: 74,
        availableSeats: 26,
        status: 'Upcoming',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-10T10:00:00Z'),
        updatedAt: new Date('2026-02-10T10:00:00Z'),
      },
      {
        _id: 'ws-4',
        id: 'ws-4',
        title: 'Bastar Lost-Wax Tribal Metallurgy Workshop',
        artisan: 'artisan-3',
        artisanId: 'artisan-3',
        artisanName: 'Rabi Narayan Rath',
        tradition: 'trad-4',
        traditionId: 'trad-4',
        craft: 'Dhokra Metal Casting',
        state: 'Chhattisgarh',
        description: 'A 3-day experiential workshop learning wax strand twisting, clay mold packing, and molten brass pouring over open charcoal fire.',
        mode: 'Hybrid Residency',
        location: 'Shilpgram Craft Village, Jagdalpur',
        date: '10 Oct 2026',
        time: '09:00 AM - 05:00 PM IST',
        price: 3200,
        fee: '₹3,200',
        capacity: 15,
        seatsTotal: 15,
        enrolled: 8,
        seatsBooked: 8,
        availableSeats: 7,
        status: 'Upcoming',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-15T10:00:00Z'),
        updatedAt: new Date('2026-02-15T10:00:00Z'),
      },
      {
        _id: 'ws-5',
        id: 'ws-5',
        title: 'Bidriware Silver Inlay: Techniques of Bahmani Masters',
        artisan: 'artisan-7',
        artisanId: 'artisan-7',
        artisanName: 'Shah Rasheed Ahmed Quadri',
        tradition: 'trad-9',
        traditionId: 'trad-9',
        craft: 'Bidriware Inlay',
        state: 'Karnataka',
        description: 'Hands-on training in chiseling zinc-copper plates and wire-inlaying fine silver motifs, ending with the live alchemy of soil blackening.',
        mode: 'In-Person',
        location: 'National Bidri Art Centre, Bidar',
        date: '14 Oct 2026',
        time: '10:00 AM - 03:30 PM IST',
        price: 2400,
        fee: '₹2,400',
        capacity: 18,
        seatsTotal: 18,
        enrolled: 11,
        seatsBooked: 11,
        availableSeats: 7,
        status: 'Upcoming',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-18T10:00:00Z'),
        updatedAt: new Date('2026-02-18T10:00:00Z'),
      },
      {
        _id: 'ws-6',
        id: 'ws-6',
        title: 'Kani Pashmina: The Art of Kashmiri Tujis Needle Spools',
        artisan: 'artisan-6',
        artisanId: 'artisan-6',
        artisanName: 'Gulam Nabi Dar',
        tradition: 'trad-8',
        traditionId: 'trad-8',
        craft: 'Pashmina Weaving',
        state: 'Jammu & Kashmir',
        description: 'Learn the micro-weaving codes (Talim script) and handling 100+ needle spools simultaneously from a Padma Shri master.',
        mode: 'Live Virtual',
        location: 'Online Virtual Residency',
        date: '20 Oct 2026',
        time: '02:00 PM - 05:00 PM IST',
        price: 1200,
        fee: '₹1,200',
        capacity: 40,
        seatsTotal: 40,
        enrolled: 28,
        seatsBooked: 28,
        availableSeats: 12,
        status: 'Upcoming',
        image: 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?w=500&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-20T10:00:00Z'),
        updatedAt: new Date('2026-02-20T10:00:00Z'),
      },
      {
        _id: 'ws-7',
        id: 'ws-7',
        title: 'Ajrakh 16-Stage Natural Dyeing & Block Printing',
        artisan: 'artisan-4',
        artisanId: 'artisan-4',
        artisanName: 'Khatri Abdul Rahim',
        tradition: 'trad-7',
        traditionId: 'trad-7',
        craft: 'Ajrakh Printing',
        state: 'Gujarat',
        description: 'Examine mordants, resist pastings, and dipping in ancestral indigo fermentation pits at Kutch craft clusters.',
        mode: 'In-Person',
        location: 'Khamir Craft Centre, Bhuj',
        date: '28 Oct 2026',
        time: '09:30 AM - 04:30 PM IST',
        price: 2100,
        fee: '₹2,100',
        capacity: 25,
        seatsTotal: 25,
        enrolled: 19,
        seatsBooked: 19,
        availableSeats: 6,
        status: 'Upcoming',
        image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-22T10:00:00Z'),
        updatedAt: new Date('2026-02-22T10:00:00Z'),
      },
      {
        _id: 'ws-8',
        id: 'ws-8',
        title: 'Channapatna Woodturning & Natural Lacquer Finishing',
        artisan: 'artisan-10',
        artisanId: 'artisan-10',
        artisanName: 'Babu Rao Channapatna',
        tradition: 'trad-12',
        traditionId: 'trad-12',
        craft: 'Channapatna Toys',
        state: 'Karnataka',
        description: 'Hands-on wood lathe turning using soft ivory wood, friction lacquering with turmeric and katha sticks.',
        mode: 'In-Person',
        location: 'Artisan Workshop, Channapatna',
        date: '05 Nov 2026',
        time: '10:00 AM - 02:00 PM IST',
        price: 950,
        fee: '₹950',
        capacity: 20,
        seatsTotal: 20,
        enrolled: 15,
        seatsBooked: 15,
        availableSeats: 5,
        status: 'Upcoming',
        image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-25T10:00:00Z'),
        updatedAt: new Date('2026-02-25T10:00:00Z'),
      },
      {
        _id: 'ws-9',
        id: 'ws-9',
        title: 'Warli Sacred Geometry & Tarpa Dance Murals',
        artisan: 'artisan-9',
        artisanId: 'artisan-9',
        artisanName: 'Jivya Soma Mashe Guild',
        tradition: 'trad-11',
        traditionId: 'trad-11',
        craft: 'Warli Painting',
        state: 'Maharashtra',
        description: 'Learn ancient tribal symbolism, rhythm circles, and rendering with rice paste on cow-dung treated canvases.',
        mode: 'Live Virtual',
        location: 'Online Live Interactive Studio',
        date: '12 Nov 2026',
        time: '11:00 AM - 01:30 PM IST',
        price: 499,
        fee: '₹499',
        capacity: 50,
        seatsTotal: 50,
        enrolled: 38,
        seatsBooked: 38,
        availableSeats: 12,
        status: 'Upcoming',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-28T10:00:00Z'),
        updatedAt: new Date('2026-02-28T10:00:00Z'),
      },
      {
        _id: 'ws-10',
        id: 'ws-10',
        title: 'Pattachitra Palm Leaf Etching & Natural Mineral Grinding',
        artisan: 'artisan-3',
        artisanId: 'artisan-3',
        artisanName: 'Rabi Narayan Rath',
        tradition: 'trad-6',
        traditionId: 'trad-6',
        craft: 'Pattachitra',
        state: 'Odisha',
        description: 'Preparing the palm leaf canvas, handling the iron needle, and grinding conch shell white and lamp soot.',
        mode: 'Hybrid Residency',
        location: 'Raghurajpur Heritage Craft Village, Puri',
        date: '18 Nov 2026',
        time: '09:00 AM - 04:00 PM IST',
        price: 1950,
        fee: '₹1,950',
        capacity: 15,
        seatsTotal: 15,
        enrolled: 12,
        seatsBooked: 12,
        availableSeats: 3,
        status: 'Upcoming',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-03-02T10:00:00Z'),
        updatedAt: new Date('2026-03-02T10:00:00Z'),
      },
    ];

    // ─── 6. Bookings (Workshop Admissions) ────────────────────────────────────
    this.bookings = [
      {
        _id: 'bk-1',
        id: 'bk-1',
        user: 'user-learner-1',
        userId: 'user-learner-1',
        userName: 'Aarav Sharma',
        userEmail: 'aarav.sharma@example.com',
        userPhone: '+91 98111 22334',
        workshop: 'ws-1',
        workshopId: 'ws-1',
        workshopTitle: 'Mastering Mithila: Kachni & Bharni Lineage Painting',
        artisan: 'artisan-1',
        artisanId: 'artisan-1',
        artisanName: 'Smt. Dulari Devi',
        seats: 1,
        totalAmount: 899,
        date: '18 Sep 2026',
        time: '10:00 AM - 01:00 PM IST',
        location: 'Live Interactive Studio (Zoom HD)',
        bookingReference: 'JVT-PASS-91823',
        status: 'confirmed',
        paymentStatus: 'paid',
        createdAt: new Date('2026-03-01T10:00:00Z'),
        updatedAt: new Date('2026-03-01T10:00:00Z'),
      },
      {
        _id: 'bk-2',
        id: 'bk-2',
        user: 'user-learner-2',
        userId: 'user-learner-2',
        userName: 'Pooja Iyer',
        userEmail: 'pooja.iyer@example.com',
        userPhone: '+91 98222 33445',
        workshop: 'ws-2',
        workshopId: 'ws-2',
        workshopTitle: 'Royal Blue Pottery of Amer: Non-Clay Formulation',
        artisan: 'artisan-2',
        artisanId: 'artisan-2',
        artisanName: 'Kripal Singh Shekhawat Heritage Guild',
        seats: 1,
        totalAmount: 1850,
        date: '25 Sep 2026',
        time: '11:00 AM - 04:00 PM IST',
        location: 'Heritage Pottery Guild, Sanganer, Jaipur',
        bookingReference: 'JVT-PASS-91824',
        status: 'confirmed',
        paymentStatus: 'paid',
        createdAt: new Date('2026-03-03T11:30:00Z'),
        updatedAt: new Date('2026-03-03T11:30:00Z'),
      },
    ];

    // ─── 7. Orders (E-Commerce Fair-Trade Purchases) ───────────────────────────
    this.orders = [
      {
        _id: 'ord-1',
        id: 'ord-1',
        orderNumber: 'ORD-2026-9182',
        user: 'user-learner-1',
        userId: 'user-learner-1',
        userName: 'Aarav Sharma',
        userEmail: 'aarav.sharma@example.com',
        items: [
          {
            product: 'prod-002',
            productId: 'prod-002',
            name: 'Jaipur Royal Blue Pottery Hexagonal Vase',
            price: 4850,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80',
            artisanName: 'Kripal Singh Shekhawat Heritage Guild',
            artisanId: 'artisan-2',
            state: 'Rajasthan',
            giTag: 'GI-IN-0028',
          },
        ],
        itemsCount: 1,
        subtotal: 4850,
        platformFee: 0,
        shippingFee: 0,
        totalAmount: 4850,
        directArtisanPayout: 4850,
        shippingAddress: {
          fullName: 'Aarav Sharma',
          addressLine: 'Flat 402, Heritage Residency, Indiranagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038',
          phone: '+91 98111 22334',
        },
        paymentMethod: 'Direct DBT / UPI',
        paymentStatus: 'paid',
        status: 'delivered',
        createdAt: new Date('2026-03-02T14:20:00Z'),
        updatedAt: new Date('2026-03-02T14:20:00Z'),
      },
      {
        _id: 'ord-2',
        id: 'ord-2',
        orderNumber: 'ORD-2026-9183',
        user: 'user-learner-2',
        userId: 'user-learner-2',
        userName: 'Pooja Iyer',
        userEmail: 'pooja.iyer@example.com',
        items: [
          {
            product: 'prod-001',
            productId: 'prod-001',
            name: 'Mithila Kohbar Vivah Sacred Canvas',
            price: 7800,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
            artisanName: 'Smt. Dulari Devi',
            artisanId: 'artisan-1',
            state: 'Bihar',
            giTag: 'GI-IN-0012',
          },
        ],
        itemsCount: 1,
        subtotal: 7800,
        platformFee: 0,
        shippingFee: 0,
        totalAmount: 7800,
        directArtisanPayout: 7800,
        shippingAddress: {
          fullName: 'Pooja Iyer',
          addressLine: '12 Alwarpet High Road',
          city: 'Chennai',
          state: 'Tamil Nadu',
          pincode: '600018',
          phone: '+91 98222 33445',
        },
        paymentMethod: 'Direct DBT / UPI',
        paymentStatus: 'paid',
        status: 'processing',
        createdAt: new Date('2026-03-05T16:15:00Z'),
        updatedAt: new Date('2026-03-05T16:15:00Z'),
      },
    ];

    // ─── 8. Saved Cultures (Bookmarked Traditions) ────────────────────────────
    this.savedCultures = [
      {
        _id: 'sc-1',
        id: 'sc-1',
        user: 'user-learner-1',
        userId: 'user-learner-1',
        tradition: 'trad-1',
        traditionId: 'trad-1',
        traditionName: 'Madhubani & Mithila Painting',
        state: 'Bihar',
        category: 'Folk Art & Wall Fresco',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-15T10:00:00Z'),
      },
      {
        _id: 'sc-2',
        id: 'sc-2',
        user: 'user-learner-1',
        userId: 'user-learner-1',
        tradition: 'trad-5',
        traditionId: 'trad-5',
        traditionName: 'Jaipur Blue Pottery Craft',
        state: 'Rajasthan',
        category: 'Non-Clay Quartz Ceramics',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-20T10:00:00Z'),
      },
      {
        _id: 'sc-3',
        id: 'sc-3',
        user: 'user-learner-2',
        userId: 'user-learner-2',
        tradition: 'trad-9',
        traditionId: 'trad-9',
        traditionName: 'Bidriware Silver Inlay Metallurgy',
        state: 'Karnataka',
        category: 'Metalcraft & Metallurgy',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80',
        createdAt: new Date('2026-02-22T10:00:00Z'),
      },
    ];

    // ─── 9. Reviews ───────────────────────────────────────────────────────────
    this.reviews = [
      {
        _id: 'rev-1',
        id: 'rev-1',
        user: 'user-learner-1',
        reviewer: 'user-learner-1',
        reviewerName: 'Aarav Sharma',
        artisan: 'artisan-1',
        target: 'Madhubani Kachni Masterclass',
        rating: 5,
        comment: 'Learning the sacred geometry of the Kohbar motif directly from Smt. Dulari Devi was a deeply spiritual experience. The GI certification documents and natural pigment kit provided were genuine.',
        sentiment: 'Positive (99.2%)',
        status: 'published',
        createdAt: new Date('2026-02-20T11:00:00Z'),
        updatedAt: new Date('2026-02-20T11:00:00Z'),
      },
      {
        _id: 'rev-2',
        id: 'rev-2',
        user: 'user-learner-2',
        reviewer: 'user-learner-2',
        reviewerName: 'Pooja Iyer',
        artisan: 'artisan-2',
        target: 'Jaipur Blue Pottery Studio',
        rating: 5,
        comment: 'Zero clay, 100% genuine quartz formulation! Master Shekhawat shared four generations of cobalt glaze alchemy. Extraordinary heritage preservation effort.',
        sentiment: 'Positive (98.4%)',
        status: 'published',
        createdAt: new Date('2026-02-22T14:00:00Z'),
        updatedAt: new Date('2026-02-22T14:00:00Z'),
      },
      {
        _id: 'rev-3',
        id: 'rev-3',
        user: 'user-learner-1',
        reviewer: 'user-learner-1',
        reviewerName: 'Aarav Sharma',
        artisan: 'artisan-2',
        product: 'prod-002',
        target: 'Cobalt Floral Tea Set',
        rating: 4,
        comment: 'Packaging arrived without a single scratch in recyclable coir padding. The GI registration QR code scanned directly to the government registry database.',
        sentiment: 'Positive (94.1%)',
        status: 'published',
        createdAt: new Date('2026-02-25T16:00:00Z'),
        updatedAt: new Date('2026-02-25T16:00:00Z'),
      },
    ];

    // ─── 10. Payments & DBT Ledger ────────────────────────────────────────────
    this.payments = [
      {
        _id: 'pay-1',
        id: 'TXN-DBT-9021',
        transactionId: 'TXN-DBT-9021',
        user: 'user-learner-1',
        workshop: 'ws-1',
        artisan: 'artisan-1',
        artisanName: 'Smt. Dulari Devi',
        craft: 'Madhubani Painting',
        account: 'SBI •••• 4018',
        amount: 42800,
        grossAmount: '₹42,800',
        netPayout: '₹42,800',
        fairPlatformFee: '₹0 (0% SIH Model)',
        payoutMethod: 'Direct DBT / UPI',
        paymentStatus: 'completed',
        status: 'Disbursed',
        createdAt: new Date('2026-02-20T11:05:00Z'),
        updatedAt: new Date('2026-02-20T11:05:00Z'),
      },
      {
        _id: 'pay-2',
        id: 'TXN-DBT-9022',
        transactionId: 'TXN-DBT-9022',
        user: 'user-learner-2',
        workshop: 'ws-2',
        artisan: 'artisan-2',
        artisanName: 'Kripal Singh Shekhawat Heritage Guild',
        craft: 'Blue Pottery',
        account: 'PNB •••• 1928',
        amount: 67500,
        grossAmount: '₹67,500',
        netPayout: '₹67,500',
        fairPlatformFee: '₹0 (0% SIH Model)',
        payoutMethod: 'NEFT Direct',
        paymentStatus: 'completed',
        status: 'Disbursed',
        createdAt: new Date('2026-02-22T14:10:00Z'),
        updatedAt: new Date('2026-02-22T14:10:00Z'),
      },
      {
        _id: 'pay-3',
        id: 'TXN-DBT-9023',
        transactionId: 'TXN-DBT-9023',
        user: 'user-learner-1',
        workshop: 'ws-4',
        artisan: 'artisan-3',
        artisanName: 'Bastar Lost-Wax Guild',
        craft: 'Dhokra Metal Casting',
        account: 'BOB •••• 8192',
        amount: 25600,
        grossAmount: '₹25,600',
        netPayout: '₹25,600',
        fairPlatformFee: '₹0 (0% SIH Model)',
        payoutMethod: 'Direct DBT / UPI',
        paymentStatus: 'pending',
        status: 'Processing',
        createdAt: new Date('2026-02-28T16:00:00Z'),
        updatedAt: new Date('2026-02-28T16:00:00Z'),
      },
    ];

    // ─── 11. Reports & Moderation ─────────────────────────────────────────────
    this.reports = [
      {
        _id: 'rep-1',
        id: 'rep-1',
        reportedBy: 'user-learner-1',
        reportedByName: 'Aarav Sharma',
        type: 'artisan',
        targetType: 'artisan',
        targetId: 'artisan-1',
        targetTitle: 'Commercial Print Reseller Flagged',
        reason: 'Misleading Information',
        description: 'An external e-commerce seller is using Smt. Dulari Devi’s GI registration certificate photo to sell cheap machine prints. Please issue digital legal notice.',
        status: 'under_review',
        createdAt: new Date('2026-02-18T10:00:00Z'),
        updatedAt: new Date('2026-02-18T10:00:00Z'),
      },
      {
        _id: 'rep-2',
        id: 'rep-2',
        reportedBy: 'user-learner-2',
        reportedByName: 'Pooja Iyer',
        type: 'review',
        targetType: 'review',
        targetId: 'rev-3',
        targetTitle: 'Duplicate Feedback Entry',
        reason: 'Spam',
        description: 'User accidentally posted duplicate feedback twice due to network latency.',
        status: 'resolved',
        resolutionNote: 'Reviewed and duplicate record dismissed.',
        resolvedAt: new Date('2026-02-19T15:00:00Z'),
        createdAt: new Date('2026-02-19T12:00:00Z'),
        updatedAt: new Date('2026-02-19T15:00:00Z'),
      },
    ];
  }

  // ─── Helper: Pagination ───────────────────────────────────────────────────
  paginate(list, page = 1, limit = 12) {
    const p = Math.max(1, parseInt(page, 10) || 1);
    const l = Math.max(1, parseInt(limit, 10) || 12);
    const total = list.length;
    const totalPages = Math.ceil(total / l) || 1;
    const startIndex = (p - 1) * l;
    const data = list.slice(startIndex, startIndex + l);

    return {
      data,
      pagination: {
        page: p,
        limit: l,
        total,
        totalPages,
      },
    };
  }

  // ─── Products ─────────────────────────────────────────────────────────────
  getProducts(query = {}) {
    let list = [...this.products];

    if (query.category && query.category !== 'All') {
      const qCat = query.category.toLowerCase();
      list = list.filter((p) => (p.category || '').toLowerCase().includes(qCat));
    }
    if (query.state && query.state !== 'All') {
      const qState = query.state.toLowerCase();
      list = list.filter((p) => (p.state || '').toLowerCase().includes(qState));
    }
    if (query.artisanId) {
      list = list.filter((p) => p.artisan === query.artisanId || p.artisanId === query.artisanId);
    }
    if (query.minPrice !== undefined && query.minPrice !== '') {
      const min = Number(query.minPrice);
      if (!isNaN(min)) list = list.filter((p) => p.price >= min);
    }
    if (query.maxPrice !== undefined && query.maxPrice !== '') {
      const max = Number(query.maxPrice);
      if (!isNaN(max)) list = list.filter((p) => p.price <= max);
    }
    if (query.giOnly === 'true' || query.giOnly === true) {
      list = list.filter((p) => Boolean(p.isGiCertified || p.giTagNumber));
    }
    if (query.search) {
      const qSearch = query.search.toLowerCase();
      list = list.filter((p) =>
        (p.name || '').toLowerCase().includes(qSearch) ||
        (p.description || '').toLowerCase().includes(qSearch) ||
        (p.category || '').toLowerCase().includes(qSearch) ||
        (p.state || '').toLowerCase().includes(qSearch) ||
        (p.artisanName || '').toLowerCase().includes(qSearch)
      );
    }

    // Sorting
    if (query.sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (query.sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (query.sort === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return this.paginate(list, query.page, query.limit);
  }

  getProductById(id) {
    return this.products.find((p) => p._id === id || p.id === id);
  }

  createProduct(data) {
    const newProduct = {
      _id: `prod-${Date.now()}`,
      id: `prod-${Date.now()}`,
      stock: 10,
      rating: 5.0,
      reviewsCount: 0,
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProduct(id, data) {
    const idx = this.products.findIndex((p) => p._id === id || p.id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...data, updatedAt: new Date() };
    return this.products[idx];
  }

  deleteProduct(id) {
    const prevLen = this.products.length;
    this.products = this.products.filter((p) => p._id !== id && p.id !== id);
    return this.products.length < prevLen;
  }

  // ─── Artisans ─────────────────────────────────────────────────────────────
  getArtisans(query = {}) {
    let list = [...this.artisans];
    if (query.status && query.status !== 'All') {
      const qStatus = query.status.toLowerCase();
      list = list.filter((a) => {
        const s = (a.verificationStatus || a.status || '').toLowerCase();
        if (qStatus === 'verified' || qStatus === 'approved') {
          return s === 'verified' || s === 'approved';
        }
        return s === qStatus;
      });
    }
    if (query.state && query.state !== 'All') {
      const qState = query.state.toLowerCase();
      list = list.filter((a) => (a.state || '').toLowerCase().includes(qState));
    }
    if (query.craft && query.craft !== 'All') {
      const qCraft = query.craft.toLowerCase();
      list = list.filter((a) => (a.craft || '').toLowerCase().includes(qCraft));
    }
    if (query.giOnly === 'true' || query.giOnly === true) {
      list = list.filter((a) => Boolean(a.giTagNumber));
    }
    if (query.search) {
      const qSearch = query.search.toLowerCase();
      list = list.filter((a) =>
        (a.name || '').toLowerCase().includes(qSearch) ||
        (a.craft || '').toLowerCase().includes(qSearch) ||
        (a.state || '').toLowerCase().includes(qSearch) ||
        (a.city || '').toLowerCase().includes(qSearch) ||
        (a.giTagNumber || '').toLowerCase().includes(qSearch)
      );
    }

    return this.paginate(list, query.page, query.limit);
  }

  getArtisanById(id) {
    return this.artisans.find((a) => a._id === id || a.id === id);
  }

  createArtisan(data) {
    const newArtisan = {
      _id: `artisan-${Date.now()}`,
      id: `artisan-${Date.now()}`,
      verificationStatus: 'pending',
      status: 'Pending',
      rating: 5.0,
      reviewsCount: 0,
      workshopsConducted: 0,
      productsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    this.artisans.unshift(newArtisan);
    return newArtisan;
  }

  updateArtisan(id, data) {
    const idx = this.artisans.findIndex((a) => a._id === id || a.id === id);
    if (idx === -1) return null;
    this.artisans[idx] = { ...this.artisans[idx], ...data, updatedAt: new Date() };
    return this.artisans[idx];
  }

  approveArtisan(id, note = 'Approved by admin audit') {
    return this.updateArtisan(id, {
      verificationStatus: 'approved',
      status: 'Verified',
      verifiedAt: new Date(),
      verificationNote: note,
    });
  }

  rejectArtisan(id, note = 'Application rejected by admin audit') {
    return this.updateArtisan(id, {
      verificationStatus: 'rejected',
      status: 'Rejected',
      verifiedAt: new Date(),
      verificationNote: note,
    });
  }

  deleteArtisan(id) {
    const prevLen = this.artisans.length;
    this.artisans = this.artisans.filter((a) => a._id !== id && a.id !== id);
    return this.artisans.length < prevLen;
  }

  // ─── Traditions ───────────────────────────────────────────────────────────
  getTraditions(query = {}) {
    let list = [...this.traditions];
    if (query.state && query.state !== 'All') {
      const qState = query.state.toLowerCase();
      list = list.filter((t) => (t.state || '').toLowerCase().includes(qState));
    }
    if (query.category && query.category !== 'All') {
      const qCat = query.category.toLowerCase();
      list = list.filter((t) => (t.category || '').toLowerCase().includes(qCat));
    }
    if (query.riskLevel && query.riskLevel !== 'All') {
      const qRisk = query.riskLevel.toLowerCase();
      list = list.filter((t) => (t.riskLevel || '').toLowerCase().includes(qRisk));
    }
    if (query.search) {
      const qSearch = query.search.toLowerCase();
      list = list.filter((t) =>
        (t.title || t.name || '').toLowerCase().includes(qSearch) ||
        (t.state || '').toLowerCase().includes(qSearch) ||
        (t.category || '').toLowerCase().includes(qSearch) ||
        (t.description || '').toLowerCase().includes(qSearch)
      );
    }

    return this.paginate(list, query.page, query.limit);
  }

  getTraditionById(id) {
    return this.traditions.find((t) => t._id === id || t.id === id);
  }

  createTradition(data) {
    const newTradition = {
      _id: `trad-${Date.now()}`,
      id: `trad-${Date.now()}`,
      name: data.title || data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    this.traditions.unshift(newTradition);
    return newTradition;
  }

  updateTradition(id, data) {
    const idx = this.traditions.findIndex((t) => t._id === id || t.id === id);
    if (idx === -1) return null;
    this.traditions[idx] = { ...this.traditions[idx], ...data, updatedAt: new Date() };
    return this.traditions[idx];
  }

  deleteTradition(id) {
    const prevLen = this.traditions.length;
    this.traditions = this.traditions.filter((t) => t._id !== id && t.id !== id);
    return this.traditions.length < prevLen;
  }

  // ─── Workshops ────────────────────────────────────────────────────────────
  getWorkshops(query = {}) {
    let list = [...this.workshops];
    if (query.status && query.status !== 'All') {
      const qStatus = query.status.toLowerCase();
      list = list.filter((w) => (w.status || '').toLowerCase().includes(qStatus));
    }
    if (query.mode && query.mode !== 'All') {
      const qMode = query.mode.toLowerCase();
      list = list.filter((w) => (w.mode || '').toLowerCase().includes(qMode));
    }
    if (query.craft && query.craft !== 'All') {
      const qCraft = query.craft.toLowerCase();
      list = list.filter((w) => (w.craft || '').toLowerCase().includes(qCraft));
    }
    if (query.state && query.state !== 'All') {
      const qState = query.state.toLowerCase();
      list = list.filter((w) => (w.state || '').toLowerCase().includes(qState));
    }
    if (query.artisan) {
      list = list.filter((w) => w.artisan === query.artisan || w.artisanId === query.artisan);
    }
    if (query.search) {
      const qSearch = query.search.toLowerCase();
      list = list.filter((w) =>
        (w.title || '').toLowerCase().includes(qSearch) ||
        (w.craft || '').toLowerCase().includes(qSearch) ||
        (w.artisanName || '').toLowerCase().includes(qSearch) ||
        (w.location || '').toLowerCase().includes(qSearch)
      );
    }

    return this.paginate(list, query.page, query.limit);
  }

  getWorkshopById(id) {
    return this.workshops.find((w) => w._id === id || w.id === id);
  }

  createWorkshop(data) {
    const cap = Number(data.capacity || data.seatsTotal || 30);
    const newWs = {
      _id: `ws-${Date.now()}`,
      id: `ws-${Date.now()}`,
      capacity: cap,
      seatsTotal: cap,
      seatsBooked: 0,
      enrolled: 0,
      availableSeats: cap,
      status: 'Upcoming',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    this.workshops.unshift(newWs);
    return newWs;
  }

  updateWorkshop(id, data) {
    const idx = this.workshops.findIndex((w) => w._id === id || w.id === id);
    if (idx === -1) return null;
    this.workshops[idx] = { ...this.workshops[idx], ...data, updatedAt: new Date() };
    return this.workshops[idx];
  }

  deleteWorkshop(id) {
    const prevLen = this.workshops.length;
    this.workshops = this.workshops.filter((w) => w._id !== id && w.id !== id);
    return this.workshops.length < prevLen;
  }

  // ─── Bookings ─────────────────────────────────────────────────────────────
  getBookings(query = {}) {
    let list = [...this.bookings];
    if (query.userId) {
      list = list.filter((b) => b.userId === query.userId || b.user === query.userId);
    }
    if (query.workshopId) {
      list = list.filter((b) => b.workshopId === query.workshopId || b.workshop === query.workshopId);
    }
    return this.paginate(list, query.page, query.limit);
  }

  getBookingById(id) {
    return this.bookings.find((b) => b._id === id || b.id === id || b.bookingReference === id);
  }

  createBooking(data) {
    const workshop = this.getWorkshopById(data.workshopId || data.workshop);
    if (!workshop) {
      throw new Error('Workshop not found');
    }

    const seatsToBook = Number(data.seats || 1);
    const available = workshop.availableSeats !== undefined
      ? workshop.availableSeats
      : (workshop.capacity || 30) - (workshop.enrolled || 0);

    if (available < seatsToBook) {
      throw new Error(`Only ${available} seat(s) remaining for this workshop.`);
    }

    // Decrement available seats and increment booked
    workshop.enrolled = (workshop.enrolled || 0) + seatsToBook;
    workshop.seatsBooked = workshop.enrolled;
    workshop.availableSeats = Math.max(0, available - seatsToBook);
    if (workshop.availableSeats === 0) {
      workshop.status = 'Full';
    }

    const bookingRef = `JVT-PASS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking = {
      _id: `bk-${Date.now()}`,
      id: `bk-${Date.now()}`,
      bookingReference: bookingRef,
      workshopTitle: workshop.title,
      artisanName: workshop.artisanName || 'Master Artisan',
      date: workshop.date,
      time: workshop.time,
      location: workshop.location,
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
      seats: seatsToBook,
    };

    this.bookings.unshift(newBooking);

    // Record DBT payout transaction
    this.createPayment({
      user: newBooking.user || newBooking.userId,
      workshop: workshop._id,
      artisan: workshop.artisan || workshop.artisanId,
      artisanName: workshop.artisanName,
      craft: workshop.craft,
      amount: newBooking.totalAmount,
      grossAmount: `₹${newBooking.totalAmount}`,
      netPayout: `₹${newBooking.totalAmount}`,
      payoutMethod: 'Direct DBT / UPI',
      status: 'Disbursed',
    });

    return newBooking;
  }

  cancelBooking(id) {
    const booking = this.getBookingById(id);
    if (!booking) return null;
    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    booking.updatedAt = new Date();

    // Restore workshop seats
    const workshop = this.getWorkshopById(booking.workshopId || booking.workshop);
    if (workshop) {
      const seats = Number(booking.seats || 1);
      workshop.enrolled = Math.max(0, (workshop.enrolled || 0) - seats);
      workshop.seatsBooked = workshop.enrolled;
      workshop.availableSeats = (workshop.capacity || 30) - workshop.enrolled;
      if (workshop.availableSeats > 0 && workshop.status === 'Full') {
        workshop.status = 'Upcoming';
      }
    }

    return booking;
  }

  // ─── Orders ───────────────────────────────────────────────────────────────
  getOrders(query = {}) {
    let list = [...this.orders];
    if (query.userId) {
      list = list.filter((o) => o.userId === query.userId || o.user === query.userId);
    }
    return this.paginate(list, query.page, query.limit);
  }

  getOrderById(id) {
    return this.orders.find((o) => o._id === id || o.id === id || o.orderNumber === id);
  }

  createOrder(data) {
    const orderNum = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      _id: `ord-${Date.now()}`,
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      status: 'processing',
      paymentStatus: 'paid',
      platformFee: 0,
      shippingFee: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
      directArtisanPayout: data.totalAmount,
    };

    this.orders.unshift(newOrder);

    // Create DBT payout ledger entry for the artisan
    const primaryItem = (newOrder.items && newOrder.items[0]) || {};
    this.createPayment({
      user: newOrder.user || newOrder.userId,
      artisan: primaryItem.artisanId,
      artisanName: primaryItem.artisanName || 'Master Craftsperson',
      craft: primaryItem.name,
      amount: newOrder.totalAmount,
      grossAmount: `₹${newOrder.totalAmount.toLocaleString('en-IN')}`,
      netPayout: `₹${newOrder.totalAmount.toLocaleString('en-IN')}`,
      payoutMethod: 'Direct DBT / UPI',
      status: 'Disbursed',
    });

    return newOrder;
  }

  updateOrderStatus(id, status) {
    const order = this.getOrderById(id);
    if (!order) return null;
    order.status = status;
    order.updatedAt = new Date();
    return order;
  }

  // ─── Saved Cultures ───────────────────────────────────────────────────────
  getSavedCultures(query = {}) {
    let list = [...this.savedCultures];
    if (query.userId) {
      list = list.filter((s) => s.userId === query.userId || s.user === query.userId);
    }
    return this.paginate(list, query.page, query.limit);
  }

  toggleSavedCulture(userId, traditionId) {
    const idx = this.savedCultures.findIndex(
      (s) => (s.userId === userId || s.user === userId) && (s.traditionId === traditionId || s.tradition === traditionId)
    );

    if (idx !== -1) {
      this.savedCultures.splice(idx, 1);
      return { saved: false, traditionId };
    }

    const tradition = this.getTraditionById(traditionId);
    const newSaved = {
      _id: `sc-${Date.now()}`,
      id: `sc-${Date.now()}`,
      userId,
      user: userId,
      traditionId,
      tradition: traditionId,
      traditionName: tradition ? (tradition.title || tradition.name) : 'Cultural Tradition',
      state: tradition ? tradition.state : '',
      category: tradition ? tradition.category : '',
      image: tradition ? tradition.image : '',
      createdAt: new Date(),
    };
    this.savedCultures.unshift(newSaved);
    return { saved: true, data: newSaved };
  }

  // ─── Global Search ────────────────────────────────────────────────────────
  search(query = '') {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      return {
        artisans: this.artisans.slice(0, 4),
        products: this.products.slice(0, 4),
        workshops: this.workshops.slice(0, 4),
        traditions: this.traditions.slice(0, 4),
        stories: [],
      };
    }

    const matchedArtisans = this.artisans.filter(
      (a) =>
        (a.name || '').toLowerCase().includes(q) ||
        (a.craft || '').toLowerCase().includes(q) ||
        (a.state || '').toLowerCase().includes(q) ||
        (a.city || '').toLowerCase().includes(q) ||
        (a.giTagNumber || '').toLowerCase().includes(q)
    );

    const matchedProducts = this.products.filter(
      (p) =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.state || '').toLowerCase().includes(q) ||
        (p.artisanName || '').toLowerCase().includes(q)
    );

    const matchedWorkshops = this.workshops.filter(
      (w) =>
        (w.title || '').toLowerCase().includes(q) ||
        (w.craft || '').toLowerCase().includes(q) ||
        (w.artisanName || '').toLowerCase().includes(q) ||
        (w.location || '').toLowerCase().includes(q)
    );

    const matchedTraditions = this.traditions.filter(
      (t) =>
        (t.title || t.name || '').toLowerCase().includes(q) ||
        (t.state || '').toLowerCase().includes(q) ||
        (t.category || '').toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q)
      );

    return {
      artisans: matchedArtisans,
      products: matchedProducts,
      workshops: matchedWorkshops,
      traditions: matchedTraditions,
      stories: [],
    };
  }

  // ─── Users ────────────────────────────────────────────────────────────────
  getUsers(query = {}) {
    let list = [...this.users];
    if (query.role && query.role !== 'All') {
      const qRole = query.role.toLowerCase();
      list = list.filter((u) => (u.role || '').toLowerCase().includes(qRole));
    }
    if (query.isActive !== undefined) {
      const activeBool = query.isActive === 'true';
      list = list.filter((u) => u.isActive === activeBool);
    }
    if (query.search) {
      const qSearch = query.search.toLowerCase();
      list = list.filter(
        (u) =>
          (u.name || '').toLowerCase().includes(qSearch) ||
          (u.email || '').toLowerCase().includes(qSearch) ||
          (u.location || '').toLowerCase().includes(qSearch)
      );
    }
    return this.paginate(list, query.page, query.limit);
  }

  getUserById(id) {
    return this.users.find((u) => u._id === id || u.id === id);
  }

  getUserByEmail(email) {
    if (!email) return null;
    return this.users.find((u) => (u.email || '').toLowerCase() === email.toLowerCase());
  }

  createUser(data) {
    const newUser = {
      _id: `user-${Date.now()}`,
      id: `user-${Date.now()}`,
      role: 'learner',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, data) {
    const idx = this.users.findIndex((u) => u._id === id || u.id === id);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...data, updatedAt: new Date() };
    return this.users[idx];
  }

  deleteUser(id) {
    const prevLen = this.users.length;
    this.users = this.users.filter((u) => u._id !== id && u.id !== id);
    return this.users.length < prevLen;
  }

  // ─── Reviews ──────────────────────────────────────────────────────────────
  getReviews(query = {}) {
    let list = [...this.reviews];
    if (query.status && query.status !== 'All') {
      const qStatus = query.status.toLowerCase();
      list = list.filter((r) => (r.status || '').toLowerCase().includes(qStatus));
    }
    if (query.artisan) {
      list = list.filter((r) => r.artisan === query.artisan);
    }
    if (query.product) {
      list = list.filter((r) => r.product === query.product || r.productId === query.product);
    }
    if (query.search) {
      const qSearch = query.search.toLowerCase();
      list = list.filter(
        (r) =>
          (r.comment || '').toLowerCase().includes(qSearch) ||
          (r.reviewerName || '').toLowerCase().includes(qSearch) ||
          (r.target || '').toLowerCase().includes(qSearch)
      );
    }
    return this.paginate(list, query.page, query.limit);
  }

  getReviewById(id) {
    return this.reviews.find((r) => r._id === id || r.id === id);
  }

  createReview(data) {
    const newRev = {
      _id: `rev-${Date.now()}`,
      id: `rev-${Date.now()}`,
      status: 'published',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    this.reviews.unshift(newRev);
    return newRev;
  }

  toggleReviewStatus(id) {
    const rev = this.getReviewById(id);
    if (!rev) return null;
    const isPub = (rev.status || '').toLowerCase() === 'published';
    rev.status = isPub ? 'flagged' : 'published';
    rev.updatedAt = new Date();
    return rev;
  }

  deleteReview(id) {
    const prevLen = this.reviews.length;
    this.reviews = this.reviews.filter((r) => r._id !== id && r.id !== id);
    return this.reviews.length < prevLen;
  }

  // ─── Payments ─────────────────────────────────────────────────────────────
  getPayments(query = {}) {
    let list = [...this.payments];
    if (query.status && query.status !== 'All') {
      const qStatus = query.status.toLowerCase();
      list = list.filter(
        (p) =>
          (p.status || '').toLowerCase().includes(qStatus) ||
          (p.paymentStatus || '').toLowerCase().includes(qStatus)
      );
    }
    if (query.search) {
      const qSearch = query.search.toLowerCase();
      list = list.filter(
        (p) =>
          (p.transactionId || '').toLowerCase().includes(qSearch) ||
          (p.artisanName || '').toLowerCase().includes(qSearch) ||
          (p.craft || '').toLowerCase().includes(qSearch)
      );
    }
    return this.paginate(list, query.page, query.limit);
  }

  getPaymentById(id) {
    return this.payments.find((p) => p._id === id || p.id === id || p.transactionId === id);
  }

  createPayment(data) {
    const newPay = {
      _id: `pay-${Date.now()}`,
      id: data.transactionId || `TXN-DBT-${Math.floor(1000 + Math.random() * 9000)}`,
      transactionId: data.transactionId || `TXN-DBT-${Math.floor(1000 + Math.random() * 9000)}`,
      status: data.status || 'Disbursed',
      paymentStatus: 'completed',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    this.payments.unshift(newPay);
    return newPay;
  }

  // ─── Reports ──────────────────────────────────────────────────────────────
  getReports(query = {}) {
    let list = [...this.reports];
    if (query.status && query.status !== 'All') {
      const qStatus = query.status.toLowerCase();
      list = list.filter((r) => (r.status || '').toLowerCase().includes(qStatus));
    }
    if (query.search) {
      const qSearch = query.search.toLowerCase();
      list = list.filter(
        (r) =>
          (r.reason || '').toLowerCase().includes(qSearch) ||
          (r.description || '').toLowerCase().includes(qSearch) ||
          (r.targetTitle || '').toLowerCase().includes(qSearch)
      );
    }
    return this.paginate(list, query.page, query.limit);
  }

  getReportById(id) {
    return this.reports.find((r) => r._id === id || r.id === id);
  }

  createReport(data) {
    const newRep = {
      _id: `rep-${Date.now()}`,
      id: `rep-${Date.now()}`,
      status: 'under_review',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    this.reports.unshift(newRep);
    return newRep;
  }

  resolveReport(id, note = 'Resolved by admin') {
    const rep = this.getReportById(id);
    if (!rep) return null;
    rep.status = 'resolved';
    rep.resolutionNote = note;
    rep.resolvedAt = new Date();
    rep.updatedAt = new Date();
    return rep;
  }

  deleteReport(id) {
    const prevLen = this.reports.length;
    this.reports = this.reports.filter((r) => r._id !== id && r.id !== id);
    return this.reports.length < prevLen;
  }

  // ─── Dashboard Stats (Computed Dynamically) ───────────────────────────────
  getDashboardStats() {
    const totalUsers = this.users.length;
    const totalArtisans = this.artisans.length;
    const pendingVerifications = this.artisans.filter(
      (a) => (a.verificationStatus || a.status || '').toLowerCase() === 'pending'
    ).length;
    const approvedArtisans = this.artisans.filter((a) => {
      const s = (a.verificationStatus || a.status || '').toLowerCase();
      return s === 'verified' || s === 'approved';
    }).length;

    let totalRevenueAmount = 0;
    this.payments.forEach((p) => {
      if (p.amount) totalRevenueAmount += p.amount;
      else if (p.grossAmount) {
        const cleaned = p.grossAmount.replace(/[^0-9]/g, '');
        if (cleaned) totalRevenueAmount += parseInt(cleaned, 10);
      }
    });

    return {
      stats: {
        totalUsers,
        totalArtisans,
        pendingVerifications,
        pendingArtisans: pendingVerifications,
        approvedArtisans,
        verifiedArtisans: approvedArtisans,
        totalProducts: this.products.length,
        totalWorkshops: this.workshops.length,
        totalBookings: this.bookings.length,
        totalOrders: this.orders.length,
        totalTraditions: this.traditions.length,
        totalReviews: this.reviews.length,
        totalReports: this.reports.length,
        pendingReports: this.reports.filter((r) => r.status === 'under_review').length,
        pendingReviews: this.reviews.filter((r) => r.status === 'flagged' || r.status === 'pending').length,
        totalRevenue: `₹${totalRevenueAmount.toLocaleString('en-IN')}`,
        totalRevenueRaw: totalRevenueAmount,
      },
      pendingArtisans: this.artisans.filter(
        (a) => (a.verificationStatus || a.status || '').toLowerCase() === 'pending'
      ),
      summary: {
        databaseConnected: false,
        mode: 'Offline Demo Mode',
        timestamp: new Date().toISOString(),
        fairTradeCommission: '0%',
      },
    };
  }
}

// Singleton instance
const demoStore = new DemoStore();

module.exports = demoStore;
