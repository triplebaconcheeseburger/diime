# @diime/mobile

The diime magazine React Native app (iOS + Android), Expo (New Architecture, dev-client).

## What's here

- Sanity-backed feed: reads `story`/`edition` content from `apps/studio`'s project (`src/lib/sanityClient.ts`, `src/lib/queries.ts`)
- Bottom-tab navigation shell (Feed / Shop / Editions / Events) — only Feed is real, the rest are placeholders
- `src/components/ParallaxHero.tsx` — the animation proof-of-concept: stacked Skia canvases per image layer, each offset by scroll position × depth via Reanimated, driven by the story's `layers` field (falls back to a single hero-image layer if none are authored)

## Running locally (Mac + Xcode required — this can't be run from a remote/cloud session)

```
pnpm install                 # from repo root
cd apps/mobile
npx expo run:ios             # builds + opens Xcode project, runs on Simulator/device
```

`pnpm dev` (or `pnpm --filter @diime/mobile dev`) starts the Metro dev server against an existing dev-client build (`expo start --dev-client`) — run `expo run:ios`/`run:android` at least once first to produce that build.

## Config

- `app.json`: `ios.bundleIdentifier`/`android.package` are placeholder (`nyc.diime.magazine`) — confirm/replace with the real values before your first EAS build.
- Sanity project/dataset default to the ones in `apps/studio/sanity.config.ts`. Override via `EXPO_PUBLIC_SANITY_PROJECT_ID` / `EXPO_PUBLIC_SANITY_DATASET` env vars once there's a staging dataset.
- `eas.json`: build profile stub (development/preview/production) — run `eas init` locally to link this to an actual EAS project before using it.

## Not yet built

Auth, Shopify checkout, open-hours gating, subscriptions/IAP, push, deep links, video — see the project plan doc for sequencing.
