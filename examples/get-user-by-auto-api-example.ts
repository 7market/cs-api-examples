/**
 * Example of getting user using AUTO generate client based on
 * OpenAPI from cs7.market https://cs7.market/docs/trade-api/
 * WARNING: before using this example run "npm run generate-api" for regenerate api
 */
import { MarketApi } from '../utils/auto-api';

// Your API Key from https://cs7.market/en/profile/trade-api
const API_KEY = '';

const marketApi = new MarketApi(API_KEY);

marketApi.api.marketCsUserMarketSettingsMyRetrieve()
  .then((res) => {
    console.log(res.data);
  })
  .catch((e) => {
    console.log(e);
  });
