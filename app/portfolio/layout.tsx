import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio | The Toasted Media",
    description: "Explore our portfolio of successful projects. See how we've helped brands across industries achieve their digital goals.",
    openGraph: {
        title: "Portfolio | The Toasted Media",
        description: "Explore our portfolio of successful projects. See how we've helped brands across industries achieve their digital goals.",
        url: "https://toastedmediaagency.com/portfolio",
    },
};

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
