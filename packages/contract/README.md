# Hexis Smart Contracts

> **Solidity Smart Contracts for Hexis Protocol**

Smart contracts for the Hexis protocol, enabling encrypted message publishing with access control and payment mechanisms on the blockchain.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Run tests with gas reporting
REPORT_GAS=true npx hardhat test

# Start local blockchain
npx hardhat node

# Deploy contracts
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

## 🛠️ Tech Stack

- **Solidity ^0.8.28** - Smart contract language
- **Hardhat** - Ethereum development environment
- **Viem** - TypeScript interface for Ethereum
- **TypeScript** - Type-safe development
- **Hardhat Ignition** - Deployment management

## 📁 Project Structure

```
contracts/
├── Lock.sol              # Sample time-lock contract
└── [Future contracts]    # Core Hexis protocol contracts

test/
├── Lock.ts              # Tests for Lock contract
└── [Future tests]       # Tests for protocol contracts

ignition/
└── modules/
    └── Lock.ts          # Deployment configuration

hardhat.config.ts        # Hardhat configuration
```

## 🎯 Planned Contracts

The following smart contracts will be developed for the Hexis protocol:

- **MessageRegistry** - Store encrypted message metadata
- **AccessControl** - Manage wallet-based access permissions
- **PaymentProcessor** - Handle access payments with 1% fee
- **LinkGenerator** - Create and manage short links
- **EncryptionManager** - Handle encryption key management

## 🔧 Development

### Local Development
```bash
# Start local blockchain
npx hardhat node

# Deploy to local network
npx hardhat run scripts/deploy.ts --network localhost

# Interact with contracts
npx hardhat console --network localhost
```

### Testing
```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/Lock.ts

# Run tests with gas reporting
REPORT_GAS=true npx hardhat test

# Run tests with coverage
npx hardhat coverage
```

### Deployment
```bash
# Deploy to testnet
npx hardhat run scripts/deploy.ts --network sepolia

# Deploy to mainnet
npx hardhat run scripts/deploy.ts --network mainnet

# Verify contracts on Etherscan
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

## 🔐 Security Features

- **Access Control**: Wallet-based permission system
- **Payment Security**: Non-custodial payment processing
- **Data Privacy**: On-chain storage with client-side encryption
- **Fee Management**: Transparent 1% protocol fee
- **Upgradeability**: Planned upgradeable contract architecture

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `compile` | Compile all contracts |
| `test` | Run test suite |
| `node` | Start local blockchain |
| `clean` | Clean build artifacts |
| `coverage` | Generate test coverage |

## 🔗 Related

- [Frontend Application](../frontend/README.md)
- [Hexis Protocol Documentation](../README.md)
- [Project Root](../../README.md)

## 📄 License

ISC License

---

**🜍 hexis.cat** — Publish what matters, hide what must.
