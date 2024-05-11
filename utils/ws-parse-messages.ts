import { PublicationContext } from 'centrifuge';
import { I7MarketWsMessages } from '../generated-api/cs7market-api';

export const wsParseMessage = (message: PublicationContext) => {
  return message.data as I7MarketWsMessages;
};
