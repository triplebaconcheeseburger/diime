import {defineField, defineType} from 'sanity'

export const contributor = defineType({
  name: 'contributor',
  title: 'Contributor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: ['editor', 'writer', 'photographer', 'stylist', 'videographer', 'guest'],
      },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram handle',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'roles', media: 'avatar'},
    prepare({title, subtitle, media}) {
      return {title, subtitle: Array.isArray(subtitle) ? subtitle.join(', ') : subtitle, media}
    },
  },
})
