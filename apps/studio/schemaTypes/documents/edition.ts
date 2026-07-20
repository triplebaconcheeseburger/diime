import {defineField, defineType} from 'sanity'

export const edition = defineType({
  name: 'edition',
  title: 'Edition',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'e.g. "November 2026"',
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
      name: 'issueNumber',
      title: 'Issue number',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredStories',
      title: 'Featured stories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'story'}]}],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: ['draft', 'published', 'archived']},
      initialValue: 'draft',
    }),
  ],
  orderings: [
    {
      title: 'Issue number, newest first',
      name: 'issueNumberDesc',
      by: [{field: 'issueNumber', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'status', media: 'coverImage'},
  },
})
