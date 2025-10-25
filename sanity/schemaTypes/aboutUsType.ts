import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const aboutUsType = defineType({
  name: 'aboutUs',
  title: 'Tentang Kami',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      initialValue: 'Tentang Kami',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subjudul',
      type: 'string',
    }),
 
    defineField({
      name: 'items',
      title: 'Item-item Tentang Kami',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              type: 'string',
              title: 'Icon (emoji atau nama)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Judul',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              type: 'string',
              title: 'Subtitle',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Halaman Tentang Kami',
      }
    },
  },
})
