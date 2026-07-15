import { defineField, defineType } from 'sanity';

export const itinerary = defineType({
  name: 'itinerary',
  title: 'Itinerary',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Itinerary Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'days',
      title: 'Days',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'day',
          title: 'Day',
          fields: [
            { name: 'dayNumber', title: 'Day Number', type: 'number' },
            { name: 'title', title: 'Day Title', type: 'string' },
            {
              name: 'activities',
              title: 'Activities',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'duration',
      title: 'Total Duration',
      type: 'string',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'easy' },
          { title: 'Moderate', value: 'moderate' },
          { title: 'Challenging', value: 'challenging' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
});
