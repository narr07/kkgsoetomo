import { defineArrayMember, defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Produk/Layanan',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Produk',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Gambar Produk',
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
      name: 'category',
      title: 'Kategori Produk',
      type: 'reference',
      to: { type: 'productCategory' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Harga (Rp)',
      type: 'number',
    }),
    defineField({
      name: 'discount',
      title: 'Diskon (%)',
      type: 'number',
    }),
    defineField({
      name: 'stock',
      title: 'Stok Tersedia',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'content',
      title: 'Konten Detail',
      type: 'blockContent',
    }),
    defineField({
      name: 'features',
      title: 'Fitur/Keuntungan',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({
              name: 'title',
              title: 'Fitur',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Deskripsi',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'specifications',
      title: 'Spesifikasi',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'specification',
          fields: [
            defineField({
              name: 'key',
              title: 'Keterangan',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Nilai',
              type: 'string',
            }),
          ],
        }),
      ],
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
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Produk Unggulan',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sales',
      title: 'Jumlah Terjual',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.title',
      media: 'image',
      price: 'price',
    },
    prepare(selection) {
      const { price, subtitle } = selection
      const priceStr = price ? `Rp ${price.toLocaleString('id-ID')}` : 'Gratis'
      return {
        ...selection,
        subtitle: `${subtitle || 'Tanpa Kategori'} • ${priceStr}`,
      }
    },
  },
})
