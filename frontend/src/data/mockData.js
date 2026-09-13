// ==========================================================================
// JEEVANT: LIVING INDIA - Mock Heritage Datasets (SIH 2026 - PS 26197)
// Authentic Indian Folk Arts, Master Artisans, and Intangible Heritage Data
// ==========================================================================

export const INITIAL_STATS = {
  totalArtisans: 1482,
  totalUsers: 28450,
  totalWorkshops: 312,
  totalRevenue: '₹48,25,900',
  pendingVerifications: 14,
  activeTraditions: 78,
  giTagCount: 64,
  fairTradeDisbursed: '₹46,80,000'
};

export const INITIAL_ARTISANS = [
  {
    id: 'art-001',
    name: 'Smt. Dulari Devi',
    craft: 'Madhubani Painting',
    category: 'Traditional Painting',
    region: 'Madhubani, Bihar',
    state: 'Bihar',
    experience: '38 Years',
    status: 'Verified',
    giTagNumber: 'GI-IN-0012',
    aadhaarVerified: true,
    rating: 4.95,
    reviewsCount: 142,
    workshopsConducted: 46,
    awards: 'Padma Shri (2021), National Award',
    phone: '+91 98352 10842',
    email: 'dulari.madhubani@jeevantindia.org',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    bio: 'Renowned Mithila painter from Ranti village, specializing in the Kachni and Bharni styles. Has trained over 800 rural women in self-reliance through traditional art.',
    productsCount: 38,
    submittedDate: '2026-08-14'
  },
  {
    id: 'art-002',
    name: 'Kripal Singh Shekhawat Heritage Guild',
    craft: 'Blue Pottery',
    category: 'Ceramics & Pottery',
    region: 'Jaipur, Rajasthan',
    state: 'Rajasthan',
    experience: '32 Years',
    status: 'Verified',
    giTagNumber: 'GI-IN-0028',
    aadhaarVerified: true,
    rating: 4.88,
    reviewsCount: 210,
    workshopsConducted: 54,
    awards: 'Shilp Guru Award, State Master Craftsperson',
    phone: '+91 94140 38291',
    email: 'jaipur.bluepottery@jeevantindia.org',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Preserving the Persian-origin quartz and fuller earth pottery of Jaipur without clay, fired using traditional kiln formulations with cobalt oxide.',
    productsCount: 64,
    submittedDate: '2026-08-18'
  },
  {
    id: 'art-003',
    name: 'Rabi Narayan Rath',
    craft: 'Pattachitra & Palm Leaf Engraving',
    category: 'Traditional Painting',
    region: 'Raghurajpur, Odisha',
    state: 'Odisha',
    experience: '24 Years',
    status: 'Pending',
    giTagNumber: 'GI-IN-0039',
    aadhaarVerified: true,
    rating: 4.79,
    reviewsCount: 88,
    workshopsConducted: 22,
    awards: 'State Craft Excellence Award 2024',
    phone: '+91 94371 49201',
    email: 'rabi.pattachitra@jeevantindia.org',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'Heritage heritage scroll painter from the craft heritage village of Raghurajpur, using natural stone pigments and tamarind seed gum.',
    productsCount: 29,
    submittedDate: '2026-09-02'
  },
  {
    id: 'art-004',
    name: 'Jivya Soma Mashe Legacy Guild',
    craft: 'Warli Folk Art',
    category: 'Tribal Indigenous Art',
    region: 'Dahanu, Palghar, Maharashtra',
    state: 'Maharashtra',
    experience: '29 Years',
    status: 'Verified',
    giTagNumber: 'GI-IN-0114',
    aadhaarVerified: true,
    rating: 4.92,
    reviewsCount: 175,
    workshopsConducted: 39,
    awards: 'Sant Kabir National Award',
    phone: '+91 98205 11983',
    email: 'warli.collective@jeevantindia.org',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Indigenous Warli tribal artists continuing ancient ritualistic wall art depicting the mother goddess Palghat, harvest rhythms, and sacred circles.',
    productsCount: 45,
    submittedDate: '2026-07-28'
  },
  {
    id: 'art-005',
    name: 'Dharanidhar Kalita',
    craft: 'Bamboo & Cane Craft',
    category: 'Sustainable Fiber & Woodcraft',
    region: 'Barpeta, Assam',
    state: 'Assam',
    experience: '18 Years',
    status: 'Pending',
    giTagNumber: 'GI-IN-0189',
    aadhaarVerified: true,
    rating: 4.71,
    reviewsCount: 49,
    workshopsConducted: 14,
    awards: 'North East Artisan Excellence Medal',
    phone: '+91 97060 84321',
    email: 'kalita.bamboo@jeevantindia.org',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    bio: 'Eco-conscious master artisan weaving indigenous hollow bamboo into contemporary architectural artifacts and lifestyle vessels.',
    productsCount: 31,
    submittedDate: '2026-09-05'
  },
  {
    id: 'art-006',
    name: 'Jonnalagadda Gurappa Chetty',
    craft: 'Srikalahasti Kalamkari',
    category: 'Textiles & Hand Block',
    region: 'Srikalahasti, Andhra Pradesh',
    state: 'Andhra Pradesh',
    experience: '41 Years',
    status: 'Verified',
    giTagNumber: 'GI-IN-0019',
    aadhaarVerified: true,
    rating: 4.98,
    reviewsCount: 320,
    workshopsConducted: 68,
    awards: 'Padma Shri, National Master Craftsperson',
    phone: '+91 94402 78310',
    email: 'kalamkari.chetty@jeevantindia.org',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    bio: 'Eminent master of freehand pen Kalamkari on organic cotton treated with cow milk and myrobalan, using 100% natural root and bark dyes.',
    productsCount: 52,
    submittedDate: '2026-06-15'
  },
  {
    id: 'art-007',
    name: 'Babu Lal Baghel',
    craft: 'Dhokra Bell Metal Casting',
    category: 'Lost-Wax Metallurgy',
    region: 'Kondagaon, Bastar, Chhattisgarh',
    state: 'Chhattisgarh',
    experience: '26 Years',
    status: 'Pending',
    giTagNumber: 'GI-IN-0082',
    aadhaarVerified: false,
    rating: 4.65,
    reviewsCount: 62,
    workshopsConducted: 19,
    awards: 'Tribal Artisan Fellowship Award',
    phone: '+91 94062 19283',
    email: 'babulal.dhokra@jeevantindia.org',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    bio: 'Ancient lost-wax brass and bronze sculpture maker whose family has preserved Harappan-era hollow casting traditions for generations.',
    productsCount: 22,
    submittedDate: '2026-09-07'
  },
  {
    id: 'art-008',
    name: 'Ghulam Mohammad Zargar',
    craft: 'Kashmiri Pashmina Handloom Weaving',
    category: 'Heritage Textiles',
    region: 'Kanihama, Kashmir',
    state: 'Jammu & Kashmir',
    experience: '35 Years',
    status: 'Verified',
    giTagNumber: 'GI-IN-0045',
    aadhaarVerified: true,
    rating: 4.94,
    reviewsCount: 284,
    workshopsConducted: 41,
    awards: 'National Award for Master Weaver',
    phone: '+91 94190 28172',
    email: 'ghulam.pashmina@jeevantindia.org',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    bio: 'Master weaver producing hand-spun Changthangi goat wool Pashmina and Kani shawls on traditional wooden pit looms.',
    productsCount: 40,
    submittedDate: '2026-07-10'
  },
  {
    id: 'art-009',
    name: 'Meenakshi Ammal',
    craft: 'Thanjavur 22K Gold Foil Painting',
    category: 'Traditional Painting',
    region: 'Thanjavur, Tamil Nadu',
    state: 'Tamil Nadu',
    experience: '22 Years',
    status: 'Pending',
    giTagNumber: 'GI-IN-0021',
    aadhaarVerified: true,
    rating: 4.82,
    reviewsCount: 94,
    workshopsConducted: 17,
    awards: 'Kalaimamani State Award Nominee',
    phone: '+91 98410 93214',
    email: 'meenakshi.tanjore@jeevantindia.org',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'Specialist in classical Tanjore gesso relief work with natural gum Arabic, unheated semi-precious Jaipur gems, and pure gold foil overlay.',
    productsCount: 18,
    submittedDate: '2026-09-08'
  },
  {
    id: 'art-010',
    name: 'Bhagwan Das Prajapati',
    craft: 'Terracotta Sculpting & Murals',
    category: 'Ceramics & Pottery',
    region: 'Gorakhpur, Uttar Pradesh',
    state: 'Uttar Pradesh',
    experience: '27 Years',
    status: 'Rejected',
    giTagNumber: 'GI-IN-0144',
    aadhaarVerified: false,
    rating: 3.90,
    reviewsCount: 12,
    workshopsConducted: 3,
    awards: 'District Level Craft Participant',
    phone: '+91 94508 17402',
    email: 'bhagwan.terracotta@jeevantindia.org',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    bio: 'Traditional animal figurines and temple bells in clay. Re-verification required due to incomplete workshop provenance documentation.',
    productsCount: 9,
    submittedDate: '2026-08-25'
  }
];

export const TRADITIONS_DATA = [
  {
    id: 'trad-01',
    name: 'Madhubani (Mithila) Painting',
    state: 'Bihar',
    category: 'Folk Art & Wall Fresco',
    giStatus: 'Registered GI-IN-0012',
    unescoStatus: 'National Living Intangible Heritage',
    riskLevel: 'Stable & Thriving',
    riskColor: 'verified',
    activeArtisans: '2,400+',
    antiquity: '7th Century BCE',
    materials: 'Natural mineral pigments, twig pens, rice paste'
  },
  {
    id: 'trad-02',
    name: 'Jaipur Blue Pottery',
    state: 'Rajasthan',
    category: 'Non-Clay Quartz Ceramics',
    giStatus: 'Registered GI-IN-0028',
    unescoStatus: 'Craft City Recognition',
    riskLevel: 'Vulnerable',
    riskColor: 'pending',
    activeArtisans: '350',
    antiquity: '14th Century (Raja Man Singh I era)',
    materials: 'Quartz stone powder, glass, Fuller earth, gum'
  },
  {
    id: 'trad-03',
    name: 'Raghurajpur Pattachitra',
    state: 'Odisha',
    category: 'Cloth & Palm Leaf Iconography',
    giStatus: 'Registered GI-IN-0039',
    unescoStatus: 'Intangible Heritage Nominee',
    riskLevel: 'Stable',
    riskColor: 'verified',
    activeArtisans: '800+',
    antiquity: '12th Century CE (Jagannath Cult)',
    materials: 'Cotton canvas, tamarind seed paste, chalk, conch shell'
  },
  {
    id: 'trad-04',
    name: 'Warli Tribal Painting',
    state: 'Maharashtra',
    category: 'Indigenous Cave & Mud Wall Art',
    giStatus: 'Registered GI-IN-0114',
    unescoStatus: 'Recognized Tribal Heritage',
    riskLevel: 'Stable',
    riskColor: 'verified',
    activeArtisans: '1,200+',
    antiquity: '2500 - 3000 BCE',
    materials: 'Rice paste, gum, red ochre cow dung background'
  },
  {
    id: 'trad-05',
    name: 'Bastar Dhokra Lost-Wax Metallurgy',
    state: 'Chhattisgarh',
    category: 'Ancient Metal Casting',
    giStatus: 'Registered GI-IN-0082',
    unescoStatus: 'Endangered Metallurgical Craft',
    riskLevel: 'Critically Endangered',
    riskColor: 'rejected',
    activeArtisans: '140',
    antiquity: '4,000+ Years (Mohenjo-daro Dancing Girl)',
    materials: 'Beeswax cords, clay, river sand, molten brass/bronze'
  },
  {
    id: 'trad-06',
    name: 'Kashmiri Kani & Pashmina Weaving',
    state: 'Jammu & Kashmir',
    category: 'Luxury Handloom Textiles',
    giStatus: 'Registered GI-IN-0045',
    unescoStatus: 'UNESCO World Craft City (Srinagar)',
    riskLevel: 'Threatened by Machine Weaves',
    riskColor: 'pending',
    activeArtisans: '450 master weavers',
    antiquity: '15th Century (Sultan Zain-ul-Abidin)',
    materials: 'Capra Hircus cashmere down, wooden kanis (eyeless bobbins)'
  },
  {
    id: 'trad-07',
    name: 'Srikalahasti Kalamkari',
    state: 'Andhra Pradesh',
    category: 'Freehand Organic Painted Textile',
    giStatus: 'Registered GI-IN-0019',
    unescoStatus: 'Living Temple Art Heritage',
    riskLevel: 'Stable',
    riskColor: 'verified',
    activeArtisans: '900+',
    antiquity: 'Vijayanagara Empire (15th Century)',
    materials: 'Bamboo pen (kalam), cow milk, alum, vegetable extracts'
  }
];

export const WORKSHOPS_DATA = [
  {
    id: 'ws-101',
    title: 'Sacred Lines: Madhubani Fish & Tree of Life Masterclass',
    artisan: 'Smt. Dulari Devi',
    craft: 'Madhubani Painting',
    mode: 'Live Virtual',
    date: '14 Sep 2026',
    time: '11:00 AM - 01:30 PM IST',
    fee: '₹899',
    seatsTotal: 50,
    seatsBooked: 48,
    status: 'Upcoming'
  },
  {
    id: 'ws-102',
    title: 'Cobalt & Quartz: Hands-on Jaipur Blue Pottery Modeling',
    artisan: 'Kripal Singh Shekhawat Heritage Guild',
    craft: 'Blue Pottery',
    mode: 'In-Person (Jaipur Studio)',
    date: '18 Sep 2026',
    time: '10:00 AM - 04:00 PM IST',
    fee: '₹2,499',
    seatsTotal: 20,
    seatsBooked: 20,
    status: 'Full'
  },
  {
    id: 'ws-103',
    title: 'Warli Ritual Circles: Painting Ancient Harvest Stories',
    artisan: 'Jivya Soma Mashe Legacy Guild',
    craft: 'Warli Art',
    mode: 'Live Virtual',
    date: '21 Sep 2026',
    time: '04:00 PM - 06:00 PM IST',
    fee: '₹649',
    seatsTotal: 75,
    seatsBooked: 61,
    status: 'Upcoming'
  },
  {
    id: 'ws-104',
    title: 'Tala Patra Engraving: Palm Leaf Art of Raghurajpur',
    artisan: 'Rabi Narayan Rath',
    craft: 'Pattachitra',
    mode: 'Hybrid Residency',
    date: '25 Sep 2026',
    time: '10:30 AM - 01:00 PM IST',
    fee: '₹1,200',
    seatsTotal: 30,
    seatsBooked: 19,
    status: 'Upcoming'
  },
  {
    id: 'ws-105',
    title: 'Natural Dye Chemistry: The Secret Alchemy of Kalamkari',
    artisan: 'Jonnalagadda Gurappa Chetty',
    craft: 'Kalamkari',
    mode: 'Live Virtual',
    date: '02 Sep 2026',
    time: '03:00 PM - 05:30 PM IST',
    fee: '₹799',
    seatsTotal: 60,
    seatsBooked: 60,
    status: 'Completed'
  }
];

export const RECENT_BOOKINGS = [
  {
    id: 'BKG-8839',
    user: 'Aarav Sharma',
    userEmail: 'aarav.sharma@gmail.com',
    item: 'Sacred Lines: Madhubani Fish Masterclass',
    artisan: 'Smt. Dulari Devi',
    amount: '₹899',
    date: '09 Sep 2026, 09:20 PM',
    status: 'Confirmed'
  },
  {
    id: 'BKG-8838',
    user: 'Pooja Iyer',
    userEmail: 'pooja.iyer@culturecollective.in',
    item: 'Jaipur Blue Pottery Heritage Vase (GI Tagged)',
    artisan: 'Kripal Singh Guild',
    amount: '₹4,850',
    date: '09 Sep 2026, 07:15 PM',
    status: 'Processing'
  },
  {
    id: 'BKG-8837',
    user: 'David Miller',
    userEmail: 'david.m@ukheritage.org',
    item: 'Warli Ritual Harvest Canvas (Original)',
    artisan: 'Jivya Soma Guild',
    amount: '₹9,200',
    date: '09 Sep 2026, 04:40 PM',
    status: 'Confirmed'
  },
  {
    id: 'BKG-8836',
    user: 'Ananya Verma',
    userEmail: 'ananya.verma@delhiuniv.ac.in',
    item: 'Warli Ritual Circles Workshop Pass',
    artisan: 'Jivya Soma Guild',
    amount: '₹649',
    date: '08 Sep 2026, 11:30 PM',
    status: 'Confirmed'
  },
  {
    id: 'BKG-8835',
    user: 'Rohan Deshmukh',
    userEmail: 'rohan.deshmukh@tcs.com',
    item: 'Srikalahasti Tree of Life Silk Stole',
    artisan: 'Jonnalagadda Chetty',
    amount: '₹6,400',
    date: '08 Sep 2026, 06:10 PM',
    status: 'Shipped'
  }
];

export const USERS_DATA = [
  {
    id: 'usr-501',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    role: 'Learner / Enthusiast',
    location: 'Bengaluru, Karnataka',
    joined: 'Jan 2026',
    workshopsAttended: 6,
    ordersCount: 4,
    totalSpent: '₹14,500',
    status: 'Active'
  },
  {
    id: 'usr-502',
    name: 'Pooja Iyer',
    email: 'pooja.iyer@culturecollective.in',
    role: 'Heritage Art Collector',
    location: 'Chennai, Tamil Nadu',
    joined: 'Feb 2026',
    workshopsAttended: 12,
    ordersCount: 18,
    totalSpent: '₹92,800',
    status: 'Active'
  },
  {
    id: 'usr-503',
    name: 'Dr. Evelyn Ward',
    email: 'e.ward@oxfordculturalstudies.edu',
    role: 'Research Scholar',
    location: 'London, UK / Delhi',
    joined: 'Nov 2025',
    workshopsAttended: 9,
    ordersCount: 7,
    totalSpent: '₹48,200',
    status: 'Active'
  },
  {
    id: 'usr-504',
    name: 'Ananya Verma',
    email: 'ananya.verma@delhiuniv.ac.in',
    role: 'Student / Apprentice',
    location: 'New Delhi, Delhi',
    joined: 'Mar 2026',
    workshopsAttended: 4,
    ordersCount: 2,
    totalSpent: '₹3,900',
    status: 'Active'
  },
  {
    id: 'usr-505',
    name: 'Vikramjit Roy',
    email: 'vroy@kolkatacrafts.org',
    role: 'Fair Trade Curator',
    location: 'Kolkata, West Bengal',
    joined: 'Dec 2025',
    workshopsAttended: 15,
    ordersCount: 26,
    totalSpent: '₹1,34,000',
    status: 'Active'
  },
  {
    id: 'usr-506',
    name: 'Meera Chordia',
    email: 'meera.chordia@yahoo.com',
    role: 'Learner / Enthusiast',
    location: 'Pune, Maharashtra',
    joined: 'Apr 2026',
    workshopsAttended: 2,
    ordersCount: 1,
    totalSpent: '₹1,800',
    status: 'Inactive'
  }
];

export const PAYMENTS_DATA = [
  {
    id: 'TXN-9021',
    artisan: 'Smt. Dulari Devi',
    craft: 'Madhubani Painting',
    account: 'SBI •••• 4018',
    grossAmount: '₹42,800',
    fairPlatformFee: '₹0 (0% SIH Model)',
    netPayout: '₹42,800',
    payoutMethod: 'Direct DBT / UPI',
    status: 'Disbursed',
    date: '08 Sep 2026'
  },
  {
    id: 'TXN-9020',
    artisan: 'Kripal Singh Guild',
    craft: 'Blue Pottery',
    account: 'HDFC •••• 9211',
    grossAmount: '₹68,400',
    fairPlatformFee: '₹0 (0% SIH Model)',
    netPayout: '₹68,400',
    payoutMethod: 'NEFT Direct',
    status: 'Disbursed',
    date: '07 Sep 2026'
  },
  {
    id: 'TXN-9019',
    artisan: 'Jonnalagadda Chetty',
    craft: 'Kalamkari',
    account: 'Andhra Bank •••• 3109',
    grossAmount: '₹51,200',
    fairPlatformFee: '₹0 (0% SIH Model)',
    netPayout: '₹51,200',
    payoutMethod: 'Direct DBT / UPI',
    status: 'Disbursed',
    date: '05 Sep 2026'
  },
  {
    id: 'TXN-9018',
    artisan: 'Jivya Soma Guild',
    craft: 'Warli Art',
    account: 'Bank of Baroda •••• 1042',
    grossAmount: '₹37,500',
    fairPlatformFee: '₹0 (0% SIH Model)',
    netPayout: '₹37,500',
    payoutMethod: 'Direct DBT / UPI',
    status: 'Processing',
    date: '09 Sep 2026'
  },
  {
    id: 'TXN-9017',
    artisan: 'Ghulam Mohammad',
    craft: 'Pashmina Weaving',
    account: 'J&K Bank •••• 8820',
    grossAmount: '₹84,000',
    fairPlatformFee: '₹0 (0% SIH Model)',
    netPayout: '₹84,000',
    payoutMethod: 'NEFT Direct',
    status: 'Disbursed',
    date: '03 Sep 2026'
  }
];

export const REVIEWS_DATA = [
  {
    id: 'rev-01',
    reviewer: 'Aarav Sharma',
    target: 'Sacred Lines: Madhubani Fish Masterclass',
    artisan: 'Smt. Dulari Devi',
    rating: 5,
    comment: 'Learning directly from Padma Shri Dulari Devi was a spiritual experience! Her explanation of traditional bamboo twig strokes and natural colors opened our eyes to real Mithila heritage.',
    date: '08 Sep 2026',
    sentiment: 'Positive (99%)',
    status: 'Published'
  },
  {
    id: 'rev-02',
    reviewer: 'Pooja Iyer',
    target: 'Authentic Jaipur Blue Pottery Hex Vase',
    artisan: 'Kripal Singh Heritage Guild',
    rating: 5,
    comment: 'Exquisite glaze and certified GI tag verification code worked on the mobile app. Zero plastic packaging and arrived in handmade straw box. 100% genuine masterwork.',
    date: '07 Sep 2026',
    sentiment: 'Positive (98%)',
    status: 'Published'
  },
  {
    id: 'rev-03',
    reviewer: 'Dr. Evelyn Ward',
    target: 'Natural Dye Chemistry Workshop',
    artisan: 'Jonnalagadda Gurappa Chetty',
    rating: 5,
    comment: 'Incredible documentation of 17-step myrobalan and alum mordant printing. This platform is doing invaluable work in archiving intangible Indian knowledge systems.',
    date: '04 Sep 2026',
    sentiment: 'Positive (97%)',
    status: 'Published'
  },
  {
    id: 'rev-04',
    reviewer: 'Karan Mehra',
    target: 'Warli Harvest Painting',
    artisan: 'Jivya Soma Legacy Guild',
    rating: 4,
    comment: 'Artwork is brilliant, though shipping to Chandigarh took 6 days due to rural artisan cluster dispatch. The authenticity certificate made up for it!',
    date: '02 Sep 2026',
    sentiment: 'Positive (84%)',
    status: 'Published'
  }
];

export const IMPACT_METRICS = {
  preservationScore: 94.2,
  artisanIncomeGrowth: '+185%',
  giVerificationAccuracy: '99.8%',
  fairTradeIntermediaryCutEliminated: '100%',
  statesCovered: 24,
  clusterCommunitiesOnboarded: 86
};

// ==========================================================================
// AUTHENTIC INDIAN HANDICRAFT PRODUCTS (SIH 2026 - PS 26197)
// ==========================================================================
export const PRODUCTS_DATA = [
  {
    id: 'prod-001',
    name: 'Tree of Life Madhubani Masterpiece',
    artisanId: 'art-001',
    artisan: 'Smt. Dulari Devi',
    craft: 'Madhubani Painting',
    tradition: 'Madhubani (Mithila) Painting',
    category: 'Traditional Painting',
    price: 3499,
    originalPrice: 4200,
    rating: 4.95,
    reviewsCount: 38,
    inStock: true,
    stockCount: 8,
    giTagNumber: 'GI-IN-0012',
    region: 'Madhubani, Bihar',
    state: 'Bihar',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Handcrafted on handmade recycled paper using natural river-reed twig pens and organic pigments extracted from soot, crushed leaves, and madder root. Depicts the sacred Tree of Life with birds and river fish symbolizing prosperity and ecological balance.',
    materials: 'Handmade cow-dung treated paper, natural vegetable dyes, bamboo quill',
    dimensions: '22" x 15" (Unframed)',
    provenance: 'Ranti Village, Madhubani District, Bihar',
    culturalStory: 'In Mithila cosmology, the Tree of Life is a living prayer celebrating the cycle of nature and cosmic unity. Master artist Dulari Devi weaves childhood recollections of river Kamala into rhythmic geometric borders.',
    featured: true
  },
  {
    id: 'prod-002',
    name: 'Jaipur Royal Blue Pottery Hexagonal Vase',
    artisanId: 'art-002',
    artisan: 'Kripal Singh Heritage Guild',
    craft: 'Blue Pottery',
    tradition: 'Jaipur Blue Pottery',
    category: 'Ceramics & Pottery',
    price: 4850,
    originalPrice: 5500,
    rating: 4.89,
    reviewsCount: 42,
    inStock: true,
    stockCount: 5,
    giTagNumber: 'GI-IN-0028',
    region: 'Jaipur, Rajasthan',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Distinctive clay-free ceramic made with powdered quartz stone, fuller earth (Multani Mitti), raw glass, and gum. Glazed in signature royal cobalt blue and turquoise with hand-brushed Persian Mughal floral arabesques.',
    materials: 'Quartz stone powder, culinary glass, Fuller earth, cobalt oxide glaze',
    dimensions: '12" Height x 6" Diameter',
    provenance: 'Kot Jewar & Jaipur, Rajasthan',
    culturalStory: 'Introduced to Jaipur by Sawai Ram Singh II in the 19th century after kite masters won royal acclaim, this craft is famous for its semi-translucent porcelain-like finish that never develops cracks.',
    featured: true
  },
  {
    id: 'prod-003',
    name: 'Tala Patra Palm Leaf Engraved Scroll',
    artisanId: 'art-003',
    artisan: 'Rabi Narayan Rath',
    craft: 'Pattachitra & Palm Leaf Engraving',
    tradition: 'Raghurajpur Pattachitra',
    category: 'Traditional Painting',
    price: 2899,
    originalPrice: 3400,
    rating: 4.82,
    reviewsCount: 29,
    inStock: true,
    stockCount: 12,
    giTagNumber: 'GI-IN-0039',
    region: 'Raghurajpur, Puri, Odisha',
    state: 'Odisha',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Dried and cured Palmyra palm leaves delicately etched with a sharp iron stylus (Lekhani) and rubbed with natural lamp soot mixed with bean leaf extract. Depicts Dasavatara and Gita Govinda episodes in microscopic miniature detail.',
    materials: 'Cured palm leaves, iron stylus etching, lamp soot, turmeric water wash',
    dimensions: '18" x 6" Foldable hanging scroll',
    provenance: 'Raghurajpur Heritage Craft Village, Odisha',
    culturalStory: 'Palm leaf manuscripts date back two millennia in coastal Kalinga. The process requires months of curing palm leaves in swampy turmeric brine before fine incising begins without room for single error.',
    featured: true
  },
  {
    id: 'prod-004',
    name: 'Warli Sacred Tarpa Harvest Canvas',
    artisanId: 'art-004',
    artisan: 'Jivya Soma Mashe Legacy Guild',
    craft: 'Warli Folk Art',
    tradition: 'Warli Tribal Painting',
    category: 'Tribal Indigenous Art',
    price: 4200,
    originalPrice: 4900,
    rating: 4.93,
    reviewsCount: 51,
    inStock: true,
    stockCount: 6,
    giTagNumber: 'GI-IN-0114',
    region: 'Dahanu, Palghar, Maharashtra',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Authentic ritual canvas painted with fermented rice flour paste on coarse cotton primed with red ochre (Geru). Features the sacred circular Tarpa dance where dancers link hands around the wind musician in rhythm with cosmic cycles.',
    materials: 'Coarse raw canvas, red ochre mud wash, white rice paste, bamboo chewing stick',
    dimensions: '24" x 24" (Square)',
    provenance: 'Sahyadri Foothills, Palghar, Maharashtra',
    culturalStory: 'Warli art traces directly back to 2500 BCE cave pictograms. The triangle represents mountains and trees, the circle represents the sun and moon, and the square symbolizes human sacred space.',
    featured: true
  },
  {
    id: 'prod-005',
    name: 'Bastar Dhokra Lost-Wax Dancing Deer',
    artisanId: 'art-007',
    artisan: 'Babu Lal Baghel',
    craft: 'Dhokra Bell Metal Casting',
    tradition: 'Bastar Dhokra Lost-Wax Metallurgy',
    category: 'Lost-Wax Metallurgy',
    price: 3890,
    originalPrice: 4500,
    rating: 4.74,
    reviewsCount: 22,
    inStock: true,
    stockCount: 4,
    giTagNumber: 'GI-IN-0082',
    region: 'Kondagaon, Bastar, Chhattisgarh',
    state: 'Chhattisgarh',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Ancient hollow lost-wax casting in bell metal (brass and bronze). Hand-coiled beeswax threads form the body of the tribal deer, which is molded in river clay and fired in pit furnaces with charcoal.',
    materials: 'Recycled brass and bronze, natural forest beeswax, termite mound clay',
    dimensions: '9" Height x 7" Length',
    provenance: 'Kondagaon Cluster, Bastar, Chhattisgarh',
    culturalStory: 'Continuously practiced for over 4,000 years since the Dancing Girl of Mohenjo-daro. Each sculpture is entirely unique because the clay mold is shattered to release the cast metal.',
    featured: false
  },
  {
    id: 'prod-006',
    name: 'Kashmiri Hand-Spun Pashmina Kani Stole',
    artisanId: 'art-008',
    artisan: 'Ghulam Mohammad Zargar',
    craft: 'Kashmiri Pashmina Handloom Weaving',
    tradition: 'Kashmiri Kani & Pashmina Weaving',
    category: 'Heritage Textiles',
    price: 16500,
    originalPrice: 19500,
    rating: 4.97,
    reviewsCount: 64,
    inStock: true,
    stockCount: 3,
    giTagNumber: 'GI-IN-0045',
    region: 'Kanihama, Kashmir',
    state: 'Jammu & Kashmir',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Certified 100% pure Changthangi goat Pashmina wool hand-spun on traditional Kashmiri Charkha and woven on wooden pit looms using wooden eyeless needles (Tujis). Lightweight, whisper-soft, and featherwarm.',
    materials: '100% Grade-A Changthangi Cashmere wool, natural walnut & saffron dyes',
    dimensions: '80" x 28" (Wrap Stole)',
    provenance: 'Kanihama Weaving Belt, Budgam, Kashmir',
    culturalStory: 'Mentioned in Mahabharata and favored by Mughal emperors, genuine Kani weaving requires up to 6 months of patient needlework following coded notation patterns called Talim.',
    featured: true
  },
  {
    id: 'prod-007',
    name: 'Srikalahasti Freehand Kalamkari Silk Dupatta',
    artisanId: 'art-006',
    artisan: 'Jonnalagadda Gurappa Chetty',
    craft: 'Srikalahasti Kalamkari',
    tradition: 'Srikalahasti Kalamkari',
    category: 'Textiles & Hand Block',
    price: 5200,
    originalPrice: 6200,
    rating: 4.92,
    reviewsCount: 31,
    inStock: true,
    stockCount: 7,
    giTagNumber: 'GI-IN-0019',
    region: 'Srikalahasti, Andhra Pradesh',
    state: 'Andhra Pradesh',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Pure Mulberry silk handpainted with bamboo reeds (Kalam) using 17-stage natural processing with buffalo milk mordant, myrobalan nuts, alum, and fermented jaggery iron inks. Features mythological flora and dancing peacocks.',
    materials: 'Pure Chanderi/Mulberry Silk, river water rinses, vegetable & mineral dyes',
    dimensions: '2.5 Meters Length x 36" Width',
    provenance: 'Swarnamukhi Riverbank, Srikalahasti, Andhra Pradesh',
    culturalStory: 'Developed under Vijayanagara royal patronage to illustrate temple chariot banners. The fabric undergoes repeated washings in the alkaline sands of Swarnamukhi river to fix vivid colors naturally.',
    featured: false
  },
  {
    id: 'prod-008',
    name: 'Thanjavur 22K Gold Foil Yashoda Krishna',
    artisanId: 'art-009',
    artisan: 'Meenakshi Ammal',
    craft: 'Thanjavur 22K Gold Foil Painting',
    tradition: 'Thanjavur Sacred Gesso Painting',
    category: 'Traditional Painting',
    price: 18500,
    originalPrice: 22000,
    rating: 4.88,
    reviewsCount: 19,
    inStock: true,
    stockCount: 2,
    giTagNumber: 'GI-IN-0021',
    region: 'Thanjavur, Tamil Nadu',
    state: 'Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Created on seasoned teakwood board with cotton canvas gesso primed with French chalk and tamarind gum. Relief work embedded with unheated Jaipur semi-precious stones and overlaid with authenticated 22-karat gold leaf.',
    materials: 'Teakwood base, unheated Jaipur gems, pure 22K gold leaf, Arabic gum gesso',
    dimensions: '16" x 12" Framed in Chettinad Teak',
    provenance: 'Thanjavur Temple Precinct, Tamil Nadu',
    culturalStory: 'Originated during the Maratha rule of Thanjavur in the 16th century. The gleaming gold foil reflects lamplight in dark inner temple sanctums, preserving sacred devotional luminosity across centuries.',
    featured: true
  },
  {
    id: 'prod-009',
    name: 'Eco-Craft Assam Golden Bamboo Tea Set',
    artisanId: 'art-005',
    artisan: 'Dharanidhar Kalita',
    craft: 'Bamboo & Cane Craft',
    tradition: 'Assam Bamboo & Cane Weaving',
    category: 'Sustainable Fiber & Woodcraft',
    price: 2199,
    originalPrice: 2600,
    rating: 4.79,
    reviewsCount: 34,
    inStock: true,
    stockCount: 15,
    giTagNumber: 'GI-IN-0189',
    region: 'Barpeta, Assam',
    state: 'Assam',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Artisanal tea canister and coaster set crafted from seasoned Muli bamboo treated with organic neem oil. Hand-woven with delicate interlocking herringbone lattice patterns.',
    materials: 'Mature hill bamboo (Melocanna baccifera), food-grade natural resin polish',
    dimensions: 'Canister: 7" x 4", 4 Coasters: 3.5" Diameter',
    provenance: 'Lower Brahmaputra Valley, Barpeta, Assam',
    culturalStory: 'Bamboo is the green gold of Assam, woven seamlessly into architecture, fishing traps, and dining ware. Kalita family artisans harvest bamboo only during waning moon phases to prevent insect infestation naturally.',
    featured: false
  },
  {
    id: 'prod-010',
    name: 'Bidriware Silver Inlaid Floral Trinket Box',
    artisanId: 'art-002',
    artisan: 'Deccan Master Metal Artisans',
    craft: 'Bidriware Metallurgy',
    tradition: 'Bidriware Zinc-Copper Alloy Inlay',
    category: 'Jewelry & Metal Work',
    price: 3650,
    originalPrice: 4200,
    rating: 4.86,
    reviewsCount: 27,
    inStock: true,
    stockCount: 6,
    giTagNumber: 'GI-IN-0023',
    region: 'Bidar, Karnataka',
    state: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Cast from zinc-copper alloy, hand-chiseled with floral vines, inlaid with pure 99.9% fine silver wire, and darkened using historic soil from the 15th-century Bidar Fort containing unique ammonium salts.',
    materials: 'Zinc and copper alloy, 99.9% pure silver wire, Bidar Fort soil darkening paste',
    dimensions: '5" x 3.5" x 2" (Hinged Box)',
    provenance: 'Bidar Heritage Cluster, Karnataka',
    culturalStory: 'Developed during the Bahmani Sultanate, Bidriware is renowned worldwide for its deep jet-black oxidized patina contrasted against shimmering silver inlay.',
    featured: false
  },
  {
    id: 'prod-011',
    name: 'Channapatna Non-Toxic Lacquer Toy Train',
    artisanId: 'art-002',
    artisan: 'Channapatna Wooden Guild',
    craft: 'Lacquerware & Woodcraft',
    tradition: 'Channapatna Wooden Toys',
    category: 'Sustainable Fiber & Woodcraft',
    price: 1450,
    originalPrice: 1750,
    rating: 4.91,
    reviewsCount: 76,
    inStock: true,
    stockCount: 20,
    giTagNumber: 'GI-IN-0010',
    region: 'Channapatna, Ramanagara, Karnataka',
    state: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Turned on traditional wood lathes from soft Wrightia tinctoria (Aale Mara) timber and burnished with natural shellac infused with turmeric, indigo, and kumkum dyes. 100% non-toxic, safe for toddlers.',
    materials: 'Ivory wood (Wrightia tinctoria), natural shellac, vegetal dyes',
    dimensions: '14" Length (4 Interlocking Carriages)',
    provenance: 'Gombegala Ooru (Toy Town), Channapatna, Karnataka',
    culturalStory: 'Invited by Tipu Sultan from Persia in the 18th century to train local artisans, the craft has evolved into an eco-friendly toy capital recognized globally.',
    featured: false
  },
  {
    id: 'prod-012',
    name: 'Banarasi Pure Katan Silk Handloom Saree',
    artisanId: 'art-008',
    artisan: 'Varanasi Master Weavers Collective',
    craft: 'Banarasi Handloom Weaving',
    tradition: 'Banarasi Brocade & Zari Weaving',
    category: 'Heritage Textiles',
    price: 24500,
    originalPrice: 28900,
    rating: 4.98,
    reviewsCount: 53,
    inStock: true,
    stockCount: 3,
    giTagNumber: 'GI-IN-0003',
    region: 'Varanasi, Uttar Pradesh',
    state: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Woven on historic Jacquard drawlooms in Varanasi using twisted pure mulberry Katan silk filaments and genuine gold-tested zari brocade. Features classic Jangla floral vines and temple border motifs.',
    materials: '100% Pure Katan Silk, tested gold and silver alloy zari thread',
    dimensions: '6.5 Meters with Running Blouse Piece',
    provenance: 'Madanpura & Pilikothi, Varanasi, Uttar Pradesh',
    culturalStory: 'The legendary looms of Kashi have clothed royalty since the Rigvedic era. A genuine handloom Banarasi takes up to three master weavers up to 45 continuous days of rhythmic loom work.',
    featured: true
  }
];

// ==========================================================================
// REGIONAL HIERARCHICAL DATA FOR CULTURE MAP (SIH 2026)
// India -> State -> Region -> Tradition -> Local Artists
// ==========================================================================
export const REGIONS_DATA = [
  {
    id: 'state-rajasthan',
    name: 'Rajasthan',
    zone: 'West',
    capital: 'Jaipur',
    tagline: 'Land of Kings & Vibrant Crafts',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&auto=format&fit=crop&q=80',
    traditionsCount: 14,
    artisansCount: 340,
    regions: [
      {
        id: 'reg-marwar',
        name: 'Marwar & Mewar Belt',
        center: 'Jaipur / Jodhpur',
        description: 'World-renowned for cobalt-glazed clayless Blue Pottery, Bagru block prints, and miniature palace frescos.',
        crafts: ['Jaipur Blue Pottery', 'Bagru Natural Dyes', 'Puppetry (Kathputli)', 'Pichwai Art'],
        festivals: ['Teej Festival', 'Pushkar Camel Fair', 'Jaipur Literature & Craft Week'],
        culinary: ['Dal Baati Churma', 'Ker Sangri', 'Ghevar'],
        artists: ['Kripal Singh Shekhawat Heritage Guild', 'Mohan Lal Kumhar']
      },
      {
        id: 'reg-shekhawati',
        name: 'Shekhawati Region',
        center: 'Mandawa / Nawalgarh',
        description: 'Open-air art gallery of India covered with 18th-century painted Havelis and intricate brass woodwork.',
        crafts: ['Fresco Wall Painting', 'Wood Inlay Work'],
        festivals: ['Gangaur', 'Shekhawati Heritage Fair'],
        culinary: ['Bajra Roti with Garlic Chutney'],
        artists: ['Shekhawati Haveli Guild']
      }
    ]
  },
  {
    id: 'state-bihar',
    name: 'Bihar',
    zone: 'East',
    capital: 'Patna',
    tagline: 'Cradle of Mithila Painting & Antiques',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    traditionsCount: 9,
    artisansCount: 420,
    regions: [
      {
        id: 'reg-mithila',
        name: 'Mithila Region',
        center: 'Madhubani / Darbhanga',
        description: 'Epicenter of Madhubani wall murals, Sikki grass weaving, and Sujani kantha embroidery.',
        crafts: ['Madhubani (Mithila) Painting', 'Sikki Golden Grass Weaving', 'Sujani Embroidery'],
        festivals: ['Chhath Puja', 'Sama Chakeva', 'Madhubani Kala Mahotsav'],
        culinary: ['Litti Chokha', 'Makhana Kheer', 'Thekua'],
        artists: ['Smt. Dulari Devi', 'Bua Devi Guild', 'Karpuri Devi Legacy']
      }
    ]
  },
  {
    id: 'state-odisha',
    name: 'Odisha',
    zone: 'East',
    capital: 'Bhubaneswar',
    tagline: 'Temple Architecture & Palm Leaf Chronicles',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    traditionsCount: 11,
    artisansCount: 290,
    regions: [
      {
        id: 'reg-raghurajpur',
        name: 'Puri Coastal Heritage Belt',
        center: 'Raghurajpur / Puri',
        description: 'Every household in Raghurajpur is an artist studio dedicated to palm leaf engraving and cloth Pattachitra.',
        crafts: ['Raghurajpur Pattachitra', 'Tala Patra Engraving', 'Applique Work (Pipili)', 'Filigree Silver'],
        festivals: ['Rath Yatra', 'Konark Dance Festival', 'Chandan Yatra'],
        culinary: ['Chhena Poda', 'Pakhala Bhata', 'Khaja'],
        artists: ['Rabi Narayan Rath', 'Prabhat Mohapatra']
      }
    ]
  },
  {
    id: 'state-maharashtra',
    name: 'Maharashtra',
    zone: 'West',
    capital: 'Mumbai',
    tagline: 'Ancient Sahyadri Murals & Paithani Silk',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&auto=format&fit=crop&q=80',
    traditionsCount: 12,
    artisansCount: 310,
    regions: [
      {
        id: 'reg-palghar',
        name: 'North Konkan Tribal Belt',
        center: 'Dahanu / Jawhar',
        description: 'Indigenous homeland of the Warli community, honoring earth rhythms with simple white rice paste pictographs.',
        crafts: ['Warli Tribal Painting', 'Bamboo Fish Traps', 'Tarpa Wind Flute Making'],
        festivals: ['Bhavada Mask Dance', 'Gauri-Ganpati Festival', 'Diwali Bohada'],
        culinary: ['Nachni Bhakri', 'Pithla', 'Puran Poli'],
        artists: ['Jivya Soma Mashe Legacy Guild', 'Balu Mashe']
      },
      {
        id: 'reg-paithan',
        name: 'Paithan & Aurangabad Cluster',
        center: 'Chhatrapati Sambhajinagar',
        description: 'Royal court weaving of pure silk Paithani sarees with peacock zari borders dating back to the Satavahanas.',
        crafts: ['Paithani Silk Weaving', 'Himroo Brocade'],
        festivals: ['Ellora Ajanta Festival'],
        culinary: ['Naan Qalia', 'Sol Kadhi'],
        artists: ['Paithani Master Weavers Guild']
      }
    ]
  },
  {
    id: 'state-kashmir',
    name: 'Jammu & Kashmir',
    zone: 'North',
    capital: 'Srinagar',
    tagline: 'Himalayan Pashmina, Walnut Wood & Papier-Mâché',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    traditionsCount: 10,
    artisansCount: 260,
    regions: [
      {
        id: 'reg-kashmir-valley',
        name: 'Srinagar & Budgam Craft City',
        center: 'Srinagar / Kanihama',
        description: 'UNESCO Creative Craft City producing world-renowned Kani Pashmina shawls, carved walnut furniture, and gold papier-mâché.',
        crafts: ['Kani & Pashmina Weaving', 'Papier-Mâché', 'Khatamband Wood Ceiling', 'Walnut Woodcarving'],
        festivals: ['Tulip Festival', 'Shikara Festival', 'Sufi Heritage Nights'],
        culinary: ['Wazwan Gushtaba', 'Kahwa Tea', 'Girda Bread'],
        artists: ['Ghulam Mohammad Zargar', 'Mir Fayaz Papier-Mâché Guild']
      }
    ]
  },
  {
    id: 'state-tamilnadu',
    name: 'Tamil Nadu',
    zone: 'South',
    capital: 'Chennai',
    tagline: 'Chola Bronzes, Temple Silks & Tanjore Gold',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format&fit=crop&q=80',
    traditionsCount: 15,
    artisansCount: 380,
    regions: [
      {
        id: 'reg-thanjavur',
        name: 'Cauvery Delta Temple Belt',
        center: 'Thanjavur / Swamimalai',
        description: 'Living sanctuary of 22K gold foil gesso paintings, Swamimalai lost-wax bronze icons, and Saraswati Veenas.',
        crafts: ['Thanjavur 22K Gold Painting', 'Swamimalai Bronze Casting', 'Thanjavur Art Plates'],
        festivals: ['Tyagaraja Aradhana', 'Brahmotsavam', 'Pongal Festival'],
        culinary: ['Thanjavur Sambhar', 'Ashoka Halwa', 'Filter Coffee'],
        artists: ['Meenakshi Ammal', 'Radhakrishna Sthapathy']
      }
    ]
  },
  {
    id: 'state-andhra',
    name: 'Andhra Pradesh',
    zone: 'South',
    capital: 'Amaravati',
    tagline: 'Freehand Kalamkari & Kondapalli Toys',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
    traditionsCount: 8,
    artisansCount: 220,
    regions: [
      {
        id: 'reg-srikalahasti',
        name: 'Rayalaseema Craft Corridor',
        center: 'Srikalahasti / Tirupati',
        description: 'Famed for organic bamboo-pen painted temple scrolls bathed in sacred river waters and cow milk.',
        crafts: ['Srikalahasti Kalamkari', 'Kondapalli Softwood Toys', 'Dharmavaram Silks'],
        festivals: ['Mahashivaratri Brahmotsavam', 'Sankranti'],
        culinary: ['Ragi Mudde', 'Pootharekulu', 'Gongura Pachadi'],
        artists: ['Jonnalagadda Gurappa Chetty', 'Kondapalli Guild']
      }
    ]
  },
  {
    id: 'state-chhattisgarh',
    name: 'Chhattisgarh',
    zone: 'Central',
    capital: 'Raipur',
    tagline: 'Tribal Metallurgy & Ancient Lost-Wax Bell Metal',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    traditionsCount: 7,
    artisansCount: 180,
    regions: [
      {
        id: 'reg-bastar',
        name: 'Bastar Forest Heartland',
        center: 'Jagdalpur / Kondagaon',
        description: 'Home of the Ghadwa tribal metallurgy masters who have preserved 4,000-year-old hollow bronze casting.',
        crafts: ['Bastar Dhokra Casting', 'Wrought Iron (Loha Shilp)', 'Kosa Tussar Silk'],
        festivals: ['Bastar Dussehra (75-day World Longest Festival)', 'Goncha Festival'],
        culinary: ['Chila with Tomato Chutney', 'Mahuwa Drinks', 'Aamat'],
        artists: ['Babu Lal Baghel', 'Devnath Ghadwa']
      }
    ]
  }
];

// ==========================================================================
// CULTURAL STORIES & DOCUMENTARY DATA FOR LEARN PAGE (SIH 2026)
// ==========================================================================
export const STORIES_DATA = [
  {
    id: 'story-01',
    title: 'The Sacred Geometry of Madhubani: Lines from Mother to Daughter',
    region: 'Mithila, Bihar',
    tradition: 'Madhubani Painting',
    author: 'Cultural Heritage Documentation Cell, JEEVANT',
    readingTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    shortDescription: 'How rural Mithila women transformed bridal nuptial chambers (Kohbar) into a globally protected GI art form rooted in ecological reverence.',
    fullStory: `In the tranquil hamlets of Madhubani district, art is not created for museums; it is lived as prayer. For centuries, women prepared cow-dung-coated mud walls with freshly harvested river clay to paint the Kohbar—the sacred bridal sanctum.

Using broken bamboo twigs wrapped in cotton and needles plucked from native acacia trees, artists drew without preliminary pencil sketches. Every line was drawn with steady, unwavering rhythm. The colors were gathered from kitchen gardens: deep soot from brass oil lamps for black, crushed aparajita flowers for celestial indigo, turmeric boiled with milk for auspicious yellow, and bilva leaf pulp for leafy jade green.

When the massive Bihar earthquake struck in 1934, British civil servant William G. Archer discovered these hidden murals in collapsed dwellings, stunned by their resemblance to Klee and Picasso. Yet, the philosophy was entirely indigenous: in Madhubani art, empty space is considered inauspicious. Every millimeter is filled with birds, lotuses, sunbeams, and holy river fish. Today, under the mentorship of masters like Padma Shri Dulari Devi, the art form has empowered hundreds of rural craftswomen with economic autonomy and pride.`
  },
  {
    id: 'story-02',
    title: 'Cobalt, Quartz and Desert Kites: The Resurgence of Jaipur Blue Pottery',
    region: 'Jaipur, Rajasthan',
    tradition: 'Jaipur Blue Pottery',
    author: 'Rajasthan Craft Archives & JEEVANT',
    readingTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80',
    shortDescription: 'The incredible story of how two kite-flying potters from Kot Jewar caught the eye of Maharaja Sawai Ram Singh II and revived Persian quartz ceramics.',
    fullStory: `Unlike classical Indian terracotta pottery formed from alluvial riverbed mud, Jaipur Blue Pottery contains not a single grain of clay. Instead, its foundation is ground quartz stone crystals, crushed culinary bottle glass, Fuller earth, and organic seed gum.

The craft arrived in India through Mughal royal courts influenced by Persian tiles. Legend recounts that in the mid-19th century, Sawai Ram Singh II attended a royal kite flying festival in Jaipur. Two village potters, Churaman and Kaluram, coated their kite strings with mysterious turquoise ceramic glass powder, out-cutting all royal opponents. Impressed, the Maharaja invited them to study at the royal palace atelier.

By the 1960s, however, competition from cheap plastics had pushed the craft to the edge of extinction. It took the visionary dedication of artist Kripal Singh Shekhawat and patron Gayatri Devi to re-establish kilns, train cluster artisans, and codify the 25 distinct botanical motifs that today carry the official Geographical Indication (GI-IN-0028).`
  },
  {
    id: 'story-03',
    title: 'The Mohenjo-Daro Legacy: 4,000 Years of Bastar Lost-Wax Metallurgy',
    region: 'Kondagaon, Bastar, Chhattisgarh',
    tradition: 'Dhokra Lost-Wax Metallurgy',
    author: 'Tribal Research Wing, JEEVANT',
    readingTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    shortDescription: 'Witness how tribal metallurgy families in Chhattisgarh channel Harappan lost-wax casting using beeswax, termite mounds, and molten brass.',
    fullStory: `When archeologists unearthed the iconic bronze Dancing Girl at Mohenjo-daro in 1926, they marvelled at the sophisticated lost-wax method known in Sanskrit as 'Cire Perdue'. Four millennia later, in the dense sal forests of Bastar, the Ghadwa tribal blacksmiths practice this identical craft.

The process begins deep in the forest, gathering wild honeycombs. The pure beeswax is boiled, filtered, and pressed through wooden die-pistons into thin, noodle-like cords. The artisan molds an initial core of termite mound clay mixed with rice husks, and then wraps the wax cords spirally around the core to sculpt intricate bracelets, ceremonial deers, and village protective deities.

A second thick layer of riverbed clay seals the wax structure, leaving only narrow drainage sprues. When the clay mold is heated in open-hearth pit fires fueled by dried cow dung, the melted wax drains away into the earth—sacrificing itself so molten brass can rush into the hollow chamber. No two Dhokra sculptures are ever alike, because the clay mold must be shattered to liberate the born bronze.`
  },
  {
    id: 'story-04',
    title: 'Whisper of the High Passes: The Sacred Weave of Changthangi Pashmina',
    region: 'Kanihama & Changthang, Kashmir',
    tradition: 'Kashmiri Pashmina Weaving',
    author: 'Himalayan Living Archives, JEEVANT',
    readingTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    shortDescription: 'Follow the journey of delicate underfleece from nomadic Changpa herders at 14,000 feet to the hand-drawn pit looms of Kanihama master weavers.',
    fullStory: `At altitudes exceeding 14,000 feet in Ladakh where winter temperatures drop below minus 40°C, the nomadic Changpa tribes graze the Capra Hircus goat. To survive the extreme Himalayan frost, the goats grow an impossibly fine undercoat—six times finer than human hair, measuring just 12 to 15 microns in diameter.

In spring, the fleece is gently combed out, not shorn. Transported to the valley of Kashmir, it is entrusted to women spinners who spin the gossamer thread on traditional Charkhas using powdered rice water as sizing agent. 

In Kanihama village, master weavers translate ancient rhythmic poetic notations called 'Talim' into wooden needle movements. Unlike automated powerlooms that crush natural wool elasticity, the handloom retains the crimp and air pockets, producing a fabric that feels as light as morning mist yet retains unparalleled warmth. JEEVANT ensures every shawl carries its verified GI registration and fair-trade DBT payment directly to the weaving household.`
  }
];

// ==========================================================================
// INTERACTIVE HERITAGE QUIZ DATA FOR LEARN PAGE
// ==========================================================================
export const QUIZ_DATA = [
  {
    id: 'q1',
    question: 'Which of the following traditional art forms utilizes no natural clay in its composition, relying instead on quartz stone powder and glass?',
    options: [
      'Gorakhpur Terracotta',
      'Jaipur Blue Pottery',
      'Khurja Pottery',
      'Bankura Horse Ceramics'
    ],
    correctAnswer: 1,
    explanation: 'Jaipur Blue Pottery (GI-IN-0028) is unique in Indian ceramics because it is completely clay-free! It is made using quartz stone powder, cullet glass, Multani Mitti (Fuller earth), and gum.'
  },
  {
    id: 'q2',
    question: 'What ancient artifact excavated from Mohenjo-daro (circa 2500 BCE) proves the continuous 4,000+ year lineage of Dhokra lost-wax casting?',
    options: [
      'The Priest-King Bust',
      'The Bronze Dancing Girl',
      'The Great Bath Seal',
      'Pashupati Shiva Seal'
    ],
    correctAnswer: 1,
    explanation: 'The world-famous bronze figurine of the Dancing Girl found at Mohenjo-daro was created using hollow lost-wax casting (Cire Perdue), identical in metallurgical principle to the Bastar Dhokra practiced today.'
  },
  {
    id: 'q3',
    question: 'In Madhubani (Mithila) folk painting, what traditional tool is traditionally used instead of synthetic hairbrushes to apply ink?',
    options: [
      'Horsehair calligraphy brushes',
      'Bamboo twigs wrapped in raw cotton and acacia needles',
      'Steel-tip fountain nibs',
      'Peacock feather quills with graphite'
    ],
    correctAnswer: 1,
    explanation: 'Madhubani painters traditionally use sharpened bamboo twigs, reed quills, and matchsticks wrapped in cotton to achieve the characteristic double-line Kachni and Bharni strokes.'
  },
  {
    id: 'q4',
    question: 'Which sacred river in Andhra Pradesh plays an essential chemical role in fixing the natural root dyes of Srikalahasti Kalamkari?',
    options: [
      'Godavari River',
      'Swarnamukhi River',
      'Krishna River',
      'Tungabhadra River'
    ],
    correctAnswer: 1,
    explanation: 'The Swarnamukhi River in Srikalahasti contains alkaline mineral sands and running water essential for the repeated washing stages that naturally fix myrobalan and alum vegetable mordants.'
  },
  {
    id: 'q5',
    question: 'Under the JEEVANT Fair-Trade Direct Benefit Transfer (DBT) model, what percentage of platform fee is charged to traditional artisans?',
    options: [
      '20% Commission',
      '15% Processing Fee',
      '0% Commission (100% Direct to Artisan)',
      '10% State Royalty'
    ],
    correctAnswer: 2,
    explanation: 'In alignment with the Smart India Hackathon 2026 Problem Statement PS 26197, JEEVANT operates with a strict 0% intermediary platform fee, guaranteeing that 100% of masterclass and craft proceeds disburse directly to the master craftsperson.'
  }
];

// ==========================================================================
// HERITAGE MASTERCLASS DOCUMENTARY VIDEOS DATA
// ==========================================================================
export const VIDEOS_DATA = [
  {
    id: 'vid-1',
    title: 'Sacred Lines: The Women Masters of Mithila',
    duration: '14:20',
    views: '48.2K',
    artisan: 'Smt. Dulari Devi',
    craft: 'Madhubani Painting',
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-2',
    title: 'Fire & Quartz: Alchemy of Jaipur Blue Pottery',
    duration: '18:45',
    views: '32.6K',
    artisan: 'Kripal Singh Guild',
    craft: 'Blue Pottery',
    thumbnail: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-3',
    title: 'The Forest Casting: 4,000 Years of Bastar Dhokra',
    duration: '21:10',
    views: '29.1K',
    artisan: 'Babu Lal Baghel',
    craft: 'Lost-Wax Metallurgy',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-4',
    title: 'Circle of Life: Warli Indigenous Wall Murals',
    duration: '12:50',
    views: '54.0K',
    artisan: 'Jivya Soma Guild',
    craft: 'Warli Art',
    thumbnail: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
  }
];
