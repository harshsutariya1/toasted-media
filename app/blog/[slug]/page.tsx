import { client } from '../../../sanity/lib/client'
import { urlFor } from '../../../sanity/lib/image'
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import { notFound } from 'next/navigation'

async function getPost(slug: string) {
    const query = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    publishedAt,
    body,
    "author": author->name,
    "authorImage": author->image
  }`
    const data = await client.fetch(query, { slug })
    return data
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug)

    if (!post) {
        return notFound()
    }

    return (
        <article className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="text-gray-500 mb-4 flex items-center justify-center gap-2">
                    {post.authorImage && (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image
                                src={urlFor(post.authorImage).url()}
                                alt={post.author}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
            </div>

            {post.mainImage && (
                <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
                    <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="prose prose-lg max-w-none dark:prose-invert">
                <PortableText
                    value={post.body}
                    components={{
                        types: {
                            image: ({ value }) => {
                                if (!value?.asset?._ref) {
                                    return null;
                                }
                                return (
                                    <div className="relative h-96 w-full my-8">
                                        <Image
                                            src={urlFor(value).url()}
                                            alt={value.alt || ' '}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )
                            }
                        }
                    }}
                />
            </div>
        </article>
    )
}
