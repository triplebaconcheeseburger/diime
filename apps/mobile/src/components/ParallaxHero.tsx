import {Canvas, Image as SkiaImage, useImage} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle, type SharedValue} from 'react-native-reanimated';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
export const HERO_HEIGHT = 440;

export type HeroLayer = {
  url: string;
  /** 0 = fixed background, 1 = moves at full scroll speed. */
  depth: number;
  zIndex: number;
};

/**
 * Stacked-PNG parallax hero: each layer is its own Skia canvas offset by
 * scroll position * depth, so layers separate visually as the feed scrolls.
 */
export function ParallaxHero({layers, scrollY}: {layers: HeroLayer[]; scrollY: SharedValue<number>}) {
  const sorted = [...layers].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <View style={styles.container}>
      {sorted.map((layer, index) => (
        <ParallaxLayer key={`${layer.url}-${index}`} layer={layer} scrollY={scrollY} />
      ))}
    </View>
  );
}

function ParallaxLayer({layer, scrollY}: {layer: HeroLayer; scrollY: SharedValue<number>}) {
  const image = useImage(layer.url);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{translateY: scrollY.value * layer.depth * -0.5}],
    };
  });

  if (!image) return null;

  return (
    <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
      <Canvas style={styles.canvas}>
        <SkiaImage image={image} x={0} y={0} width={SCREEN_WIDTH} height={HERO_HEIGHT} fit="cover" />
      </Canvas>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
    overflow: 'hidden',
    backgroundColor: '#0a0a0a',
  },
  canvas: {
    flex: 1,
  },
});
