# API Integration

| Frontend Route                 | Purpose                               | Backend API                       |
| ------------------------------ | ------------------------------------- | --------------------------------- |
| `/`                            | Home page with featured gear          | `GET /api/gear`                   |
| `/gears`                       | Browse and filter search gear         | `GET /api/gear`                   |
| `/gears`                       | Load gear categories                  | `GET /api/categories`             |
| `/gears/[id]`                  | View gear details                     | `GET /api/gear/:id`               |
| `/register`                    | User registration                     | `POST /api/auth/register`         |
| `/login`                       | User login                            | `POST /api/auth/login`            |
| `/dashboard`                   | Customer dashboard and rental history | `GET /api/rentals`                |
| `/dashboard`                   | Customer payment history              | `GET /api/payments`               |
| `/checkout/[id]`               | Create rental request                 | `POST /api/rentals`               |
| `/checkout/[id]`               | Check gear availability               | `POST /api/gear/availability/:id` |
| `/dashboard/my-rentals`        | View customer rental orders           | `GET /api/rentals`                |
| `/dashboard/my-rentals`        | Create Stripe payment session         | `POST /api/payments/create`       |
| `/payment/success`             | Payment success handling              | Stripe session confirmation       |
| `/payment/cancel`              | Payment cancellation handling         | URL query parameters              |
| `/provider-dashboard`          | Provider overview and inventory list  | `GET /api/provider/gear`          |
| `/provider-dashboard/Inventory`| Add new gear                          | `POST /api/provider/gear`         |
| `/provider-dashboard/orders`   | View provider rental orders           | `GET /api/provider/orders`        |
| `/provider-dashboard/my-gears` | View provider gears                   | `GET /api/provider/gear`          |
| `/provider-dashboard/orders`   | Update rental order status            | `PATCH /api/provider/orders/:id`  |
| `/provider-dashboard/reviews`  | views reviews provider                | `/api/reviews`                    |
| `/profile`                     | all users update profile              | `/api/auth/me`                    |
| `/admin-dashboard`             | Admin user management                 | `GET /api/admin/users`            |
| `/dashboard/admin`             | Update user status/role               | `PATCH /api/admin/users/:id`      |
| `/dashboard/admin`             | Manage all gears                      | `GET /api/admin/gear`             |
| `/dashboard/admin`             | Manage all rental orders              | `GET /api/admin/rentals`          |

---

# Authentication APIs

## User Registration

### Endpoint

`POST /api/auth/register`

### Frontend

`/auth/register`

### Purpose

Creates a new customer or provider account.

---

## User Login

### Endpoint

`POST /api/auth/login`

### Frontend

`/auth/login`

### Purpose

Authenticates the user and creates an access token and refresh token.

The authenticated session is maintained using cookies.

---

## Current User

### Endpoint

`GET /api/auth/me`

### Frontend Usage

Used by protected layouts, dashboards, and authentication-related components.

### Purpose

Returns the currently authenticated user's information and role.

---

# Gear APIs

## Get All Gears

### Endpoint

`GET /api/gear`

### Frontend

- `/`
- `/gear`

### Purpose

Fetches available gears for customers.

Supports browsing, searching, filtering, and displaying featured gear.

---

## Get Gear Details

### Endpoint

`GET /api/gear/:id`

### Frontend

`/gear/[id]`

### Purpose

Returns detailed information about a specific gear item.

---

## Get Categories

### Endpoint

`GET /api/categories`

### Frontend

`/gear`

### Purpose

Loads available gear categories for filtering and browsing.

---

# Gear Availability

## Check Gear Availability

### Endpoint

`POST /api/gear/availability/:id`

### Frontend

Checkout page.

### Purpose

Checks whether the requested gear quantity is available for the selected rental period.

### Request Data

```json
{
  "startDate": "2026-09-05",
  "endDate": "2026-09-09",
  "quantity": 2
}
```
