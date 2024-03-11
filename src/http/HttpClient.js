import axios from 'axios';
import {UrlApi} from 'http/UrlApi';
import {asyncStorage} from 'store/index';
import {NAVIGATION_LOGIN} from '../navigation/routes';
import {createNavigationContainerRef} from '@react-navigation/native';
import SuperTokens from 'supertokens-react-native';
// import { API_URL } from 'react-native-dotenv';
/*
  Base client config for your application.
  Here you can define your base url, headers,
  timeouts and middleware used for each request.
*/
// SuperTokens.init({
//   apiDomain: UrlApi,
//   apiBasePath: 'patients/auth',
// });
const navigationRef = createNavigationContainerRef();
let defaultLanguage = 'vi';
export const setDefaultLanguage = language => {
  defaultLanguage = language;
};
console.log('default language:::', defaultLanguage);
const HttpClient = axios.create({
  timeout: 12000,
  headers: {
    'Access-Control-Expose-Headers':
      'front-token, st-access-token, st-refresh-token',
    'content-type': 'application/json',
  },
});
SuperTokens.addAxiosInterceptors(HttpClient);
console.log('SuperToken add axios interceptors::::', SuperTokens);
// Custom middleware for requests (this one just logs the error).
HttpClient.interceptors.request.use(
  async config => {
    // config.headers['X-CUPIFY-APP'] = 'NEOCAFE';
    // config.headers['Accept-Language'] = defaultLanguage;
    const tokens = await asyncStorage.getToken();
    console.log('getToken: ', tokens);
    // if (tokens && tokens.stAccessToken) {
    //   config.headers.rid = 'session';
    //   config.headers.authorization = 'Bearer ' + tokens.stAccessToken || '';
    // } else {
    //   config.headers.rid = 'passwordless';
    // }
    console.log('REQUEST API:', config);
    return config;
  },
  error => {
    //console.log('Failed to make request with error:', error);
    return Promise.reject(error);
  },
);

// Custom middleware for responses (this one just logs the error).
HttpClient.interceptors.response.use(
  response => {
    console.log('response Http Client: ', response);
    if (
      response.status === 401 &&
      response.data &&
      response.data.message === 'unauthorised'
    ) {
      navigationRef.navigate(NAVIGATION_LOGIN);
    }
    return response;
  },
  error => {
    //console.log('Request got response with error:', error);
    return Promise.reject(error);
  },
);

export default HttpClient;
