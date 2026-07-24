# 🎬 StreamVault — Learning Roadmap

> **Level xuất phát:** HTML + CSS + JS cơ bản
> **Mục tiêu:** Build MVP streaming platform (upload, play HLS, auth, subscription)
> **Thời hạn:** 8 tháng — từ 2026-06-01 đến 2027-02-01

---

## ⏰ Lịch học thực tế

| Ngày | Thời gian | Ghi chú |
|---|---|---|
| Thứ 2 – Thứ 6 | ~1–1.5h/ngày | Ổn định, không cố ép quá |
| Thứ 7 – Chủ nhật | 4–6h/ngày | Sprint chính, build + practice |

**Tổng ước tính mỗi tuần:** ~13–18h
**Tổng 8 tháng (~34 tuần):** ~500–600h

---

## 🎯 MVP v1 — Mục tiêu thực tế sau 8 tháng

Không phải Netflix clone. Mục tiêu là:

```
✅ Upload video lên
✅ Video phát được (HLS streaming)
✅ Đăng ký / đăng nhập
✅ Subscription (Stripe)
✅ Deploy lên VPS thật
✅ Hiểu toàn bộ system đang chạy
```

Chỉ vậy thôi — đã là **portfolio cực mạnh** rồi.

---

## 🧱 Full Stack — Toàn bộ tech sẽ học và build

### Core (Phase 1–3)
| Layer | Tech | Lý do chọn |
|---|---|---|
| **Frontend** | SvelteKit 2 + TailwindCSS v4 | Nhẹ, SSR tốt, ít boilerplate hơn Next.js |
| **Backend** | Go + Fiber v2 | Binary nhỏ, RAM thấp, dễ deploy |
| **Database** | PostgreSQL (self-host) | Standard, học được dùng mãi |
| **Cache / Queue** | Valkey (Redis fork, self-host) | Session store, cache hot data, job queue nhẹ |
| **Video storage** | Cloudflare R2 | Free egress, rẻ nhất thị trường |
| **Video pipeline** | FFmpeg | Không thể thiếu, chuẩn công nghiệp |
| **Payment** | Stripe | Không có lựa chọn nào tốt hơn |
| **Deploy** | 1 VPS Hetzner + Docker | Đơn giản, €7–10/tháng |

### Advanced (Phase 4–5)
| Layer | Tech | Lý do chọn |
|---|---|---|
| **Message queue** | NATS JetStream (self-host) | Video job queue, event-driven pipeline |
| **Search** | Typesense (self-host) | Full-text search nhanh hơn PostgreSQL |
| **Networking** | WireGuard VPN | Kết nối private giữa các service/VPS |
| **Monitoring** | Grafana + Prometheus + Loki | Metrics, alert, log aggregation |
| **Analytics** | Umami (self-host) | Không có Google Analytics tracking |

> 💡 **Cách tiếp cận:** Học và build từng layer theo thứ tự phase.
> Khi một layer đã hiểu và chạy ổn → mới thêm layer tiếp theo.
> Không bỏ bất kỳ cái gì — chỉ là học có thứ tự.

---

## 🗺️ Roadmap 8 tháng

---

### PHASE 0 — Foundation
**⏳ Tháng 1 (Tuần 1–4) | ~60–70h**

Đây là nền móng. Không skip.

**Cần học:**
- [ ] Git cơ bản (commit, branch, merge, push, pull)
- [ ] Terminal / PowerShell cơ bản
- [ ] npm / pnpm (package.json, scripts, node_modules)
- [ ] Async JavaScript thật sự (Promise, async/await, event loop)
- [ ] Fetch API + REST API concepts (GET, POST, PUT, DELETE)
- [ ] JSON (parse, stringify, structure)
- [ ] Environment variables (.env, process.env)
- [ ] HTTP cơ bản (status codes, headers, cookies, CORS)

**Build nhỏ để luyện:**
- [ ] Fetch một public movie API (TMDB) và hiển thị ra màn hình
- [ ] Form đăng nhập fake (chỉ frontend, validate bằng JS)

**Tài nguyên:**
- [javascript.info](https://javascript.info) — đọc phần Promises + Async/Await
- [The Odin Project](https://www.theodinproject.com) — Git + terminal section
- Thực hành: tạo git repo, commit mỗi ngày có gì mới

---

### PHASE 1 — Frontend (SvelteKit)
**⏳ Tháng 2–3 (Tuần 5–12) | ~110–120h**

Học SvelteKit trong khi build luôn UI của project.

**Cần học:**
- [ ] Svelte syntax (reactivity, stores, lifecycle)
- [ ] SvelteKit routing (file-based, layouts, error pages)
- [ ] SSR vs CSR trong SvelteKit (load functions)
- [ ] TailwindCSS v4 (utility classes, responsive, dark mode)
- [ ] Form handling (Superforms + Zod)
- [ ] Gọi API từ SvelteKit (fetch trong load + client)
- [ ] Cookie / session handling phía client

**Build:**
- [ ] Layout chính (header, sidebar, footer)
- [ ] Trang home: hero banner + movie rows
- [ ] Movie card component (hover effect, shimmer loading)
- [ ] Movie detail page
- [ ] Trang đăng nhập / đăng ký
- [ ] User profile + watchlist UI
- [ ] Search page (UI trước, chưa cần backend)
- [ ] Mobile responsive

**Tip:** Giai đoạn này dùng mock data JSON, chưa cần backend thật.

**Tài nguyên:**
- [learn.svelte.dev](https://learn.svelte.dev) — official interactive tutorial
- [SvelteKit docs](https://kit.svelte.dev/docs)
- [Tailwind v4 docs](https://tailwindcss.com)

---

### PHASE 2 — Backend (Go + PostgreSQL)
**⏳ Tháng 3–5 (Tuần 9–20) | ~120–140h**

> ⚠️ Phase này chạy song song một phần với Phase 1.
> Tuần 9–12: học Go song song khi đang hoàn thiện FE.
> Tuần 13–20: focus backend chính.

**Cần học:**
- [ ] Go syntax cơ bản (types, functions, structs, interfaces, error handling)
- [ ] Go modules (go.mod, go.sum)
- [ ] Fiber v2 (routing, middleware, handlers)
- [ ] PostgreSQL basics (tables, queries, indexes)
- [ ] SQL thực tế (SELECT, JOIN, WHERE, transactions)
- [ ] sqlc (viết SQL → generate Go code)
- [ ] pgx v5 (connect + query PostgreSQL từ Go)
- [ ] Session-based auth (httponly cookie, không dùng JWT cũng được)
- [ ] Bcrypt password hashing
- [ ] Middleware (auth check, rate limit)
- [ ] Structured logging (zerolog)

**Build:**
- [ ] Docker Compose local: PostgreSQL + pgAdmin
- [ ] Database schema (movies, users, sessions, watchlist)
- [ ] Auth endpoints: register, login, logout, me
- [ ] Movie CRUD endpoints
- [ ] Category/genre endpoints
- [ ] Watchlist endpoints
- [ ] Search bằng PostgreSQL full-text (pg_trgm)
- [ ] Pagination (cursor-based)
- [ ] Kết nối SvelteKit frontend với Go backend

**Tài nguyên:**
- [go.dev/tour](https://go.dev/tour) — Go Tour chính thức
- [gofiber.io/docs](https://gofiber.io)
- [pgexercises.com](https://pgexercises.com) — SQL practice
- [sqlc.dev/docs](https://docs.sqlc.dev)

---

### PHASE 3 — Video Pipeline
**⏳ Tháng 5–7 (Tuần 21–30) | ~130–150h**

> 🔴 Phase khó nhất. Dành nhiều thời gian hơn ở cuối tuần.

**Cần học:**
- [ ] FFmpeg cơ bản (transcode, filters, output formats)
- [ ] HLS (HTTP Live Streaming) là gì, cách hoạt động
- [ ] m3u8 playlist format
- [ ] Adaptive bitrate streaming (multiple quality levels)
- [ ] Cloudflare R2 API (upload, presigned URL)
- [ ] Go worker pattern (goroutines, channels)
- [ ] hls.js (play HLS trong browser)

**Build:**
- [ ] R2 bucket setup + CORS config
- [ ] Presigned upload URL endpoint (Go)
- [ ] Upload video từ admin UI (SvelteKit)
- [ ] Go FFmpeg worker:
  - Nhận job khi upload xong
  - Transcode: 1080p / 720p / 480p
  - Tạo HLS segments (6s chunks)
  - Generate master.m3u8
  - Extract thumbnails (3 frames)
  - Upload kết quả lên R2
- [ ] Video player component (hls.js + custom controls)
- [ ] Quality selector (auto / 1080p / 720p / 480p)
- [ ] Signed CDN URL (4h expiry, chống hotlink)
- [ ] Resume playback (lưu vị trí trong DB)

**Bug thật sẽ gặp (đừng nản):**
```
video upload OK → HLS playlist broken
Safari không play (cần codec đúng)
Thumbnail extract wrong timestamp
Presigned URL expired quá nhanh
Worker crash giữa chừng → video stuck "processing"
```

Đây là bình thường. Debug từng cái một.

---

### PHASE 4 — Monetization (Stripe)
**⏳ Tháng 7 (Tuần 29–32) | ~50–60h**

**Cần học:**
- [ ] Stripe subscriptions (Products, Prices, Customers)
- [ ] Stripe webhook (verify signature, handle events)
- [ ] Feature gating (check tier trước khi cho xem)

**Build:**
- [ ] Trang pricing (SvelteKit)
- [ ] Checkout flow (Stripe Checkout hosted page — đơn giản nhất)
- [ ] Webhook handler (Go): xử lý payment success / cancel / failed
- [ ] Cập nhật DB user tier sau payment
- [ ] Feature gating middleware:
  - Free: 480p, giới hạn 5 phim/ngày
  - Basic: 720p, không giới hạn
  - Premium: 1080p, download

**Tài nguyên:**
- [stripe.com/docs/billing/subscriptions](https://stripe.com/docs/billing/subscriptions)
- Stripe CLI: test webhook local

---

### PHASE 5 — Infra & Deploy
**⏳ Tháng 8 (Tuần 33–36) | ~60–70h**

**Cần học:**
- [ ] Docker cơ bản (Dockerfile, docker-compose)
- [ ] Linux server basics (SSH, file permissions, systemd)
- [ ] Nginx (reverse proxy, HTTPS, config)
- [ ] Certbot (Let's Encrypt free SSL)
- [ ] GitHub Actions (CI/CD: test → build → deploy)
- [ ] Basic server security (UFW firewall, fail2ban, non-root user)

**Build:**
- [ ] Dockerfile cho Go app
- [ ] Dockerfile cho SvelteKit app
- [ ] docker-compose.yml production (app + PostgreSQL)
- [ ] Mua Hetzner VPS (CX22 là đủ cho MVP: €4/mo)
- [ ] Setup Nginx reverse proxy
- [ ] HTTPS với Let's Encrypt
- [ ] GitHub Actions deploy tự động khi push main
- [ ] Backup PostgreSQL hằng ngày (cron + R2)

---

## 📅 Timeline tóm tắt

```
Tháng 1        │ Phase 0: Foundation
               │ Git, terminal, async JS, fetch, HTTP

Tháng 2–3      │ Phase 1: SvelteKit Frontend
               │ Build UI, routing, SSR, gọi API

Tháng 3–5      │ Phase 2: Go Backend
               │ Go, PostgreSQL, auth, CRUD APIs

Tháng 5–7      │ Phase 3: Video Pipeline ← khó nhất
               │ FFmpeg, HLS, R2, video player

Tháng 7        │ Phase 4: Stripe Subscription
               │ Checkout, webhook, feature gating

Tháng 8        │ Phase 5: Deploy
               │ Docker, VPS, Nginx, CI/CD

─────────────────────────────────────────────────
🎯 Sau 8 tháng: MVP hoạt động trên domain thật
```

---

## 📊 Estimate thời gian học từng domain

| Domain | Độ khó | Thời gian học | Phase |
|---|---|---|---|
| Git + Terminal | ⭐⭐ | ~1 tuần | 0 |
| Async JS | ⭐⭐⭐ | ~1 tuần | 0 |
| SvelteKit | ⭐⭐⭐ | ~3–4 tuần | 1 |
| TailwindCSS | ⭐⭐ | ~1 tuần | 1 |
| Go cơ bản | ⭐⭐⭐ | ~3 tuần | 2 |
| PostgreSQL + SQL | ⭐⭐⭐ | ~2 tuần | 2 |
| Auth / Sessions | ⭐⭐⭐⭐ | ~1.5 tuần | 2 |
| FFmpeg | ⭐⭐⭐⭐⭐ | ~3 tuần | 3 |
| HLS streaming | ⭐⭐⭐⭐⭐ | ~2 tuần | 3 |
| Cloudflare R2 | ⭐⭐⭐ | ~1 tuần | 3 |
| Stripe | ⭐⭐⭐ | ~1.5 tuần | 4 |
| Docker | ⭐⭐⭐ | ~1 tuần | 5 |
| Linux + Nginx | ⭐⭐⭐ | ~1.5 tuần | 5 |
| CI/CD | ⭐⭐⭐ | ~1 tuần | 5 |

---

## 💡 Nguyên tắc để không bị overwhelmed

### 1. Học bằng cách build — không học rồi mới build

```
❌ Sai:  học hết SvelteKit xong mới bắt đầu code
✅ Đúng: làm movie card → tra docs khi cần → hiểu ngay
```

### 2. Mỗi ngày thường (1h): chỉ làm 1 việc nhỏ

```
Ví dụ:
- Viết 1 API endpoint
- Fix 1 bug
- Học 1 concept mới (đọc + test trong playground)
- Refactor 1 component
```

### 3. Cuối tuần (4–6h): sprint thật

```
Ví dụ thứ 7:
- 2h: làm tính năng mới (ví dụ: video player)
- 2h: kết nối frontend-backend
- 1h: test + fix bug + commit

Ví dụ chủ nhật:
- 3h: tiếp tục tính năng
- 1h: đọc docs / research cách làm tốt hơn
- 1h: viết notes lại những gì đã học
```

### 4. Commit code mỗi ngày

Dù nhỏ tới đâu cũng commit. Git log là nhật ký tiến bộ.

### 5. Khi bị stuck quá 30 phút: hỏi ngay, đừng cắm đầu mãi

---

## 🔴 Những điều sẽ khó — chuẩn bị tinh thần

| Moment khó | Cách vượt |
|---|---|
| Go syntax lạ (pointers, interfaces) | Code nhiều, đọc ít — tự khắc quen |
| SQL JOIN phức tạp | pgexercises.com luyện riêng |
| HLS playlist bị broken | Debug từng bước: file → ffprobe → browser |
| Stripe webhook không nhận | Dùng Stripe CLI test local trước |
| Deploy lần đầu fail | Google chính xác error message — có ngay |
| Tự hỏi "mình có đi đúng hướng không" | Nhìn lại commit log, đã đi xa hơn ngày hôm qua rất nhiều |

---

## 🏆 Sau 8 tháng — bạn sẽ có

**Skills:**
- Frontend developer (SvelteKit, TypeScript-adjacent)
- Backend developer (Go, REST API, auth, SQL)
- DevOps basics (Docker, VPS, Nginx, CI/CD)
- Video engineering (FFmpeg, HLS, streaming)
- Payments integration (Stripe)

**Portfolio:**
- 1 working streaming platform chạy trên domain thật
- Hiểu architecture từ browser đến database đến video pipeline
- Có thể explain design decisions khi phỏng vấn

**Level:**
```
Bắt đầu: HTML + CSS + JS cơ bản
Sau 8 tháng: Junior–Mid fullstack engineer
             (với niche expertise về video streaming)
```

---

## 📝 Cập nhật tiến độ

Dùng file [progress.md](./progress.md) để track từng task cụ thể.
File này là định hướng học — không cần sửa thường xuyên.

| Mốc | Mục tiêu |
|---|---|
| Tháng 1 xong | Git thành thục, async JS hiểu rõ, gọi được TMDB API |
| Tháng 3 xong | SvelteKit UI hoàn chỉnh, Go server chạy được |
| Tháng 5 xong | Auth + CRUD + search hoạt động đầy đủ |
| Tháng 7 xong | Upload + stream video được, Stripe checkout chạy |
| Tháng 8 xong | Deploy lên VPS, domain thật, HTTPS, CI/CD tự động |
