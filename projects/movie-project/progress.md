# 🎬 StreamVault — Project Progress & Roadmap

> **Goal:** Build production-grade streaming platform template → sell as SaaS template
> **Started:** 2026-05-27
> **Target launch:** Q3 2026
> **Stack philosophy:** Self-host where it matters, minimal vendor lock-in, privacy-conscious

---

## 📊 Overall Progress

```
Phase 1: Foundation     ░░░░░░░░░░  0%   [Planning]
Phase 2: Core FE        ░░░░░░░░░░  0%   [Not started]
Phase 3: Core BE        ░░░░░░░░░░  0%   [Not started]
Phase 4: Video Pipeline ░░░░░░░░░░  0%   [Not started]
Phase 5: Monetization   ░░░░░░░░░░  0%   [Not started]
Phase 6: Scale & Perf   ░░░░░░░░░░  0%   [Not started]
Phase 7: Template Pack  ░░░░░░░░░░  0%   [Not started]
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                            │
│    SvelteKit 2 + TailwindCSS v4        Next.js 15 + TailwindCSS v4    │
│         (SSR/SPA — primary)              (App Router — parallel)       │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTPS / HTTP2
┌───────────────────────▼─────────────────────────────────────┐
│                  EDGE / CDN LAYER                           │
│              Cloudflare CDN  (free egress)                  │
└──────────────┬─────────────────┬───────────────────────────┘
               │                 │
┌──────────────▼────┐    ┌───────▼────────────────────────────┐
│   API GATEWAY     │    │    VIDEO CDN / STATIC ASSETS       │
│   Nginx reverse   │    │    Cloudflare R2 + CDN             │
│   proxy (Hetzner) │    │    HLS segments (.m3u8 / .ts)      │
└──────────────┬────┘    └────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│                    BACKEND SERVICES  (Go)                   │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  API Server  │  │  Auth Module │  │  Video Processor │  │
│  │  Go + Fiber  │  │  (sessions / │  │  FFmpeg worker   │  │
│  │  v2          │  │   JWT local) │  │  (Go worker)     │  │
│  └──────┬───────┘  └──────────────┘  └──────────────────┘  │
│         │                                                   │
│  ┌──────▼────────────────────────────────────────────────┐  │
│  │                  DATA LAYER                           │  │
│  │  PostgreSQL (self-host) + Redis/Valkey (self-host)    │  │
│  │  All within private VPN network (WireGuard)           │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

> Building both frameworks **in parallel** for comparison and learning.

#### SvelteKit 2 (Primary)

| Layer        | Tech                                             | Why                                                          |
| ------------ | ------------------------------------------------ | ------------------------------------------------------------ |
| Framework    | **SvelteKit 2**                                  | Compiled output, no runtime overhead, faster than React/Next |
| Styling      | **TailwindCSS v4**                               | Utility-first, dark mode, minimal CSS output                 |
| Animation    | **Motion One**                                   | Lightweight (3kb), works great with Svelte                   |
| Video Player | **hls.js** + custom Svelte component             | HLS adaptive streaming, full control over UI                 |
| State        | **Svelte Stores** (built-in)                     | No Zustand needed — Svelte stores are native                 |
| Data Fetch   | **SvelteKit load()** + **TanStack Query Svelte** | Server load + client-side caching                            |
| Forms        | **Superforms** + **Zod**                         | Best-in-class for SvelteKit form handling                    |
| Icons        | **Lucide Svelte**                                | Tree-shakeable, typed                                        |
| Auth         | Session cookie via NestJS backend                | No third-party auth SDK on client                            |

#### Next.js 15 (Parallel)

| Layer        | Tech                                               | Why                                                          |
| ------------ | -------------------------------------------------- | ------------------------------------------------------------ |
| Framework    | **Next.js 15** (App Router)                        | React ecosystem, Server Components, broad community support  |
| Styling      | **TailwindCSS v4**                                 | Same styling system as SvelteKit build                       |
| Animation    | **Framer Motion**                                  | Rich animation library, great React integration              |
| Video Player | **hls.js** + custom React component                | Same HLS logic, wrapped in React                             |
| State        | **Zustand**                                        | Lightweight, minimal boilerplate                             |
| Data Fetch   | **Server Components** + **TanStack Query React**   | RSC for server data, TanStack for client cache               |
| Forms        | **React Hook Form** + **Zod**                      | Industry standard for React forms                            |
| Icons        | **Lucide React**                                   | Same icon set, React variant                                 |
| Auth         | Session cookie via NestJS backend                  | Same backend, same auth strategy                             |

**SvelteKit vs Next.js trade-offs:**

| Aspect          | SvelteKit 2                        | Next.js 15                          |
| --------------- | ---------------------------------- | ----------------------------------- |
| Bundle size     | ~3× smaller                        | Larger (React runtime)              |
| Performance     | No VDOM → faster paint             | React Server Components help        |
| Learning curve  | Simpler mental model               | Steeper, but wider job market       |
| Ecosystem       | Smaller, newer                     | Massive, battle-tested              |
| Transitions     | Built-in page transitions          | Need Framer Motion                  |
| Server model    | `load()` — simple and predictable  | App Router / RSC — powerful, complex |

---

### Backend

| Layer      | Tech                                              | Why                                                                    |
| ---------- | ------------------------------------------------- | ---------------------------------------------------------------------- |
| Runtime    | **Node.js 22 LTS**                                | Mature ecosystem, huge package ecosystem, excellent TypeScript support |
| Framework  | **NestJS**                                        | Opinionated architecture, DI, modular, scalable                        |
| Database   | **PostgreSQL**                                    | Reliable, battle-tested relational database                            |
| SQL Layer  | **node-postgres (pg)**                            | Direct SQL access, full query control, no ORM abstraction              |
| Auth       | **Self-built sessions** (httponly cookie + Redis) | No external auth provider, secure server-side sessions                 |
| Cache      | **Redis**                                         | Fast caching, session storage, rate limiting                           |
| Queue      | **BullMQ**                                        | Redis-backed job processing for emails, notifications, video tasks     |
| Search     | **Typesense**                                     | Fast, self-hosted, simpler operations than OpenSearch                  |
| Email      | **Resend**                                        | Modern developer experience, transactional email                       |
| Payment    | **Stripe**                                        | Industry-standard subscription billing                                 |
| Validation | **Zod**                                           | End-to-end type-safe validation shared with frontend                   |

**Why Raw SQL over Prisma:**

- Full control over SQL queries and database behavior
- Better understanding of relational database design
- Easier query optimization for analytics and recommendation features
- No ORM abstraction layer or generated client code
- Direct access to advanced PostgreSQL features
- Database-first development approach

**Why NestJS over Express:**

- Structured architecture from day one
- Dependency Injection built-in
- Better maintainability as project grows
- Guards, interceptors, pipes, modules out of the box
- Easier onboarding for future developers
- TypeScript-first design

---

### Infrastructure

| Layer                 | Tech                     | Why                                                    |
| --------------------- | ------------------------ | ------------------------------------------------------ |
| Containerization      | **Docker**               | Consistent local, staging, and production environments |
| Reverse Proxy         | **Nginx**                | SSL termination, caching, static asset serving         |
| Object Storage (Dev)  | **MinIO**                | S3-compatible local development storage                |
| Object Storage (Prod) | **Cloudflare R2**        | Low-cost object storage with no egress fees            |
| CDN                   | **Cloudflare CDN**       | Global edge caching for posters, subtitles, and assets |
| Monitoring            | **Grafana + Prometheus** | Metrics, alerts, and observability                     |
| Logging               | **Loki**                 | Lightweight centralized log aggregation                |
| CI/CD                 | **GitHub Actions**       | Automated testing and deployment pipelines             |

**Why this stack for a streaming platform:**

- Fast frontend with minimal JS payload
- Type-safe full-stack development
- Simple self-hosted infrastructure
- Easy horizontal scaling
- Low operational complexity
- Cost-efficient media storage with R2
- Suitable for MVP through mid-scale production workloads

**Why Go over Node.js/Hono:**

- Single compiled binary → easy Docker image (~10MB vs 300MB Node)
- ~10× lower RAM usage than Node.js equivalent
- No `node_modules` hell or supply chain risk
- Better concurrency (goroutines) for video processing
- Smaller attack surface

---

### Infrastructure

| Layer                | Tech                                | Cost estimate                 | Privacy level             |
| -------------------- | ----------------------------------- | ----------------------------- | ------------------------- |
| **Video Storage**    | **Cloudflare R2**                   | $0.015/GB/mo, **free egress** | Medium — CF sees metadata |
| **CDN**              | **Cloudflare CDN**                  | Free                          | Medium — CF sees IPs      |
| **VPS / Server**     | **Hetzner Cloud** (CX32)            | €6.74/mo (4vCPU, 8GB RAM)     | Good — EU datacenter      |
| **Database**         | **Self-host PostgreSQL** on Hetzner | Included in VPS               | ✅ Full control           |
| **Cache / Queue**    | **Self-host Valkey** (Redis fork)   | Included in VPS               | ✅ Full control           |
| **NATS**             | **Self-host NATS JetStream**        | Included in VPS               | ✅ Full control           |
| **Search**           | **Self-host Typesense**             | Included in VPS               | ✅ Full control           |
| **Video Processing** | **FFmpeg** on separate Hetzner VPS  | €4-6/mo                       | ✅ Self-host              |
| **Monitoring**       | **Grafana + Prometheus + Loki**     | Self-host                     | ✅ No external telemetry  |
| **Analytics**        | **Umami** (self-host)               | Included in VPS               | ✅ No Google              |
| **Networking**       | **WireGuard VPN** between services  | Free                          | ✅ Encrypted private net  |

**Cost total estimate (MVP):** ~€15-25/month for entire infra

---

### Privacy Principles Applied

```
✅  No Google OAuth / no social login tracking
✅  Self-host database — no Supabase managed logs
✅  Self-host Redis/Valkey — no Upstash telemetry
✅  Grafana stack — no BetterStack/Datadog external collection
✅  Umami analytics — no Google Analytics fingerprinting
✅  WireGuard private network — DB/Redis not exposed to public
✅  Short-lived signed URLs for video (4h expiry)
✅  No IP logging in application layer
✅  Separate VPS for video processing — isolated job workers
✅  NATS self-host — no external queue provider visibility

⚠️  Cloudflare R2/CDN — CF sees traffic metadata (acceptable tradeoff for cost)
⚠️  Stripe — payment trail exists (unavoidable for cards)
```

---

### Video Pipeline

```
Upload → Presigned URL → R2 Raw Storage
       → Publish NATS message → Video Worker VPS
       → FFmpeg Worker (Go)
         ├─ Transcode: 1080p / 720p / 480p / 360p
         ├─ Generate HLS segments (6s chunks)
         ├─ Create master.m3u8 (adaptive bitrate)
         └─ Extract thumbnails (3 timestamps)
       → Upload HLS segments to R2
       → Purge CDN cache for movie
       → Publish status event → API updates DB
       → DB status: "ready" → visible to users
```

---

## 🗺️ Detailed Roadmap

### Phase 1: Foundation (Week 1–2)

- [ ] Init monorepo (pnpm workspaces — no Turborepo overhead)
- [ ] Init SvelteKit 2 app + TailwindCSS v4
- [ ] Init Next.js 15 app + TailwindCSS v4 (App Router)
- [ ] Init Go + Fiber API project
- [ ] Setup sqlc + PostgreSQL schema (movies, users, sessions)
- [ ] Setup Cloudflare R2 bucket + custom CDN domain
- [ ] Docker Compose for local dev (Postgres + Valkey + NATS + Typesense)
- [ ] WireGuard config for production VPN
- [ ] CI/CD pipeline (GitHub Actions → deploy to Hetzner)
- [ ] Session-based auth (register / login / logout)

### Phase 2: Core FE (Week 3–5) — Build both SvelteKit & Next.js in parallel

- [ ] Tailwind design tokens (colors, spacing, typography from design.md)
- [ ] Homepage layout + hero banner component
- [ ] Movie card component (default + hover states)
- [ ] Horizontal scroll row (keyboard + touch scroll)
- [ ] Movie detail page
- [ ] Search + filter page
- [ ] Auth pages (login / register / forgot password)
- [ ] User profile + watchlist
- [ ] Mobile responsive + bottom nav
- [ ] Skeleton loading (shimmer CSS)
- [ ] SvelteKit: page transitions (built-in)
- [ ] Next.js: Framer Motion page transitions

### Phase 3: Core BE (Week 3–5, parallel with FE)

- [ ] Movie CRUD endpoints (Go + Fiber)
- [ ] Category / Genre endpoints
- [ ] User endpoints (profile, watchlist, history)
- [ ] Rating / Review endpoints
- [ ] Typesense sync (movie indexing on create/update)
- [ ] Search API (Typesense query)
- [ ] Pagination (cursor-based, not offset)
- [ ] Rate limiting (Fiber middleware)
- [ ] Request validation (go-playground/validator)
- [ ] Structured logging (zerolog — no sensitive data)

### Phase 4: Video Pipeline (Week 6–7)

- [ ] R2 presigned upload URL endpoint
- [ ] NATS JetStream publisher on upload complete
- [ ] Go FFmpeg worker (subscribes NATS, processes video)
- [ ] HLS segmentation + master.m3u8 generation
- [ ] Thumbnail extraction (3 frames per video)
- [ ] R2 upload of processed segments
- [ ] Signed CDN URL generation (4h expiry, no hotlink)
- [ ] hls.js Svelte component (custom controls UI)
- [ ] Quality selector (auto / 1080p / 720p / 480p)
- [ ] Resume playback (save position in DB)
- [ ] Subtitle support (.vtt upload + serving)
- [ ] Skip intro button (configurable timestamp range)

### Phase 5: Monetization (Week 8–9)

- [ ] Stripe subscription setup (Free / Basic / Premium)
- [ ] Stripe webhook handler (Go endpoint)
- [ ] Feature gating middleware (tier check per route)
- [ ] Pricing page UI (SvelteKit)
- [ ] Invoice email via Resend
- [ ] Trial period logic (7-day trial on Basic)
- [ ] Coupon / discount system

### Phase 6: Scale & Perf (Week 10–11)

- [ ] Valkey caching layer (hot movie data, user sessions)
- [ ] PostgreSQL query optimization + indexes audit
- [ ] Cloudflare cache-control headers (CDN edge cache)
- [ ] Image optimization (Cloudflare Image Resizing)
- [ ] Load testing with k6 (target: 1000 concurrent streams)
- [ ] Prometheus metrics in Go app
- [ ] Grafana dashboards (latency, errors, active streams)
- [ ] Loki log aggregation
- [ ] Umami analytics setup
- [ ] Sentry error tracking (Go + SvelteKit)

### Phase 7: Template Pack (Week 12)

- [ ] Code cleanup + inline documentation
- [ ] README.md (full setup guide)
- [ ] Docker Compose one-command local setup
- [ ] Hetzner one-click deploy script
- [ ] .env.example with all required vars
- [ ] Database seed script (demo content)
- [ ] Template landing page
- [ ] License (BSL or commercial)

---

## 💰 Cost Optimization

### Bandwidth Strategy

```
❌ Avoid: serve video directly from app server → bandwidth death
✅ Do:    Cloudflare R2 + CDN → free egress (biggest saving)

10TB/month bandwidth cost comparison:
  AWS S3 + CloudFront      : ~$900/month
  Cloudflare R2 + CDN      : ~$150/month   ← 83% cheaper
  Self-host MinIO + no CDN : ~$50/month    ← cheapest but worse UX
```

### Anti-Bandwidth-Death Tactics

1. **HLS segmentation** — client loads 6s chunks, not full file
2. **Adaptive bitrate** — weak connection auto-drops to 480p
3. **Signed URLs** — expire 4h, no hotlinking
4. **Bot protection** — Cloudflare WAF rules
5. **Free tier throttle** — max 720p, 1 concurrent stream
6. **Geo-block** — restrict regions with no target users

### Full Stack Cost Estimate

| Scale  | Users   | Storage | BW/month | Infra Cost |
| ------ | ------- | ------- | -------- | ---------- |
| MVP    | 100     | 100 GB  | 500 GB   | ~€20/mo    |
| Early  | 1,000   | 1 TB    | 5 TB     | ~€80/mo    |
| Growth | 10,000  | 5 TB    | 50 TB    | ~€600/mo   |
| Scale  | 100,000 | 20 TB   | 200 TB   | ~€2,500/mo |

---

## 💳 Pricing Model

### Tier Structure

| Plan        | Price  | Key Features                               |
| ----------- | ------ | ------------------------------------------ |
| **Free**    | $0     | 480p, ads, 1 screen, 5 movies/day          |
| **Basic**   | $5/mo  | 720p, no ads, 2 screens, unlimited         |
| **Premium** | $12/mo | 1080p + 4K, no ads, 4 screens, 5 downloads |
| **Family**  | $18/mo | 1080p + 4K, 6 screens, 10 downloads        |

**Yearly plan: –20%** (creates upfront cash flow)

### Revenue Estimate at 10k Users

```
Assumption: 5% paid conversion, avg $7/user/month
  500 paid users × $7   = $3,500/month revenue
  Infrastructure cost   = ~$600/month
  Gross profit          = ~$2,900/month (83% margin)
```

---

## 🎯 Features Users Pay For

**Highest willingness to pay:**

1. **No Ads** — #1 upgrade driver
2. **HD / 4K quality** — immediately visible value
3. **Multiple screens** — family sharing use case
4. **Offline download** — travel / commute

**Medium:** 5. Early access to new releases 6. Exclusive / premium-only content 7. Multiple audio tracks (dub) 8. More subtitle languages

**Upsell:** 9. Watch party (synchronized viewing) 10. Profile customization

---

## 📈 Scale Path

### 10k Users (Single Hetzner CX52 ~€17/mo)

- Go API + PostgreSQL + Valkey on same powerful VPS
- Separate VPS for video processing only
- R2 + CDN handles all video traffic
- NATS for job queuing
- Grafana monitoring on same VPS

### 100k Users (Multi-VPS)

- API servers × 3 (Hetzner load balanced)
- PostgreSQL primary + 2 read replicas
- Dedicated Valkey cluster
- Dedicated NATS cluster
- Video processing fleet (auto-scale on queue depth)
- Typesense cluster
- Separate Grafana/monitoring VPS

---

## 🎯 Best Niches (2025–2026)

| Niche            | Potential  | Competition | Notes                         |
| ---------------- | ---------- | ----------- | ----------------------------- |
| **Anime**        | ⭐⭐⭐⭐⭐ | Medium      | Large community, pays happily |
| **K-Drama**      | ⭐⭐⭐⭐   | Medium      | Vietnam + SEA market large    |
| **Indie films**  | ⭐⭐⭐     | Low         | Small but loyal audience      |
| **Documentary**  | ⭐⭐⭐     | Low         | Educational, easy to monetize |
| **Kids content** | ⭐⭐⭐⭐   | High        | Parents pay, brand-safe       |

**Recommendation:** Anime or K-Drama for Viet/SEA → easiest to scale

---

## 📁 Project Structure

```
streamvault/
├── apps/
│   ├── web/              ← SvelteKit 2 frontend (primary)
│   │   ├── src/
│   │   │   ├── routes/   ← SvelteKit file-based routing
│   │   │   ├── lib/      ← shared components, stores, utils
│   │   │   └── app.html
│   │   └── svelte.config.js
│   ├── web-next/         ← Next.js 15 frontend (parallel)
│   │   ├── app/          ← App Router pages and layouts
│   │   │   ├── (auth)/   ← route groups
│   │   │   ├── movies/
│   │   │   └── layout.tsx
│   │   ├── components/   ← shared React components
│   │   ├── lib/          ← utils, hooks, store
│   │   └── next.config.ts
│   └── api/              ← Go + Fiber backend
│       ├── cmd/server/   ← main entry point
│       ├── internal/
│       │   ├── handler/  ← route handlers
│       │   ├── service/  ← business logic
│       │   ├── db/       ← sqlc generated code
│       │   └── worker/   ← NATS + FFmpeg workers
│       ├── sqlc.yaml
│       └── Dockerfile
├── infra/
│   ├── docker-compose.yml    ← local dev (PG + Valkey + NATS + Typesense)
│   ├── wireguard/            ← VPN config templates
│   └── nginx/                ← reverse proxy config
└── docs/
    ├── design.md
    ├── progress.md
    └── session-history.md
```

---

## 📝 Changelog

| Date       | Phase    | What                                                                               |
| ---------- | -------- | ---------------------------------------------------------------------------------- |
| 2026-05-27 | Planning | Init project, create design + progress docs                                        |
| 2026-05-27 | Planning | Stack revision: SvelteKit (not Next.js), Go+Fiber (not Hono/Node), self-host infra |
| 2026-06-12 | Planning | Add Next.js 15 as parallel frontend — building both SvelteKit + Next.js at same time |

---

## 🔗 Resources

**Frontend:**

- [SvelteKit Docs](https://kit.svelte.dev)
- [TailwindCSS v4 Docs](https://tailwindcss.com)
- [Superforms](https://superforms.rocks)
- [hls.js GitHub](https://github.com/video-dev/hls.js)

**Backend:**

- [Go Fiber Docs](https://gofiber.io)
- [sqlc Docs](https://docs.sqlc.dev)
- [NATS JetStream](https://docs.nats.io/nats-concepts/jetstream)
- [Typesense Docs](https://typesense.org/docs)
- [pgx Docs](https://github.com/jackc/pgx)

**Infrastructure:**

- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [Hetzner Cloud Docs](https://docs.hetzner.com/cloud)
- [WireGuard Quick Start](https://www.wireguard.com/quickstart/)
- [FFmpeg HLS Guide](https://ffmpeg.org/ffmpeg-formats.html#hls)
- [Valkey GitHub](https://github.com/valkey-io/valkey)
- [Grafana + Prometheus Setup](https://grafana.com/docs/grafana/latest/getting-started/get-started-grafana-prometheus/)

**Payment:**

- [Stripe Subscription Docs](https://stripe.com/docs/billing/subscriptions)
