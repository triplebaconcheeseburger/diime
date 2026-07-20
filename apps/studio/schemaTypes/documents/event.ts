import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
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
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'venueName',
      title: 'Venue name',
      type: 'string',
    }),
    defineField({
      name: 'venueAddress',
      title: 'Venue address',
      type: 'string',
    }),
    defineField({
      name: 'startDateTime',
      title: 'Start',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDateTime',
      title: 'End',
      type: 'datetime',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      validation: (rule) => rule.integer().positive(),
    }),
    defineField({
      name: 'rsvpDeadline',
      title: 'RSVP deadline',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: ['upcoming', 'rsvp_closed', 'past', 'cancelled']},
      initialValue: 'upcoming',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'venueName', media: 'coverImage'},
  },
})
