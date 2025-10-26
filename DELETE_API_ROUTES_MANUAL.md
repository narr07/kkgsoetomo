# Langkah-Langkah Menghapus API Routes

Setelah semua komponen dan halaman telah diupdate, Anda perlu menghapus folder-folder API berikut:

## Di Terminal, Jalankan:

```bash
# Pastikan Anda di root folder project
cd /Users/user/Koding/Website/kkgsoetomo

# Hapus semua folder API yang tidak diperlukan
rm -rf app/api/about-us
rm -rf app/api/articles
rm -rf app/api/galleries
rm -rf app/api/hero
rm -rf app/api/members
rm -rf app/api/products
rm -rf app/api/school-list
rm -rf app/api/selayang-pandang
rm -rf app/api/homepage-data
rm -rf app/api/site-settings
```

## Atau Hapus Sekaligus:

```bash
cd /Users/user/Koding/Website/kkgsoetomo && \
rm -rf app/api/about-us \
rm -rf app/api/articles \
rm -rf app/api/galleries \
rm -rf app/api/hero \
rm -rf app/api/members \
rm -rf app/api/products \
rm -rf app/api/school-list \
rm -rf app/api/selayang-pandang \
rm -rf app/api/homepage-data \
rm -rf app/api/site-settings
```

## Folder API yang Tetap:

Pastikan folder berikut TETAP ada:
- ✅ `app/api/og/` - Untuk generate OG images
- ✅ `app/api/revalidate/` - Untuk on-demand revalidation

## Verifikasi Setelah Penghapusan:

```bash
ls -la app/api/
```

Output yang diharapkan:
```
drwxr-xr-x  3 user  staff   96 ... og
drwxr-xr-x  3 user  staff   96 ... revalidate
```

## Testing Setelah Perubahan

1. Jalankan development server:
   ```bash
   npm run dev
   ```

2. Test halaman-halaman berikut:
   - Homepage (cek komponen hero, aboutUs, LastArticle, LastGaleri, selayang)
   - `/anggota` - Halaman daftar anggota
   - `/artikel` - Halaman daftar artikel
   - `/galeri` - Halaman daftar galeri
   - `/produk` - Halaman daftar produk

3. Buka browser DevTools (F12) dan periksa Network tab:
   - Tidak boleh ada 404 errors untuk `/api/` routes
   - Tidak boleh ada request ke `/api/about-us`, `/api/articles`, dst.
   - Network requests harus langsung ke Sanity CDN

4. Periksa Console untuk errors atau warnings

## Deployment

Setelah lokal testing berhasil:

```bash
# Build untuk production
npm run build

# Jika build berhasil, siap untuk deploy ke Vercel/hosting
git add .
git commit -m "Remove API routes - fetch data directly from Sanity"
git push
```

## Troubleshooting

Jika ada masalah:

1. **Halaman blank atau loading forever**: Periksa Network tab di DevTools
2. **Data tidak muncul**: Lihat Console untuk error messages
3. **Masalah CORS**: Pastikan Sanity client sudah dikonfigurasi dengan benar di `sanity/lib/client.ts`
4. **Slow loading**: Cek apakah ISR berfungsi dengan melihat Network timing
