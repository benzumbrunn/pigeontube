"use client";

import { useState } from 'react';
import Web3 from 'web3';
import abi from '../../contracts/PigeonTube.json' assert {type: 'json'};
import { CONTRACT_ADDRESS } from '@/config';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import reload from "@/public/reload.svg";
import Image from 'next/image';

declare global {
  interface Window { ethereum: any; web3: Web3; }
}

export default function SendMessage() {
  const [message, setMessage] = useState('');
  const [coinValue, setCoinValue] = useState('');
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

  const handleCoinValueChange = (event: any) => {
    setCoinValue(event.target.value);
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
      const contractAddress = CONTRACT_ADDRESS;
      const contract = new window.web3.eth.Contract(abi, contractAddress);
      const accounts = await window.web3.eth.getAccounts();
      const coinValueInWei = window.web3.utils.toWei(coinValue, 'ether');

      if (coinValue) {
        await contract.methods.sendMessageWithValue(message).send({ from: accounts[0], value: coinValueInWei });
      } else {
        await contract.methods.sendMessage(message).send({ from: accounts[0] });
      }

      setMessage('');
      setCoinValue('');
    } catch (error: any) {
      toast({
        title: 'An error occurred',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setDisabled(false);
    }
  }

  return (
    <>
      <Textarea
        value={message}
        onChange={handleTextChange}
        onPaste={handleTextChange}
        className="mt-4 max-w-lg"
        placeholder="What's on your mind?" />
      <div className='flex pb-6 mt-4 gap-4 flex-grow'>
        <Input
          value={coinValue}
          onChange={handleCoinValueChange}
          type='number'
          placeholder='DFI value (optional)'
        />
        <Button onClick={handleClick} disabled={message.length === 0 || disabled}>
          Send
        </Button>
        <Image
          onClick={() => window.location.reload()}
          className='w-7 cursor-pointer transition ease-in-out hover:rotate-180'
          src={reload}
          alt="Reload messages"
        />
        <Toaster />
      </div>
    </>
  );
}