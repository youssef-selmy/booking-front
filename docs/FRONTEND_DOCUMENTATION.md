# Hotel System Frontend Documentation

## Why Professional Documentation Matters

Professional frontend documentation reduces onboarding time, lowers operational mistakes, improves support quality, and makes future development safer. In a hotel system, the UI is part of the daily operation itself, so documentation should explain not only what each screen looks like, but what business purpose it serves and how the user is expected to interact with it.

Good documentation helps:

1. Train front-desk and manager users faster.
2. Give QA and support teams a stable reference.
3. Help new developers understand the screen map and workflow intent.
4. Preserve product knowledge when the team changes.

## GitHub Preview Approach

GitHub cannot render React pages directly inside Markdown as live UI previews.  
Instead of screenshots, this document uses:

- `Route` for where the screen lives
- `Component` for the React file
- `Layout Preview` for a GitHub-friendly text representation of the page design
- `Purpose` for the business role of the screen

This format is better than plain screenshots when you want the documentation to stay readable, searchable, versioned, and easy to maintain in GitHub.

---

## Screen Map

### Authentication

| Screen | Route |
|---|---|
| Login | `/auth/login` |
| Register | `/auth/register` |
| Complete | `/auth/Complete` |
| Forget Password | `/auth/forget-password` |
| Verify | `/auth/verify/:email` |
| Reset | `/auth/reset/:email` |

### Admin

| Screen | Route |
|---|---|
| Admin Dashboard | `/admin` |
| Request Details | `/admin/:id` |

### Manager

| Screen | Route |
|---|---|
| Manager Home | `/manager` |
| Dashboard | `/manager/dashboard` |
| Users | `/manager/users` |
| Travel Agents | `/manager/travel-agents` |
| Channel Management | `/manager/channel-management` |
| Reports | `/manager/reports/*` |
| Settings | `/manager/settings/*` |
| Rooms | `/manager/rooms/*` |

### Front Desk

| Screen | Route |
|---|---|
| Booking | `/front-desk/booking/*` |
| Front Office | `/front-desk/front-office/*` |
| Inventory | `/front-desk/inventory/*` |
| Finance | `/front-desk/finance/*` |
| Reports | `/front-desk/reports/*` |
| Reservation Details | `/front-desk/reservation/:id/*` |

---

## 1. Authentication Screens

### Login

- `Route`: `/auth/login`
- `Purpose`: Authenticates users and sends them to the correct area based on role.

```text
+--------------------------------------------------+
|                   LOGIN PAGE                     |
|                                                  |
|   Logo / Brand                                   |
|   Email Input                                    |
|   Password Input                                 |
|   Login Button                                   |
|   Forgot Password Link                           |
+--------------------------------------------------+
```

### Register

- `Route`: `/auth/register`
- `Purpose`: Creates a new account when registration is enabled.

### Complete

- `Route`: `/auth/Complete`
- `Purpose`: Finishes account setup after registration.

### Forget Password

- `Route`: `/auth/forget-password`
- `Purpose`: Starts password recovery.

### Verify

- `Route`: `/auth/verify/:email`
- `Purpose`: Verifies the password recovery step.

### Reset

- `Route`: `/auth/reset/:email`
- `Purpose`: Sets a new password.

---

## 2. Admin Screens

### Admin Dashboard

- `Route`: `/admin`
- `Purpose`: High-level platform dashboard for admin users.

```text
+---------------------------------------------------------------+
|                       ADMIN DASHBOARD                         |
|---------------------------------------------------------------|
| Summary Cards | Requests Table | Platform Controls            |
+---------------------------------------------------------------+
```

### Request Details

- `Route`: `/admin/:id`
- `Purpose`: Opens one admin request with its complete details.

---

## 3. Manager Screens

### Manager Top Navigation

- `Component`: [ManagerNav.jsx](e:\work\booking-front\HotelSystem\src\pages\Manager\ManagerNav.jsx)
- `Purpose`: Main manager navigation across business modules.

```text
+--------------------------------------------------------------------------------------+
| Dashboard | Users | Travel Agents | Channel Management | Rooms | Reports | Settings |
+--------------------------------------------------------------------------------------+
```

### Manager Dashboard

- `Route`: `/manager/dashboard`
- `Component`: [ManagerDashboard.jsx](e:\work\booking-front\HotelSystem\src\pages\Manager\ManagerDashboard.jsx)
- `Purpose`: Gives the manager operational visibility over hotel activity.

### Travel Agents

- `Route`: `/manager/travel-agents`
- `Component`: [TravelAgents.jsx](e:\work\booking-front\HotelSystem\src\pages\Manager\TravelAgents\TravelAgents.jsx)
- `Purpose`: Create, update, and manage travel-agent records used by reservations and reporting.

```text
+------------------------------------------------------------------+
|                       TRAVEL AGENTS                              |
|------------------------------------------------------------------|
| Search / Filters                                                 |
|------------------------------------------------------------------|
| Table of Travel Agents                                           |
| - Name                                                           |
| - Contact / Data                                                 |
| - Actions                                                        |
+------------------------------------------------------------------+
```

### Channel Management

- `Route`: `/manager/channel-management`
- `Component`: [ChannelManagement.jsx](e:\work\booking-front\HotelSystem\src\pages\Manager\ChannelManagement\ChannelManagement.jsx)
- `Purpose`: Entry point for future OTA and middleware integrations.
- `Status`: Visible in frontend, currently marked as Coming Soon.

```text
+------------------------------------------------------------------+
|                    CHANNEL MANAGEMENT                            |
|------------------------------------------------------------------|
| Integrations                                                     |
| Channel Management                                               |
| This page is now visible in the system...                        |
|                                                                  |
| [ Coming Soon ]                                                  |
|                                                                  |
| Provider connection setup                                        |
| Reservation import and sync                                      |
| Connection status overview                                       |
| Field mapping and sync controls                                  |
+------------------------------------------------------------------+
```

### Manager Reports

- `Route`: `/manager/reports/*`
- `Component`: [Reports.jsx](e:\work\booking-front\HotelSystem\src\pages\Manager\Reports\Reports.jsx)
- `Purpose`: Groups manager-facing reports.

Included report screens:
- `manager-flash`
- `room-status`
- `folio-history`
- `cashier`

### Settings

- `Route`: `/manager/settings/*`
- `Component`: [TermsAndConditions.jsx](e:\work\booking-front\HotelSystem\src\pages\Manager\TermsAndConditions\TermsAndConditions.jsx)
- `Purpose`: Manages terms, recommendations, and hotel logs.

```text
+----------------------------------------------------------------------------+
| Settings                                                                   |
|----------------------------------------------------------------------------|
| Terms & Conditions | AI Recommendation | Logs                              |
|----------------------------------------------------------------------------|
| Main content area                                                          |
| - Terms editor or child page content                                       |
| - Save / Cancel actions                                                    |
| - Information message box                                                  |
+----------------------------------------------------------------------------+
```

#### Terms & Conditions

- `Route`: `/manager/settings`
- `Purpose`: Stores printable terms for guest registration output.

#### AI Recommendation

- `Route`: `/manager/settings/recommendation`
- `Purpose`: Manager-side recommendation features.

#### Hotel Logs

- `Route`: `/manager/settings/logs`
- `Component`: [SettingsLogs.jsx](e:\work\booking-front\HotelSystem\src\pages\Manager\TermsAndConditions\SettingsLogs.jsx)
- `Purpose`: Shows operational activity logs for hotel actions.

```text
+----------------------------------------------------------------------------+
| Hotel Logs                                                                 |
|----------------------------------------------------------------------------|
| Date | User | Action | Target | Details                                   |
|----------------------------------------------------------------------------|
| Log row                                                                    |
| Log row                                                                    |
| Log row                                                                    |
+----------------------------------------------------------------------------+
```

### Rooms Module

- `Route`: `/manager/rooms/*`
- `Purpose`: Holds room setup and room-configuration screens.

Included screens:
- `managment`
- `type`
- `category`
- `package`
- `services`

---

## 4. Front Desk Screens

### Front Desk Top Navigation

- `Component`: [FrontDeskNav.jsx](e:\work\booking-front\HotelSystem\src\pages\FrontDesk\FrontDeskNav.jsx)
- `Purpose`: Main operational navigation for front-desk users.

```text
+--------------------------------------------------------------------+
| Booking | Front Office | Inventory | Finance | Reports | Exit      |
+--------------------------------------------------------------------+
```

### Booking Module

- `Route`: `/front-desk/booking/*`
- `Component`: [Booking.jsx](e:\work\booking-front\HotelSystem\src\pages\FrontDesk\Sections\Booking\Booking.jsx)
- `Purpose`: Handles reservation planning and booking workflows.

```text
+--------------------------------------------------------------------------+
| SIDEBAR                   | MAIN CONTENT                                 |
|---------------------------|----------------------------------------------|
| Create Posting            | Active booking child screen                  |
| Manage Reservation        |                                              |
| Availability              |                                              |
| Room Diary                |                                              |
+--------------------------------------------------------------------------+
```

#### Manage Reservation

- `Route`: `/front-desk/booking/manage-reservation`
- `Component`: [ManageReservation.jsx](e:\work\booking-front\HotelSystem\src\pages\FrontDesk\Sections\Booking\ManageReservation.jsx)
- `Purpose`: Lists reservations available for follow-up and detailed access.

```text
+----------------------------------------------------------------------------------+
| MANAGE RESERVATION                                                               |
|----------------------------------------------------------------------------------|
| Filters                                                                          |
|----------------------------------------------------------------------------------|
| Confirmation Number | Main Guest | Travel Agent | Rooms | Arrival | Nights | -> |
| Reservation row                                                                  |
| Reservation row                                                                  |
+----------------------------------------------------------------------------------+
```

#### Create Posting

- `Route`: `/front-desk/booking/create-posting`
- `Purpose`: Builds a reservation with dates, rooms, services, and totals.

#### Availability

- `Route`: `/front-desk/booking/availability`
- `Purpose`: Checks room availability by date range.

#### Room Diary

- `Route`: `/front-desk/booking/room-diary`
- `Purpose`: Shows room occupancy planning on a date-based board.

### Front Office Module

- `Route`: `/front-desk/front-office/*`
- `Purpose`: Manages arrivals, in-house guests, departures, and no-show handling.

Included screens:
- `arrival`
- `departure`
- `in-house`
- `no-show`
- `recommendation`

#### Arrival

- `Route`: `/front-desk/front-office/arrival`
- `Purpose`: Lists expected arrivals and supports check-in.

#### Departure

- `Route`: `/front-desk/front-office/departure`
- `Purpose`: Lists due departures and supports check-out.

#### In House

- `Route`: `/front-desk/front-office/in-house`
- `Purpose`: Lists current in-house guests.

#### No Show

- `Route`: `/front-desk/front-office/no-show`
- `Purpose`: Lists reservations that missed arrival.

### Inventory Module

- `Route`: `/front-desk/inventory/*`
- `Purpose`: Controls room operational availability.

Included screens:
- `out-of-service`
- `house-keeping-board`

### Finance Module

- `Route`: `/front-desk/finance/*`
- `Purpose`: Groups folio, cashier, and utility finance tools.

Included screens:
- `folio-history`
- `casher`
- `currency-calculator`

#### Folio History

- `Route`: `/front-desk/finance/folio-history`
- `Component`: [FolioHistory.jsx](e:\work\booking-front\HotelSystem\src\pages\FrontDesk\Sections\Finance\FolioHistory.jsx)
- `Purpose`: Displays folio records for eligible reservations according to backend business rules.

```text
+----------------------------------------------------------------------------------+
| FOLIO HISTORY                                                                    |
|----------------------------------------------------------------------------------|
| Confirmation Number | From | To | Travel Agent                                  |
|----------------------------------------------------------------------------------|
| Total Paid | Total Remaining | Total Revenue                                     |
|----------------------------------------------------------------------------------|
| Confirmation | Guest | Travel Agent | Paid | Remaining | Total                  |
| Data row                                                                         |
| Data row                                                                         |
|                                                                     Download PDF |
+----------------------------------------------------------------------------------+
```

#### Cashier

- `Route`: `/front-desk/finance/casher`
- `Purpose`: Shows payment summary by method and total cash.

#### Currency Calculator

- `Route`: `/front-desk/finance/currency-calculator`
- `Purpose`: Helps staff with quick currency conversion.

### Reports Module

- `Route`: `/front-desk/reports/*`
- `Purpose`: Provides operational and compliance reports.

Included screens:
- `expected-arrivals`
- `in-house`
- `reservation-ledger`
- `no-show-cancel`
- `police`
- `room-status`
- `night-audit`

---

## 5. Reservation Details Flow

### Reservation Details Container

- `Route`: `/front-desk/reservation/:id/*`
- `Component`: [ReservationDetails.jsx](e:\work\booking-front\HotelSystem\src\pages\FrontDesk\ReservationDetails\ReservationDetails.jsx)
- `Purpose`: Central detailed view for one reservation.

```text
+----------------------------------------------------------------------------+
| SIDEBAR                  | DETAIL CONTENT                                  |
|--------------------------|-------------------------------------------------|
| Main Info                | Active reservation tab                          |
| Rooms                    |                                                 |
| Services                 |                                                 |
| Payments                 |                                                 |
| Alerts                   |                                                 |
| Print                    |                                                 |
+----------------------------------------------------------------------------+
```

Included detail tabs:
- `main-info`
- `rooms`
- `services`
- `payments`
- `alerts`
- `print`

---

## 6. Recommended Documentation Practice

If you want this to remain professional in GitHub:

1. Keep this Markdown as the source of truth.
2. Add route and component references whenever a screen changes.
3. Update layout previews when page structure changes.
4. Add real screenshots later only as a supplement, not as the main documentation format.

## 7. Why This GitHub Style Is Professional

This documentation style is professional because it is:

- version-controlled
- readable in pull requests
- searchable by route and component name
- maintainable without design tools
- useful for both technical and non-technical readers

Screenshots become outdated quickly.  
Code-based layout documentation stays closer to the real product structure and is easier to update during active development.
