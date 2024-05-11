import Web3 from 'web3';
import { Card, CardContent } from '../../components/ui/card';
import abi from '../../contracts/Test.json' assert {type: 'json'};

type Message = {
  text: string;
  author: string;
  blockSubmitted: string;
}

export default async function Messages() {
  let data;

  try {
    const web3 = new Web3(new Web3.providers.HttpProvider('https://dmc.mydefichain.com/testnet'));

    const contractAddress = '0xAa984caA09C658d67EdD1D5D9762334F7d3D9A7a';

    const contract = new web3.eth.Contract(abi, contractAddress);

    data = await contract.methods.getMessages().call();
    // data = await contract.methods.getOwner().call();
    // data = web3.defaultChain;
    // data = web3.utils.toAscii(data);

  } catch (err) {
    console.error(err);
  }

  console.log(data);
  
  if (!data) {
    return (<div></div>);
  }

  return (
    <div>
      {(data as Message[]).map((message, index) => {
        return (<Card key={index} className="mt-4">
          <CardContent>
            {message.text}
          </CardContent>
        </Card>);
      })}
    </div>
  );
}