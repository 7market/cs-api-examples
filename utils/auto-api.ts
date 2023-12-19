import qs from 'qs';
import { Api } from '../generated-api/cs7market-api';

const API_HOST_URL = 'https://cs7.market';

export class MarketApi extends Api<false> {
  constructor(apiKey: string) {
    super({
      baseURL: API_HOST_URL,
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(params, { indices: false }); // param=value1&param=value2
        },
      },
      headers: {
        Authorization: `Token ${apiKey}`,
      },
    });
  }
}
