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
  metadataBase: new URL("https://newrevgen.com"),
  title: "NewRevGen - End-to-End AI Systems for Business",
  description:
    "NewRevGen designs, deploys, and manages practical AI agents, concierges, automations, integrations, and decision systems for growing businesses.",
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
