/**
 * Example to subscribe to public channel of market
 * WARNING: before using this example run "npm run generate-api" for regenerate api
 */
import { Centrifuge } from 'centrifuge';
import WebSocket from 'ws';
import { I7MarketEWsChannel } from '../generated-api/cs7market-api';
import { wsParseMessage } from '../utils/ws-parse-messages';

const WS_HOST_URL = 'wss://cs7.market';

const centrifuge = new Centrifuge(`${WS_HOST_URL}/connection/websocket`, {
  websocket: WebSocket,
});

centrifuge.on('connected', function () {
  console.log('Socket connected');
});

centrifuge.connect();

const publicWs = centrifuge.newSubscription(I7MarketEWsChannel.PublicGeneral);

publicWs.subscribe();

publicWs.on('publication', (message) => {
  const data = wsParseMessage(message);
  if (data.message === 'market:updated') {
    // {
    //   channel: 'public:general',
    //   site: 'site',
    //   message: 'market:updated',
    //   data: { code: 'cs', is_steam_down: true, is_sell_disabled: false }
    // }
    console.log(data);
    if (data.data.is_steam_down) {
      console.log('Market says Steam is down');
    } else {
      console.log('Steam is work');
    }
  }
});
