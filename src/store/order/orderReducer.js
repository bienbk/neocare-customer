import Status from 'common/Status/Status';
import {NEOCARE} from 'store/actionsTypes';

const initializeState = {
  // order

  statusBuyPackage: Status.DEFAULT,
  messageBuyPackage: '',
};

export default (state = initializeState, {type, payload}) => {
  switch (type) {
    case NEOCARE.BUY_PACKAGE_REQUEST:
      return {
        ...state,
        statusBuyPackage: Status.LOADING,
      };
    case NEOCARE.BUY_PACKAGE_SUCCESS:
      return {
        ...state,
        packageOfDoctor: payload,
        statusBuyPackage: Status.SUCCESS,
      };
    case NEOCARE.BUY_PACKAGE_ERROR:
      return {
        ...state,
        statusBuyPackage: Status.ERROR,
        messageBuyPackage: payload,
      };
    case NEOCARE.BUY_PACKAGE_RESET:
      return {
        ...state,
        statusBuyPackage: Status.DEFAULT,
        messageBuyPackage: '',
      };
    default: {
      return state;
    }
  }
};
