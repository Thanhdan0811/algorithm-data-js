# 🎬 StreamVault — Session History & Context

> **Purpose:** Load this file at the start of every new session to restore full context.
> **Project path:** `e:\code-project\algorithm-data-js\projects\movie-project\`
> **Last updated:** 2026-05-27

---

## 📌 Project Summary

Building a **production-grade streaming video platform template** to sell as a SaaS template product.
Inspired by Netflix / Vimeo / Mux architecture. Target market: developers who want to launch a streaming service.

**Key files:**
- `design.md` — UI/UX design system, wireframes, component specs
- `progress.md` — Full roadmap, tech stack, architecture, cost analysis
- `session-history.md` — This file. Session log + requirements reference.

---

## 🎯 Core Requirements (Master List)

### Business Goals
- [ ] Build from 0 → sellable SaaS template
- [ ] Roadmap: MVP → monetization-ready → scale-ready
- [ ] Target: sell the template (not run the service)
- [ ] Estimate path to profit for template buyers

### Technical Requirements
- [ ] FE + BE separated architecture
- [ ] Cloudflare R2 + CDN for video storage (cost optimization)
- [ ] Cost-optimized architecture (minimize bandwidth cost)
- [ ] Anti-bandwidth-death strategies
- [ ] Optimal pricing model design (Free / Basic / Premium)
- [ ] Feature set that users will pay for
- [ ] Built like Vimeo / Mux (professional grade)
- [ ] Profit estimation model
- [ ] Scale path: 10k → 100k users
- [ ] Best niche analysis
- [ ] Specific production-grade tech stack
- [ ] Fast load speed, high concurrency support

### Design Requirements
- [ ] Minimalist, classic, simple aesthetic
- [ ] Dark theme — but not too dark, not harsh on eyes
- [ ] All design documentation in English
- [ ] Google Stitch compatible wireframes
- [ ] Full component library defined

---

## 🛠️ Decided Tech Stack (v2 — revised Session 1)

```
Frontend    : SvelteKit 2 + TailwindCSS v4
State       : Svelte Stores (built-in, no Zustand)
Data fetch  : SvelteKit load() + TanStack Query Svelte
Forms       : Superforms + Zod
Video       : hls.js + custom Svelte component
Animation   : Motion One (3kb)

Backend     : Go 1.23 + Fiber v2
DB driver   : pgx v5 (raw SQL via sqlc)
Auth        : Self-built session auth (httponly cookie + Valkey)
Queue       : NATS JetStream (self-host)

Database    : Self-host PostgreSQL on Hetzner
Cache       : Self-host Valkey (Redis fork) on Hetzner
Storage     : Cloudflare R2 (video + assets) ← free egress key saving
CDN         : Cloudflare CDN
Server      : Hetzner Cloud VPS (€6.74/mo CX32)
Video Proc  : Self-hosted FFmpeg worker (separate VPS)
Search      : Typesense (self-host)
Network     : WireGuard VPN between services

Payment     : Stripe Subscriptions
Email       : Resend (or SMTP self-host later)
Monitoring  : Grafana + Prometheus + Loki (self-host)
Analytics   : Umami (self-host, no Google Analytics)
```

---

## 📋 Session Log

---

### Session 1 — 2026-05-27

**What was done:**
1. Defined project scope: streaming template to sell, not run pirated content
2. Created `design.md` — full UI/UX design document (initially in Vietnamese)
3. Created `progress.md` — full roadmap, architecture, tech stack, cost analysis

**Decisions made:**
- Hono.js chosen over Fastify/NestJS: edge-compatible, 13kb, fastest Node framework
- Cloudflare R2 over AWS S3: free egress saves ~83% bandwidth cost at scale
- Next.js 15 App Router: best for SSR + streaming + SEO for content-heavy site
- Better-Auth over NextAuth: more modern, better DX, supports more providers
- Drizzle ORM over Prisma: lighter, faster, SQL-first, better for edge runtimes

**Changes requested:**
- `design.md` → rewrite entirely in English
- `design.md` → update design style to: minimalist, classic, dark-but-not-too-dark, easy on eyes

**Files created/modified:**
- ✅ Created `design.md`
- ✅ Created `progress.md`
- ✅ Created `session-history.md` (this file)
- 🔄 Rewrote `design.md` (English + updated design aesthetic: minimalist, classic, soft dark)
- 🔄 Rewrote `progress.md` (SvelteKit + Go stack + self-host privacy-conscious infra)

**Stack changes in this session:**
- FE: Next.js → **SvelteKit 2** (compiled, smaller bundle, simpler)
- BE: Hono.js/Node.js → **Go + Fiber** (lower RAM, compiled binary, less supply chain risk)
- ORM: Drizzle → **sqlc + pgx** (raw SQL, type-safe, no ORM magic)
- Auth: Better-Auth → **Self-built session** (no external auth provider)
- Queue: BullMQ → **NATS JetStream** (self-host, lighter)
- Search: MeiliSearch → **Typesense** (less telemetry)
- DB hosting: Supabase → **Self-host PostgreSQL on Hetzner**
- Cache: Upstash Redis → **Self-host Valkey on Hetzner**
- Server: Fly.io/Railway → **Hetzner Cloud VPS**
- Monitoring: BetterStack → **Grafana + Prometheus + Loki**
- Analytics: — → **Umami self-host** (no Google Analytics)
- Network: Added **WireGuard VPN** between services

**Next session should continue with:**
- Phase 1: Foundation
- Init SvelteKit 2 project
- Init Go + Fiber API project
- Docker Compose (Postgres + Valkey + NATS + Typesense)
- Setup Cloudflare R2 bucket + custom domain

---

## 🔮 Backlog / Ideas (not yet decided)

- Watch party feature (watch together in real-time)
- AI-powered recommendations
- Admin dashboard analytics
- Multi-language subtitle support
- Mobile app (React Native) — future phase
- Chromecast / AirPlay support
- PWA for offline mode

---

## ⚠️ Open Questions

- [ ] Monorepo tool: Turborepo vs Nx?
- [ ] Deploy target: Fly.io vs Railway vs Render?
- [ ] Video processing: self-host FFmpeg vs use Mux/Bunny.net API?
- [ ] Template selling platform: Lemon Squeezy vs Gumroad vs own store?
- [ ] License model: one-time purchase vs subscription for template?

---

## 📁 Folder Structure (planned)

```
projects/movie-project/
├── design.md           ← UI/UX design system
├── progress.md         ← Roadmap + architecture + cost
├── session-history.md  ← This file
└── streamvault/        ← Actual code (Phase 1+)
    ├── apps/
    │   ├── web/        ← Next.js 15
    │   └── api/        ← Hono.js
    ├── packages/
    │   ├── db/
    │   ├── ui/
    │   └── config/
    └── workers/
        └── video/
```
