import {
  BASE_PATH_CAFE,
  BASE_PATH_MENU,
  BASE_NEOCARE_CUSTOMER,
} from 'assets/config';

export const UrlApi = {
  // ---------------------- USER -AUTH  ---------------------------
  getUserInfo: BASE_PATH_MENU + 'userinfo',
  getVersion: BASE_PATH_CAFE + 'version',
  sendPhone: BASE_PATH_MENU + 'patients/auth/signinup/code',
  confirmPhone: BASE_PATH_MENU + 'patients/auth/signinup/code/consume',
  loginPhone: BASE_PATH_MENU + 'customerloginphone',
  deleteAccount: BASE_PATH_MENU + 'deleteAccount',
  confirmOtpDelete: BASE_PATH_MENU + 'confirmPhone',
  updateUserInfo: BASE_PATH_MENU + 'updateCustomerInfo',
  updateLanguageUrl: BASE_PATH_MENU + 'updatelanguages',
  // --------------------- PACKAGE OF DOCTOR --------------------
  apiGetPackageOfDoctor: BASE_NEOCARE_CUSTOMER + 'products/doctors',
  apiFollowDoctor: BASE_NEOCARE_CUSTOMER,
  apiListDoctorInfo: BASE_NEOCARE_CUSTOMER,
  // ---------------------- ORDER ------------------------
  apiBuyPackage: BASE_NEOCARE_CUSTOMER + 'orders/healthcare',
  // ---------------------- USER ( PATIENT ) ---------------------
  apiRegisterUser: BASE_NEOCARE_CUSTOMER,
  // ------------------------ DISEASES -------------------------
  apiListAllDisease: BASE_NEOCARE_CUSTOMER + 'diseases/list/',
};
