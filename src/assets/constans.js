import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Colors from '../theme/Colors';
import {NAVIGATION_LOGIN, NAVIGATION_MY_PROFILE} from '../navigation/routes';
export const today = new Intl.DateTimeFormat('vi', {
  month: 'long',
  day: 'numeric',
  hour12: false,
  weekday: 'long',
}).format(new Date());
export const STATUS = {
  0: 'Bình thuờng',
  1: 'Thấp',
  2: 'Lý tuởng',
  3: 'Hơi Cao',
  4: 'Cao',
  5: 'Rất cao',
  6: 'Cực kỳ cao',
};
export const STATUS_COLORS = {
  0: Colors.normal,
  1: Colors.lowest,
  2: Colors.good,
  3: Colors.litle_high,
  4: Colors.high,
  5: Colors.very_high,
  6: Colors.highest,
};
export const WARNING_TEXT = 'Thống kê chỉ số khuyên bạn nên liên hệ ngay với chuyên gia tư vấn sức khoẻ của bạn hoặc  đến gặp bác sĩ  để kiểm tra, điều chỉnh phuơng pháp điều trị.';
export const convertDate = (date, year) => {
  return new Intl.DateTimeFormat(
    'vi',
    year
      ? {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          weekday: 'long',
        }
      : {
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        },
  ).format(date);
};
export const LIST_OPTION = [
  {
    title: 'Chung',
    id: 1,
    items: [
      {
        name: 'Hồ sơ của tôi',
        icon: 'icon_user',
        link: NAVIGATION_MY_PROFILE,
      },
      {
        name: 'Thông tin thân nhân',
        icon: 'icon_profile',
        link: '',
      },
      {
        name: 'Tài khoản & dữ liệu',
        icon: 'icon_profile',
        link: '',
      },
    ],
  },
  {
    title: 'Sức khoẻ',
    id: 2,
    items: [
      {
        name: 'Tình trạng sức khoẻ',
        icon: 'icon_user',
        link: '',
      },
      {
        name: 'Nhà thuốc & Chuyên gia',
        icon: 'icon_profile',
        link: '',
      },
      {
        name: 'Đơn vị',
        icon: 'icon_profile',
        link: '',
      },
    ],
  },
  {
    title: 'Cài đặt & Hỗ trợ',
    id: 3,
    items: [
      {
        name: 'Ngôn ngữ',
        icon: 'icon_language',
        link: '',
      },
      {
        name: 'Hotline 0901234567',
        icon: 'icon_hotline',
        link: '',
      },
      {
        name: 'Chính sách và quyền riêng tư',
        icon: 'icon_policy',
        link: '',
      },
      {
        name: 'Đăng xuất',
        icon: 'icon_logout_red',
        link: NAVIGATION_LOGIN,
        isLogout: true,
      },
    ],
  },
];

const BLOOD_PRESSURE = [
  {
    key: 'Huyết áp thấp',
    value: {
      status: 1,
      min_tam_thu: 0,
      max_tam_thu: 100,
      min_tam_truong: 0,
      max_tam_truong: 60,
      color: Colors.blue.blue40,
    },
  },
  {
    key: 'Tối ưu',
    value: {
      status: 2,
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
      status: 0,
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
      status: 3,
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
      status: 4,
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
      status: 5,
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
      status: 6,
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
    status: 4,
    type_1: {min: 7.3, max: MAX, color: '#d40000'},
    type_2: {min: 10.1, max: MAX, color: '#d40000'},
    type_3: {min: 7.3, max: MAX, color: '#d40000'},
  },
  {
    key: 'Bình thuờng',
    status: 0,
    type_1: {min: 3.9, max: 7.2, color: '#50C878'},
    type_2: {min: 3.9, max: 9.9, color: '#50C878'},
    type_3: {min: 3.9, max: 7.2, color: '#50C878'},
  },
  {
    key: 'Thấp',
    status: 1,
    type_1: {min: 3.0, max: 3.8, color: Colors.blue.blue60},
    type_2: {min: 3.0, max: 3.8, color: Colors.blue.blue60},
    type_3: {min: 3.0, max: 3.8, color: Colors.blue.blue60},
  },
  {
    key: 'Rất thấp',
    status: 1,
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
    status: 4,
    type_1: {min: 131, max: MAX, color: '#d40000'},
    type_2: {min: 181, max: MAX, color: '#d40000'},
    type_3: {min: 131, max: MAX, color: '#d40000'},
  },
  {
    key: 'Bình thuờng',
    status: 0,
    type_1: {min: 70, max: 130, color: '#50C878'},
    type_2: {min: 70, max: 180, color: '#50C878'},
    type_3: {min: 70, max: 130, color: '#50C878'},
  },
  {
    key: 'Thấp',
    status: 1,
    type_1: {min: 54, max: 69, color: Colors.blue.blue60},
    type_2: {min: 54, max: 69, color: Colors.blue.blue60},
    type_3: {min: 54, max: 69, color: Colors.blue.blue60},
  },
  {
    key: 'Rất thấp',
    status: 1,
    type_1: {min: MIN, max: 54, color: Colors.blue.blue40},
    type_2: {min: MIN, max: 54, color: Colors.blue.blue40},
    type_3: {min: MIN, max: 54, color: Colors.blue.blue40},
  },
];
export const AXIT_URIC_MG = [
  {key: 'An toàn', min: MIN, max: 6.4, color: '#50C878', status: 2},
  {key: 'Cần chú ý', min: 6.5, max: 7.2, color: '#ffdf00', status: 3},
  {key: 'Cao', min: 7.3, max: 10.0, color: '#f73e3a', status: 4},
  {key: 'Cực kỳ cao', min: 10.1, max: MAX, color: '#d40000', status: 5},
];
export const AXIT_URIC_MOL = [
  {key: 'An toàn', min: MIN, max: 379, color: '#50C878', status: 2},
  {key: 'Cần chú ý', min: 380, max: 420, color: '#ffdf00', status: 3},
  {key: 'Cao', min: 421, max: 580, color: '#f73e3a', status: 4},
  {key: 'Cực kỳ cao', min: 581, max: MAX, color: '#d40000', status: 5},
];
export const HBA1C_PERCENT = [
  {key: 'Bình thuờng', color: '#50C878', min: 3.0, max: 5.6, status: 0},
  {key: 'Tiểu đuờng', color: '#f73e3a', min: 6.5, max: MAX, status: 4},
  {key: 'Tiền tiểu đuờng', color: '#ffdf00', min: 5.7, max: 6.4, status: 3},
];
export const HBA1C_MOL = [
  {key: 'Bình thuờng', color: '#50C878', min: 9.0, max: 38, status: 0},
  {key: 'Tiểu đuờng', color: '#f73e3a', min: 48, max: MAX, status: 4},
  {key: 'Tiền tiểu đuờng', color: '#ffdf00', min: 39, max: 47, status: 3},
];
export const HOME_DATA = [
  {
    id: 1,
    code: 'Blood Pressure',
    name: 'Huyết áp',
    status: 'Bình thường',
    created_at: new Date(),
    value: '--/--',
    unit: '',
    subVal: '--',
    label: 'Thêm chỉ số đo',
  },
  {
    id: 4,
    name: 'HbA1c',
    code: 'HbA1cLabTest',
    status: 'Cao bất thường',
    created_at: new Date(),
    value: '---',
    unit: '',
    label: 'Thêm kết quả',
  },
  {
    id: 2,
    name: 'Đường huyết',
    code: 'Blood Glucose',
    status: 'Bình thường',
    created_at: new Date(),
    value: '--',
    unit: '',
    label: 'Thêm chỉ số đo',
  },
  {
    id: 3,
    name: 'Mỡ máu',
    code: 'Cholesterol',
    status: 'Cao bất thường',
    created_at: new Date(),
    value: '--',
    unit: '',
    label: 'Thêm kết quả',
  },
  {
    id: 5,
    name: 'Acid Uric',
    code: 'Acid Uric',
    status: 'Cao bất thường',
    created_at: new Date(),
    value: '--',
    unit: '',
    label: 'Thêm kết quả',
  },
  {
    id: 6,
    name: 'Cân nặng',
    code: 'Weight',
    status: 'Bình thường',
    created_at: new Date(),
    value: '78',
    unit: 'kg',
    label: 'Thêm chỉ số đo',
  },
];
export const heightDevice = Dimensions.get('window').height;
export const widthDevice = Dimensions.get('window').width;
export const versionSystem = DeviceInfo.getSystemVersion();
export const versionNameApp = DeviceInfo.getVersion();
export const deviceId = DeviceInfo.getUniqueId();
export const isAndroid = Platform.OS === 'ios' ? false : true;
export const KEY_ONE_SIGNAL = '7ef05ed3-d514-4300-a463-82c371e4def9';
export const KEY_GOONG_API = 'VphPkfidhRekSJM2Ff9TPIZSFtwDtgIWoXJ0wHUN';
// export const GOOGLE_MAP_KEY = 'AIzaSyAAO8W-KytYgmE4BzIXP_dLGZ7ABdO2z54';
export const GOOGLE_MAP_KEY = 'AIzaSyDy_5NNS-DwcZkcIYMar-wcspaL9fWJbQ0';

export const doctor_avatar = require('assets/images/doctor.png');
export const doctor_detail = require('assets/images/doctor_detail.png');
export const empty_logo = require('assets/images/empty_logo.png');
export const user_example = require('assets/images/user_example.png');
export const card_blue = require('assets/images/card_blue.jpg');
export const card_pink = require('assets/images/card_pink.jpg');
export const home_image = require('assets/images/home.png');
export const home_add_doctor = require('assets/images/home_add_doctor.png');
export const decorator_header = require('assets/images/decorator_home.png');
export const decorator_package = require('assets/images/decorate_package.png');
export const header_package = require('assets/images/header_package.png');
export const path_package = require('assets/images/path_package.png');
export const MIDDLE_DOT = '\u25CF';
export const BLOOD_PRESSURE_DATA = new Map(
  BLOOD_PRESSURE.map(item => {
    return [item.value, item.key];
  }),
);
export function formatMoney(x) {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const convertDateParameter = d => {
  let result;
  const temp = d.split(', ');
  result = `${temp[0].split('/').reverse().join('-')}T${temp[1]}Z`;
  return result;
};
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
// ----------- UNIT ------------
export const UNIT_PERCENTER = 0;
export const UNIT_MMOL_MOL = 1;
export const UNIT_MG_DL = 2;
export const UNIT_MMHG = 3;
export const UNIT_BEAT_MIN = 4;
export const UNIT_KG = 5;
export const UNIT_LBS = 6;
export const UNIT_UMOLL = 8;
export const UNIT_MMOLL = 9;
// --------- CODE DISEASE -------------
export const CODE_HBA1C = 'A1C';
export const CODE_BLOOD_PRESSURE = 'BLP';
export const CODE_BLOOD_SUGAR = 'BLG';
export const CODE_CHOLESTEROL = 'CLR';
export const CODE_WEIGHT = 'WEI';
export const CODE_AXIT_URIC = 'ACU';
