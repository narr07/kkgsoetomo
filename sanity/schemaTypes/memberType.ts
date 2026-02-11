import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const memberType = defineType({
  name: 'member',
  title: 'Anggota KKG',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
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
      name: 'role',
      title: 'Jabatan/Posisi',
      type: 'string',
      options: {
        list: [
          { title: 'Penasihat', value: 'Penasihat' },
          { title: 'Ketua KKG', value: 'Ketua KKG' },
          { title: 'Wakil Ketua', value: 'Wakil Ketua' },
          { title: 'Sekretaris', value: 'Sekretaris' },
          { title: 'Bendahara', value: 'Bendahara' },
          { title: 'Anggota', value: 'Anggota' },
        ],
      },
      initialValue: 'Anggota',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'school',
      title: 'Sekolah',
      type: 'string',
      options: {
        list: [
          { title: 'SDN Pajajar I', value: 'SDN Pajajar I' },
          { title: 'SDN Pajajar II', value: 'SDN Pajajar II' },
          { title: 'SDN Teja I', value: 'SDN Teja I' },
          { title: 'SDN Teja II', value: 'SDN Teja II' },
          { title: 'SDN Payung I', value: 'SDN Payung I' },
          { title: 'SDN Payung II', value: 'SDN Payung II' },
          { title: 'SDN Payung III', value: 'SDN Payung III' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Foto Profil',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
    prepare(selection) {
      const { subtitle } = selection
      return {
        ...selection,
        subtitle: subtitle && `${subtitle}`,
      }
    },
  },
})
