import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'callout',
    type: 'object',
    title: 'Callout',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'tone',
            title: 'Tone',
            type: 'string',
            options: {
                list: [
                    { title: 'Info', value: 'info' },
                    { title: 'Warning', value: 'warning' },
                    { title: 'Success', value: 'success' },
                    { title: 'Tip', value: 'tip' },
                ],
                layout: 'radio',
            },
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'tone',
        },
    },
})
