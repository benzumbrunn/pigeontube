import { Urbanist } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/main-nav";

const urbanist = Urbanist({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Pigeon Tube provides the DeFiChain community with a billboard on the DeFiChain MetaChain layer. Post and highlight messages using DFI via an EVM-compatible browser wallet like Metamask." />
        <meta name="keywords" content="Pigeon Tube, DeFiChain, MetaChain, DeFi, EVM-compatible, Metamask, DFI, blockchain communication, smart contract" />
        <meta property="og:title" content="Pigeon Tube - The on-chain billboard on DeFiChain MetaChain" />
        <meta property="og:description" content="Pigeon Tube provides the DeFiChain community with a billboard on the DeFiChain MetaChain layer. Post and highlight messages using DFI via an EVM-compatible browser wallet like Metamask." />
        <meta property="og:image" content="https://pigeon.tube/og-image.png" />
        <meta property="og:url" content="https://www.pigeon.tube" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pigeon Tube - The on-chain billboard on DeFiChain MetaChain" />
        <meta name="twitter:description" content="Pigeon Tube provides the DeFiChain community with a billboard on the DeFiChain MetaChain layer. Post and highlight messages using DFI via an EVM-compatible browser wallet like Metamask." />
        <meta name="twitter:image" content="https://pigeon.tube/og-image.png" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Pigeon Tube - The on-chain billboard on DeFiChain MetaChain</title>

        <script defer data-domain="pigeon.tube" src="https://plausible.io/js/script.js"></script>
      </head>

      <body className={urbanist.className}>
        <main className="flex flex-col items-center justify-between m-12">
          <MainNav></MainNav>
          {children}
        </main>
      </body>
    </html>
  );
}
