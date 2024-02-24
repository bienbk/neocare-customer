import {NEOCARE} from 'store/actionsTypes';
import {takeLatest, call, put, select} from 'redux-saga/effects';
import OrderController from './orderController';
// import {asyncStorage} from 'store/index';
// import {isTokenConfirm} from '../auth/authSelector';

function* sagaBuyPackage({payload}) {
  try {
    const result = yield call(OrderController.buyPackageController, payload);
    if (result.success) {
      yield put({
        type: NEOCARE.BUY_PACKAGE_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({
        type: NEOCARE.BUY_PACKAGE_ERROR,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: NEOCARE.BUY_PACKAGE_ERROR,
      payload: error.message,
    });
  }
}
export default function* watcherSaga() {
  yield takeLatest(NEOCARE.BUY_PACKAGE_REQUEST, sagaBuyPackage);
}
