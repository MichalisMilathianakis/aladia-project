# Aladia Backend

This is the **backend** for the **Aladia full-stack project**, built with **NestJS Monorepo Architecture**.  
It includes two independent applications communicating via **TCP microservices**, following **modular MVC principles**.

---

## Overview

### Architecture

The monorepo is organized into **apps** and **shared modules**:

- **Gateway App** → Exposes REST endpoints (`/auth/register`, `/auth/users`)
- **Authentication Microservice** → Handles business logic, persistence, and MongoDB operations
- **Common**, **Core**, **Config** → Shared DTOs, utilities, and configuration logic

Internal communication uses **@nestjs/microservices (TCP)** transport.

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Framework | NestJS 10 (Monorepo) |
| Communication | TCP Microservices |
| Database | MongoDB (Mongoose) |
| Validation | class-validator + DTOs |
| Docs | Swagger UI |
| Security | Helmet, Throttler (rate limit) |
| Config | @nestjs/config |
| Container | Docker-ready Mongo |
| Testing | Jest (unit + e2e) |

---

## Project Structure

```
backend/
├── apps/
│   ├── gateway/                  # HTTP Gateway app
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── gateway.module.ts
│   │   │   ├── gateway.controller.ts
│   │   │   ├── gateway.service.ts
│   │   └── test/
│   └── authentication/           # Auth microservice
│       ├── src/
│       │   ├── main.ts
│       │   ├── authentication.module.ts
│       │   ├── user/
│       │   │   ├── user.controller.ts
│       │   │   ├── user.service.ts
│       │   │   ├── user.repository.ts
│       │   │   └── user.schema.ts
│       └── test/
│
├── common/
│   └── dto/
│       └── auth/
│           ├── create-user.dto.ts
│           └── user.rto.ts
│
├── core/
│   └── database/
│       └── database.module.ts
│
├── config/
│   └── config.module.ts
│
├── .env.example
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## Setup Instructions

### 1️⃣ Prerequisites
Make sure you have:
- Node.js v20+
- npm v10+
- Docker (optional)
- MongoDB running locally or via container

### 2️⃣ Install Dependencies
```bash
cd backend
npm install
```

### 3️⃣ Environment File
Create `.env`:
```bash
# ---------- APP CONFIG ----------
PORT=3000
TCP_HOST=localhost
TCP_PORT=4000

# ---------- DATABASE ----------
MONGODB_URI=mongodb://localhost:27017/aladia-db

# ---------- ALLOWED IPS ----------
ALLOWED_ORIGINS=http://localhost:3001,https://demo.vercel.app
```

---

## Running the Apps

Run each service in separate terminals:

```bash
# Terminal 1
npm run start:dev:authentication

# Terminal 2
npm run start:dev:gateway
```

**Gateway** → `http://localhost:3000`  
**Auth Microservice (TCP)** → Port `4000`

---

## API Testing

### Register User  
**POST** `http://localhost:3000/auth/register`
```json
{
  "email": "user@example.com",
  "password": "secret123",
  "name": "Alice"
}
```

Response:
```json
{
  "id": "67329b184aa3bc4bcd244b2b",
  "email": "user@example.com",
  "name": "Alice",
  "createdAt": "2025-11-11T14:02:31.832Z"
}
```

### Get All Users  
**GET** `http://localhost:3000/auth/users`
```json
[
  {
    "id": "67329b184aa3bc4bcd244b2b",
    "email": "user@example.com",
    "name": "Alice",
    "createdAt": "2025-11-11T14:02:31.832Z"
  }
]
```

### Health Check  
**GET** `http://localhost:3000/health`
```json
{
  "status": "ok",
  "timestamp": "2025-11-11T14:03:21.987Z"
}
```

---

## Communication Flow

```
Frontend → Gateway (HTTP)
            ↓
         TCP Request
            ↓
Authentication Microservice → MongoDB
            ↓
         TCP Response
            ↓
Gateway → HTTP Response → Frontend
```

---

## Commands

| Command | Description |
|----------|-------------|
| `npm run start:dev:gateway` | Start HTTP Gateway |
| `npm run start:dev:authentication` | Start TCP Auth service |
| `npm run lint` | Lint code |
| `npm run test` | Run Jest tests |
| `npm run build` | Build all apps |

---

## MongoDB in Docker

Start MongoDB via Docker:
```bash
docker run --name mongo -d -p 27017:27017 mongo:7
```

Or using docker-compose:
```yaml
services:
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
volumes:
  mongo_data:
```

---

## Bonus Features

**Swagger Docs** → `http://localhost:3000/api`  
**Validation Pipes** → DTO-based input validation  
**Rate Limiting** → via `@nestjs/throttler`  
**Health Checks** → `/health` endpoint  
**ConfigModule** → Centralized env loading  

---

## Author

**Michalis Milathianakis**  

