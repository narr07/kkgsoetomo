import React from 'react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#293466] py-20 px-4 transition-colors dark:bg-[#000305]">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold text-[#f6f7de] md:text-5xl">
          KKG dr. Soertomo
        </h1>

        <p className="mb-8 text-lg text-[#f8ef25]">
          Gugus 5 - Kecamatan Rajagaluh Kabupaten Majalengka
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="rounded-tl-lg rounded-br-lg bg-[#f8ef25] px-8 py-3 font-semibold text-[#293466] shadow-lg transition hover:bg-[#f6f7de] hover:shadow-xl">
            Pelajari Lebih Lanjut
          </button>
          <button className="rounded-tl-lg rounded-br-lg border-2 border-[#f8ef25] px-8 py-3 font-semibold text-[#f6f7de] shadow-lg transition hover:bg-[#f8ef25] hover:text-[#293466] hover:shadow-xl">
            Hubungi Kami
          </button>
        </div>
      </div>
    </section>
  )
}
