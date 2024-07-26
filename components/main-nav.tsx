import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import icon from "@/public/icon.svg";
import { config } from '@/config';

export default function MainNav() {
  const contractLink = "https://meta.defiscan.live/address/" + config.CONTRACT_ADDRESS;
  const sourceLink = "https://github.com/benzumbrunn/pigeon"; // TODO: make public

  return (
     <div className="flex flex-col items-center justify-between">
      <div className="flex gap-4 items-center">
        <h1 className="text-7xl">
          Pigeon Tube
        </h1>
        <Image
          width={100}
          priority
          src={icon}
          alt="pigeon.tube logo"
        />
      </div>

      <h2 className="mt-3 text-2xl">
        The on-chain billboard on DeFiChain MetaChain
      </h2>
      <div className='m-4 max-w-lg flex gap-8'>
        <Link href="/">
          App
        </Link>
        <Link href="/about">
          About
        </Link>
        <Link target='_blank' href={contractLink}>
          Contract
        </Link>
        <Link target='_blank' href={sourceLink}>
          Source
        </Link>
      </div>
    </div>
  );
}