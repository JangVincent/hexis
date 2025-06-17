# Hexis.cat Backend

> **Serverless Backend for Encrypted Publishing**

The backend service for Hexis.cat, built on Cloudflare Workers to provide a secure, scalable, and privacy-focused infrastructure for encrypted message publishing.

## 🎯 Service Overview

The backend provides:
- **API endpoints** for message publishing and retrieval
- **Access control** for encrypted content
- **Payment processing** integration
- **Rate limiting** and security measures

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── index.ts        # Application entry point
│   ├── routes/         # API route definitions
│   └── services/       # Business logic services
├── wrangler.jsonc      # Cloudflare Workers configuration
└── tsconfig.json      # TypeScript configuration
```

### Tech Stack

**Backend**
- Cloudflare Workers
- Hono (Web Framework)
- TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm 10.7.0+

### Installation & Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Deploy to production
pnpm deploy
```

## 📋 Development Status

The backend is currently in development:
- ✅ Basic project structure
- ✅ Development environment setup
- ✅ API framework integration
- 🔄 Core features implementation in progress

## 🎨 Core Features (Planned)

- [ ] Message encryption/decryption endpoints
- [ ] Access control system
- [ ] Payment processing integration
- [ ] Rate limiting and security
- [ ] Analytics and monitoring
- [ ] Caching layer

## 🔐 Security & Privacy

- Serverless architecture
- No data persistence
- Rate limiting protection
- CORS configuration
- Request validation

## 📄 License

ISC License

---

**🜍 hexis.cat** — Publish what matters, hide what must.
