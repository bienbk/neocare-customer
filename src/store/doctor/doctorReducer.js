import Status from 'common/Status/Status';
import {NEOCARE} from 'store/actionsTypes';

const initializeState = {
  // GET ALL PACKAGE OF DOCTOR
  // packageOfDoctor: [],
  // statusGetPackageDoctor: Status.DEFAULT,
  // messageGetPackageDoctor: '',

  // FOLLOW DOCTOR
  statusFollowDoctor: Status.DEFAULT,
  messageFollowDoctor: '',
  followedDoctor: {},

  // LIST DOCTOR
  listDoctor: [],
  statusListDoctor: Status.DEFAULT,
};

export default (state = initializeState, {type, payload}) => {
  switch (type) {
    // -------------- LIST ALL DOCTOR ---------------------
    case NEOCARE.LIST_DOCTOR_REQUEST:
      return {
        ...state,
        statusListDoctor: Status.LOADING,
      };
    case NEOCARE.LIST_DOCTOR_SUCCESS:
      return {
        ...state,
        statusListDoctor: Status.SUCCESS,
        listDoctor: payload,
      };
    case NEOCARE.LIST_DOCTOR_ERROR:
      return {
        ...state,
        statusListDoctor: Status.ERROR,
      };
    case NEOCARE.LIST_DOCTOR_RESET:
      return {
        ...state,
        statusListDoctor: Status.DEFAULT,
      };
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
        followedDoctor: payload,
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
    default: {
      return state;
    }
  }
};
