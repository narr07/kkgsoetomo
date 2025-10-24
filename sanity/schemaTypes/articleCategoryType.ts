import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const articleCategoryType = defineType({
  name: 'articleCategory',
  title: 'Kategori Artikel',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Kategori',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'Warna Badge',
      type: 'string',
      options: {
        list: [
          { title: 'Biru', value: '#2563eb' },
          { title: 'Hijau', value: '#10b981' },
          { title: 'Merah', value: '#ef4444' },
          { title: 'Oranye', value: '#f97316' },
          { title: 'Ungu', value: '#a855f7' },
          { title: 'Pink', value: '#ec4899' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
  },
})
