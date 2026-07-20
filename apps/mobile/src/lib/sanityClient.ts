import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Matches apps/studio/sanity.config.ts — overridable via EXPO_PUBLIC_ env vars
// without a code change once we have per-environment (staging/prod) datasets.
export const sanityClient = createClient({
  projectId: process.env.EXPO_PUBLIC_SANITY_PROJECT_ID ?? 'v7npmax1',
  dataset: process.env.EXPO_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2026-07-20',
  useCdn: true,
});

const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: unknown) {
  return imageBuilder.image(source as never);
}
