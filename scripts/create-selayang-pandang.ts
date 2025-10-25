import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: false,
})

async function createSelayangPandangDocument() {
  try {
    const doc = {
      _type: 'selayangPandang',
      _id: 'selayangPandang', // Singleton ID
      title: 'Selayang Pandang',
      ketua_kkg: {
        name: 'Nama Ketua KKG',
        message: 'Terima kasih atas dedikasi dan semangat belajar seluruh anggota. Bersama kita hadirkan inovasi bagi pendidikan Indonesia.',
      },
      ketua_gugus: {
        name: 'Nama Ketua Gugus',
        message: 'Selamat datang di KKG dr. Soetomo. Mari kita terus memperkuat kolaborasi untuk menghadirkan pembelajaran terbaik bagi peserta didik.',
      },
    }

    const result = await client.createOrReplace(doc)
    console.log('✅ Document "Selayang Pandang" berhasil dibuat:', result._id)
    return result
  } catch (error) {
    console.error('❌ Error membuat document:', error)
    throw error
  }
}

// Run script
createSelayangPandangDocument().catch(console.error)
