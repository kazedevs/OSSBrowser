import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), // production URL
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable}`}>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}

