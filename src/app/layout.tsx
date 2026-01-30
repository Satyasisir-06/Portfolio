import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Satya Sisir | Creative Developer & Designer",
  description:
    "Full-stack developer passionate about creating innovative digital experiences. Specializing in web development, UI/UX design, and cutting-edge technologies.",
  keywords: [
    "Satya Sisir",
    "Web Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Portfolio",
    "React Developer",
    "Next.js",
  ],
  authors: [{ name: "Satya Sisir" }],
  creator: "Satya Sisir",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://satyasisir.dev",
    title: "Satya Sisir | Creative Developer & Designer",
    description:
      "Full-stack developer passionate about creating innovative digital experiences.",
    siteName: "Satya Sisir Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satya Sisir | Creative Developer & Designer",
    description:
      "Full-stack developer passionate about creating innovative digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-body antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
