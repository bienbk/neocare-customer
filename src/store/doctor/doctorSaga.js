import {NEOCARE} from 'store/actionsTypes';
import {takeLatest, call, put, select} from 'redux-saga/effects';
import DoctorController from './doctorController';
import doctorController from './doctorController';
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
        payload: result.data,
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
function* listDoctorSaga() {
  try {
    console.log('come to saga');
    const result = yield call(DoctorController.listDoctor);
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
function* sendServiceSaga({payload}) {
  try {
    const result = yield call(DoctorController.sendService, payload);
    if (result && result.success) {
      yield put({
        type: NEOCARE.SEND_SERVICE_SUCCESS,
      });
    } else {
      yield put({
        type: NEOCARE.SEND_SERVICE_ERROR,
        payload: ' Gửi yêu cầu tư vấn tới chuyên gia thất bại. Vui lòng kiểm tra tình trạng gói chăm sóc sức khoẻ của bạn',
      });
    }
  } catch (error) {
    yield put({
      type: NEOCARE.SEND_SERVICE_ERROR,
      payload: ' Gửi yêu cầu tư vấn tới chuyên gia thất bại. Vui lòng kiểm tra tình trạng gói chăm sóc sức khoẻ của bạn',
    });
  }
}
function* removeDoctorSaga({payload}) {
  try {
    const result = yield call(DoctorController.removeDoctor, payload);
    if (result?.success) {
      yield put({
        type: NEOCARE.REMOVE_DOCTOR_SUCCESS,
      });
    } else {
      yield put({
        type: NEOCARE.REMOVE_DOCTOR_ERROR,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: NEOCARE.REMOVE_DOCTOR_ERROR,
      payload: error,
    });
  }
}

export default function* watcherSaga() {
  yield takeLatest(NEOCARE.REMOVE_DOCTOR_REQUEST, removeDoctorSaga)
  yield takeLatest(NEOCARE.LIST_DOCTOR_REQUEST, listDoctorSaga);
  yield takeLatest(NEOCARE.FOLLOW_DOCTOR_REQUEST, followDoctorSaga);
  yield takeLatest(NEOCARE.SEND_SERVICE_REQUEST, sendServiceSaga);
  // yield takeLatest(NEOCARE.GET_PACKAGE_OF_DOCTOR_REQUEST, getPackageDoctorSaga);
}
