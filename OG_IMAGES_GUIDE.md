# Dokumentasi Dynamic OG Images

## Ringkasan

Sistem OG (Open Graph) Images dinamis telah diimplementasikan untuk semua halaman di KKG Soetomo. Images ini akan ditampilkan saat URL dibagikan di social media (Facebook, Twitter, LinkedIn, dll).

## Struktur File

```
app/
├── opengraph-image.tsx                      # OG image untuk homepage
├── (pages)/
│   ├── artikel/
│   │   ├── opengraph-image.tsx              # List artikel OG image
│   │   └── [slug]/
│   │       ├── opengraph-image.tsx          # Detail artikel (dinamis)
│   │       ├── metadata.ts                  # generateMetadata function
│   │       └── page.tsx                     # Import generateMetadata
│   ├── galeri/
│   │   ├── opengraph-image.tsx              # List galeri OG image
│   │   └── [slug]/
│   │       ├── opengraph-image.tsx          # Detail galeri (dinamis)
│   │       ├── metadata.ts                  # generateMetadata function
│   │       └── page.tsx                     # Import generateMetadata
│   ├── anggota/
│   │   └── opengraph-image.tsx              # List anggota OG image
│   └── produk/
│       └── opengraph-image.tsx              # List produk OG image
```

## Fitur-fitur

### 1. **OG Image Dinamis untuk Detail Pages**

#### Artikel Detail (`/artikel/[slug]`)
- Menampilkan gambar artikel sebagai background
- Overlay gelap dengan opacity 0.5
- Judul artikel, kategori, dan tanggal publish
- Gradient background jika gambar tidak tersedia

#### Galeri Detail (`/galeri/[slug]`)
- Menampilkan thumbnail galeri sebagai background
- Jumlah foto dalam galeri
- Tanggal event
- Styling konsisten dengan artikel

### 2. **OG Image Statis untuk List Pages**

Setiap halaman list memiliki OG image statis dengan:
- Icon emoji yang relevan (📰 artikel, 📷 galeri, 👥 anggota, 🛍️ produk)
- Gradient purple background
- Title dan deskripsi halaman
- Branding KKG Soetomo

### 3. **Metadata Otomatis**

Setiap halaman detail memiliki `generateMetadata` function yang:
- Fetch data dari Sanity
- Generate title dan description dinamis
- Embed OG image URL
- Support Twitter Card
- Include author, publish date, modified date
- Support tags untuk artikel

## Environment Variables

Tambahkan ke `.env.local`:

```env
# Base URL (change ke domain production saat deploy)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Contoh Implementasi

### Homepage OG Image
```
Title: KKG Soetomo - Kelompok Kerja Guru
Description: Platform Kelompok Kerja Guru untuk kolaborasi, edukasi, dan inovasi dalam pendidikan
```

### Artikel Detail OG Image (Dinamis)
```
- Background: Gambar artikel
- Title: Judul artikel
- Category: Kategori artikel (warna biru)
- Description: Excerpt artikel
- Date: Tanggal publish
```

### Galeri Detail OG Image (Dinamis)
```
- Background: Thumbnail galeri
- Title: Judul galeri/kegiatan
- Image Count: Jumlah foto (📷 15 foto)
- Date: Tanggal event
```

## Testing

### Local Testing
1. Jalankan development server: `npm run dev`
2. Visit halaman yang ingin ditest
3. Check metadata menggunakan:
   - Chrome DevTools → Elements → Head tags
   - Lihat tag `<meta property="og:image">`

### Production Testing
1. Deploy ke Vercel atau hosting lain
2. Share URL di:
   - Facebook (gunakan Sharing Debugger)
   - Twitter (lihat preview)
   - LinkedIn
   - Slack
3. Verify OG image muncul dengan benar

### Tools Testing
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Open Graph Preview](https://ogp.me/)

## Teknologi yang Digunakan

- **ImageResponse** dari `next/og` - Generate OG images di server-side
- **generateMetadata** - Dynamic metadata generation
- **GROQ Queries** - Fetch data dari Sanity untuk metadata dinamis
- **Sanity Image URL Builder** - Optimize image URLs

## Spesifikasi OG Image

- **Ukuran**: 1200x630px (standar Open Graph)
- **Format**: PNG (converted from JSX)
- **Content Type**: `image/png`
- **Runtime**: Node.js (tidak support Edge Runtime untuk complex images)

## Best Practices

1. **Always provide alt text** untuk accessibility
2. **Test di multiple platforms** (Facebook, Twitter, LinkedIn, dll)
3. **Keep titles concise** (max ~60 characters untuk optimal display)
4. **Use emojis** untuk visual appeal (tapi jangan berlebihan)
5. **Cache images properly** - Next.js akan cache otomatis

## Troubleshooting

### OG image tidak muncul saat di-share
- Check bahwa `NEXT_PUBLIC_BASE_URL` sudah set dengan benar
- Verify bahwa URL dapat diakses dari public
- Clear cache di debugger tools (Facebook, Twitter)

### Font tidak tampil di OG image
- Pastikan menggunakan system fonts atau custom fonts yang supported
- Avoid complex font loading di OG images
- Stick dengan safe fonts: Arial, Helvetica, Verdana, atau system fonts

### Image tidak load di background
- Pastikan URL image accessible dari public
- Check image URL menggunakan `urlFor()` sudah benar
- Verify Sanity image CDN tidak blocked

### Metadata berbeda di server vs client
- Jangan gunakan `useEffect` untuk generate metadata
- Selalu gunakan `generateMetadata` function
- Metadata harus di-generate di server-side

## Future Improvements

- [ ] Add caching strategy untuk OG images
- [ ] Support multiple language OG images
- [ ] Add analytics tracking untuk OG shares
- [ ] Custom branding per category
- [ ] Dynamic gradient colors based on category

## References

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [ImageResponse API](https://nextjs.org/docs/app/api-reference/functions/image-response)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
