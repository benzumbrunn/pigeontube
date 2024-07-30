import Subtitle from "@/components/ui/subtitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pigeon Tube - About",
  description: "About Pigeon Tube",
};

export default function About() {
  return (
    <main className="flex flex-col items-center justify-between max-w-[600px]">
      <h1 className="pt-2 text-xl font-bold">About</h1>

      <Subtitle>
        Purpose and Usage
      </Subtitle>
      <p className="pt-2">
        Pigeon Tube gives the DeFiChain community a tool to communicate with each other directly on the DeFiChain MetaChain layer.
        <br />
        <br />
        Make sure you have a EVM-compatible browser wallet like Metamask installed. Follow the <a className="underline" target="_blank" href="https://blog.defichain.com/how-to-transfer-dfi-from-a-defichain-wallet-to-metachain/">guide</a> to add some DFI to your wallet and make sure it&apos;s enough to interact with a smart contract. 
        <br />
        <br />
        Type any message you want to have posted, click the send button, and it will appear on the billboard once it is mined on the blockchain.
        <br />
        <br />
        If you want to replace the highlighted message on top, you will need to send more DFI than the current top message. Your DFI will be sent to the address of the previous top value poster, and you will receive the funds of the next value poster that exceeds the DFI value of your message.
      </p>

      <Subtitle>
        Privacy Policy
      </Subtitle>
      <p className="pt-2">
        The website uses Plausible Analytics, a privacy-friendly analytics tool, to collect anonymous usage data. This data includes pages visited, referring websites, country of visitor, device type and browser. Plausible doesn&apos;t use cookies and doesn&apos;t collect any personal data. The information is used solely to improve the website and understand its audience better. Data is retained for 24 months.
      </p>

      <Subtitle>
        Terms and Conditions
      </Subtitle>
      <p className="pt-2">
        Disclaimer of Warranties:
        This site and the associated smart contract are provided &ldquo;as is&ldquo; and &ldquo;as available&ldquo; without any warranties of any kind, either express or implied. Nobody guarantees the accuracy, completeness, or usefulness of the site or smart contract.
        <br />
        <br />
        Limitation of Liability:
        To the fullest extent permitted by law, the site owner shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, arising out of or in any way connected with your use of this site or interaction with the smart contract.
        <br />
        <br />
        User Responsibilities:
        You are solely responsible for your interactions with the smart contract. You agree to use the site and smart contract at your own risk and to conduct your own due diligence before engaging in any transactions. You are responsible for maintaining the security of your private keys and wallet.
        <br />
        <br />
        Smart Contract Interaction:
        This site is an interface to a smart contract deployed on DeFiChain&apos;s EVM layer. Tokens sent directly to the smart contract address are irrevocably lost. DFI sent to the contract without using the sendMessage interface will also be irrevocably lost.
        <br />
        <br />
        No Refunds:
        Due to the nature of blockchain transactions, all interactions with the smart contract are final and irreversible. Nobody can provide refunds or reverse transactions under any circumstances.
        <br />
        <br />
        Content Disclaimer and Moderation:
        The page owner is not responsible for and cannot control the content of messages sent through the smart contract. However, the page owner reserves the right to hide or remove from display on pigeon.tube any messages that are deemed harmful, illegal, offensive, or otherwise inappropriate, without prior notice. This moderation does not affect the data stored on the blockchain.
        <br />
        <br />
        By using this site, you agree to these terms and conditions.
      </p>

      <Subtitle>
        Contact
      </Subtitle>
      <p className="pt-2">
        For general inquiries or feedback, contact <a className="underline" href={'mailto:benzumbrunn@gmail.com'}>benzumbrunn@gmail.com</a>
        <br />
        Created by <a className="underline" target="_blank" href="https://benzumbrunn.com">benzumbrunn.com</a> 
      </p>
    </main>
  );
}
