import { MdSchool } from 'react-icons/md'
import { defineField, defineType } from 'sanity'

export const schoolListType = defineType({
  name: 'schoolList',
  title: 'Daftar Sekolah',
  type: 'document',
  icon: MdSchool,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Daftar Sekolah KKG',
    }),
    defineField({
      name: 'schools',
      title: 'Daftar Sekolah',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'schoolItem',
          title: 'Item Sekolah',
          fields: [
            defineField({
              name: 'logo',
              title: 'Logo Sekolah',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Teks Alternatif',
                  validation: (Rule) => Rule.required(),
                  initialValue: 'Logo Sekolah',
                }),
              ],
            }),
            defineField({
              name: 'name',
              title: 'Nama Sekolah',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link Web Sekolah',
              type: 'string',
              initialValue: '#',
            }),
            defineField({
              name: 'order',
              title: 'Urutan',
              type: 'number',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Sekolah Tanpa Nama',
                media: media,
                subtitle: 'Logo Sekolah',
              }
            },
          },
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
        subtitle: 'Daftar sekolah untuk LogoLoop',
      }
    },
  },
})
