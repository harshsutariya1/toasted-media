import { projects } from "@/app/data/portfolio";
import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";

// Generate static params for all portfolio items
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return <ProjectClient project={project} />;
}
