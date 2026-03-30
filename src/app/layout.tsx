import type { Metadata } from "next";
import { DM_Sans, Darker_Grotesque } from "next/font/google";
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
  title: "NexRevGen - AI That Actually Ships",
  description: "We embed with your team to build AI systems that work. Workflow automation, custom GPT agents, and hands-on training. No consultants, no slide decks — just results.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
