# Setup Singleton Documents di Sanity Studio

Untuk membuat document singleton "Tentang Kami", "Selayang Pandang", dan "Pengaturan Website", ikuti langkah berikut:

## Cara Manual (Recommended)

### 1. Buka Sanity Studio
```bash
npm run dev
```

Kemudian buka: http://localhost:3000/studio

### 2. Buat Document "Pengaturan Website"
1. Klik menu **⚙️ Pengaturan Website**
2. Klik tombol **Create**
3. Isi field:
   - **Judul Website**: KKG Soetomo
   - **Deskripsi Website**: Kelompok Kerja Guru Soetomo
   - **Email Kontak**: info@kkgsoetomo.com
   - **Nomor Telepon**: +62 812 3456 7890
   - **Alamat**: Jl. Pendidikan, Kota
4. Klik **Publish**

### 3. Buat Document "Selayang Pandang"
1. Klik menu **ℹ️ Selayang Pandang**
2. Akan langsung membuka form untuk edit (karena singleton)
3. Isi field:
   - **Ketua KKG**:
     - Nama: Nama Ketua KKG
     - Sambutan: (ketik sambutan)
     - Foto Profil: Upload foto
   - **Ketua Gugus**:
     - Nama: Nama Ketua Gugus
     - Sambutan: (ketik sambutan)
     - Foto Profil: Upload foto
4. Klik **Publish**

### 4. Buat Document "Tentang Kami"
1. Klik menu **📄 Tentang Kami**
2. Akan langsung membuka form untuk edit (karena singleton)
3. Isi field:
   - **Judul**: Tentang Kami
   - **Subjudul**: Mengenal lebih dekat KKG Soetomo
   - **Deskripsi Singkat**: (deskripsi)
   - **Konten Lengkap**: (isi konten)
   - **Gambar**: Upload gambar
   - **Poin-poin Penting** (Highlights) - Array:
     ```
     Item 1:
     - Icon: 📚
     - Judul: Edukasi
     - Deskripsi: Menyediakan program edukasi...
     
     Item 2:
     - Icon: 🤝
     - Judul: Kolaborasi
     - Deskripsi: Memfasilitasi kolaborasi...
     
     Item 3:
     - Icon: 🎯
     - Judul: Inovasi
     - Deskripsi: Mengembangkan solusi inovatif...
     ```
4. Klik **Publish**

## Catatan Penting

- **Singleton Documents**: Setiap schema hanya bisa memiliki 1 document
- Document ID tetap (siteSettings, selayangPandang, aboutUs)
- Setelah publish, data otomatis muncul di website
- Untuk highlight, klik tombol **+** untuk menambah item baru

## Frontend Display

Setelah data di-publish:
- **Selayang Pandang** tampil di homepage di section "Sambutan Pimpinan"
- **Tentang Kami** tampil di homepage di section "Tentang Kami" dengan highlights
- **Pengaturan Website** bisa digunakan di komponen lain (footer, dll)

Enjoy! 🎉
