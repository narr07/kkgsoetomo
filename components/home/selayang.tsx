import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetch } from '@/sanity/lib/client'
import { selayangPandangQuery } from '@/sanity/lib/queries'

interface SanityImage {
  _type?: string;
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
    };
  };
  hotspot?: Record<string, unknown>;
  crop?: Record<string, unknown>;
  alt?: string;
}

interface Leader {
  name: string;
  message: string;
  photo: SanityImage;
}

interface SelayangPandang {
  title: string;
  ketua_kkg: Leader;
  ketua_gugus: Leader;
}

export default async function Selayang() {
  let data: SelayangPandang | null = null;

  try {
    data = await sanityFetch({
      query: selayangPandangQuery,
      revalidate: 60,
    });
  } catch (error) {
    console.error('Error fetching selayang pandang data:', error);
    return null;
  }

  if (!data) {
    return null;
  }

  const leaders = [
    {
      name: data.ketua_gugus.name,
      role: 'Ketua Gugus',
      message: data.ketua_gugus.message,
      photo: data.ketua_gugus.photo,
    },
    {
      name: data.ketua_kkg.name,
      role: 'Ketua KKG',
      message: data.ketua_kkg.message,
      photo: data.ketua_kkg.photo,
    },
  ];
  return (
    <section className="py-16 px-4 transition-colors">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-900 dark:text-secondary-400">
            Selayang Pandang
          </p>
          <h2 className="mt-3 text-3xl font-bold text-primary-900 dark:text-secondary-50">
            Sambutan Pimpinan
          </h2>
          <p className="mt-4 text-primary-900 dark:text-secondary-50">
            Pesan hangat dari para pemimpin kami untuk seluruh anggota komunitas.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {leaders.map((leader) => (
            <div
              key={leader.role}
              className="rounded-xl bg-white dark:bg-primary-700 p-8 shadow-xl border border-primary-700 dark:border-secondary-50"
            >
              {/* Quote Section */}
              <div className="mb-8">
                <p className="text-primary-800 dark:text-gray-400 text-base leading-relaxed italic">
                  &quot;{leader.message}&quot;
                </p>
              </div>

              {/* Leader Info Section */}
              <div className="flex items-center gap-4">
                {/* Photo */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-blue-500">
                  <Image
                    src={urlFor(leader.photo).width(64).height(64).url()}
                    alt={leader.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                    placeholder={leader.photo.asset?.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={leader.photo.asset?.metadata?.lqip}
                  />
                </div>

                {/* Name & Role */}
                <div>
                  <p className="font-bold   text-base">
                    {leader.name}
                  </p>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    {leader.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}