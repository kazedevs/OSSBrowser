import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";


const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "oss/browser - Browse open-source projects",
  description: "Discover open source projects with ease",
  icons: {
    icon: "/brand/oss.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
