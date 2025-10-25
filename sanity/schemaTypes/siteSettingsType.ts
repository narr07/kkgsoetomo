import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Pengaturan Website',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Website',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'KKG dr. Soetomo',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Website',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo Website',
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
    }),
    defineField({
      name: 'email',
      title: 'Email Kontak',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Nomor Telepon',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Alamat',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Konfigurasi utama website',
      }
    },
  },
})
