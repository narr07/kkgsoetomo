import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'

import { authorType } from './authorType'
import { memberType } from './memberType'
import { articleType } from './articleType'
import { articleCategoryType } from './articleCategoryType'
import { productType } from './productType'
import { productCategoryType } from './productCategoryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,

    authorType,
    memberType,
    articleType,
    articleCategoryType,
    productType,
    productCategoryType,
  ],
}
