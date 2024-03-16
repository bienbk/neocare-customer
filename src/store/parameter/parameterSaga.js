import {NEOCARE} from 'store/actionsTypes';
import {takeLatest, call, put, select} from 'redux-saga/effects';
import ParameterController from './parameterController';

function* createParameterSaga({payload}) {
  if (!payload) {
    console.log('CREATE PARAMETER SAGA PAYLOAD ERROR', payload);
    return;
  }
  try {
    const result = yield call(ParameterController.createParameter, payload);
    if (result && result.success) {
      yield put({
        type: NEOCARE.CREATE_PARAMETER_SUCCESS,
      });
    } else {
      yield put({
        type: NEOCARE.CREATE_PARAMETER_ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: NEOCARE.CREATE_PARAMETER_ERROR,
    });
  }
}
function* listParameterSaga({payload}) {
  if (!payload) {
    console.log('LIST PARAMETER SAGA PAYLOAD ERROR', payload);
    return;
  }
  try {
    const result = yield call(ParameterController.listParameter, payload);
    if (result && result.success) {
      yield put({
        type: NEOCARE.LIST_PARAMETER_SUCCESS,
        payload: result?.data || [],
      });
    } else {
      yield put({
        type: NEOCARE.LIST_PARAMETER_ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: NEOCARE.LIST_PARAMETER_ERROR,
    });
  }
}
export default function* watcherSaga() {
  yield takeLatest(NEOCARE.CREATE_PARAMETER_REQUEST, createParameterSaga);
  yield takeLatest(NEOCARE.LIST_PARAMETER_REQUEST, listParameterSaga);
}
