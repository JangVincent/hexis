# Hexis Frontend

> **React + TypeScript + Vite Frontend for Hexis Protocol**

The frontend application for Hexis, a publishing protocol for encrypted messages. Built with modern React and TypeScript for optimal developer experience and type safety.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Format code
pnpm format

# Lint code
pnpm lint
```

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TanStack Router** - Type-safe routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **ESLint** - Code linting
- **Biome** - Code formatting

## 📁 Project Structure

```
src/
├── main.tsx              # Application entry point
├── routes/               # TanStack Router routes
│   ├── __root.tsx        # Root layout
│   └── index.tsx         # Home page
├── routeTree.gen.ts      # Auto-generated route tree
├── styles.css            # Global styles
└── vite-env.d.ts         # Vite type definitions
```

## 🎨 Development

### Development Server
The development server runs on `http://localhost:5173` by default with:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- TypeScript compilation
- Tailwind CSS processing

### Code Quality
- **ESLint**: Configured with React and TypeScript rules
- **Biome**: Code formatting and import organization
- **TypeScript**: Strict type checking enabled

### Build Process
- TypeScript compilation with `tsc -b`
- Vite build optimization
- Code splitting and tree shaking
- CSS optimization with Tailwind

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration with React and TanStack Router plugins
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration
- `tailwind.config.js` - Tailwind CSS configuration (auto-generated)

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start development server |
| `build` | Build for production |
| `preview` | Preview production build |
| `lint` | Run ESLint |
| `format` | Format code with Biome |

## 🔗 Related

- [Hexis Protocol Documentation](../README.md)
- [Smart Contracts](../contract/README.md)
- [Project Root](../../README.md)

---

**🜍 hexis.cat** — Publish what matters, hide what must.
