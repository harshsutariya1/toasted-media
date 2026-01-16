import type { Metadata } from "next";
import NotFoundContent from "./components/NotFoundContent";

export const metadata: Metadata = {
    title: "404 - Page Not Found | Toasted Media",
    description: "The page you are looking for does not exist.",
};

export default function NotFound() {
    return <NotFoundContent />;
}
