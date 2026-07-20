import {defineField, defineType} from 'sanity'

export const drop = defineType({
  name: 'drop',
  title: 'Drop',
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
      name: 'shop',
      title: 'Shop',
      type: 'reference',
      to: [{type: 'shop'}],
      validation: (rule) => rule.required(),
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
      name: 'dropDateTime',
      title: 'Drop date/time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'earlyAccessMinutes',
      title: 'Subscriber early-access window (minutes)',
      type: 'number',
      initialValue: 30,
    }),
    defineField({
      name: 'openHoursOverride',
      title: 'Open hours override',
      description: 'Leave empty to use the shop default hours.',
      type: 'openHoursWindow',
    }),
    defineField({
      name: 'shopifyCollectionId',
      title: 'Shopify collection ID',
      description: 'Links this editorial drop to the consigned inventory/collection in diime\'s Shopify store.',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: ['upcoming', 'live', 'ended']},
      initialValue: 'upcoming',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'status', media: 'coverImage'},
  },
})
