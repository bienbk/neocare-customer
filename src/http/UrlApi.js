// import {
//   BASE_PATH_CAFE,
//   BASE_NEOCARE_AUTH,
//   BASE_NEOCARE_CUSTOMER,
// } from 'assets/config';

const BASE_NEOCARE_AUTH = 'https://dev-api.neocare.vn/';
const BASE_PATH_CAFE = 'https://dev-api.neocafe.tech/v1/';
const BASE_NEOCARE_CUSTOMER = 'https://dev-api.neocare.vn/patients/v1/';

export const UrlApi = {
  // ---------------------- USER -AUTH  ---------------------------
  baseApi: BASE_NEOCARE_AUTH,
  getUserInfo: BASE_NEOCARE_AUTH + 'userinfo',
  getVersion: BASE_PATH_CAFE + 'version',
  sendPhone: BASE_NEOCARE_AUTH + 'patients/auth/signinup/code',
  resendPhone: BASE_NEOCARE_AUTH + 'patients/auth/signinup/code/resend',
  confirmPhone: BASE_NEOCARE_AUTH + 'patients/auth/signinup/code/consume',
  loginPhone: BASE_NEOCARE_AUTH + 'customerloginphone',
  deleteAccount: BASE_NEOCARE_AUTH + 'deleteAccount',
  confirmOtpDelete: BASE_NEOCARE_AUTH + 'confirmPhone',
  updateUserInfo: BASE_NEOCARE_AUTH + 'updateCustomerInfo',
  updateLanguageUrl: BASE_NEOCARE_AUTH + 'updatelanguages',
  apiGetUserInfo: BASE_NEOCARE_CUSTOMER + 'users/info',
  // --------------------- PACKAGE OF DOCTOR --------------------
  apiGetPackageOfDoctor: BASE_NEOCARE_CUSTOMER + 'products/doctors',
  apiFollowDoctor: BASE_NEOCARE_CUSTOMER + 'follow/doctor',
  apiListDoctorInfo: BASE_NEOCARE_CUSTOMER,
  apiSendService: BASE_NEOCARE_CUSTOMER + 'suh',
  // ---------------------- ORDER ------------------------
  apiBuyPackage: BASE_NEOCARE_CUSTOMER + 'orders/healthcare',
  // ---------------------- USER ( PATIENT ) ---------------------
  apiRegisterUser: BASE_NEOCARE_CUSTOMER,
  // ------------------------ DISEASES -------------------------
  apiListAllDisease: BASE_NEOCARE_CUSTOMER + 'diseases/list',
  // ----------------------- PARAMETER ---------------------
  apiCreateParameter: BASE_NEOCARE_CUSTOMER + 'parameters',
  apiListParameter: BASE_NEOCARE_CUSTOMER + 'parameters/list',
};
