<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

# API Integration Documentation

## Project Overview

GearUp is a sports and outdoor gear rental platform where customers can browse and rent gear, providers can manage their inventory and rental orders, and admins can manage users and platform data.

The frontend communicates with the GearUp backend API for authentication, gear management, rentals, payments, reviews, and dashboard functionality.

---

# API Integration Map

| Frontend Route                 | Purpose                               | Backend API                       |
| ------------------------------ | ------------------------------------- | --------------------------------- |
| `/`                            | Home page with featured gear          | `GET /api/gear`                   |
| `/gear`                        | Browse and filter available gear      | `GET /api/gear`                   |
| `/gear`                        | Load gear categories                  | `GET /api/categories`             |
| `/gear/[id]`                   | View gear details                     | `GET /api/gear/:id`               |
| `/auth/register`               | User registration                     | `POST /api/auth/register`         |
| `/auth/login`                  | User login                            | `POST /api/auth/login`            |
| `/dashboard/customer`          | Customer dashboard and rental history | `GET /api/rentals`                |
| `/dashboard/customer`          | Customer payment history              | `GET /api/payments`               |
| `/checkout/[id]`               | Create rental request                 | `POST /api/rentals`               |
| `/checkout/[id]`               | Check gear availability               | `POST /api/gear/availability/:id` |
| `/dashboard/my-rentals`        | View customer rental orders           | `GET /api/rentals`                |
| `/dashboard/my-rentals`        | Create Stripe payment session         | `POST /api/payments/create`       |
| `/payment/success`             | Payment success handling              | Stripe session confirmation       |
| `/payment/cancel`              | Payment cancellation handling         | URL query parameters              |
| `/dashboard/provider`          | Provider dashboard and inventory      | `GET /api/provider/gear`          |
| `/dashboard/provider/gear/new` | Add new gear                          | `POST /api/provider/gear`         |
| `/dashboard/provider/orders`   | View provider rental orders           | `GET /api/provider/orders`        |
| `/dashboard/provider/orders`   | Update rental order status            | `PATCH /api/provider/orders/:id`  |
| `/dashboard/admin`             | Admin user management                 | `GET /api/admin/users`            |
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
