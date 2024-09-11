"use server";

import Web3 from 'web3';
import abi from '../../contracts/PigeonTube.json' assert {type: 'json'};
import { RPC_PROVIDER, CONTRACT_ADDRESS, CONTRACT_ADDRESS_LEGACY } from '@/config';
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

async function getLegacyMessages() {
  let dataLegacy: MessageObject[] | null = null;

  const web3 = new Web3(new Web3.providers.HttpProvider(RPC_PROVIDER));
  const contractAddressLegacy = CONTRACT_ADDRESS_LEGACY;
  const contractLegacy = new web3.eth.Contract(abi, contractAddressLegacy);
  dataLegacy = await contractLegacy.methods.getMessages().call();

  return dataLegacy;
}

export default async function Messages() {
  unstable_noStore();

  let data: MessageObject[];
  let dataNew: MessageObject[] | null = null;
  let dataLegacy: MessageObject[] | null = null;
  let error;

  try {
    dataNew = await getMessages();
    dataLegacy = await getLegacyMessages();
  } catch (err) {
    error = err;
  }

  if (error || !dataNew || !dataLegacy) {
    return (<div>Something went wrong fetching data from the contract.</div>);
  }

  if (dataNew.length === 0 && dataLegacy.length === 0) {
    return (<div>No messages sent to the contract yet.</div>);
  }

  dataLegacy.map((m) => m.id = Number(m.id) + 1);
  dataLegacy.reverse();

  dataNew.map((m) => m.id = Number(m.id) + dataLegacy.length);
  dataNew.reverse();

  data = dataNew.concat(dataLegacy);

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