import Status from 'common/Status/Status';
import {NEOCARE} from 'store/actionsTypes';

const initializeState = {
  // disease
  listDisease: [],
  statusListDisease: Status.DEFAULT,
  messageListDisease: '',
};

export default (state = initializeState, {type, payload}) => {
  switch (type) {
    case NEOCARE.LIST_ALL_DISEASE_REQUEST:
      return {
        ...state,
        statusListDisease: Status.LOADING,
      };
    case NEOCARE.LIST_ALL_DISEASE_SUCCESS:
      return {
        ...state,
        listDisease: payload,
        statusListDisease: Status.SUCCESS,
      };
    case NEOCARE.LIST_ALL_DISEASE_ERROR:
      return {
        ...state,
        statusListDisease: Status.ERROR,
        messageListDisease: payload,
      };
    case NEOCARE.LIST_ALL_DISEASE_RESET:
      return {
        ...state,
        statusListDisease: Status.DEFAULT,
        messageListDisease: '',
      };
    default: {
      return state;
    }
  }
};
