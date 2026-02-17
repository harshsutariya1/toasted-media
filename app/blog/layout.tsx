import BlogNavbar from "@/app/components/BlogNavbar";
import Footer from "@/app/components/Footer";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <BlogNavbar />
            {children}
        </>
    );
}
