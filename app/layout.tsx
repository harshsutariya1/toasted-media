import type { Metadata } from "next";
import { Inter, Outfit, Oswald, Syne, DM_Serif_Display } from "next/font/google"; // Frequently used fonts

import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "The Toasted Media | Digital Marketing & Social Media Agency",
  description: "A full-service social media and digital marketing agency dedicated to transforming brands into industry icons through creative storytelling and data-driven strategies.",
  keywords: ["Digital Marketing", "Social Media Agency", "SEO", "Web Development", "Branding"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toastedmediaagency.com",
    siteName: "The Toasted Media",
    title: "The Toasted Media | Digital Marketing & Social Media Agency",
    description: "Premium digital marketing solutions for modern brands.",
  },
  icons: {
    icon: "/logo/logo2.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} ${oswald.variable} ${syne.variable} ${dmSerifDisplay.variable} antialiased bg-white text-neutral-900`}
      >
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
