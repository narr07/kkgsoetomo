#!/bin/bash

# Script untuk menghapus API routes yang tidak diperlukan
# Jalankan: bash cleanup_api_routes.sh

cd /Users/user/Koding/Website/kkgsoetomo

echo "🗑️  Menghapus API routes yang tidak diperlukan..."

# Hapus folder-folder API
folders_to_delete=(
  "app/api/about-us"
  "app/api/articles"
  "app/api/galleries"
  "app/api/hero"
  "app/api/members"
  "app/api/products"
  "app/api/school-list"
  "app/api/selayang-pandang"
  "app/api/homepage-data"
  "app/api/site-settings"
)

for folder in "${folders_to_delete[@]}"; do
  if [ -d "$folder" ]; then
    rm -rf "$folder"
    echo "✅ Hapus: $folder"
  else
    echo "⏭️  Skip: $folder (sudah tidak ada)"
  fi
done

echo ""
echo "📋 Verifikasi folder API yang tersisa:"
ls -la app/api/

echo ""
echo "✨ Selesai! API routes yang tidak diperlukan telah dihapus."
echo ""
echo "📝 Folder API yang tetap:"
echo "  - app/api/og/ (untuk OG images)"
echo "  - app/api/revalidate/ (untuk on-demand revalidation)"
