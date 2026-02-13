import { Search, PenTool, Globe, Video, Mail, Target } from 'lucide-react';
import React from 'react';

export interface Service {
    id: number;
    title: string;
    slug: string;
    category: string;
    description: string;
    image: string;
    icon: React.ReactNode;
}

export const services: Service[] = [
    {
        id: 1,
        title: "SEO Optimization",
        slug: "seo-optimization",
        category: "Growth",
        description: "Dominate search rankings with data-driven keyword strategies and technical audits.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
        icon: <Search className="w-6 h-6" />
    },
    {
        id: 2,
        title: "Social Strategy",
        slug: "social-strategy",
        category: "Brand",
        description: "Build a cult following. We craft viral-ready content that stops the scroll.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2574",
        icon: <Globe className="w-6 h-6" />
    },
    {
        id: 3,
        title: "Paid Acquisition",
        slug: "paid-acquisition",
        category: "Performance",
        description: "High-ROI campaigns on Meta, Google, and TikTok that convert clicks into revenue.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2340",
        icon: <Target className="w-6 h-6" />
    },
    {
        id: 4,
        title: "Content Creation",
        slug: "content-creation",
        category: "Creative",
        description: "Visual storytelling that defines your legacy. Video, photo, and motion graphics.",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2342",
        icon: <Video className="w-6 h-6" />
    },
    {
        id: 5,
        title: "Email & Retention",
        slug: "email-retention",
        category: "Lifecycle",
        description: "Turn one-time buyers into lifetime advocates with automated flows.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2340",
        icon: <Mail className="w-6 h-6" />
    },
    {
        id: 6,
        title: "Web Development",
        slug: "web-development",
        category: "Tech",
        description: "Blazing fast, SEO-ready websites built on Next.js and modern architectures.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=2564",
        icon: <PenTool className="w-6 h-6" />
    }
];
