# GLIMORA DESIGNS

## Development Plan v2.0

### Luxury Jewellery & Gift E-Commerce Platform

**Status:** Planning Phase (Pre-Development)

---

# Vision

Build a premium luxury e-commerce platform that offers a world-class shopping experience for jewellery, accessories, custom gift boxes, jewel bouquets, and hampers.

The first release (MVP) will be built entirely using free technologies while maintaining an architecture that can scale without requiring a complete rewrite.

---

# Core Principles

* Mobile First
* Performance First
* Luxury UI
* Component Driven
* SEO Friendly
* Modular Architecture
* Free Stack (Phase 1)
* Easy Migration to Shopify or Enterprise

---

# Technology Stack (Phase 1)

## Frontend

* Next.js 15 (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Lucide Icons

---

## Backend

* Next.js Route Handlers
* Prisma ORM

---

## Database

* PostgreSQL
* Supabase Free Tier

---

## Authentication

* Supabase Auth

Features

* Email Login
* Google Login
* OTP Login

---

## Storage

Supabase Storage

Store

* Product Images
* Product Videos
* Review Images
* Certificates
* Gift Card Images

---

## Hosting

Frontend

* Vercel Free

Database

* Supabase Free

Version Control

* GitHub

---

## Payment

Razorpay

Support

* UPI
* Cards
* Google Pay
* COD

Apple Pay can be added later.

---

## Email

Resend Free Tier

Used for

* Welcome Email
* Order Confirmation
* Password Reset
* Review Request

---

## Analytics

* Google Analytics 4
* Microsoft Clarity

---

# Project Structure

```
glimora/

app/

components/

features/

lib/

hooks/

services/

store/

types/

utils/

public/

prisma/

supabase/
```

---

# Database Modules

Customer

Products

Categories

Collections

Variants

Orders

Order Items

Wishlist

Cart

Reviews

Coupons

Inventory

Gift Builder

Bouquet Builder

Notifications

Settings

Roles

Permissions

---

# Customer Features

## Home

* Hero Banner
* Featured Collections
* Best Sellers
* Signature Experiences
* Reviews
* Newsletter
* Footer

---

## Collections

* Search
* Filters
* Sort
* Categories
* Wishlist

---

## Product

* Gallery
* Variants
* Reviews
* Related Products
* Trust Badges

---

## Cart

* Quantity
* Coupon
* Gift Wrap
* Order Notes

---

## Checkout

* Address
* Payment
* Review
* Confirmation

---

## Account

* Profile
* Orders
* Wishlist
* Addresses
* Returns

---

## Tracking

* Live Timeline
* Invoice
* Courier Details

---

# Signature Features

## Gift Box Builder

Steps

1. Choose Box
2. Choose Jewellery
3. Choose Accessories
4. Greeting Card
5. Wrapping
6. Preview
7. Add to Cart

---

## Jewel Bouquet Builder

Steps

1. Flowers
2. Jewellery
3. Ribbon
4. Message
5. Preview
6. Add to Cart

---

# Admin Panel (MVP)

## Dashboard

* Revenue
* Orders
* Customers
* Visitors
* Inventory Alerts

---

## Products

CRUD

* Add
* Edit
* Delete
* Duplicate
* Archive

---

## Categories

CRUD

---

## Collections

CRUD

---

## Inventory

* Stock
* Purchase Entry
* Adjustments
* History

---

## Orders

* View
* Update Status
* Print Invoice

---

## Customers

* Profiles
* Order History
* Wishlist

---

## Reviews

* Approve
* Reject
* Reply

---

## Coupons

* Percentage
* Flat
* Free Shipping

---

## Settings

* Store
* Payments
* Shipping
* Staff
* Notifications

---

# Phase 1 (MVP)

## Sprint 1

* Project Setup
* Design System
* Authentication
* Database
* Layout

---

## Sprint 2

* Home
* Collections
* Product
* Search

---

## Sprint 3

* Cart
* Checkout
* Orders
* Customer Account

---

## Sprint 4

* Admin Dashboard
* Products CRUD
* Categories CRUD
* Inventory
* Orders

---

## Sprint 5

* Gift Box Builder
* Jewel Bouquet Builder

---

## Sprint 6

* Testing
* SEO
* Performance
* Production Launch

---

# Future Phase (After Revenue)

Upgrade infrastructure only when required.

## Database

Supabase Pro

---

## Storage

AWS S3

---

## Search

Algolia

---

## Queue

Redis

---

## Email

Resend Pro

---

## Monitoring

Sentry

---

## CDN

Cloudflare

---

## Mobile App

React Native

---

## AI

* Product Recommendations
* Smart Search
* Chat Assistant

---

# Shopify Migration Plan

If business growth requires Shopify:

* Keep luxury UI
* Keep builders
* Keep branding

Move

* Orders
* Products
* Inventory
* Payments
* Shipping

to Shopify while preserving the customer experience.

---

# Development Rules

* TypeScript everywhere
* Component-first architecture
* Reusable UI
* Responsive by default
* Mobile-first design
* Accessibility compliant
* SEO friendly
* Clean Git commits
* Documentation for every module

---

# Launch Checklist

* Authentication
* Product Catalog
* Categories
* Search
* Wishlist
* Cart
* Checkout
* Payments
* Orders
* Customer Account
* Admin Panel
* Inventory
* Gift Builder
* Bouquet Builder
* Analytics
* SEO
* Performance
* Production Deployment

---

# Long-Term Goal

Build Glimora as a premium e-commerce platform that can start on a free infrastructure, scale without major rewrites, and remain independent while retaining the option to integrate or migrate to Shopify if business needs evolve.
