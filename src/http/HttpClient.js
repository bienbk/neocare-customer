import axios from 'axios';
import {UrlApi} from 'http/UrlApi';
import {asyncStorage} from 'store/index';
import {NAVIGATION_LOGIN} from '../navigation/routes';
import {createNavigationContainerRef} from '@react-navigation/native';
import SuperTokens from 'supertokens-react-native';
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
HttpClient.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Custom middleware for responses (this one just logs the error).
HttpClient.interceptors.response.use(
  response => {
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
