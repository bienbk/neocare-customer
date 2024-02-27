import {NEOCARE} from 'store/actionsTypes';
import {takeLatest, call, put, select} from 'redux-saga/effects';
import DiseaseController from './diseaseController';
// import {asyncStorage} from 'store/index';
// import {isTokenConfirm} from '../auth/authSelector';

function* listAllDiseaseSaga({payload}) {
  try {
    const result = yield call(DiseaseController.listAllDisease, payload);
    if (result.success) {
      yield put({
        type: NEOCARE.LIST_ALL_DISEASE_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({
        type: NEOCARE.LIST_ALL_DISEASE_ERROR,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: NEOCARE.LIST_ALL_DISEASE_ERROR,
      payload: error.message,
    });
  }
}
export default function* watcherSaga() {
  yield takeLatest(NEOCARE.LIST_ALL_DISEASE_REQUEST, listAllDiseaseSaga);
}
