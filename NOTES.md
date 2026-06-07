# Cope App Development Notes

## Sprint 1 - COMPLETADO ✅ (6 de junio 2026)

### Construido:
- ✅ Módulo Mis Cuentas con tabla compacta y 8 cuentas reales
- ✅ Módulo Mis Tarjetas con CRUD completo, modales y alertas de urgencia
- ✅ Server Actions completos para credit_cards
- ✅ Dashboard rico estilo Excel con patrimonio total y 4 KPIs
- ✅ Acciones rápidas (placeholder para Sprint 5)
- ✅ Tablas embebidas de Cuentas y TDC en dashboard con modales
- ✅ Modales reutilizados entre pantallas dedicadas y dashboard
- ✅ CurrencyInput con formato $ y comas en todos los inputs de monto
- ✅ Alertas visuales por urgencia en próximo corte de TDC
- ✅ router.refresh() pattern en todos los Server Actions

### Estado del producto:
- **Patrimonio reflejado**: $1,845,983.41 MXN
- **8 cuentas activas**: Santander (x2), Scotiabank, BBVA, Inbursa, Binance, Payoneer, Efectivo
- **2 TDC activas**: AMEX ($4,102.78), Santander Like U ($7,876.59)

### Pendientes detectados (para sprints futuros):
- **Sprint 2**: Movimientos + Pendientes
- **Sprint 3**: Inversiones con ganancias/pérdidas
- **Sprint 3**: Historial de TDC con gráfico
- **Sprint 5**: Flujo Pagar TDC orquestado (retiro CETES → pago Santander)
- **Sprint 5**: Día de Pago wizard

---

## Sprint 1 Architecture Overview

### ✅ Database Schema
- **Supabase Migration 002**: Separates credit cards from accounts
  - `accounts` table: Banking/investment accounts (7 types)
  - `credit_cards` table: Credit card management (saldo, cutoff_day, payment_day, currency)
  - `credit_card_payments` table: Payment history with source account tracking
  - RLS policies: User isolation for all tables

### ✅ Authentication System (Complete)
- ✅ Signup with email/password/name
- ✅ Login with email/password
- ✅ Logout functionality
- ✅ Protected dashboard route
- ✅ Server-side middleware validation
- ✅ Session persistence via cookies

### ✅ Accounts Module (Sprint 1.1 - Complete)
**Routes & Components:**
- `/dashboard` - Main dashboard with sidebar
- `/dashboard/cuentas` - Accounts listing page
  - `page.tsx` (Server Component) - Loads accounts from database
  - `components/CuentasClient.tsx` (Client Component) - UI interactions & modal state
  - `components/AccountModalForm.tsx` - Add/edit form
  - `components/AccountsTable.tsx` - Compact table display with totals

**Server Actions (`lib/accounts/actions.ts`):**
- `createAccount(input)` - Add new account (with router.refresh pattern)
- `updateAccount(input)` - Edit account details
- `deleteAccount(accountId)` - Remove account
- `getUserAccounts()` - Fetch all user accounts (RLS isolated)
- `getTotalPatrimony()` - Calculate total assets in MXN

**Features Implemented:**
- Empty state: Friendly UI when no accounts
- Multi-currency: MXN/USD with exchange rate conversion (17x)
- Account types: 7 options with emojis and improved labels
- Patrimony total: Auto-calculated sum in MXN
- Confirmation dialogs: Prevent accidental deletion
- Compact table: Zebra striping, hover effects, click-to-edit
- Form validation: Server-side for all inputs
- Security: User isolation via Supabase RLS

### ✅ Navigation System
**Sidebar (`components/Sidebar.tsx`):**
- Fixed left sidebar with Cope branding
- Navigation links: Dashboard, Mis Cuentas, Mis Tarjetas
- Placeholder links: Movimientos, Metas, Análisis (disabled)
- User info + logout button at bottom
- Active route highlighting in Cope green
- Responsive (desktop-first, mobile TODO)

---

### 🏗️ Architecture Decisions

**Server/Client Split:**
- `/dashboard/layout.tsx` = Server wrapper (protects all sub-routes)
- `page.tsx` = Server Component (fetches accounts from DB)
- `CuentasClient.tsx` = Client Component (modal state, interactions)
- `AccountModalForm.tsx` = Client Component (form state, submission)
- `Sidebar.tsx` = Client Component (navigation, usePathname for highlighting)
- Server Actions = RPC-style, no API routes

**Security Enforcement:**
- All routes under `/dashboard` protected via middleware
- Server-side validation on all inputs
- Supabase RLS ensures user data isolation
- Passwords never exposed to browser

**State Management:**
- React useState for UI state (modals, editing)
- Supabase for persistent data
- No Redux/Context

### 📁 File Structure
```
app/(protected)/
├── dashboard/
│   ├── layout.tsx (Global layout with Sidebar)
│   ├── page.tsx (Dashboard home)
│   ├── components/
│   │   └── Sidebar.tsx (Navigation)
│   └── cuentas/
│       ├── page.tsx (Accounts listing)
│       └── components/
│           ├── CuentasClient.tsx
│           ├── AccountModalForm.tsx
│           ├── AccountsTable.tsx
│           └── CuentasClient.tsx
├── tarjetas/ (TODO next session)
└── historial/ (TODO)

lib/
├── auth/actions.ts (signup, login, logout, getCurrentUser)
├── accounts/actions.ts (account CRUD + getTotalPatrimony)
└── supabase/
    ├── client.ts
    ├── server.ts
    └── middleware.ts
```

---

**Last Updated:** 2026-06-04  
**Status:** Sprint 1 ~60% - Accounts module complete, Tarjetas module next  
**Next Session:** Build Mis Tarjetas module (1.5-2 hours estimated)
