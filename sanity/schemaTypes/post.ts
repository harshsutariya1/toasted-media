import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    groups: [
        {
            name: 'content',
            title: 'Content',
        },
        {
            name: 'seo',
            title: 'SEO',
        },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
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
            group: 'content',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            group: 'content',
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
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            group: 'seo',
            description: 'Custom title for search engines (optional)',
            validation: Rule => Rule.max(60).warning('SEO titles should be under 60 characters'),
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 3,
            group: 'seo',
            description: 'Custom description for search engines (optional)',
            validation: Rule => Rule.max(160).warning('SEO descriptions should be under 160 characters'),
        }),
        defineField({
            name: 'seoKeywords',
            title: 'SEO Keywords',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'seo',
            description: 'Keywords for search engines (optional)',
        }),
        defineField({
            name: 'seoImage',
            title: 'SEO Image',
            type: 'image',
            group: 'seo',
            description: 'Custom image for social sharing (optional). Falls back to main image if not set.',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'layoutStyle',
            title: 'Layout Style',
            type: 'string',
            group: 'content',
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
            group: 'content',
            description: 'Custom brand color for this post (e.g. #FF5733). Leave empty for default orange.',
            validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex code', invert: false }).warning('Must be a valid hex color code like #FF5733'),
        }),
        defineField({
            name: 'readingTime',
            title: 'Reading Time (minutes)',
            type: 'number',
            group: 'content',
            description: 'Estimated reading time. Leave empty to auto-calculate.',
        }),
        defineField({
            name: 'showTableOfContents',
            title: 'Show Table of Contents',
            type: 'boolean',
            group: 'content',
            initialValue: false,
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 4,
            group: 'content',
            validation: Rule => Rule.max(200).warning('Shorter excerpts are better for SEO.'),
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            group: 'content',
            of: [{ type: 'reference', to: { type: 'category' } }],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            group: 'content',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
            group: 'content',
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
