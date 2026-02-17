import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'layoutStyle',
            title: 'Layout Style',
            type: 'string',
            options: {
                list: [
                    { title: 'Standard (Hero Image)', value: 'standard' },
                    { title: 'Minimal (Typographic)', value: 'minimal' },
                    { title: 'Immersive (Full Screen)', value: 'immersive' },
                ],
                layout: 'radio',
            },
            initialValue: 'standard',
        }),
        defineField({
            name: 'accentColor',
            title: 'Accent Color (Hex)',
            type: 'string',
            description: 'Custom brand color for this post (e.g. #FF5733). Leave empty for default orange.',
            validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex code', invert: false }).warning('Must be a valid hex color code like #FF5733'),
        }),
        defineField({
            name: 'readingTime',
            title: 'Reading Time (minutes)',
            type: 'number',
            description: 'Estimated reading time. Leave empty to auto-calculate.',
        }),
        defineField({
            name: 'showTableOfContents',
            title: 'Show Table of Contents',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 4,
            validation: Rule => Rule.max(200).warning('Shorter excerpts are better for SEO.'),
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        }),
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})
