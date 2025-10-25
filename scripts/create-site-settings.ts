import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: false,
})

async function createSiteSettingsDocument() {
  try {
    const doc = {
      _type: 'siteSettings',
      _id: 'siteSettings', // Singleton ID
      title: 'KKG dr. Soetomo',
      description: 'Kelompok Kerja Guru Soetomo - Platform kolaborasi untuk meningkatkan kualitas pendidikan',
      email: 'info@kkgsoetomo.com',
      phone: '+62 812 3456 7890',
      address: 'Jl. Pendidikan No. 1, Kota Pendidikan, Indonesia',
    }

    const result = await client.createOrReplace(doc)
    console.log('✅ Document "Pengaturan Website" berhasil dibuat:', result._id)
    return result
  } catch (error) {
    console.error('❌ Error membuat document:', error)
    throw error
  }
}

// Run script
createSiteSettingsDocument().catch(console.error)
