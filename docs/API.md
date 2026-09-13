# JEEVANT: LIVING INDIA — API Documentation
**Smart India Hackathon 2026 | Problem Statement ID: 26197 | Theme: Heritage & Culture**

---

## 1. Overview & General Standards

- **Base URL (Local)**: `http://localhost:5000/api`
- **Frontend Proxy**: Requests to `/api/*` from `http://localhost:5173` are forwarded automatically.
- **Content Type**: `application/json`
- **Authentication**: Bearer Token in `Authorization` header (`Authorization: Bearer <jwt_token>`).

### Standard Response Format
```json
{
  "success": true,
  "message": "Optional human-readable status message",
  "data": {},
  "isLiveDatabase": true,
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 48,
    "totalPages": 4
  }
}
```

---

## 2. Health & System Status

### `GET /api/health`
Returns live system health, database connection state, and hackathon metadata.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "JEEVANT API is running",
  "database": "MongoDB Connected",
  "isLiveDatabase": true,
  "version": "1.0.0",
  "theme": "Heritage & Culture (SIH 2026)",
  "problemStatement": "26197 - Student Innovation",
  "timestamp": "2026-09-13T11:00:00.000Z"
}
```

---

## 3. Authentication (`/api/auth`)

### `POST /api/auth/register`
Registers a new learner or artisan user.
- **Body**:
  ```json
  {
    "name": "Kavita Rao",
    "email": "kavita.rao@example.com",
    "password": "Password@123",
    "role": "learner"
  }
  ```
- **Response (201 Created)**: Returns user object and JWT token.

### `POST /api/auth/login`
Authenticates a user and issues a JWT token.
- **Body**:
  ```json
  {
    "email": "admin@jeevant.gov.in",
    "password": "Admin@12345"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOi...",
    "user": {
      "id": "user-admin-1",
      "name": "Ananya Deshmukh",
      "email": "admin@jeevant.gov.in",
      "role": "admin"
    }
  }
  ```

### `GET /api/auth/me`
Returns current authenticated user profile.
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**: User profile object.

---

## 4. Platform Dashboard Metrics (`/api/admin`)

### `GET /api/admin/dashboard`
Returns live calculated platform metrics across all entities.
- **Access**: Public / Optional Auth (full admin audit if authenticated).
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "isLiveDatabase": true,
    "data": {
      "stats": {
        "totalUsers": 12,
        "totalArtisans": 8,
        "pendingArtisans": 2,
        "approvedArtisans": 6,
        "totalProducts": 8,
        "totalWorkshops": 6,
        "totalBookings": 4,
        "totalOrders": 4,
        "totalTraditions": 8,
        "totalReviews": 8,
        "totalRevenue": "₹1,24,000"
      },
      "pendingArtisans": []
    }
  }
  ```

---

## 5. Artisans Management (`/api/artisans`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/artisans` | Public | List artisans. Query: `?status=&state=&craft=&search=&page=&limit=` |
| `GET` | `/api/artisans/:id` | Public | Get single artisan profile by ID with crafts and workshops |
| `POST` | `/api/artisans` | Public / Onboarding | Submit new artisan application for verification |
| `PUT` / `PATCH` | `/api/artisans/:id` | Admin | Update artisan details |
| `PATCH` | `/api/artisans/:id/approve` | Admin | Approve artisan and verify GI credentials |
| `PATCH` | `/api/artisans/:id/reject` | Admin | Reject application with explanatory audit note |
| `DELETE` | `/api/artisans/:id` | Admin | Remove artisan record |

---

## 6. Cultural Traditions (`/api/traditions`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/traditions` | Public | Browse intangible cultural heritage registry |
| `GET` | `/api/traditions/:id` | Public | Get single tradition details (antiquity, GI, materials) |
| `POST` | `/api/traditions` | Admin | Publish a new tradition into the national registry |
| `PUT` / `PATCH` | `/api/traditions/:id` | Admin | Update tradition data |
| `DELETE` | `/api/traditions/:id` | Admin | Remove tradition |

---

## 7. Workshops & Masterclasses (`/api/workshops`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/workshops` | Public | Browse masterclasses. Query: `?craft=&status=&date=&mode=` |
| `GET` | `/api/workshops/:id` | Public | Get workshop syllabus, timing, and remaining seats |
| `POST` | `/api/workshops/:id/enroll` | Public / Learner | Enroll in masterclass (auto-decrements available seats) |
| `POST` | `/api/workshops` | Artisan / Admin | Create and schedule a new live workshop |
| `PUT` / `PATCH` | `/api/workshops/:id` | Artisan / Admin | Update workshop schedule or details |
| `DELETE` | `/api/workshops/:id` | Admin | Cancel and remove workshop |

---

## 8. Products Catalogue (`/api/products`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/products` | Public | Browse fair-trade craft catalogue. Query: `?category=&minPrice=&maxPrice=&giOnly=` |
| `GET` | `/api/products/:id` | Public | Get craft details, artisan lineage, and dimensions |
| `POST` | `/api/products` | Artisan / Admin | Add authentic craft item with pricing |
| `PUT` / `PATCH` | `/api/products/:id` | Artisan / Admin | Update inventory stock or details |
| `DELETE` | `/api/products/:id` | Admin | Remove craft listing |

---

## 9. Orders & Bookings (`/api/orders` & `/api/bookings`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/orders` | Authenticated | List purchase orders (filterable by `?userId=`) |
| `GET` | `/api/orders/:id` | Authenticated | Get order details and invoice breakdown |
| `POST` | `/api/orders` | Public / Learner | Place fair-trade order (creates 0% fee DBT payout) |
| `GET` | `/api/bookings` | Authenticated | List masterclass bookings (filterable by `?userId=`) |
| `POST` | `/api/bookings` | Public / Learner | Book masterclass pass |
| `PATCH` | `/api/bookings/:id/cancel` | Authenticated | Cancel booking and release seat capacity |

---

## 10. Direct DBT Payments Ledger (`/api/payments`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/payments` | Admin | Audit direct DBT payouts (0% commission ledger) |
| `GET` | `/api/payments/:id` | Admin | Get single transaction record with UTR reference |
| `POST` | `/api/payments` | Authenticated | Record DBT payout transaction |

---

## 11. Grievance Moderation & Reviews (`/api/reports` & `/api/reviews`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/reviews` | Public | List patron reviews |
| `POST` | `/api/reviews` | Authenticated | Submit verified review for workshop or craft |
| `PATCH` | `/api/reviews/:id/toggle-status` | Admin | Toggle review publish/flag state |
| `GET` | `/api/reports` | Admin | View content integrity grievances and audits |
| `POST` | `/api/reports` | Authenticated | File audit grievance |
| `PATCH` | `/api/reports/:id/resolve` | Admin | Mark grievance as resolved |
| `PATCH` | `/api/reports/:id/dismiss` | Admin | Dismiss grievance |

---

## 12. Cross-Entity Search (`/api/search`)

### `GET /api/search?q=query`
Performs multi-entity full-text search across:
- Artisans (name, craft, state, GI number)
- Traditions (title, category, materials)
- Workshops (title, craft, location)
- Products (name, category, description)

---

## 13. Saved Cultures Bookmarks (`/api/saved-cultures`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/saved-cultures?userId=` | Public / Learner | List user's bookmarked traditions |
| `POST` | `/api/saved-cultures/toggle` | Public / Learner | Toggle bookmark for a tradition |

---

## 14. Assistive AI Endpoints (`/api/ai`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/ai/translate` | Authenticated | Translates cultural descriptions between Indian languages |
| `POST` | `/api/ai/structure` | Authenticated | Structures artisan oral history into structured bio fields |
| `GET` | `/api/ai/search?q=&type=` | Public | Semantic search across cultural collections |
