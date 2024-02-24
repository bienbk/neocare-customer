import {combineReducers} from 'redux';
// import authReducer from './auth/authReducer';

import doctorReducer from './doctor/doctorReducer';
import orderReducer from './order/orderReducer';

const rootReducer = combineReducers({
  doctor: doctorReducer,
  order: orderReducer,
});
export default rootReducer;
