import {NEOCARE} from 'store/actionsTypes';
import {takeLatest, call, put, select} from 'redux-saga/effects';
import DoctorController from './doctorController';
// import {asyncStorage} from 'store/index';
// import {isTokenConfirm} from '../auth/authSelector';

// function* getPackageDoctorSaga({payload}) {
//   try {
//     const result = yield call(DoctorController.getPackageDoctor, payload);
//     if (result.success) {
//       yield put({
//         type: NEOCARE.GET_PACKAGE_OF_DOCTOR_SUCCESS,
//         payload: result.data,
//       });
//     } else {
//       yield put({
//         type: NEOCARE.GET_PACKAGE_OF_DOCTOR_ERROR,
//         payload: result.message,
//       });
//     }
//   } catch (error) {
//     yield put({
//       type: NEOCARE.GET_PACKAGE_OF_DOCTOR_ERROR,
//       payload: error.message,
//     });
//   }
// }

function* followDoctorSaga({payload}) {
  try {
    const result = yield call(DoctorController.followDoctor, payload);
    if (result.success) {
      yield put({
        type: NEOCARE.FOLLOW_DOCTOR_SUCCESS,
      });
    } else {
      yield put({
        type: NEOCARE.FOLLOW_DOCTOR_ERROR,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: NEOCARE.FOLLOW_DOCTOR_ERROR,
      payload: error.message,
    });
  }
}
function* listDoctorSaga({payload}) {
  try {
    const result = yield call(DoctorController.listDoctor, payload);
    if (result.success) {
      yield put({
        type: NEOCARE.LIST_DOCTOR_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({
        type: NEOCARE.LIST_DOCTOR_ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: NEOCARE.LIST_DOCTOR_ERROR,
    });
  }
}
export default function* watcherSaga() {
  yield takeLatest(NEOCARE.LIST_DOCTOR_REQUEST, listDoctorSaga);
  yield takeLatest(NEOCARE.FOLLOW_DOCTOR_REQUEST, followDoctorSaga);
  // yield takeLatest(NEOCARE.GET_PACKAGE_OF_DOCTOR_REQUEST, getPackageDoctorSaga);
}
