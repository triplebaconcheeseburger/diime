export type SanityImageRef = {
  asset: {_ref: string; _type: 'reference'};
  hotspot?: {x: number; y: number};
};

export type StoryLayer = {
  image: SanityImageRef;
  depth: number;
  zIndex: number;
  caption?: string;
};

export type StoryKind = 'wire' | 'feature' | 'video' | 'review' | 'award';

export type Story = {
  _id: string;
  title: string;
  slug: {current: string};
  kind: StoryKind;
  dek?: string;
  heroImage: SanityImageRef;
  layers?: StoryLayer[];
  department?: {name: string};
  publishedAt: string;
  isExclusive?: boolean;
};

export type Edition = {
  _id: string;
  title: string;
  slug: {current: string};
  issueNumber: number;
  coverImage: SanityImageRef;
  publishDate: string;
  status: 'draft' | 'published' | 'archived';
};
