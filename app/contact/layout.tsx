import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | The Toasted Media",
    description: "Get in touch with The Toasted Media. Let's discuss how we can transform your brand's digital presence.",
    openGraph: {
        title: "Contact Us | The Toasted Media",
        description: "Get in touch with The Toasted Media. Let's discuss how we can transform your brand's digital presence.",
        url: "https://toastedmediaagency.com/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
