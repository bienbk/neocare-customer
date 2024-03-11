/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {UrlApi} from 'http/UrlApi';
import SuperTokens from 'supertokens-react-native';
import {
  BASE_PATH_CAFE,
  BASE_NEOCARE_AUTH,
  BASE_NEOCARE_CUSTOMER,
} from 'assets/config';
import App from './src/app';
import {name as appName} from './app.json';
SuperTokens.init({
  apiDomain: BASE_NEOCARE_AUTH,
  apiBasePath: '/patients/auth',
});
console.log('SuperTokens index: ', SuperTokens);

AppRegistry.registerComponent(appName, () => App);
