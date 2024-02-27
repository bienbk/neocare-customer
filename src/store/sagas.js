import {fork} from 'redux-saga/effects';
import orderSaga from './order/orderSaga';
import userSaga from './user/userSaga';
import doctorSaga from './doctor/doctorSaga';
import diseaseSaga from './disease/diseaseSaga';

const saga = function* () {
  yield fork(doctorSaga);
  yield fork(orderSaga);
  yield fork(userSaga);
  yield fork(diseaseSaga);
};
export default saga;
