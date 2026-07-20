import {Image} from 'expo-image';
import {StyleSheet, Text, View} from 'react-native';

import {urlForImage} from '../lib/sanityClient';
import type {Story} from '../types/content';

export function StoryCard({story}: {story: Story}) {
  const imageUrl = urlForImage(story.heroImage).width(800).height(600).url();

  return (
    <View style={styles.card}>
      <Image source={{uri: imageUrl}} style={styles.image} contentFit="cover" />
      <View style={styles.meta}>
        <Text style={styles.kicker}>
          {(story.department?.name ?? story.kind).toUpperCase()}
        </Text>
        <Text style={styles.title}>{story.title}</Text>
        {story.dek ? <Text style={styles.dek}>{story.dek}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#111',
  },
  meta: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#888',
    marginBottom: 4,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  dek: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
});
