import {fork} from 'redux-saga/effects';
import authSaga from './auth/authSaga';
import orderSaga from './order/orderSaga';
import userSaga from './user/userSaga';
import doctorSaga from './doctor/doctorSaga';
import diseaseSaga from './disease/diseaseSaga';
import parameterSaga from './parameter/parameterSaga';
const saga = function* () {
  yield fork(doctorSaga);
  yield fork(orderSaga);
  yield fork(userSaga);
  yield fork(diseaseSaga);
  yield fork(parameterSaga);
  yield fork(authSaga);
};
export default saga;
