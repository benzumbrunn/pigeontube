import React, { Suspense } from 'react';
import LoadingIndicator from '../components/loading-indicator';
import Messages from './components/messages';
import SendMessage from './components/send-message';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pigeon Tube",
  description: "DeFiChain's on-chain billboard",
};

export default function Home() {
  return (
    <React.Fragment>
      <Suspense fallback={<LoadingIndicator />}>
        <Messages />
      </Suspense>

      <SendMessage />
    </React.Fragment>
  );
}
