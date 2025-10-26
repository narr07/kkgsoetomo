import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('KKG dr. Soetomo')
    .items([
      // Anggota Section
      S.documentTypeListItem('member').title('👥 Anggota KKG'),
      
      // Artikel Section
      S.listItem()
        .title('📝 Artikel')
        .child(
          S.list()
            .title('Artikel')
            .items([
              S.documentTypeListItem('article').title('Daftar Artikel'),
              S.divider(),
              S.documentTypeListItem('articleCategory').title('Kategori Artikel'),
            ])
        ),
      
      // Produk Section
      S.listItem()
        .title('🛍️ Produk/Layanan')
        .child(
          S.list()
            .title('Produk')
            .items([
              S.documentTypeListItem('product').title('Daftar Produk'),
              S.divider(),
              S.documentTypeListItem('productCategory').title('Kategori Produk'),
            ])
        ),

            // Galeri Kegiatan
      S.documentTypeListItem('gallery').title('📸 Galeri Kegiatan'),
      
      S.divider(),

      // Singleton Documents
      S.listItem()
        .title('🏠 Hero Section')
        .child(
          S.document()
            .schemaType('hero')
            .documentId('hero')
            .title('Hero Section')
        ),

      S.listItem()
        .title('⚙️ Pengaturan Website')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Pengaturan Website')
        ),

      S.listItem()
        .title('ℹ️ Selayang Pandang')
        .child(
          S.document()
            .schemaType('selayangPandang')
            .documentId('selayangPandang')
            .title('Selayang Pandang')
        ),

      S.listItem()
        .title('📄 Tentang Kami')
        .child(
          S.document()
            .schemaType('aboutUs')
            .documentId('aboutUs')
            .title('Tentang Kami')
        ),

      S.listItem()
        .title('🏫 Daftar Sekolah')
        .child(
          S.document()
            .schemaType('schoolList')
            .documentId('schoolList')
            .title('Daftar Sekolah')
        ),
     
      // Other document types
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && ![
          'member',
          'article',
          'articleCategory',
          'product',
          'productCategory',
          'gallery',
          'siteSettings',
          'selayangPandang',
          'aboutUs',
          'schoolList',
          'hero',
          'post',
          'category',
          'author'
        ].includes(item.getId()!),
      ),
    ])
