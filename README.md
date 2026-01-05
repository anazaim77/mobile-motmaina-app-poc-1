# Motmaina App POC

Single Expo React Native project that produces 4 different apps: Customer and Consultant variants, each with Staging and Production environments.

## Prerequisites

- Node.js 18+ and npm
- Xcode (for iOS builds on macOS)
- Android Studio (for Android builds)
- EAS CLI: `npm install -g eas-cli`

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Development Scripts

### Start Development Server

```bash
# Default (customer)
npm start

# Customer app (staging)
npm run start:customer

# Consultant app (staging)
npm run start:consultant
```

### Run on iOS Simulator

```bash
# Default iOS
npm run ios

# Customer app on iPhone 16
npm run ios:customer

# Consultant app on iPhone 16
npm run ios:consultant
```

### Run on Android Emulator

```bash
# Default Android
npm run android

# Customer app
npm run android:customer

# Consultant app
npm run android:consultant
```

## Local Build Scripts

### iOS Local Builds

```bash
# Customer Staging
npm run build:ios:customer:staging

# Customer Production
npm run build:ios:customer:prod

# Consultant Staging
npm run build:ios:consultant:staging

# Consultant Production
npm run build:ios:consultant:prod
```

### Android Local Builds

```bash
# Customer Staging
npm run build:android:customer:staging

# Customer Production
npm run build:android:customer:prod

# Consultant Staging
npm run build:android:consultant:staging

# Consultant Production
npm run build:android:consultant:prod
```

## Utility Scripts

```bash
# TypeScript type checking
npm run typecheck

# Linting
npm run lint
```

## Project Structure

```
.
├── app/                           # Expo Router pages
│   ├── (customer)/               # Customer app routes
│   │   ├── _layout.tsx          # Customer auth guard
│   │   ├── login.tsx            # Customer login
│   │   ├── index.tsx            # Customer home (psychologist list)
│   │   └── consultants/[id].tsx # Psychologist detail
│   ├── (consultant)/            # Consultant app routes
│   │   ├── _layout.tsx          # Consultant auth guard
│   │   ├── login.tsx            # Consultant login
│   │   └── index.tsx            # Consultant home
│   └── _layout.tsx              # Root layout (variant guard, ErrorBoundary)
├── src/
│   ├── shared/                  # Shared code
│   │   ├── api/                 # API client, mock server
│   │   ├── components/          # Shared UI components
│   │   ├── config/              # Environment configuration
│   │   ├── hooks/               # Custom hooks
│   │   ├── monitoring/          # Sentry setup
│   │   ├── types/               # Shared TypeScript types
│   │   └── utils/               # Utilities
│   ├── customer/                # Customer-specific code
│   │   ├── api/                 # Customer API calls
│   │   └── stores/              # Customer Zustand stores
│   └── consultant/              # Consultant-specific code
│       └── stores/              # Consultant Zustand stores
├── assets/                      # App icons and splash screens
├── .env.staging                 # Staging environment variables
├── .env.production              # Production environment variables
├── app.config.ts                # Dynamic Expo configuration
├── eas.json                     # EAS Build profiles
└── TESTING.md                   # Testing documentation
```

## Environment Variables

The app uses different environment files based on `APP_ENV`:

- `.env.staging` - Staging environment configuration
- `.env.production` - Production environment configuration

### Available Variables

```bash
EXPO_PUBLIC_API_BASE_URL=https://staging-api.motmaina.com
EXPO_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

## App Variants

The project uses `APP_VARIANT` environment variable to determine which app to build:

- `customer` - Customer-facing app for finding psychologists
- `consultant` - Consultant-facing app for managing practice

Each variant has its own:

- Route group in `app/` directory
- Auth store in `src/{variant}/stores/`
- Bundle identifier/package name
- App icon and splash screen

### Bundle Identifiers

The app generates unique bundle identifiers for each variant and environment:

| Variant    | Environment | iOS Bundle Identifier          | Android Package Name           | App Name                      |
|------------|-------------|--------------------------------|--------------------------------|-------------------------------|
| Customer   | Staging     | `com.motmaina.customer.staging` | `com.motmaina.customer.staging` | Motmaina Customer (Staging)   |
| Customer   | Production  | `com.motmaina.customer`        | `com.motmaina.customer`        | Motmaina Customer             |
| Consultant | Staging     | `com.motmaina.consultant.staging` | `com.motmaina.consultant.staging` | Motmaina Consultant (Staging) |
| Consultant | Production  | `com.motmaina.consultant`      | `com.motmaina.consultant`      | Motmaina Consultant           |

**Pattern:**
- Base: `com.motmaina`
- Variant suffix: `.customer` or `.consultant`
- Environment suffix: `.staging` (production has no suffix)
- Full identifier: `com.motmaina.{variant}{.staging}`

This allows all 4 apps to be installed simultaneously on the same device without conflicts.

## Features Implemented

### Customer App

- ✅ Login with mock authentication
- ✅ Browse psychologists (Saudi profiles)
- ✅ Search psychologists by name/specialization/location
- ✅ View psychologist details
- ✅ Session persistence with SecureStore

### Consultant App

- ✅ Login with mock authentication
- ✅ Minimal home screen
- ✅ Session persistence with SecureStore

### Shared Features

- ✅ Auth guards with automatic redirects
- ✅ Error boundary with fallback UI
- ✅ Sentry error monitoring
- ✅ TypeScript strict mode
- ✅ Inter font family
- ✅ Mock API server (dev-only)

## Testing

See [TESTING.md](./TESTING.md) for comprehensive testing documentation.

## Mock Authentication

During development, the app uses a mock authentication server. Any email/password combination will successfully authenticate.

Example credentials:

- Email: `test@example.com`
- Password: `password`

## Troubleshooting

### iOS Simulator Not Starting

```bash
# List available simulators
xcrun simctl list devices

# Boot a specific simulator
xcrun simctl boot "iPhone 16"

# Then run the app
npm run ios:customer
```

### Android Emulator Not Starting

```bash
# List available AVDs
emulator -list-avds

# Start an emulator
emulator -avd <AVD_NAME>

# Then run the app
npm run android:customer
```

### TypeScript Errors

```bash
# Run type checking
npm run typecheck
```

### Environment Variables Not Loading

Make sure you have `.env.staging` and `.env.production` files in the root directory.

## License

Private - All Rights Reserved
