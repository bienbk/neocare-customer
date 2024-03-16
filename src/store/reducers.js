import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';

import doctorReducer from './doctor/doctorReducer';
import orderReducer from './order/orderReducer';
import userReducer from './user/userReducer';
import diseaseReducer from './disease/diseaseReducer';
import parameterReducer from './parameter/parameterReducer';

const rootReducer = combineReducers({
  doctor: doctorReducer,
  order: orderReducer,
  disease: diseaseReducer,
  user: userReducer,
  auth: authReducer,
  parameter: parameterReducer,
});
export default rootReducer;
