import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { SITE_URL } from "@/lib/posts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Math Blog — Toán học & AI",
    template: "%s | Math Blog",
  },
  description: "Blog toán học cá nhân — Bài tập, Lý thuyết, và ứng dụng AI & ML",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Math Blog — Toán học & AI",
    description: "Blog toán học — Bài tập, Lý thuyết, và ứng dụng AI & ML",
    url: SITE_URL,
    siteName: "Math Blog",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary",
    title: "Math Blog — Toán học & AI",
    description: "Blog toán học — Bài tập, Lý thuyết, và ứng dụng AI & ML",
  },
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches))
                  document.documentElement.classList.add('dark');
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
