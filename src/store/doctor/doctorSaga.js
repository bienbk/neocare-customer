import {NEOCARE} from 'store/actionsTypes';
import {takeLatest, call, put, select} from 'redux-saga/effects';
import DoctorController from './doctorController';
// import {asyncStorage} from 'store/index';
// import {isTokenConfirm} from '../auth/authSelector';

function* sagaGetPackageDoctor({payload}) {
  try {
    const result = yield call(DoctorController.getPackageDoctor, payload);
    if (result.success) {
      yield put({
        type: NEOCARE.GET_PACKAGE_OF_DOCTOR_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({
        type: NEOCARE.GET_PACKAGE_OF_DOCTOR_ERROR,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: NEOCARE.GET_PACKAGE_OF_DOCTOR_ERROR,
      payload: error.message,
    });
  }
}
export default function* watcherSaga() {
  yield takeLatest(NEOCARE.GET_PACKAGE_OF_DOCTOR_REQUEST, sagaGetPackageDoctor);
}
