import {defineArrayMember, defineField, defineType} from 'sanity'

export const award = defineType({
  name: 'award',
  title: 'Award / Year-end list',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'e.g. "Best Dollar Van Route" or "Shop of the Year"',
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
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({type: 'block'}), defineArrayMember({type: 'image', options: {hotspot: true}})],
    }),
    defineField({
      name: 'relatedShop',
      title: 'Related shop',
      type: 'reference',
      to: [{type: 'shop'}],
    }),
    defineField({
      name: 'relatedStory',
      title: 'Related story',
      type: 'reference',
      to: [{type: 'story'}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'year', media: 'coverImage'},
  },
})
