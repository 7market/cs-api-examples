import { PublicationContext } from 'centrifuge';
import { I7MarketWsMessages } from '../generated-api/cs7market-api';

export const wsParseMessage = (message: PublicationContext) => {
  try {
    const parsedData = JSON.parse(message.data as string) as I7MarketWsMessages;

    return parsedData;
  } catch (e) {
    console.error(e);
  }
};
