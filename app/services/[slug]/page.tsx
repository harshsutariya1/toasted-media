import { services } from '@/app/data/services';
import ServicePageClient from './ServicePageClient';
import { notFound } from 'next/navigation';

// Generate static params for all services
export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

// Ensure params are correctly typed for Next.js 15+ (params is a Promise)
interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ServicePage({ params }: PageProps) {
    const { slug } = await params;

    // We can also validate existence here, though the client component does it too.
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    return <ServicePageClient slug={slug} />;
}
