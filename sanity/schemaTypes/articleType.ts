import { DocumentTextIcon } from '@sanity/icons'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { defineArrayMember, defineField, defineType } from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Artikel Blog',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Artikel',
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
      name: 'excerpt',
      title: 'Ringkasan Singkat',
      type: 'text',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'image',
      title: 'Gambar Sampul',
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
    defineField({
      name: 'author',
      title: 'Penulis',
      type: 'reference',
      to: { type: 'member' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: { type: 'articleCategory' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tag',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'content',
      title: 'Konten Artikel',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Tanggal Update',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Artikel Unggulan',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'views',
      title: 'Jumlah Tampilan',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'image',
      category: 'category.title',
    },
    prepare(selection) {
      const { author, category } = selection
      return {
        ...selection,
        subtitle: `${category || ''} • oleh ${author || 'Tidak ada penulis'}`,
      }
    },
  },
})
