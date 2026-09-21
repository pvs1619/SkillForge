import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090e17" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "SkillForge — Learn something worth building.",
    template: "%s | SkillForge",
  },
  description:
    "A university learning and practical workshop discovery platform. Turn curiosity into tangible engineering and analytical skills.",
  keywords: [
    "SkillForge",
    "workshops",
    "university workshops",
    "practical engineering",
    "learning plan",
    "technical skills",
    "data analysis",
    "machine learning",
  ],
  authors: [{ name: "SkillForge Academic Team" }],
  openGraph: {
    title: "SkillForge — Learn something worth building.",
    description:
      "A university learning and practical workshop discovery platform. Discover practical workshops and build your personal learning plan.",
    type: "website",
    locale: "en_US",
    siteName: "SkillForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillForge — Learn something worth building.",
    description:
      "A university learning and practical workshop discovery platform.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            duration={4000}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
