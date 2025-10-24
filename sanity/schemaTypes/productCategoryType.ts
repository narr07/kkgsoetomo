import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const productCategoryType = defineType({
  name: 'productCategory',
  title: 'Kategori Produk',
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
      name: 'icon',
      title: 'Ikon (Emoji atau URL)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      icon: 'icon',
    },
  },
})
