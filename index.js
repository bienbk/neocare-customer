/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {UrlApi} from 'http/UrlApi';
import SuperTokens from 'supertokens-react-native';
import App from './src/app';
import {name as appName} from './app.json';
SuperTokens.init({
  apiDomain: 'https://dev-api.neocare.vn',
  apiBasePath: '/patients/auth',
});
console.log('SuperTokens index: ', SuperTokens);

AppRegistry.registerComponent(appName, () => App);
