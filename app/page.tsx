import { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import Image from 'next/image';
import icon from "@/public/icon.svg";
import LoadingIndicator from '../components/loading-indicator';
import Messages from './components/messages';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-20">
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

      <h2 className="mt-8 text-2xl">
        The on-chain message board for DeFiChain
      </h2>
      <Link href="/about" className="mt-4">
        Go to About
      </Link>

      <Suspense fallback={<LoadingIndicator />}>
        <Messages />
      </Suspense>

      <Textarea
        className="mt-8"
        placeholder="Tell us what's on your mind" />
      <Button className="mt-4">
        CLICK
      </Button>
      <Button className="mt-4 bg-secondary">
        CLICK
      </Button>
    </main>
  );
}
