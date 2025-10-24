import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('KKG Soetomo')
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
      
      S.divider(),

      // Blog Section
      S.listItem()
        .title('📰 Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.divider(),
              S.documentTypeListItem('category').title('Categories'),
              S.divider(),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),

      // Other document types
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && ![
          'member',
          'article',
          'articleCategory',
          'product',
          'productCategory',
          'post',
          'category',
          'author'
        ].includes(item.getId()!),
      ),
    ])
