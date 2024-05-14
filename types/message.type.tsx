export type MessageRaw = {
  text: string;
  author: string;
  blockSubmitted: string;
  valueSent: string;
}

export type MessageWithId = {
  id: number;
  text: string;
  author: string;
  blockSubmitted: string;
  valueSent: string;
}