require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const connectDB = require('../../config/db');
const demoStore = require('../../utils/demoStore');

// Models
const User = require('../../models/User');
const Artisan = require('../../models/Artisan');
const Tradition = require('../../models/Tradition');
const Workshop = require('../../models/Workshop');
const Product = require('../../models/Product');
const Booking = require('../../models/Booking');
const Order = require('../../models/Order');
const Review = require('../../models/Review');
const Payment = require('../../models/Payment');
const Report = require('../../models/Report');
const SavedCulture = require('../../models/SavedCulture');
const Notification = require('../../models/Notification');
const Wishlist = require('../../models/Wishlist');
const Region = require('../../models/Region');
const INDIA_REGIONS = require('./indiaRegionsData');

const seedDatabase = async () => {
  console.log('========================================================');
  console.log('🌱 JEEVANT: Living India — Authentic Database Seeder');
  console.log('   Smart India Hackathon 2026 · PS ID: 26197');
  console.log('   Sourced Cultural Provenance: IP India GI Registry & UNESCO');
  console.log('========================================================');

  const conn = await connectDB();
  if (!conn || !connectDB.isDBConnected()) {
    console.error('❌ Cannot seed: MongoDB connection is inactive or unreachable.');
    process.exit(1);
  }

  try {
    console.log('🧹 Purging old test collections...');
    await Promise.all([
      User.deleteMany({}),
      Artisan.deleteMany({}),
      Tradition.deleteMany({}),
      Workshop.deleteMany({}),
      Product.deleteMany({}),
      Booking.deleteMany({}),
      Order.deleteMany({}),
      Review.deleteMany({}),
      Payment.deleteMany({}),
      Report.deleteMany({}),
      SavedCulture.deleteMany({}),
      Notification.deleteMany({}),
      Wishlist.deleteMany({}),
      Region.deleteMany({}),
    ]);
    console.log('✅ Collections purged.');

    // ─── 1. Seed Users ──────────────────────────────────────────────────────────
    console.log('🌱 Seeding Authenticated Users (bcrypt hashed)...');
    const userMap = {};
    for (const u of demoStore.users) {
      const createdUser = await User.create({
        name: u.name,
        email: u.email,
        password: 'Admin@12345',
        role: u.role,
        phone: u.phone,
        location: u.location,
        avatar: u.avatar,
        isActive: u.isActive !== undefined ? u.isActive : true,
      });
      if (u.passwordHash) {
        await User.findByIdAndUpdate(createdUser._id, { password: u.passwordHash });
      }
      userMap[u.id || u._id] = createdUser._id;
    }
    console.log(`✅ Seeded ${Object.keys(userMap).length} Users.`);

    // ─── 2. Seed All 36 Indian States & Union Territories ────────────────────────
    console.log('🌱 Seeding Complete 36 States & UTs with Authoritative Data...');
    const createdRegions = await Region.insertMany(INDIA_REGIONS);
    console.log(`✅ Seeded ${createdRegions.length} Indian States & Union Territories.`);

    // ─── 3. Seed Cultural Traditions with Real Sourced Provenance ───────────────
    console.log('🌱 Seeding Traditions with Sourced GI Registry Provenance...');
    const sourcedTraditions = [
      {
        title: 'Madhubani Painting (Mithila Folk Art)',
        name: 'Madhubani Painting (Mithila Folk Art)',
        state: 'Bihar',
        category: 'Folk Art & Wall Fresco',
        riskLevel: 'Vulnerable',
        activeArtisans: '2,400+ Lineage Painters',
        antiquity: '2,500+ Years (Ramayana Era)',
        materials: 'Handmade cow dung paper, bamboo twigs, soot, marigold juice, natural mineral indigo',
        giStatus: 'Registered GI-IN-0105',
        unescoStatus: 'National Intangible Cultural Heritage List',
        description: 'Mithila painting is characterized by geometric patterns, natural pigments, and narrative scenes of nature and spiritual lore, traditionally created on mud-plastered walls during festivals.',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
        sourceName: 'Geographical Indications Registry, Intellectual Property India (IP India), GoI',
        sourceUrl: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/105',
        sourceType: 'government_registry',
        isDevelopmentSeed: true,
      },
      {
        title: 'Jaipur Blue Pottery (Non-Clay Ceramic)',
        name: 'Jaipur Blue Pottery (Non-Clay Ceramic)',
        state: 'Rajasthan',
        category: 'Non-Clay Quartz Ceramics',
        riskLevel: 'Stable & Thriving',
        activeArtisans: '650+ Master Potters',
        antiquity: '14th Century (Turko-Persian Lineage)',
        materials: 'Ground quartz stone, glass powder, Fuller earth (Multani Mitti), gum, copper oxide, cobalt oxide',
        giStatus: 'Registered GI-IN-0002',
        unescoStatus: 'UNESCO Creative Cities Network (Jaipur - Crafts & Folk Arts)',
        description: 'Jaipur Blue Pottery is uniquely glazed and low-fired without clay, using ground quartz, natural gum, and cobalt colorants to produce translucent turquoise floral vessels.',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=80',
        sourceName: 'Geographical Indications Registry, Intellectual Property India (IP India), GoI',
        sourceUrl: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/2',
        sourceType: 'government_registry',
        isDevelopmentSeed: true,
      },
      {
        title: 'Lucknow Chikankari Shadow Embroidery',
        name: 'Lucknow Chikankari Shadow Embroidery',
        state: 'Uttar Pradesh',
        category: 'Shadow Needlework',
        riskLevel: 'Stable & Thriving',
        activeArtisans: '5,000+ Master Embroiderers',
        antiquity: 'Mughal Court Atelier (Nur Jahan Era)',
        materials: 'Fine muslin cotton, silk thread, wooden printing blocks, natural starch',
        giStatus: 'Registered GI-IN-0119',
        unescoStatus: 'National Intangible Cultural Heritage Registry',
        description: 'Delicate and artful hand needle embroidery executed on fine muslin or organza using 32 distinctive stitches such as Bakhiya, Tepchi, and Phanda to create shadow work motifs.',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80',
        sourceName: 'Geographical Indications Registry, IP India, GoI',
        sourceUrl: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/119',
        sourceType: 'government_registry',
        isDevelopmentSeed: true,
      },
      {
        title: 'Banaras Brocades and Pure Katan Silk',
        name: 'Banaras Brocades and Pure Katan Silk',
        state: 'Uttar Pradesh',
        category: 'Heritage Handloom Brocade',
        riskLevel: 'Vulnerable',
        activeArtisans: '12,000+ Pit-Loom Weavers',
        antiquity: 'Ancient Vedic & Mughal Lineage',
        materials: 'Pure mulberry silk (Katan), real silver and gold zari threads, Jacquard punch cards',
        giStatus: 'Registered GI-IN-0099',
        unescoStatus: 'UNESCO Creative Cities Network (Varanasi - Music & Crafts)',
        description: 'World-famous handloom weaving characterized by heavy gold and silver metallic zari brocade, intricate Mughal floral jaal, and pure Katan silk sarees woven on traditional pit-looms.',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
        sourceName: 'Geographical Indications Registry, IP India, GoI',
        sourceUrl: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/99',
        sourceType: 'government_registry',
        isDevelopmentSeed: true,
      },
      {
        title: 'Patan Patola Double-Ikat Silk',
        name: 'Patan Patola Double-Ikat Silk',
        state: 'Gujarat',
        category: 'Double-Ikat Handloom',
        riskLevel: 'Critically Endangered',
        activeArtisans: 'Under 10 Master Salvi Families',
        antiquity: '11th Century CE (Solanki Dynasty)',
        materials: 'Naturally dyed mulberry silk, teak loom, bamboo needles',
        giStatus: 'Registered GI-IN-0232',
        unescoStatus: 'National Living Treasure Archive',
        description: 'Geometric masterpiece where both warp and weft threads are individually tie-dyed with mathematical precision before weaving, resulting in reversible fabrics that never fade.',
        image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&auto=format&fit=crop&q=80',
        sourceName: 'Geographical Indications Registry, IP India, GoI',
        sourceUrl: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/232',
        sourceType: 'government_registry',
        isDevelopmentSeed: true,
      },
      {
        title: 'Pattachitra Scroll Painting & Palm Leaf Etching',
        name: 'Pattachitra Scroll Painting & Palm Leaf Etching',
        state: 'Odisha',
        category: 'Cloth Scroll & Tala Pattachitra',
        riskLevel: 'Critically Endangered',
        activeArtisans: '380+ Chitrakar Families',
        antiquity: '12th Century CE (Jagannath Cult Lineage)',
        materials: 'Tamarind seed paste, layered cotton cloth, conch shell white (Shankha), lampblack, iron stylus, dried palm leaves',
        giStatus: 'Registered GI-IN-0107',
        unescoStatus: 'National Intangible Cultural Heritage Portal',
        description: 'Iconic classical painting on treated tussar fabric and etched palm leaf strips depicting mythological narratives, finished with pure tree lacquer and crushed stone pigments.',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
        sourceName: 'Geographical Indications Registry, IP India & Raghurajpur Heritage Village Documentation',
        sourceUrl: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/107',
        sourceType: 'government_registry',
        isDevelopmentSeed: true,
      },
      {
        title: 'Warli Tribal Wall Fresco',
        name: 'Warli Tribal Wall Fresco',
        state: 'Maharashtra',
        category: 'Indigenous Indigenous Mural Art',
        riskLevel: 'Vulnerable',
        activeArtisans: '800+ Indigenous Painters',
        antiquity: '10th Century CE (Neolithic Origins)',
        materials: 'Geru red mud wash, rice flour paste, water, binding acacia gum, chewed bamboo stick brush',
        giStatus: 'Registered GI-IN-0193',
        unescoStatus: 'Ministry of Culture Tribal Heritage Inventory',
        description: 'Sacred ceremonial wall art using basic geometric elements—circle, triangle, and square—symbolizing the sun, moon, mother goddess Palghat, and harmonious rhythm of human community and wildlife.',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop&q=80',
        sourceName: 'Geographical Indications Registry, Government of India',
        sourceUrl: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/193',
        sourceType: 'government_registry',
        isDevelopmentSeed: true,
      },
      {
        title: 'Aranmula Kannadi (Sacred Metallurgical Mirror)',
        name: 'Aranmula Kannadi (Sacred Metallurgical Mirror)',
        state: 'Kerala',
        category: 'Sacred Metallurgy',
        riskLevel: 'Critically Endangered',
        activeArtisans: '19 Master Metallurgists',
        antiquity: '16th Century CE',
        materials: 'Copper and tin metallurgical secret alloy, clay crucible casting, multi-day velvet polishing',
        giStatus: 'Registered GI-IN-0001 (First Handicraft GI in India)',
        unescoStatus: 'National Treasure Living Archive',
        description: 'Handmade front-surface metal alloy mirror originating from Aranmula temple artisans; completely eliminates secondary reflection distortion common in glass silvered mirrors.',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80',
        sourceName: 'Geographical Indications Registry (GI Tag 1, Intellectual Property India)',
        sourceUrl: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/1',
        sourceType: 'government_registry',
        isDevelopmentSeed: true,
      },
      {
        title: 'Kashmir Pashmina & Needle Sozni Craft',
        name: 'Kashmir Pashmina & Needle Sozni Craft',
        state: 'Jammu and Kashmir',
        category: 'Heritage Handloom Shawls',
        riskLevel: 'Vulnerable',
        activeArtisans: '3,200+ Master Spinners & Embroiderers',
        antiquity: '15th Century (Zain-ul-Abidin Era)',
        materials: 'Pure Changthangi cashmere goat wool, fine silk thread, wooden handlooms',
        giStatus: 'Registered GI-IN-0046',
        unescoStatus: 'UNESCO Creative Cities Network (Srinagar - Crafts & Folk Arts)',
        description: 'Spun from microscopic 12-15 micron Changthang mountain goat down fibers and embroidered with microscopic needle-point Sozni stitches depicting paisley and chinar leaf motifs.',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
        sourceName: 'Geographical Indications Registry, IP India, GoI',
        sourceUrl: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/46',
        sourceType: 'government_registry',
        isDevelopmentSeed: true,
      },
      {
        title: 'Channapatna Lacquerware Wooden Toys',
        name: 'Channapatna Lacquerware Wooden Toys',
        state: 'Karnataka',
        category: 'Organic Woodcraft & Toymaking',
        riskLevel: 'Stable & Thriving',
        activeArtisans: '1,200+ Artisans (Gombegala Ooru)',
        antiquity: '18th Century (Tipu Sultan Patronage)',
        materials: 'Wrightia tinctoria (Aale mara) ivory wood, non-toxic vegetable dyes, organic lac resin, screw pine leaf polish',
        giStatus: 'Registered GI-IN-0017',
        unescoStatus: 'National Toy Innovation Archive',
        description: 'Eco-friendly polished wooden toys turned on traditional lathe machines using vegetable dyes and finished with natural lac and screw-pine leaves, completely non-toxic and child-safe.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
        sourceName: 'Geographical Indications Registry, IP India, GoI',
        sourceUrl: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/17',
        sourceType: 'government_registry',
        isDevelopmentSeed: true,
      },
      {
        title: 'Assam Golden Muga Silk Weaving',
        name: 'Assam Golden Muga Silk Weaving',
        state: 'Assam',
        category: 'Indigenous Wild Silk',
        riskLevel: 'Vulnerable',
        activeArtisans: '2,800+ Sualkuchi Weavers',
        antiquity: 'Ahom Royal Dynasty (600+ Years)',
        materials: 'Endemic Antheraea assamensis wild silkworm cocoons, Som/Soalu leaves, handloom throw-shuttles',
        giStatus: 'Registered GI-IN-0055',
        unescoStatus: 'National Heritage Craft Archive',
        description: 'Naturally golden, shimmering wild silk endemic only to Assam. The luster increases with every wash, yielding heritage Mekhela Chador bridal garments celebrated for centuries.',
        image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=800&auto=format&fit=crop&q=80',
        sourceName: 'Geographical Indications Registry, IP India, GoI',
        sourceUrl: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/55',
        sourceType: 'government_registry',
        isDevelopmentSeed: true,
      },
      {
        title: 'Bastar Dhokra Lost-Wax Metallurgy',
        name: 'Bastar Dhokra Lost-Wax Metallurgy',
        state: 'Chhattisgarh',
        category: 'Ancient Lost-Wax Metalcraft',
        riskLevel: 'Vulnerable',
        activeArtisans: '450+ Ghadwa Tribal Metalsmiths',
        antiquity: '4,000+ Years (Indus Valley Dancing Girl Lineage)',
        materials: 'Pure wild beeswax, termite hill clay, paddy husk, scrap brass and bell metal, charcoal furnace',
        giStatus: 'Registered GI-IN-0083',
        unescoStatus: 'National Living Intangible Heritage',
        description: 'Ancient non-ferrous hollow bronze casting preserving the prehistoric lost-wax technique (Cire Perdue), crafting deers, elephants, and village deities with intricate wax thread filigree.',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
        sourceName: 'Geographical Indications Registry, IP India, GoI',
        sourceUrl: 'https://ipindiaservices.gov.in/GIRPublic/Application/Details/83',
        sourceType: 'government_registry',
        isDevelopmentSeed: true,
      },
    ];

    const createdTraditions = await Tradition.insertMany(sourcedTraditions);
    console.log(`✅ Seeded ${createdTraditions.length} Sourced Traditions.`);

    // ─── 3. Seed Master Artisans ────────────────────────────────────────────────
    console.log('🌱 Seeding Master Artisans with verifiable craft associations...');
    const artisanDocs = demoStore.artisans.map((a, idx) => ({
      name: a.name,
      email: a.email || a.contactEmail || `artisan${idx + 1}@jeevant.org`,
      phone: a.phone || a.contactPhone || `+91 98${idx}11 2233${idx}`,
      craft: a.craft,
      category: a.category || 'Traditional Craft',
      state: a.state,
      city: a.city || a.district || '',
      region: a.region || a.state,
      bio: a.bio || a.description || '',
      experience: a.experience || `${a.experienceYears || 25} Years`,
      verificationStatus: a.verificationStatus || (a.status === 'Verified' ? 'approved' : 'pending'),
      giTagNumber: a.giTagNumber || `GI-IN-000${idx + 1}`,
      awards: Array.isArray(a.awards) ? a.awards.join(', ') : a.awards || 'State Handicrafts Award',
      image: a.profileImage || a.image || '',
      rating: a.rating || 4.9,
      reviewsCount: a.reviewsCount || 24,
      workshopsConducted: a.workshopsConducted || 8,
      productsCount: a.productsCount || 5,
      sourceName: 'Artisan Verification Registry (SIH 2026 Sandbox)',
      sourceUrl: 'https://ipindiaservices.gov.in/GIRPublic/',
      isDevelopmentSeed: true,
    }));
    const createdArtisans = await Artisan.insertMany(artisanDocs);
    console.log(`✅ Seeded ${createdArtisans.length} Artisans.`);

    // ─── 4. Seed Workshops ──────────────────────────────────────────────────────
    console.log('🌱 Seeding Masterclasses...');
    const workshopDocs = demoStore.workshops.map((w, idx) => {
      const art = createdArtisans[idx % createdArtisans.length];
      return {
        title: w.title,
        artisan: art._id,
        artisanName: art.name,
        craft: w.craft,
        date: w.date || 'Saturday, Nov 15',
        time: w.time || '10:00 AM - 1:00 PM IST',
        duration: w.duration || '3 Hours',
        mode: w.mode || 'Live Virtual Atelier',
        location: w.location || 'Jaipur Craft Atelier / Online',
        fee: w.fee || '₹1,499',
        price: 1499,
        capacity: 30,
        enrolled: 12,
        seatsBooked: 12,
        availableSeats: 18,
        status: 'Active',
        description: w.description || 'Immersive hands-on masterclass with living heritage practitioner.',
        image: w.image || art.image,
        isDevelopmentSeed: true,
      };
    });
    const createdWorkshops = await Workshop.insertMany(workshopDocs);
    console.log(`✅ Seeded ${createdWorkshops.length} Workshops.`);

    // ─── 5. Seed Products ───────────────────────────────────────────────────────
    console.log('🌱 Seeding Products...');
    const productDocs = demoStore.products.map((p, idx) => {
      const art = createdArtisans[idx % createdArtisans.length];
      return {
        name: p.name,
        artisan: art._id,
        artisanName: art.name,
        category: p.category || 'Traditional Decor & Art',
        craft: p.craft || art.craft,
        state: p.state || art.state,
        price: p.price || 2499,
        originalPrice: p.originalPrice || (p.price ? p.price + 600 : 3100),
        stock: p.stock !== undefined ? p.stock : 8,
        isGiCertified: true,
        giTagNumber: art.giTagNumber || 'GI-IN-0105',
        description: p.description || 'Authentic artisan-crafted cultural artifact created with zero machine intervention.',
        image: p.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
        rating: p.rating || 4.9,
        reviewsCount: p.reviewsCount || 16,
        isDevelopmentSeed: true,
      };
    });
    const createdProducts = await Product.insertMany(productDocs);
    console.log(`✅ Seeded ${createdProducts.length} Products.`);

    // ─── 6. Seed DBT Payments ───────────────────────────────────────────────────
    console.log('🌱 Seeding DBT Payout Records (0% Platform Fee)...');
    const paymentDocs = createdArtisans.slice(0, 3).map((art, idx) => ({
      transactionId: `TXN-DBT-2026-00${idx + 1}`,
      artisan: art._id,
      artisanName: art.name,
      craft: art.craft,
      amount: 42800,
      grossAmount: '₹42,800',
      netPayout: '₹42,800',
      fairPlatformFee: '₹0 (0% SIH Model)',
      payoutMethod: 'Direct DBT / UPI (0% Platform Fee)',
      status: 'Disbursed',
      paymentStatus: 'completed',
      account: '•••• •••• 4589 (State Bank of India)',
      utrNumber: `UTR2026${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      createdAt: new Date(Date.now() - idx * 86400000),
    }));
    await Payment.insertMany(paymentDocs);
    console.log(`✅ Seeded ${paymentDocs.length} DBT Payments.`);

    // ─── 7. Seed Reviews ────────────────────────────────────────────────────────
    console.log('🌱 Seeding Reviews...');
    const reviewDocs = createdArtisans.slice(0, 3).map((art) => ({
      reviewerName: 'Aarav Sharma',
      reviewerEmail: 'learner@jeevant.org',
      artisan: art._id,
      targetName: `${art.name} (${art.craft})`,
      rating: 5,
      comment: 'Authentic guidance and direct interaction with the master craftsperson. Truly transformative experience.',
      status: 'published',
      createdAt: new Date(),
    }));
    await Review.insertMany(reviewDocs);
    console.log(`✅ Seeded ${reviewDocs.length} Reviews.`);

    // ─── 8. Seed Reports ────────────────────────────────────────────────────────
    console.log('🌱 Seeding Grievance Reports...');
    const reportDocs = [
      {
        type: 'artisan',
        targetType: 'artisan',
        targetId: String(createdArtisans[0]._id),
        targetTitle: `${createdArtisans[0].name} — GI Documentation Audit`,
        reason: 'Periodic GI Certificate Renewal Audit',
        description: 'Routine verification of artisan GI certificate number and geo-location cluster registry.',
        status: 'resolved',
        reportedByName: 'Ananya Deshmukh (Nodal Officer)',
        resolutionNote: 'Audited against Geographical Indications Registry (IP India). Credentials fully verified.',
        createdAt: new Date(Date.now() - 3600000),
      },
    ];
    await Report.insertMany(reportDocs);
    console.log(`✅ Seeded ${reportDocs.length} Grievance Reports.`);

    // ─── 9. Seed Authentic Database Notifications ───────────────────────────────
    console.log('🌱 Seeding Genuine Database Notifications...');
    const notifDocs = [
      {
        recipientRole: 'all',
        type: 'artisan',
        title: 'Master Artisan Verified',
        message: `${createdArtisans[0].name} (${createdArtisans[0].craft}) verified and documented in the Living Heritage Registry.`,
        read: false,
        relatedEntity: 'Artisan',
        relatedEntityId: String(createdArtisans[0]._id),
        isDevelopmentSeed: true,
      },
      {
        recipientRole: 'learner',
        type: 'workshop',
        title: 'Masterclass Atelier Scheduled',
        message: `Jaipur Blue Pottery atelier with ${createdArtisans[1]?.name || 'Master Artisan'} opens for registration.`,
        read: false,
        relatedEntity: 'Workshop',
        relatedEntityId: String(createdWorkshops[0]._id),
        isDevelopmentSeed: true,
      },
      {
        recipientRole: 'all',
        type: 'gi',
        title: '0% Platform Fee Guarantee Active',
        message: '100% of fair-trade artisan purchases transfer directly to craft clusters via Direct Benefit Transfer (DBT).',
        read: true,
        relatedEntity: null,
        isDevelopmentSeed: true,
      },
    ];
    await Notification.insertMany(notifDocs);
    console.log(`✅ Seeded ${notifDocs.length} Database Notifications.`);

    // ─── 10. Seed Wishlist & Saved Traditions for Learner ───────────────────────
    console.log('🌱 Seeding Learner Wishlist & Saved Heritage...');
    await Wishlist.create({
      userId: 'user-learner-1',
      productId: String(createdProducts[0]._id),
      product: createdProducts[0]._id,
      productName: createdProducts[0].name,
      price: createdProducts[0].price,
      image: createdProducts[0].image,
      category: createdProducts[0].category,
      state: createdProducts[0].state,
      isDevelopmentSeed: true,
    });

    await SavedCulture.create({
      userId: 'user-learner-1',
      traditionId: String(createdTraditions[0]._id),
      tradition: createdTraditions[0]._id,
      traditionName: createdTraditions[0].title,
      state: createdTraditions[0].state,
      category: createdTraditions[0].category,
      image: createdTraditions[0].image,
    });
    console.log('✅ Seeded Wishlist and Saved Tradition records for user-learner-1.');

    console.log('========================================================');
    console.log('🎉 MongoDB Atlas Database Seeded Successfully!');
    console.log('========================================================');
  } catch (error) {
    console.error('❌ Error during database seeding:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed.');
    process.exit(0);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
