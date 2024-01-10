/**
 * Example to subscribe to public channel of market
 * WARNING: before using this example run "npm run generate-api" for regenerate api
 */
import { Centrifuge } from 'centrifuge';
import WebSocket from 'ws';
import { I7MarketEWsChannel } from '../generated-api/cs7market-api';
import { wsParseMessage } from '../utils/ws-parse-messages';

const WS_HOST_URL = 'wss://ws.cs7.market';

const centrifuge = new Centrifuge(`${WS_HOST_URL}/connection/websocket`, {
  websocket: WebSocket,
});

centrifuge.on('connected', function () {
  console.log('Socket connected');
});

centrifuge.connect();

const publicWs = centrifuge.newSubscription(I7MarketEWsChannel.CsPriceUpdate);

publicWs.subscribe();

publicWs.on('publication', (message) => {
  const data = wsParseMessage(message);
  if (data.message === 'cs_item_price:updated') {
    console.log(`${data.data.market_hash_name} - $ ${(data.data.price/100).toFixed(2)}`);
  }
});
