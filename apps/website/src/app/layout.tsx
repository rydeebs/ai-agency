import type { Metadata } from "next";
import { DM_Sans, Darker_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-darker-grotesque",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://newrevgen.com"),
  applicationName: "NewRevGen",
  title: "NewRevGen | Practical AI Systems for Business",
  description:
    "NewRevGen designs, deploys, and manages practical AI agents, concierges, automations, integrations, and decision systems for growing businesses.",
  alternates: {
    canonical: "/",
  },
  authors: [
    { name: "NewRevGen", url: "https://newrevgen.com" },
    { name: "Ryan DeBerardinis" },
  ],
  creator: "NewRevGen",
  publisher: "NewRevGen",
  keywords: [
    "NewRevGen",
    "AI automation agency",
    "business workflow automation",
    "AI systems integration",
    "revenue operations automation",
  ],
  openGraph: {
    title: "NewRevGen | Practical AI Systems for Business",
    description:
      "Practical AI systems that connect tools, automate work, and improve how growing businesses sell, serve, and operate.",
    url: "/",
    siteName: "NewRevGen",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/cta-background.png",
        width: 1024,
        height: 1024,
        alt: "Connected workflow systems by NewRevGen",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NewRevGen | Practical AI Systems for Business",
    description:
      "Practical AI systems that connect tools, automate work, and improve how growing businesses operate.",
    images: ["/images/cta-background.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/seo/favicon.png",
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
      className={`${dmSans.variable} ${darkerGrotesque.variable}`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
