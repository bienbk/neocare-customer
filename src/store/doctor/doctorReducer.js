import Status from 'common/Status/Status';
import {NEOCARE} from 'store/actionsTypes';

const initializeState = {
  // GET ALL PACKAGE OF DOCTOR
  packageOfDoctor: [],
  statusGetPackageDoctor: Status.DEFAULT,
  messageGetPackageDoctor: '',

  // FOLLOW DOCTOR
  statusFollowDoctor: Status.DEFAULT,
  messageFollowDoctor: '',
};

export default (state = initializeState, {type, payload}) => {
  switch (type) {
    // --------------------- FOLLOW DOCTOR -------------------------------
    case NEOCARE.FOLLOW_DOCTOR_REQUEST:
      return {
        ...state,
        statusFollowDoctor: Status.LOADING,
      };
    case NEOCARE.FOLLOW_DOCTOR_SUCCESS:
      return {
        ...state,
        statusFollowDoctor: Status.SUCCESS,
      };
    case NEOCARE.FOLLOW_DOCTOR_ERROR:
      return {
        ...state,
        statusFollowDoctor: Status.ERROR,
        messageFollowDoctor: payload,
      };
    case NEOCARE.FOLLOW_DOCTOR_RESET:
      return {
        ...state,
        statusFollowDoctor: Status.DEFAULT,
        messageFollowDoctor: '',
      };
    // --------------------- GET ALL PACKAGE OF DOCTOR -----------------------
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
