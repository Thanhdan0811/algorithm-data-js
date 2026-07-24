# Rubik Hub - Project Planning

# 🎯 Ý tưởng

Xây dựng một website Rubik hiện đại hỗ trợ:

- Hướng dẫn giải Rubik theo từng bước
- Animation 3D trực quan
- Hỗ trợ nhiều loại Rubik
- Random Scramble
- Challenge Mode
- Timer
- Leaderboard
- Thuật toán OLL / PLL / F2L
- Lưu lịch sử giải
- Hệ thống tài khoản người dùng

Mục tiêu:

> Một nền tảng để học, luyện tập và thi đấu Rubik online.

---

# 🚀 Các chức năng

## Public

- Trang chủ
- Giới thiệu Rubik
- Hướng dẫn cơ bản
- Danh sách thuật toán
- Xem Leaderboard
- Random Scramble

---

## User

- Đăng ký
- Đăng nhập
- Profile
- Thay Avatar
- Đổi Password

---

## Rubik Trainer

- 2x2
- 3x3
- 4x4
- 5x5
- Pyraminx
- Skewb
- Megaminx
- Square-1

---

## Practice

- Cross Trainer
- F2L Trainer
- OLL Trainer
- PLL Trainer

Random case

↓

Hiển thị cube

↓

Người dùng tự giải

↓

Check kết quả

---

## Challenge

Random Scramble

↓

Timer

↓

Solve

↓

Submit

↓

Lưu thành tích

---

## History

- Scramble
- Solve Time
- Move Count
- Date

---

## Leaderboard

- Top Time
- Top User
- Daily
- Weekly
- Monthly
- Global

---

# 🛠 Tech Stack

## Frontend

- Svelte 5
- SvelteKit
- TypeScript
- TailwindCSS
- Svelte Stores ($state)
- Three.js
- Threlte
- cubing.js
- Motion (optional)

---

## Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt
- Swagger

---

## Optional

- Redis
- WebSocket
- Docker
- Nginx

---

# 📁 Frontend Structure

```
src/

app.html

routes/
    +layout.svelte
    +page.svelte

    login/
    register/
    profile/

    trainer/
    challenge/
    leaderboard/
    algorithm/

components/

    cube/
    ui/
    timer/
    trainer/
    algorithm/

stores/

lib/

utils/

types/

services/

hooks/
```

---

# 📁 Backend Structure

```
src/

auth/

users/

cube/

algorithm/

challenge/

history/

leaderboard/

common/

config/

prisma/

guards/

decorators/

middleware/

filters/

interceptors/

main.ts
```

---

# 🗄 Database Design

## User

```
id
username
email
password
avatar
role
createdAt
updatedAt
```

---

## Challenge

```
id
type
scramble
createdAt
```

Ví dụ:

3x3

OLL

PLL

Random

---

## Result

```
id
userId
challengeId
time
moves
solved
createdAt
```

---

## History

```
id
userId
scramble
solveTime
moveCount
cubeType
createdAt
```

---

## Algorithm

```
id
category

name

notation

description

image

createdAt
```

category:

- Cross
- F2L
- OLL
- PLL

---

## User Settings

```
id

userId

theme

cubeColor

timerSound

inspection

language
```

---

# 🔗 Quan hệ

```
User

│

├──── History

├──── Result

└──── Settings

Challenge

│

└──── Result
```

---

# 🌐 API gợi ý

Auth

```
POST /auth/register

POST /auth/login

GET /auth/profile
```

User

```
GET /users/me

PATCH /users/me
```

Challenge

```
GET /challenge/random

POST /challenge/start

POST /challenge/submit
```

History

```
GET /history

POST /history
```

Leaderboard

```
GET /leaderboard

GET /leaderboard/daily

GET /leaderboard/monthly
```

Algorithm

```
GET /algorithm

GET /algorithm/oll

GET /algorithm/pll

GET /algorithm/f2l
```

---

# 🎲 Frontend State

Global Store

```
theme

user

cubeState

scramble

timer

history

settings
```

---

# 📦 Thư viện nên dùng

Frontend

- TailwindCSS
- cubing.js
- Three.js
- Threlte
- clsx
- zod
- svelte-sonner

Backend

- Prisma
- class-validator
- class-transformer
- Passport JWT
- Swagger

---

# 📌 Roadmap

## Phase 1

- Setup
- Auth
- Layout
- UI

---

## Phase 2

- Cube 3D
- Rotate
- Camera

---

## Phase 3

- Scramble
- Reset
- Notation Parser

---

## Phase 4

- Trainer
- Algorithm
- Animation

---

## Phase 5

- Timer
- Challenge
- History

---

## Phase 6

- Leaderboard
- Ranking
- Profile

---

## Phase 7

- Multiplayer (WebSocket)
- Room
- Race
- Live Ranking

---

# ⭐ Điểm nổi bật Portfolio

- SvelteKit Full Project
- NestJS REST API
- PostgreSQL + Prisma
- JWT Authentication
- Three.js 3D
- Rubik Engine
- Algorithm Trainer
- Leaderboard
- Challenge Mode
- Responsive UI
- Dark Mode
- Docker Deploy
- Swagger API
- Clean Architecture

```

```
