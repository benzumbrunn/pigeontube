import Web3 from 'web3';
import { Card, CardContent, CardFooter, CardHeader } from '../../components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageWithId } from '@/types/message.type';

export default function Message({ message, highlight }: { message: MessageWithId, highlight?: boolean }) {
  const value = Web3.utils.fromWei(message.valueSent, "ether");
  const displayValue = value === '0.' ? null : value;

  const commonCss = "mt-2 pt-0 border-l-8 max-w-lg ";

  let className = commonCss;

  if (highlight) {
    className = className.concat("border-primary border-r-4 border-t-2 border-b-2");
  }
  else if (displayValue) {
    className = className.concat("border-l-primary");
  } else {
    className = className.concat("border-l-border");
  }

  return (<Card className={className}>
    <CardHeader className='flex-row items-baseline justify-between'>
      <Badge variant={'outline'}>#{message.id}</Badge>
      {
        displayValue && <Badge className=''>
          {displayValue} DFI
        </Badge>
      }
    </CardHeader>
    <CardContent className='flex justify-between'>
      <span className='font-semibold'>
        {message.text}
      </span>
    </CardContent>
    <CardFooter>
      <div className='font-light'>
        {message.author}
      </div>
    </CardFooter>
  </Card>);
}