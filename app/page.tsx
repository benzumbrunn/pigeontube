import React, { Suspense } from 'react';
import Link from "next/link";
import Image from 'next/image';
import icon from "@/public/icon.svg";
import LoadingIndicator from '../components/loading-indicator';
import Messages from './components/messages';
import SendMessage from './components/send-message';

export default function Home() {
  const contractLink = "https://meta.defiscan.live/address/" + "0x6Fa51D65A277EAd4FC3aC08564F62D07408f1F57"

  return (
    <main className="flex flex-col items-center justify-between m-12">
      <div className="flex gap-2 items-center">
        {/* 
      <h1 className="text-7xl">
        title.title
      </h1>
       */}
        <h1 className="text-7xl">
          pigeon.tube
        </h1>
        <Image
          width={100}
          priority
          src={icon}
          alt="pigeon.tube logo"
        />

        {/* 
      <h2 className="mt-8 text-2xl">
        Some subtitle subtitle
      </h2>
       */}
      </div>

      <h2 className="mt-3 text-2xl">
        The on-chain message board for DeFiChain
      </h2>
      <div className='m-4 max-w-lg flex gap-8'>
        <Link href="/about">
          About
        </Link>
        <Link target='_blank' href={contractLink}>
          Contract
        </Link>
        <Link href="/source">
          Source
        </Link>
      </div>

      <Suspense fallback={<LoadingIndicator />}>
        <Messages />
      </Suspense>

      <SendMessage />
    </main>
  );
}
