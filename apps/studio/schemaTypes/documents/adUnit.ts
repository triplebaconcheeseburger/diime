import {defineField, defineType} from 'sanity'

export const adUnit = defineType({
  name: 'adUnit',
  title: 'Ad unit',
  type: 'document',
  fields: [
    defineField({
      name: 'sponsorName',
      title: 'Sponsor name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'creativeImage',
      title: 'Creative image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destinationUrl',
      title: 'Destination URL',
      description: 'External link, or a diime deep link if promoting in-app content.',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cadenceWeight',
      title: 'Cadence weight',
      description: 'Relative frequency versus other active ad units.',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'flightStart',
      title: 'Flight start',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'flightEnd',
      title: 'Flight end',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'headline', subtitle: 'sponsorName', media: 'creativeImage'},
  },
})
