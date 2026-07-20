import {defineField, defineType} from 'sanity'

export const parallaxLayer = defineType({
  name: 'parallaxLayer',
  title: 'Parallax layer',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'depth',
      title: 'Depth',
      description:
        'Parallax scroll factor for this layer, 0 (fixed/background) to 1 (moves with content).',
      type: 'number',
      validation: (rule) => rule.min(0).max(1),
      initialValue: 0.5,
    }),
    defineField({
      name: 'zIndex',
      title: 'Stack order',
      description: 'Higher values render on top of lower values.',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'caption',
      title: 'Caption (internal)',
      type: 'string',
    }),
  ],
  preview: {
    select: {media: 'image', depth: 'depth'},
    prepare({media, depth}) {
      return {title: `Layer (depth ${depth ?? '—'})`, media}
    },
  },
})
