import Link from 'next/link'
import { client } from '../../sanity/lib/client'
import { urlFor } from '../../sanity/lib/image'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Insights & Stories | The Toasted Media',
    description: 'Expert thoughts on digital marketing, social media trends, and brand growth strategies.',
}

async function getPosts() {
    const query = `
  *[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    "categories": categories[]->title,
    "author": author->name,
    "authorImage": author->image
  }`
    const data = await client.fetch(query)
    return data
}

export default async function BlogPage() {
    const posts = await getPosts()

    return (
        <main className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-brand-orange/30 pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative container mx-auto px-6 mb-20 pt-10">
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 font-[family-name:var(--font-faculty)] tracking-wide">
                        Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Stories</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
                        Expert thoughts on digital marketing, social media trends, and brand growth strategies. Stay ahead of the curve with our latest articles.
                    </p>
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none" />
            </section>

            {/* Blog Grid */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: any) => (
                        <Link href={`/blog/${post.slug.current}`} key={post.slug.current} className="group relative block h-full">
                            <div className="bg-neutral-800/30 border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:bg-neutral-800/50 hover:border-brand-orange/30 hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.15)]">
                                {post.mainImage && (
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <Image
                                            src={urlFor(post.mainImage).url()}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-60" />

                                        {/* Categories Badge */}
                                        {post.categories && post.categories.length > 0 && (
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                {post.categories.slice(0, 2).map((category: string) => (
                                                    <span key={category} className="bg-neutral-900/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider font-semibold">
                                                        {category}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3 uppercase tracking-wider font-medium">
                                        <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        {post.author && (
                                            <>
                                                <span>•</span>
                                                <span>{post.author}</span>
                                            </>
                                        )}
                                    </div>

                                    <h2 className="text-2xl font-bold mb-3 font-[family-name:var(--font-faculty)] group-hover:text-brand-orange transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>

                                    {post.excerpt && (
                                        <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <div className="mt-auto flex items-center text-brand-orange font-medium text-sm group/btn">
                                        <span className="mr-2 border-b border-transparent group-hover/btn:border-brand-orange transition-all">Read Article</span>
                                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}
