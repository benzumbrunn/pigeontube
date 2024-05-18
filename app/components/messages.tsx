import Web3 from 'web3';
import abi from '../../contracts/PigeonTube.json' assert {type: 'json'};
import { config } from '@/config';
import Message from './message';
import { MessageObject } from '@/types/message.type';

export default async function Messages() {
  let data: MessageObject[];

  try {
    const web3 = new Web3(new Web3.providers.HttpProvider(config.RPC_PROVIDER));
    const contractAddress = config.CONTRACT_ADDRESS;
    const contract = new web3.eth.Contract(abi, contractAddress);
    data = await contract.methods.getMessages().call();
  } catch (err) {
    console.error(err);
  }

  if (!data) {
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
      <Message message={highestValueMessage} highlight>
      </Message>
      <div>
        {(otherMessages as MessageObject[]).map((message, index) =>
          <Message message={message} key={message.id.toString()}>
          </Message>
        )}
      </div>
    </>
  );
}