"use client";

import { useState } from 'react';
import Web3 from 'web3';
import abi from '../../contracts/PigeonTube.json' assert {type: 'json'};
import { config } from '@/config';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

declare global {
  interface Window { ethereum: any; web3: Web3; }
}

export default function SendMessage() {
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { toast } = useToast()

  const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);
      return true;
    }
    return false;
  }

  const handleTextChange = (event: any) => {
    setMessage(event.target.value);

    if (event.target.value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleClick = async () => {
    setDisabled(true);

    const walletAvailable = await ethEnabled();
    if (!walletAvailable) {
      toast({
        title: 'No wallet detected',
        description: 'Please install MetaMask to interact with the contract.',
        variant: 'destructive'
      });
      setDisabled(false);
      return;
    }

    const chainId = (await window.web3.eth.getChainId()).toString();
    if (chainId !== '1130') {
      toast({
        title: 'Unsupported network',
        description: 'Configured network is not DeFiCHain MetaChain mainnet.',
        variant: 'destructive'
      });
      setDisabled(false);
      return;
    }

    try {
      const contractAddress = config.CONTRACT_ADDRESS;
      const contract = new window.web3.eth.Contract(abi, contractAddress);
      console.log(contract.options.address);
      const accounts = await window.web3.eth.getAccounts();
      await contract.methods.sendMessage(message).send({ from: accounts[0] });

      setMessage('');
    } catch (error: any) {
      toast({
        title: 'An error occurred',
        description: error.message,
        variant: 'destructive'
      });
      setDisabled(false);
    }
  }

  return (
    <>
      <Textarea
        value={message}
        onChange={handleTextChange}
        onPaste={handleTextChange}
        className="mt-8 max-w-lg"
        placeholder="What's on your mind?" />
      <Input
        type='number'
        className='mt-4 max-w-xs'
        placeholder='DFI value (optional)'
      />
      <Button onClick={handleClick} disabled={message.length === 0 || disabled} className="mt-4">
        Send
      </Button>
      <Toaster />
    </>
  );
}