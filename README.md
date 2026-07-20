# diime magazine

Monorepo for the diime magazine app — an iOS/Android-only NYC digital publication with editorial content, curated e-commerce (consigned drops from LES boutiques), RSVP/ticketing, and subscriptions.

See the project plan for the full product/technical breakdown (architecture, commerce model, phased roadmap).

## Structure

```
apps/
  studio/       Sanity Studio — CMS for stories, editions, shops, drops, events, ads
  mobile/       React Native app (iOS + Android) — not yet scaffolded
  staff-web/    Shop-staff pickup verification web app — not yet scaffolded
services/
  api/          Application backend (auth, entitlements, orders, fulfillment) — not yet scaffolded
packages/
  config/       Shared tsconfig/tooling config
```

## Tooling

- Package manager: [pnpm](https://pnpm.io) (workspaces) — pinned via `packageManager` in the root `package.json`
- Task runner: [Turborepo](https://turbo.build)

## Getting started

```
pnpm install
pnpm dev      # runs `dev` in every workspace package via Turborepo
```

To work on a single package: `pnpm --filter @diime/studio dev`
