import {combineReducers} from 'redux';
// import authReducer from './auth/authReducer';

import doctorReducer from './doctor/doctorReducer';
import orderReducer from './order/orderReducer';
import userReducer from './user/userReducer';
import diseaseReducer from './disease/diseaseReducer';

const rootReducer = combineReducers({
  doctor: doctorReducer,
  order: orderReducer,
  disease: diseaseReducer,
  user: userReducer,
});
export default rootReducer;
