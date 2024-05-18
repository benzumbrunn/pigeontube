import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pigeon",
  description: "Send word to the DeFiChain community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>{children}</body>
      <GoogleAnalytics gaId="G-9453YNTPG4" />
    </html>
  );
}
