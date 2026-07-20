# @diime/mobile

Placeholder for the diime magazine React Native app (iOS + Android).

Not yet scaffolded. Planned stack (see `/root/.claude/plans/i-want-to-make-tender-sparrow.md` or the project plan doc):

- React Native (New Architecture) via Expo dev-client
- `react-native-reanimated` + `@shopify/react-native-skia` for the parallax/layered animation system
- `react-navigation`, TanStack Query, Zustand
- Mux Player SDK for video

To scaffold: `pnpm create expo-app@latest . --template` from within this directory (or replace it), then wire up the workspace `package.json` scripts (`dev`, `lint`, `typecheck`) to match Turborepo's expectations.
