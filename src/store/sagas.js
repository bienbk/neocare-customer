import {fork} from 'redux-saga/effects';
import orderSaga from './order/orderSaga';

import doctorSaga from './doctor/doctorSaga';

const saga = function* () {
  yield fork(doctorSaga);
  yield fork(orderSaga);
};
export default saga;
