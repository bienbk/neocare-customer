import {NEOCARE} from 'store/actionsTypes';
// ----------- GET ALL PACKAGE OF DOCTOR --------------------
// export const getPackageDoctorAction = payload => ({
//   type: NEOCARE.GET_PACKAGE_OF_DOCTOR_REQUEST,
// });
// export const resetGetPackageDoctor = () => ({
//   type: NEOCARE.GET_PACKAGE_OF_DOCTOR_RESET,
// });

// ------------- FOLLOW DOCTOR ------------------------------
export const followDoctorAction = payload => ({
  type: NEOCARE.FOLLOW_DOCTOR_REQUEST,
  payload,
});
export const resetFollowDoctor = () => ({
  type: NEOCARE.FOLLOW_DOCTOR_RESET,
});

// --------------- LIST DOCTOR INFORMATION --------------------
export const listDoctorAction = payload => ({
  type: NEOCARE.LIST_DOCTOR_REQUEST,
  payload,
});
export const resetListDoctor = () => ({
  type: NEOCARE.LIST_DOCTOR_RESET,
});

// ------------ GET DETAIL DOCTOR INFORMATION -----------------
export const getDoctorDetailAction = payload => ({
  type: NEOCARE.GET_DOCTOR_DETAIL_REQUEST,
  payload,
});
export const resetGetDoctorDetail = () => ({
  type: NEOCARE.GET_DOCTOR_DETAIL_RESET,
});
