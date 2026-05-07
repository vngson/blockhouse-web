# BlockHouse Web — Barber Shop Management

Micro-frontend web application for BlockHouse barber shop management, built with React 18, TypeScript, Webpack 5 Module Federation, and MUI.

## Architecture

```
blockhouse-web/
├── packages/
│   ├── host/             # Shell app — layout, routing, sidebar        :3000
│   ├── mf-dashboard/     # Dashboard — charts, metrics, top employees  :3001
│   ├── mf-employees/     # Employee CRUD, search, status toggle        :3002
│   ├── mf-revenue/       # Orders CRUD, revenue tabs, date filters     :3003
│   ├── mf-services/      # Service CRUD, search                        :3004
│   └── shared-lib/       # Shared components, hooks, utils, API client :3005
├── tsconfig.base.json
└── package.json          # Workspaces + concurrent scripts
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Webpack 5 + Module Federation |
| State | Zustand |
| Routing | React Router v6 |
| HTTP | Axios |
| UI | MUI v5 (Material UI) |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Testing | Jest 29 + React Testing Library |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Environment

Copy the example env file and configure:

```bash
cp packages/shared-lib/.env.example packages/shared-lib/.env
```

Default API endpoint is `http://localhost:5000`.

### Development

Start all micro-frontends concurrently:

```bash
npm start
```

Or start individual modules:

```bash
npm run start:shared      # shared-lib     :3005
npm run start:host         # host shell     :3000
npm run start:dashboard    # dashboard      :3001
npm run start:employees    # employees      :3002
npm run start:revenue      # revenue        :3003
npm run start:services     # services       :3004
```

Open `http://localhost:3000` in your browser.

### Build

```bash
npm run build
```

Builds shared-lib first, then all micro-frontends in parallel, then host last.

### Test

```bash
npm test              # All packages
npm run test --workspace=packages/shared-lib   # Single package
```

## Features

### Dashboard
- Total revenue, service sales, growth metrics
- Monthly revenue chart by service
- Top employee ranking with progress bars
- Month/year selector with navigation

### Employees
- Employee list with avatar, status badge, income
- Add employee dialog with phone validation
- Toggle active/inactive status
- Search by name/phone, filter by date range

### Revenue
- Multi-tab view: All orders, By date, By employee, Monthly
- Create/edit orders with service line items and quantity stepper
- Order detail dialog
- Delete confirmation
- Date range and keyword search

### Services
- Service list with formatted pricing
- Add/edit service dialog with validation
- Search by keyword

## Project Structure (per package)

```
packages/mf-xxx/
├── src/
│   ├── components/       # UI components
│   ├── pages/            # Page-level components
│   ├── services/         # API calls
│   ├── store/            # Zustand stores
│   └── types/            # TypeScript interfaces
├── webpack/
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── jest.config.js
├── tsconfig.json
└── package.json
```

## Module Federation

Each micro-frontend exposes a remote entry (`remoteEntry.js`) that the host shell lazy-loads:

| Remote | Module | Port |
|---|---|---|
| `mf_dashboard` | `./Dashboard` | 3001 |
| `mf_employees` | `./Employees` | 3002 |
| `mf_revenue` | `./Revenue` | 3003 |
| `mf_services` | `./Services` | 3004 |

Shared dependencies (React, ReactDOM, MUI, Zustand, Axios) are loaded as singletons.

## API

Backend base URL: `http://localhost:5000`

| Endpoint | Method | Description |
|---|---|---|
| `/api/v1/dashboard` | GET | Dashboard metrics |
| `/api/v1/employees` | POST | Employee list (paginated) |
| `/api/v1/employees/create_employee` | POST | Create employee |
| `/api/v1/employees/:id` | GET/PUT | Employee detail/status |
| `/api/v1/orders` | POST | Order list |
| `/api/v1/orders/create` | POST | Create order |
| `/api/v1/orders/:id` | GET/PUT/DELETE | Order CRUD |
| `/api/v1/service/` | GET/POST | Service list/create |
| `/api/v1/service/all` | GET | All services |
| `/api/v1/service/:id` | GET/PUT | Service detail/update |
