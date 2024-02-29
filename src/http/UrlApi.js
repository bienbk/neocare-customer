import {
  BASE_PATH_CAFE,
  BASE_PATH_MENU,
  BASE_NEOCARE_CUSTOMER,
} from 'assets/config';

export const UrlApi = {
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
