import { client } from '../../../sanity/lib/client'
import { urlFor } from '../../../sanity/lib/image'
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Clock, List } from 'lucide-react'

// Helper to calculate reading time
function calculateReadingTime(post: any) {
    if (post.readingTime) return post.readingTime
    const text = post.body?.filter((b: any) => b._type === 'block').map((block: any) => block.children?.map((child: any) => child.text).join('')).join(' ') || ''
    const words = text.split(/\s+/).length
    return Math.ceil(words / 200)
}

// Helper to generate Table of Contents
function generateTableOfContents(body: any[]) {
    return body?.filter((block: any) => block._type === 'block' && ['h2', 'h3'].includes(block.style))
        .map((block: any) => ({
            id: block._key,
            text: block.children?.map((child: any) => child.text).join(''),
            level: block.style === 'h2' ? 2 : 3
        })) || []
}

async function getPost(slug: string) {
    const query = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    layoutStyle,
    accentColor,
    readingTime,
    showTableOfContents,
    "author": author->name,
    "authorImage": author->image
  }`
    const data = await client.fetch(query, { slug })
    return data
}

// Helper to get recent posts for sidebar
async function getRecentPosts(currentSlug: string) {
    const query = `
    *[_type == "post" && slug.current != $currentSlug] | order(publishedAt desc)[0...3] {
        title,
        slug,
        publishedAt,
        mainImage,
        "author": author->name
    }`
    const data = await client.fetch(query, { currentSlug })
    return data
}

import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        return {
            title: 'Post Not Found | The Toasted Media',
            description: 'The requested blog post could not be found.',
        }
    }

    const ogImage = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined

    return {
        title: `${post.title} | The Toasted Media`,
        description: post.excerpt || post.title,
        openGraph: {
            title: post.title,
            description: post.excerpt || post.title,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author],
            images: ogImage ? [ogImage] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || post.title,
            images: ogImage ? [ogImage] : [],
        },
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug)
    const recentPosts = await getRecentPosts(slug)

    if (!post) {
        return notFound()
    }

    const readingTime = calculateReadingTime(post)
    const toc = generateTableOfContents(post.body)
    const accentColor = post.accentColor || '#F97316' // Default brand-orange
    const layoutStyle = post.layoutStyle || 'standard'

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.mainImage ? urlFor(post.mainImage).url() : undefined,
        datePublished: post.publishedAt,
        author: {
            '@type': 'Person',
            name: post.author,
        },
    }

    // Layout configurations
    const heroHeight = layoutStyle === 'immersive' ? 'h-screen' : (layoutStyle === 'minimal' ? 'h-auto py-32' : 'h-[60vh] min-h-[500px]')
    const heroContentAlign = layoutStyle === 'minimal' ? 'text-center' : 'text-center' // Both center for now, could vary
    const showHeroImage = layoutStyle !== 'minimal'

    return (
        <article className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-brand-orange/30">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Header */}
            <div className={`relative ${heroHeight} w-full flex items-center justify-center`}>
                {showHeroImage && post.mainImage && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-[2px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
                    </div>
                )}

                <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span className="text-sm font-medium tracking-wide uppercase">Back to Insights</span>
                    </Link>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 font-[family-name:var(--font-faculty)] leading-tight tracking-tight text-shadow-lg" style={{ color: layoutStyle === 'minimal' ? accentColor : 'white' }}>
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-neutral-300">
                        <div className="flex items-center gap-2">
                            {post.authorImage ? (
                                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                                    <Image
                                        src={urlFor(post.authorImage).url()}
                                        alt={post.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <User className="w-5 h-5" />
                            )}
                            <span className="font-medium">{post.author}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-brand-orange/50" />
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-neutral-400" />
                            <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-brand-orange/50" />
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-neutral-400" />
                            <span>{readingTime} min read</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container with Sidebar */}
            <div className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Main Article Content */}
                    <div className="lg:w-2/3">
                        {/* Main Image - only show if standard/minimal (if minimal, acts as main visual) */}
                        {post.mainImage && layoutStyle !== 'immersive' && (
                            <div className="relative w-full aspect-[16/9] mb-16 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <Image
                                    src={urlFor(post.mainImage).url()}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        <div className="prose prose-lg prose-invert max-w-none 
                            prose-headings:font-[family-name:var(--font-faculty)] prose-headings:font-bold prose-headings:tracking-tight
                            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                            prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-6
                            prose-a:no-underline prose-a:transition-colors
                            prose-strong:text-white
                            prose-blockquote:bg-neutral-800/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-neutral-200
                            prose-li:text-neutral-300
                            prose-img:rounded-xl prose-img:border prose-img:border-neutral-800">
                            <PortableText
                                value={post.body}
                                components={{
                                    block: {
                                        normal: ({ children }) => <p className="mb-6 leading-relaxed text-neutral-300">{children}</p>,
                                        h1: ({ children, value }) => <h1 id={value._key} className="text-4xl font-bold mt-12 mb-6 font-[family-name:var(--font-faculty)] text-white scroll-mt-32">{children}</h1>,
                                        h2: ({ children, value }) => <h2 id={value._key} className="text-3xl font-bold mt-12 mb-6 font-[family-name:var(--font-faculty)] scroll-mt-32" style={{ color: accentColor }}>{children}</h2>,
                                        h3: ({ children, value }) => <h3 id={value._key} className="text-2xl font-bold mt-8 mb-4 font-[family-name:var(--font-faculty)] text-white scroll-mt-32">{children}</h3>,
                                        h4: ({ children, value }) => <h4 id={value._key} className="text-xl font-bold mt-6 mb-3 font-[family-name:var(--font-faculty)] text-white scroll-mt-32">{children}</h4>,
                                        blockquote: ({ children }) => (
                                            <blockquote className="border-l-4 py-4 px-6 rounded-r-lg my-8 italic text-neutral-200" style={{ borderColor: accentColor }}>
                                                {children}
                                            </blockquote>
                                        ),
                                    },
                                    list: {
                                        bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-300 marker:text-white" style={{ '--marker-color': accentColor } as any}>{children}</ul>,
                                        number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-neutral-300 marker:text-white" style={{ '--marker-color': accentColor } as any}>{children}</ol>,
                                    },
                                    listItem: {
                                        bullet: ({ children }) => <li className="pl-2">{children}</li>,
                                        number: ({ children }) => <li className="pl-2">{children}</li>,
                                    },
                                    marks: {
                                        link: ({ children, value }) => {
                                            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
                                            return (
                                                <Link href={value.href} rel={rel} className="transition-colors underline decoration-white/30 hover:decoration-white" style={{ color: accentColor }}>
                                                    {children}
                                                </Link>
                                            )
                                        },
                                        strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                                        em: ({ children }) => <em className="italic text-neutral-200">{children}</em>,
                                    },
                                    types: {
                                        image: ({ value }) => {
                                            if (!value?.asset?._ref) {
                                                return null;
                                            }
                                            return (
                                                <div className="relative h-[250px] md:h-[300px] w-full my-6 rounded-lg overflow-hidden shadow-md border border-white/5 max-w-2xl mx-auto">
                                                    <Image
                                                        src={urlFor(value).url()}
                                                        alt={value.alt || ' '}
                                                        fill
                                                        className="object-cover bg-neutral-900"
                                                    />
                                                </div>
                                            )
                                        },
                                        callout: ({ value }) => {
                                            const toneStyles = {
                                                info: 'bg-blue-500/10 text-blue-200',
                                                warning: 'bg-yellow-500/10 text-yellow-200',
                                                success: 'bg-green-500/10 text-green-200',
                                                tip: 'bg-purple-500/10 text-purple-200',
                                            }
                                            const borderColors = {
                                                info: '#3b82f6',
                                                warning: '#eab308',
                                                success: '#22c55e',
                                                tip: '#a855f7',
                                            }

                                            const tone = value.tone as keyof typeof toneStyles || 'info'
                                            const style = toneStyles[tone]
                                            const borderColor = borderColors[tone]

                                            // Render icon based on tone
                                            const Icon = {
                                                info: 'ℹ️',
                                                warning: '⚠️',
                                                success: '✅',
                                                tip: '💡',
                                            }[tone] || 'ℹ️';

                                            return (
                                                <div className={`my-8 p-6 rounded-xl border-l-4 ${style} backdrop-blur-sm`} style={{ borderColor }}>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-xl">{Icon}</span>
                                                        <h4 className="font-bold text-lg m-0" style={{ color: 'inherit' }}>{value.title}</h4>
                                                    </div>
                                                    <p className="text-sm opacity-90 leading-relaxed m-0 text-inherit">{value.content}</p>
                                                </div>
                                            )
                                        },
                                        youtube: ({ value }) => {
                                            const { url } = value
                                            const id = url?.split('v=')[1]?.split('&')[0]
                                            if (!id) return null
                                            return (
                                                <div className="my-8 rounded-xl overflow-hidden shadow-2xl border border-white/5 aspect-video relative bg-neutral-900">
                                                    <iframe
                                                        src={`https://www.youtube.com/embed/${id}`}
                                                        title="YouTube video player"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        className="absolute top-0 left-0 w-full h-full"
                                                    />
                                                </div>
                                            )
                                        }
                                    }
                                }}
                            />
                        </div>

                        {/* Footer Navigation */}
                        <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                            <Link href="/blog" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                <span>Back to all posts</span>
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-1/3 lg:pl-10">
                        <div className="sticky top-24 space-y-10">

                            {/* Table of Contents - Only show if enabled and has content */}
                            {post.showTableOfContents && toc.length > 0 && (
                                <div className="bg-neutral-800/30 rounded-2xl p-6 border border-white/5 backdrop-blur-sm" style={{ '--accent-color': accentColor } as React.CSSProperties}>
                                    <h3 className="text-xl font-bold mb-6 font-[family-name:var(--font-faculty)] border-b border-white/10 pb-4 flex items-center gap-2">
                                        <List className="w-5 h-5 text-neutral-400" />
                                        Table of Contents
                                    </h3>
                                    <ul className="space-y-4">
                                        {toc.map((item: any) => (
                                            <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
                                                <a href={`#${item.id}`} className="text-sm text-neutral-400 hover:text-[var(--accent-color)] transition-colors block leading-snug">
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Explore More Section */}
                            <div className="bg-neutral-800/30 rounded-2xl p-6 border border-white/5 backdrop-blur-sm" style={{ '--accent-color': accentColor } as React.CSSProperties}>
                                <h3 className="text-xl font-bold mb-6 font-[family-name:var(--font-faculty)] border-b border-white/10 pb-4">
                                    Explore More
                                </h3>
                                <div className="space-y-6">
                                    {recentPosts.map((recentPost: any) => (
                                        <Link href={`/blog/${recentPost.slug.current}`} key={recentPost.slug.current} className="group flex gap-4 items-start">
                                            {recentPost.mainImage && (
                                                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                                                    <Image
                                                        src={urlFor(recentPost.mainImage).url()}
                                                        alt={recentPost.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="font-semibold text-sm mb-1 leading-snug group-hover:text-[var(--accent-color)] transition-colors line-clamp-2">
                                                    {recentPost.title}
                                                </h4>
                                                <div className="text-xs text-neutral-500 flex items-center gap-1">
                                                    <span>{new Date(recentPost.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                                    <span>•</span>
                                                    <span>{recentPost.author}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <Link href="/blog" className="text-sm font-medium hover:text-white transition-colors flex items-center gap-1 group/more text-[var(--accent-color)]">
                                        View all articles
                                        <ArrowLeft className="w-3 h-3 rotate-180 transition-transform group-hover/more:translate-x-1" />
                                    </Link>
                                </div>
                            </div>

                            {/* Newsletter / CTA Placeholder */}
                            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-6 border border-white/10 relative overflow-hidden group/cta">
                                <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover/cta:bg-white/10 transition-colors" style={{ backgroundColor: `${accentColor}20` }} />
                                <h3 className="text-xl font-bold mb-2 relative z-10">Elevate Your Brand</h3>
                                <p className="text-sm text-neutral-300 mb-4 relative z-10">
                                    Ready to transform your digital presence? Let's build something extraordinary together.
                                </p>
                                <Link href="/#contact" className="inline-block bg-white text-neutral-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors relative z-10">
                                    Get in Touch
                                </Link>
                            </div>

                        </div>
                    </aside>
                </div>
            </div>
        </article>
    )
}
