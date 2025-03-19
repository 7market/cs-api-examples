import { generateApi } from 'swagger-typescript-api';
import { resolve } from 'path';
import { Spec } from 'swagger-schema-official';
import axios from 'axios';

const generateApiDTO = (spec: Spec) => {
  generateApi({
    name: 'cs7market-api',
    output: resolve(__dirname, '../generated-api'),
    spec,
    // temporary not working. issue https://github.com/acacode/swagger-typescript-api/issues/659
    // url:'https://cs7.market/docs/trade-api/schema?lang=en',
    httpClientType: 'axios',
    generateClient: true,
    silent: true,
    defaultResponseAsSuccess: false,
    generateRouteTypes: true,
    generateResponses: true,
    extractRequestParams: false,
    extractRequestBody: false,
    unwrapResponseData: false,
    prettier: {
      // By default prettier config is load from your project
      printWidth: 120,
      tabWidth: 2,
      trailingComma: 'all',
      parser: 'typescript',
    },
    defaultResponseType: 'void',
    singleHttpClient: true,
    typePrefix: 'I7Market',
  }).catch((e) => console.error(e));
};

// load schema manually from cs7.market
axios.get('https://cs7.market/docs/trade-api/schema?lang=en', { maxBodyLength: -1 })
  .then((res) => {
    generateApiDTO(res.data as Spec);
  });
