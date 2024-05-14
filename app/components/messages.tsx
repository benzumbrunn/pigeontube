import Web3 from 'web3';
import { Card, CardContent, CardFooter, CardHeader } from '../../components/ui/card';
import abi from '../../contracts/PigeonTube.json' assert {type: 'json'};
import { Badge } from '@/components/ui/badge';
import { config } from '@/config';
import Message from './message';

type Message = {
  id: number;
  text: string;
  author: string;
  blockSubmitted: string;
  valueSent: string;
}

export default async function Messages() {
  let data: Message[];

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

  data.map((m, i) => m.id = i + 1);
  data.reverse();

  const highestValueMessage = data.reduce((prev, current) => {
    return prev && Number(prev.valueSent) > Number(current.valueSent) ? prev : current;
  });

  const otherMessages = data.filter(m => m.blockSubmitted !== highestValueMessage.blockSubmitted); // TODO: use ID, not block!!!

  return (
    <>
      <Message message={highestValueMessage} highlight>
      </Message>
      <div>
        {(otherMessages as Message[]).map((message, index) =>
          <Message message={message} key={message.id.toString()}>
          </Message>
        )}
      </div>
    </>
  );
}