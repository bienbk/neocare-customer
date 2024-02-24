import Status from 'common/Status/Status';
import {NEOCARE} from 'store/actionsTypes';

const initializeState = {
  // doctor
  packageOfDoctor: [],
  statusGetPackageDoctor: Status.DEFAULT,
  messageGetPackageDoctor: '',
};

export default (state = initializeState, {type, payload}) => {
  switch (type) {
    case NEOCARE.GET_PACKAGE_OF_DOCTOR_REQUEST:
      return {
        ...state,
        statusGetPackageDoctor: Status.LOADING,
      };
    case NEOCARE.GET_PACKAGE_OF_DOCTOR_SUCCESS:
      return {
        ...state,
        packageOfDoctor: payload,
        statusGetPackageDoctor: Status.SUCCESS,
      };
    case NEOCARE.GET_PACKAGE_OF_DOCTOR_ERROR:
      return {
        ...state,
        statusGetPackageDoctor: Status.ERROR,
        messageGetPackageDoctor: payload,
      };
    case NEOCARE.GET_PACKAGE_OF_DOCTOR_RESET:
      return {
        ...state,
        statusGetPackageDoctor: Status.DEFAULT,
        messageGetPackageDoctor: '',
      };
    default: {
      return state;
    }
  }
};
