import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Colors from '../theme/Colors';

const BLOOD_PRESSURE = [
  {
    key: 'Huyết áp thấp',
    value: {
      id: 1,
      min_tam_thu: 0,
      max_tam_thu: 100,
      min_tam_truong: 0,
      max_tam_truong: 60,
      color: '#7B2EC2',
    },
  },
  {
    key: 'Tối uư',
    value: {
      id: 2,
      min_tam_thu: 100,
      max_tam_thu: 120,
      min_tam_truong: 60,
      max_tam_truong: 80,
      color: '#50C878',
    },
  },
  {
    key: 'Bình thuờng',
    value: {
      id: 3,
      min_tam_thu: 120,
      max_tam_thu: 129,
      min_tam_truong: 80,
      max_tam_truong: 84,
      color: '#50C878',
    },
  },
  {
    key: 'Hơi Cao',
    value: {
      id: 4,
      min_tam_thu: 130,
      max_tam_thu: 139,
      min_tam_truong: 85,
      max_tam_truong: 89,
      color: '#ffdf00',
    },
  },
  {
    key: 'Cao',
    value: {
      id: 5,
      min_tam_thu: 140,
      max_tam_thu: 159,
      min_tam_truong: 90,
      max_tam_truong: 99,
      color: '#ec4800',
    },
  },
  {
    key: 'Rất cao',
    value: {
      id: 6,
      min_tam_thu: 160,
      max_tam_thu: 179,
      min_tam_truong: 100,
      max_tam_truong: 109,
      color: '#f73e3a',
    },
  },
  {
    key: 'Cực kỳ cao',
    value: {
      id: 7,
      min_tam_thu: 180,
      max_tam_thu: 1000,
      min_tam_truong: 110,
      max_tam_truong: 1000,
      color: '#d40000',
    },
  },
];
const MIN = Number.MIN_SAFE_INTEGER;
const MAX = Number.MAX_SAFE_INTEGER;
export const BLOOD_SUGAR_MOL = [
  {
    key: 'Cao',
    type_1: {min: 7.3, max: MAX, color: '#d40000'},
    type_2: {min: 10.1, max: MAX, color: '#d40000'},
    type_3: {min: 7.3, max: MAX, color: '#d40000'},
  },
  {
    key: 'Bình thuờng',
    type_1: {min: 3.9, max: 7.2, color: '#50C878'},
    type_2: {min: 3.9, max: 9.9, color: '#50C878'},
    type_3: {min: 3.9, max: 7.2, color: '#50C878'},
  },
  {
    key: 'Thấp',
    type_1: {min: 3.0, max: 3.8, color: Colors.blue.blue60},
    type_2: {min: 3.0, max: 3.8, color: Colors.blue.blue60},
    type_3: {min: 3.0, max: 3.8, color: Colors.blue.blue60},
  },
  {
    key: 'Rất thấp',
    type_1: {min: MIN, max: 3.0, color: Colors.blue.blue40},
    type_2: {min: MIN, max: 3.0, color: Colors.blue.blue40},
    type_3: {min: MIN, max: 3.0, color: Colors.blue.blue40},
  },
];
export const CHOLESTEROL_MG = [
  {name: 'HDL', average: 60},
  {name: 'LDL', average: 100},
  {name: 'TRIG', average: 150},
  {name: 'ALL', average: 200},
];
export const CHOLESTEROL_MOL = [
  {name: 'HDL', average: 1.55},
  {name: 'LDL', average: 2.59},
  {name: 'TRIG', average: 1.69},
  {name: 'ALL', average: 5.18},
];
export const BLOOD_SUGAR_MG = [
  {
    key: 'Cao',
    type_1: {min: 131, max: MAX, color: '#d40000'},
    type_2: {min: 181, max: MAX, color: '#d40000'},
    type_3: {min: 131, max: MAX, color: '#d40000'},
  },
  {
    key: 'Bình thuờng',
    type_1: {min: 70, max: 130, color: '#50C878'},
    type_2: {min: 70, max: 180, color: '#50C878'},
    type_3: {min: 70, max: 130, color: '#50C878'},
  },
  {
    key: 'Thấp',
    type_1: {min: 54, max: 69, color: Colors.blue.blue60},
    type_2: {min: 54, max: 69, color: Colors.blue.blue60},
    type_3: {min: 54, max: 69, color: Colors.blue.blue60},
  },
  {
    key: 'Rất thấp',
    type_1: {min: MIN, max: 54, color: Colors.blue.blue40},
    type_2: {min: MIN, max: 54, color: Colors.blue.blue40},
    type_3: {min: MIN, max: 54, color: Colors.blue.blue40},
  },
];
export const AXIT_URIC_MG = [
  {key: 'An toàn', min: MIN, max: 6.4, color: '#50C878'},
  {key: 'Cần chú ý', min: 6.5, max: 7.2, color: '#ffdf00'},
  {key: 'Cao', min: 7.3, max: 10.0, color: '#f73e3a'},
  {key: 'Cực kỳ cao', min: 10.1, max: MAX, color: '#d40000'},
];
export const AXIT_URIC_MOL = [
  {key: 'An toàn', min: MIN, max: 379, color: '#50C878'},
  {key: 'Cần chú ý', min: 380, max: 420, color: '#ffdf00'},
  {key: 'Cao', min: 421, max: 580, color: '#f73e3a'},
  {key: 'Cực kỳ cao', min: 581, max: MAX, color: '#d40000'},
];
export const HBA1C_PERCENT = [
  {key: 'Bình thuờng', color: '#50C878', min: 3.0, max: 5.6},
  {key: 'Tiểu đuờng', color: '#f73e3a', min: 6.5, max: MAX},
  {key: 'Tiền tiểu đuờng', color: '#ffdf00', min: 5.7, max: 6.4},
];
export const HBA1C_MOL = [
  {key: 'Bình thuờng', color: '#50C878', min: 9.0, max: 38},
  {key: 'Tiểu đuờng', color: '#f73e3a', min: 48, max: MAX},
  {key: 'Tiền tiểu đuờng', color: '#ffdf00', min: 39, max: 47},
];
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
export const home_image = require('assets/images/home.png');
export const MIDDLE_DOT = '\u25CF';
export const BLOOD_PRESSURE_DATA = new Map(
  BLOOD_PRESSURE.map(item => {
    return [item.value, item.key];
  }),
);
export function formatMoney(x) {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const dates = () => {
  const formatter = new Intl.DateTimeFormat('vi', {
    month: 'long',
    day: 'numeric',
    hour12: false,
    weekday: 'long',
    year: 'numeric',
  });
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const rangeDate = new Set();
  const today = new Date().getDate() + 1;
  for (let month = 0; month <= currentMonth; month++) {
    const lastDayOfMonth = new Date(currentYear, month, 0).getDate();
    for (let day = 1; day <= lastDayOfMonth; day++) {
      if (day === today && month === currentMonth) {
        break;
      }
      rangeDate.add(formatter.format(new Date(currentYear, month, day)));
    }
  }
  return rangeDate;
};
