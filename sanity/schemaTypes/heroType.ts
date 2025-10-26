import { MdHomeFilled } from 'react-icons/md'
import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  icon: MdHomeFilled,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Utama',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'KKG dr. Soertomo',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Gugus 5 - Kecamatan Rajagaluh Kabupaten Majalengka',
    }),
    defineField({
      name: 'showCTA',
      title: 'Tampilkan CTA (Call to Action)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'ctaText',
      title: 'Teks CTA',
      type: 'string',
      hidden: ({ parent }) => !parent?.showCTA,
      initialValue: 'Explore More',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Link CTA',
      type: 'url',
      hidden: ({ parent }) => !parent?.showCTA,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Hero Section',
        subtitle: subtitle,
      }
    },
  },
})
