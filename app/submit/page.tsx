import Navbar from "@/components/Navbar";
import SubmitForm from "@/components/SubmitForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Submit a Project | oss/browser",
    description: "Submit an open-source project to oss/browser",
}

export default function Submit() {
    return (
        <main className="min-h-screen bg-white text-foreground">
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center min-h-[calc(100vh-48px)] pt-12">
                <SubmitForm />
            </div>
        </main>
    );
}