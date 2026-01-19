import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://oss-browser.vercel.app"),
  title: "OSSBrowser - Directory of Open Source Projects",
  description: "Directory of open source projects.",
  icons: {
    icon: "/ossfav.png",
  },

  openGraph: {
    images: [
      {
        url: "/ogimage.png",
        width: 1200,
        height: 630,
        alt: "OSSBrowser",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/ogimage.png"],
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="antialiased font-inter flex flex-col min-h-screen shadow-none">
        {children}
      </body>
    </html>
  );
}
