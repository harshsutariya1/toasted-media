import Link from 'next/link'
import { client } from '../../sanity/lib/client'
import { urlFor } from '../../sanity/lib/image'
import Image from 'next/image'

async function getPosts() {
    const query = `
  *[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    mainImage,
    publishedAt,
    "categories": categories[]->title,
    "author": author->name
  }`
    const data = await client.fetch(query)
    return data
}

export default async function BlogPage() {
    const posts = await getPosts()

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                    <Link href={`/blog/${post.slug.current}`} key={post.slug.current} className="group">
                        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            {post.mainImage && (
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={urlFor(post.mainImage).url()}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>
                                <div className="text-sm text-gray-500 mb-2">
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                    {post.author && <span> • {post.author}</span>}
                                </div>
                                {post.categories && (
                                    <div className="flex flex-wrap gap-2">
                                        {post.categories.map((category: string) => (
                                            <span key={category} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
