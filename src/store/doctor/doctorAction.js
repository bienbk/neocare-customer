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
export const listDoctorAction = () => ({
  type: NEOCARE.LIST_DOCTOR_REQUEST,
});
export const resetListDoctor = () => ({
  type: NEOCARE.LIST_DOCTOR_RESET,
});

export const sendServiceAction = payload => ({
  type: NEOCARE.SEND_SERVICE_REQUEST,
  payload,
});
export const resetSendService = () => ({
  type: NEOCARE.SEND_SERVICE_RESET,
});

// REMOVE DOCTOR
export const removeDoctorAction = payload => ({
  type: NEOCARE.REMOVE_DOCTOR_REQUEST,
  payload,
});
export const resetRemoveDoctor = () => ({
  type: NEOCARE.REMOVE_DOCTOR_RESET,
});
