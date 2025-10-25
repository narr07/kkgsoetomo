import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: false,
})

async function createAboutUsDocument() {
  try {
    const doc = {
      _type: 'aboutUs',
      _id: 'aboutUs', // Singleton ID
      title: 'Tentang Kami',
      subtitle: 'Mengenal lebih dekat KKG dr. Soetomo',
      description: 'KKG dr. Soetomo adalah komunitas guru yang berdedikasi untuk meningkatkan kualitas pendidikan melalui kolaborasi dan inovasi.',
      highlights: [
        {
          icon: '📚',
          title: 'Edukasi',
          description: 'Menyediakan program edukasi dan pelatihan untuk para pendidik',
        },
        {
          icon: '🤝',
          title: 'Kolaborasi',
          description: 'Memfasilitasi kolaborasi antar guru dan institusi pendidikan',
        },
        {
          icon: '🎯',
          title: 'Inovasi',
          description: 'Mengembangkan solusi inovatif untuk tantangan pendidikan modern',
        },
      ],
    }

    const result = await client.createOrReplace(doc)
    console.log('✅ Document "Tentang Kami" berhasil dibuat:', result._id)
    return result
  } catch (error) {
    console.error('❌ Error membuat document:', error)
    throw error
  }
}

// Run script
createAboutUsDocument().catch(console.error)
