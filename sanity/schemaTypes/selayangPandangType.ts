import { InfoOutlineIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const selayangPandangType = defineType({
  name: 'selayangPandang',
  title: 'Selayang Pandang',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Selayang Pandang',
    }),
    defineField({
      name: 'ketua_kkg',
      title: 'Ketua KKG',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Nama',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'message',
          title: 'Sambutan',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'photo',
          title: 'Foto Profil',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Teks Alternatif',
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'ketua_gugus',
      title: 'Ketua Gugus',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Nama',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'message',
          title: 'Sambutan',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'photo',
          title: 'Foto Profil',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Teks Alternatif',
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Sambutan Pimpinan',
      }
    },
  },
})
