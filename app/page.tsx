import React, { Suspense } from 'react';
import Messages from './components/messages';
import SendMessage from './components/send-message';
import { Metadata } from 'next';
import LoadingIndicator from '@/components/loading-indicator';

export const metadata: Metadata = {
  title: "Pigeon Tube",
  description: "DeFiChain's on-chain billboard",
};

export default function Home() {
  return (
    <React.Fragment>
      <SendMessage />

      <Suspense fallback={<LoadingIndicator />}>
        <Messages />
      </Suspense>
    </React.Fragment>
  );
}
