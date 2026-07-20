import {urlForImage} from './sanityClient';
import type {HeroLayer} from '../components/ParallaxHero';
import type {Story} from '../types/content';

/** Uses the story's authored parallax layers if present, otherwise falls back to a single hero-image layer. */
export function buildHeroLayers(story: Story): HeroLayer[] {
  if (story.layers && story.layers.length > 0) {
    return story.layers.map((layer, index) => ({
      url: urlForImage(layer.image).width(1200).url(),
      depth: layer.depth,
      zIndex: layer.zIndex ?? index,
    }));
  }

  return [
    {
      url: urlForImage(story.heroImage).width(1200).url(),
      depth: 0.4,
      zIndex: 0,
    },
  ];
}
