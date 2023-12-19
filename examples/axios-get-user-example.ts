/**
 * Example of getting user using native axios
 */
import qs from 'qs';
import axios from 'axios';

const baseURL = 'https://cs7.market';
// Your API Key from https://cs7.market/en/profile/trade-api
const API_KEY = '';

const httpClient = axios.create({
  baseURL,
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { indices: false }); // param=value1&param=value2
    },
  },
  headers: {
    Authorization: `Token ${API_KEY}`,
  },
});

httpClient
  .get('/api/market/cs/user-market-settings/my/')
  .then((res) => {
    console.log(res.data);
  })
  .catch((e) => {
    console.log(e);
  });
