import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import callout from './callout'
import youtube from './youtube'

export const schemaTypes: SchemaTypeDefinition[] = [
    post,
    author,
    category,
    blockContent,
    callout,
    youtube,
]
