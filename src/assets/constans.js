import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const heightDevice = Dimensions.get('window').height;
export const widthDevice = Dimensions.get('window').width;
export const versionSystem = DeviceInfo.getSystemVersion();
export const versionNameApp = DeviceInfo.getVersion();
export const deviceId = DeviceInfo.getUniqueId();
export const isAndroid = Platform.OS === 'ios' ? false : true;
export const KEY_ONE_SIGNAL = 'c107840b-bc7d-416f-8567-fdc22d2f3719';
export const KEY_GOONG_API = 'VphPkfidhRekSJM2Ff9TPIZSFtwDtgIWoXJ0wHUN';
// export const GOOGLE_MAP_KEY = 'AIzaSyAAO8W-KytYgmE4BzIXP_dLGZ7ABdO2z54';
export const GOOGLE_MAP_KEY = 'AIzaSyDy_5NNS-DwcZkcIYMar-wcspaL9fWJbQ0';

export const doctor_avatar = require('assets/images/doctor.png');
export const doctor_detail = require('assets/images/doctor_detail.png');
export const empty_logo = require('assets/images/empty_logo.png');
export const card_blue = require('assets/images/card_blue.jpg');
export const card_pink = require('assets/images/card_pink.jpg');

export function formatMoney(x) {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
