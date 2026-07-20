import {defineField, defineType} from 'sanity'

export const openHoursWindow = defineType({
  name: 'openHoursWindow',
  title: 'Open hours window',
  type: 'object',
  fields: [
    defineField({
      name: 'startTime',
      title: 'Opens at',
      description: '24h local time, e.g. 10:00',
      type: 'string',
      validation: (rule) =>
        rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, {name: 'HH:MM time'}),
      initialValue: '10:00',
    }),
    defineField({
      name: 'endTime',
      title: 'Closes at',
      description: '24h local time, e.g. 21:00',
      type: 'string',
      validation: (rule) =>
        rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, {name: 'HH:MM time'}),
      initialValue: '21:00',
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      initialValue: 'America/New_York',
      readOnly: true,
    }),
  ],
  preview: {
    select: {start: 'startTime', end: 'endTime'},
    prepare({start, end}) {
      return {title: `${start} – ${end} ET`}
    },
  },
})
