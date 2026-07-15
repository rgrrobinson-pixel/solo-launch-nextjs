import { defineField, defineType } from 'sanity';

export const destinationsGallery = defineType({
  name: 'destinationsGallery',
  title: 'Destinations Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'destinations',
      title: 'Destinations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'destination' }] }],
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
        ],
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
});
