# Imperial Monorepo

A monorepo containing the Imperial backend API and frontend shell application.

## Project Structure

```
imperial/
├── backend/          # Node.js/Express API server
├── shell/           # React/Vite frontend application
├── package.json     # Root package.json with workspace configuration
├── turbo.json       # Turborepo configuration
└── README.md        # This file
```

## Prerequisites

- Node.js >= 18.0.0
- Yarn >= 1.22.0 (package manager)

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start development servers for all packages:
   ```bash
   yarn dev
   ```

3. Build all packages:
   ```bash
   yarn build
   ```

## Available Scripts

### Root Level Scripts

- `yarn dev` - Start development servers for all packages
- `yarn build` - Build all packages
- `yarn lint` - Lint all packages
- `yarn clean` - Clean build artifacts
- `yarn type-check` - Run TypeScript type checking

### Backend Scripts

- `yarn workspace @imperial/backend dev` - Start backend development server
- `yarn workspace @imperial/backend build` - Build backend
- `yarn workspace @imperial/backend migrate` - Run database migrations

### Frontend Scripts

- `yarn workspace @imperial/shell dev` - Start frontend development server
- `yarn workspace @imperial/shell build` - Build frontend
- `yarn workspace @imperial/shell lint` - Lint frontend

## Development

### Running Individual Packages

You can run commands for specific packages using yarn workspaces:

```bash
# Run backend only
yarn workspace @imperial/backend dev

# Run frontend only
yarn workspace @imperial/shell dev

# Build specific package
yarn workspace @imperial/backend build
```

### Adding Dependencies

- **Root dependencies**: `yarn add <package> -W`
- **Backend dependencies**: `yarn workspace @imperial/backend add <package>`
- **Frontend dependencies**: `yarn workspace @imperial/shell add <package>`
- **Dev dependencies**: Add `-D` flag to any of the above commands

## Turborepo Features

This monorepo uses Turborepo for:

- **Parallel execution** of tasks across packages
- **Intelligent caching** of build outputs
- **Task dependency management**
- **Incremental builds**

## Workspace Configuration

The project uses Yarn workspaces defined in the root `package.json`:

```json
{
  "workspaces": [
    "backend",
    "shell"
  ]
}
```

## Contributing

1. Make changes in the appropriate package directory
2. Run linting: `yarn lint`
3. Build to verify: `yarn build`
