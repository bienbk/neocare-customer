const REQUEST = 'REQUEST';
const RESET = 'RESET';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

const suffixTypes = [REQUEST, RESET, SUCCESS, ERROR];

function createRequestTypes(prefix = '', bases, suffixes = suffixTypes) {
  const req = {};
  bases.forEach(base => {
    suffixes.forEach(suffix => {
      req[`${base}_${suffix}`] = `${prefix}_${base}_${suffix}`;
    });
  });
  return req;
}

// Events related to Neocafe REST API
export const NEOCARE = createRequestTypes(
  'NEOCARE',
  [
    //auth
    'CHECK_AUTHENTICATION',
    'SEND_PHONE',
    'CONFIRM_OTP',
    'LOGIN_PHONE',
    'LOGOUT',
    'GET_VERSION',

    //user
    'GET_DELETE_ACCOUNT',
    'CONFIRM_DELETE_OTP',
    'UPDATE_USER_INFO',
    'SET_LANGUAGE',
    'REGISTER_USER',

    // Doctor
    'GET_PACKAGE_OF_DOCTOR',
    'FOLLOW_DOCTOR',
    'LIST_DOCTOR',
    'GET_DOCTOR_DETAIL',

    // Order
    'BUY_PACKAGE',

    // DISEASES
    'LIST_ALL_DISEASE',
  ],
  suffixTypes,
);
