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
  title: "Creative Propeller - Design On-demand",
  description: "Design On-demand. Dedicated project manager. Any Design asset. Same day delivery.",
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
