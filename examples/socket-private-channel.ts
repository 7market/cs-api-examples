/**
 * Example to subscribe to private channel of user
 * WARNING: before using this example run "npm run generate-api" for regenerate api
 */
import { Centrifuge } from 'centrifuge';
import WebSocket from 'ws';
import { MarketApi } from '../utils/auto-api';
import { wsParseMessage } from '../utils/ws-parse-messages';

const WS_HOST_URL = 'wss://ws.cs7.market';
// Your API Key from https://cs7.market/profile/trade-api
const API_KEY = '';

const marketApi = new MarketApi(API_KEY);

const centrifuge = new Centrifuge(`${WS_HOST_URL}/connection/websocket`, {
  websocket: WebSocket,
  // use debug if you need
  // debug:true,
  getToken() {
    return marketApi.api.usersWsAuthTokenRetrieve().then(res => {
      return res.data.token;
    });
  },
});

centrifuge.on('connected', function () {
  console.log('Socket connected');
});

centrifuge.connect();

marketApi.api.usersWsAuthTokenRetrieve()
  .then((res) => {
    console.log('Token received:', res.data);
    const token = res.data.token;
    const channel = res.data.channel_name;
    const userWs = centrifuge.newSubscription(channel, {
      token,
    });
    userWs.subscribe();

    userWs.on('publication', (message) => {
      const data = wsParseMessage(message);
      if (data.message === 'cs_user_market_settings:updated') {
        console.log(`Last inventory update at: ${data.data.inventory_updated_at}`);
      } else if (data.message === 'user:updated') {
        console.log(`New user balance: $ ${(data.data.balance / 100).toFixed(2)}`);
      }
    });
  })
  .catch(e => {
    console.log(e.message);
  });
