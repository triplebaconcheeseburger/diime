import {useQuery} from '@tanstack/react-query';

import {sanityClient} from './sanityClient';
import type {Edition, Story} from '../types/content';

const STORIES_QUERY = `*[_type == "story"] | order(publishedAt desc) {
  _id, title, slug, kind, dek, heroImage, layers, publishedAt, isExclusive,
  "department": department->{name}
}`;

const EDITIONS_QUERY = `*[_type == "edition" && status == "published"] | order(issueNumber desc) {
  _id, title, slug, issueNumber, coverImage, publishDate, status
}`;

export function useStories() {
  return useQuery({
    queryKey: ['stories'],
    queryFn: () => sanityClient.fetch<Story[]>(STORIES_QUERY),
  });
}

export function useEditions() {
  return useQuery({
    queryKey: ['editions'],
    queryFn: () => sanityClient.fetch<Edition[]>(EDITIONS_QUERY),
  });
}
