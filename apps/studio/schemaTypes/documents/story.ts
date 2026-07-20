import {defineArrayMember, defineField, defineType} from 'sanity'

export const story = defineType({
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      description: 'Controls pacing/placement — wire posts are fast-turnaround, features are edition-driven.',
      type: 'string',
      options: {
        list: [
          {title: 'Wire (live/reactive)', value: 'wire'},
          {title: 'Feature', value: 'feature'},
          {title: 'Video', value: 'video'},
          {title: 'Review', value: 'review'},
          {title: 'Award', value: 'award'},
        ],
      },
      validation: (rule) => rule.required(),
      initialValue: 'wire',
    }),
    defineField({
      name: 'dek',
      title: 'Dek / subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'layers',
      title: 'Parallax layers',
      description: 'Optional stacked PNG layers for the scroll-driven parallax treatment.',
      type: 'array',
      of: [defineArrayMember({type: 'parallaxLayer'})],
    }),
    defineField({
      name: 'videoAssetId',
      title: 'Mux video asset ID',
      description: 'Set when kind is "video" — playback URL is resolved by the app via Mux.',
      type: 'string',
      hidden: ({document}) => document?.kind !== 'video',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'reference',
      to: [{type: 'department'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contributors',
      title: 'Contributors',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'contributor'}]})],
    }),
    defineField({
      name: 'edition',
      title: 'Edition',
      description: 'Leave empty for wire/live posts not tied to a monthly edition.',
      type: 'reference',
      to: [{type: 'edition'}],
    }),
    defineField({
      name: 'relatedShop',
      title: 'Related shop',
      type: 'reference',
      to: [{type: 'shop'}],
    }),
    defineField({
      name: 'relatedDrop',
      title: 'Related drop',
      type: 'reference',
      to: [{type: 'drop'}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'isExclusive',
      title: 'Subscriber-exclusive',
      description: 'If set, only visible to diime+ subscribers once outside the current edition.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Published, newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'kind', media: 'heroImage'},
  },
})
