"use server";

import Web3 from 'web3';
import abi from '../../contracts/PigeonTube.json' assert {type: 'json'};
import { RPC_PROVIDER, CONTRACT_ADDRESS } from '@/config';
import Message from './message';
import { MessageObject } from '@/types/message.type';
import { unstable_noStore } from 'next/cache';

async function getMessages() {
  let data: MessageObject[] | null = null;

  const web3 = new Web3(new Web3.providers.HttpProvider(RPC_PROVIDER));
  const contractAddress = CONTRACT_ADDRESS;
  const contract = new web3.eth.Contract(abi, contractAddress);
  data = await contract.methods.getMessages().call();

  return data;
}

export default async function Messages() {
  unstable_noStore();

  let data: MessageObject[] | null = null;
  let error;

  try {
    data = await getMessages();
  } catch (err) {
    error = err;
  }

  if (error || !data) {
    return (<div>Something went wrong fetching data from the contract.</div>);
  }

  if (data.length === 0) {
    return (<div>No messages sent to the contract yet.</div>);
  }

  data.map((m) => m.id = Number(m.id) + 1);
  data.reverse();


  const highestValueMessage = data.reduce((prev, current) => {
    return prev && Number(prev.valueSent) > Number(current.valueSent) ? prev : current;
  });

  const otherMessages = data.filter(m => m.id !== highestValueMessage.id);

  return (
    <>
      <Message message={highestValueMessage} highlight key={highestValueMessage.id.toString()}>
      </Message>
      <>
        {(otherMessages as MessageObject[]).map((message) =>
          <Message message={message} key={message.id.toString()}>
          </Message>
        )}
      </>
    </>
  );
}