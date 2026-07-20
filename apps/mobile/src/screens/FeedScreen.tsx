import {useMemo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Animated, {useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';

import {ParallaxHero} from '../components/ParallaxHero';
import {StoryCard} from '../components/StoryCard';
import {buildHeroLayers} from '../lib/heroLayers';
import {useStories} from '../lib/queries';
import type {Story} from '../types/content';

export function FeedScreen() {
  const scrollY = useSharedValue(0);
  const {data: stories, isLoading, isError} = useStories();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const [heroStory, ...restStories] = stories ?? [];
  const heroLayers = useMemo(() => (heroStory ? buildHeroLayers(heroStory) : []), [heroStory]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError || !heroStory) {
    return (
      <View style={styles.centered}>
        <Animated.Text style={styles.emptyText}>
          No stories yet — add one in Sanity Studio to see the feed.
        </Animated.Text>
      </View>
    );
  }

  return (
    <Animated.FlatList<Story>
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      data={restStories}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => <StoryCard story={item} />}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={<ParallaxHero layers={heroLayers} scrollY={scrollY} />}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
  },
  listContent: {
    paddingBottom: 40,
  },
});
