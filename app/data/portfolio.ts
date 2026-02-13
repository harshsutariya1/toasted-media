
export interface Project {
    id: number;
    title: string;
    slug: string;
    category: string;
    image: string;
    description: string;
    className?: string; // For grid layout control

    // Details for the Case Study Page
    client: string;
    year: string;
    services: string[]; // e.g., ["UI/Design", "Development"]
    challenge: string;
    solution: string;
    results: {
        label: string;
        value: string;
    }[];
    technologies: string[];
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
    gallery: string[]; // Additional images
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Lumina Financial",
        slug: "lumina-financial",
        category: "FinTech",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2340",
        className: "md:col-span-2 md:row-span-2",
        description: "Reimagining the future of digital banking with a user-centric dashboard.",

        client: "Lumina Bank",
        year: "2024",
        services: ["Product Design", "Next.js Development", "Security Audit"],
        challenge: "Lumina's legacy system was causing a 40% drop-off in user onboarding. They needed a secure, lightning-fast dashboard that felt approachable to non-technical users while handling complex financial data.",
        solution: "We built a modular component system focused on data visualization. By simplifying the KYC process and introducing real-time spending analytics, we transformed a chore into an engaging experience.",
        results: [
            { label: "User Retention", value: "+45%" },
            { label: "Load Time", value: "<0.8s" },
            { label: "New Accounts", value: "12k+" }
        ],
        technologies: ["Next.js", "TypeScript", "TailwindCSS", "Recharts", "Supabase"],
        testimonial: {
            quote: "Toasted Media didn't just build a website; they built our entire digital branch. The feedback from our customers has been overwhelmingly positive.",
            author: "Sarah Jenkins",
            role: "CTO, Lumina Financial"
        },
        gallery: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2340",
            "https://images.unsplash.com/photo-1563986768427-4158869c3e41?auto=format&fit=crop&q=80&w=2340",
            "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=2340"
        ]
    },
    {
        id: 2,
        title: "Vogue Estate",
        slug: "vogue-estate",
        category: "Real Estate",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2173",
        className: "md:col-span-1 md:row-span-2",
        description: "Immersive 3D property tours for luxury market listings.",

        client: "Vogue International",
        year: "2023",
        services: ["WebGL", "3D Modeling", "Brand Identity"],
        challenge: "Selling multi-million dollar properties remotely is difficult. Static images weren't capturing the grandeur of their listings, leading to unqualified leads.",
        solution: "We implemented WebGL-powered 3D walkthroughs directly in the browser. No apps, no downloads. Just seamless, high-fidelity exploration of luxury spaces.",
        results: [
            { label: "Inquiries", value: "+300%" },
            { label: "Avg Session", value: "8m 20s" },
            { label: "Sales Closed", value: "$45M" }
        ],
        technologies: ["Three.js", "React Three Fiber", "Blender", "AWS"],
        gallery: [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2173",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2173"
        ]
    },
    {
        id: 3,
        title: "Bloom Wellness",
        slug: "bloom-wellness",
        category: "Healthcare",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2340",
        className: "md:col-span-1 md:row-span-1",
        description: "Patient-first digital care platform.",

        client: "Bloom Health",
        year: "2024",
        services: ["App Development", "UX Research"],
        challenge: "Patients found the booking process confusing and disconnected from their actual care plans.",
        solution: "A unified platform connecting calendar, prescriptions, and direct messaging with doctors in a HIPAA-compliant environment.",
        results: [
            { label: "Booking Efficiency", value: "+2x" },
            { label: "Patient NPS", value: "92" }
        ],
        technologies: ["React Native", "Node.js", "PostgreSQL"],
        gallery: [
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2340"
        ]
    },
    {
        id: 4,
        title: "Urban Threads",
        slug: "urban-threads",
        category: "E-Commerce",
        image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=2340",
        description: "High-conversion storefront for modern streetwear.",
        className: "md:col-span-1 md:row-span-1",

        client: "Urban Threads Inc",
        year: "2023",
        services: ["Shopify Plus", "Headless Commerce"],
        challenge: "The brand was growing faster than their template-based store could handle. They needed a unique identity without sacrificing speed.",
        solution: "A headless Shopify build using Hydrogen, allowing for custom animations and diverse product showcases that load instantly.",
        results: [
            { label: "Conversion Rate", value: "4.2%" },
            { label: "Mobile Sales", value: "+60%" }
        ],
        technologies: ["Shopify Hydrogen", "React", "GraphQL"],
        gallery: [
            "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=2340"
        ]
    },
    {
        id: 5,
        title: "Nova SaaS",
        slug: "nova-saas",
        category: "Tech",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
        description: "Scalable analytics dashboard for enterprise teams.",
        className: "md:col-span-2 md:row-span-1",

        client: "Nova Analytics",
        year: "2024",
        services: ["SaaS Design", "Frontend Architecture"],
        challenge: "Enterprise users were overwhelmed by data density. They needed a way to customize their views.",
        solution: "We created a drag-and-drop widget system that allows every user to build their own dashboard workspace.",
        results: [
            { label: "Daily Active Users", value: "85%" },
            { label: "Churn Rate", value: "-15%" }
        ],
        technologies: ["Vue.js", "D3.js", "Firebase"],
        gallery: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
        ]
    },
    {
        id: 6,
        title: "Global Logistics",
        slug: "global-logistics",
        category: "Logistics",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2340",
        description: "Connecting the world with streamlined logistics solutions.",
        className: "md:col-span-1 md:row-span-1",

        client: "G-Logistics",
        year: "2022",
        services: ["Branding", "Web Development"],
        challenge: "An old-school logistics giant needed to look like a modern tech-forward partner.",
        solution: "A complete rebrand and a website that focuses on transparency, tracking, and trust.",
        results: [
            { label: "Brand Awareness", value: "+200%" },
            { label: "Quote Requests", value: "+50%" }
        ],
        technologies: ["Webflow", "GSAP", "Zapier"],
        gallery: [
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2340"
        ]
    }
];
