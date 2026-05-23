import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AudienceProvider } from "@/context/audience-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import OnekoCat from "@/components/oneko-cat";
import Spotlight from "@/components/spotlight";
import ScrollToTop from "@/components/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Abdullah Saud — Full Stack Developer",
    template: "%s | Abdullah Saud",
  },
  description:
    "Full Stack Developer building modern web applications. Passionate about clean code, great UX, and learning in public.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Abdullah Saud"],
  authors: [{ name: "Abdullah Saud" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Abdullah Saud",
    title: "Abdullah Saud — Full Stack Developer",
    description:
      "Full Stack Developer building modern web applications. Passionate about clean code, great UX, and learning in public.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@imabd",
    title: "Abdullah Saud — Full Stack Developer",
    description:
      "Full Stack Developer building modern web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] antialiased">
        <ThemeProvider>
          <AudienceProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <ScrollToTop />
            <Footer />
            <OnekoCat />
            <Spotlight />
          </AudienceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
