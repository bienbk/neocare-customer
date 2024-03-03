import Status from 'common/Status/Status';
import {NEOCARE} from 'store/actionsTypes';

const initializeState = {
  //login
  tokenConfirm: '',
  statusSendPhone: Status.DEFAULT,
  statusConfirmOtp: Status.DEFAULT,
  errorSendOtp: '',
  errorConfirm: '',
  statusLoginPhone: Status.DEFAULT,
  //Get Version
  forceUpdate: false,
  update: false,
  versionNew: '',
  deviceId: '',
  preAuthSessionId: '',
  statusGetVersion: Status.DEFAULT,
  updateInstalledCodePush: false,
};

export default (state = initializeState, {type, payload}) => {
  switch (type) {
    case NEOCARE.SEND_PHONE_REQUEST:
      return {
        ...state,
        statusSendPhone: Status.LOADING,
      };
    case NEOCARE.RESEND_PHONE_REQUEST:
      return {
        ...state,
        statusSendPhone: Status.LOADING,
      };
    case NEOCARE.RESEND_PHONE_SUCCESS:
      return {
        ...state,
        statusSendPhone: Status.SUCCESS,
      };
    case NEOCARE.SEND_PHONE_SUCCESS:
      return {
        ...state,
        tokenConfirm: payload.tokenConfirm,
        deviceId: payload.deviceId,
        preAuthSessionId: payload.preAuthSessionId,
        statusSendPhone: Status.SUCCESS,
      };
    case NEOCARE.SEND_PHONE_ERROR:
      return {
        ...state,
        statusSendPhone: Status.ERROR,
        errorSendOtp: payload.errorMsg,
      };
    case NEOCARE.SEND_PHONE_RESET:
      return {
        ...state,
        statusSendPhone: Status.DEFAULT,
        errorSendOtp: '',
      };

    case NEOCARE.CONFIRM_OTP_REQUEST:
      return {
        ...state,
        statusConfirmOtp: Status.LOADING,
      };
    case NEOCARE.CONFIRM_OTP_SUCCESS:
      return {
        ...state,
        statusConfirmOtp: Status.SUCCESS,
      };
    case NEOCARE.CONFIRM_OTP_ERROR:
      return {
        ...state,
        errorConfirm: payload.errorMsg,
        statusConfirmOtp: Status.ERROR,
      };
    case NEOCARE.CONFIRM_OTP_RESET:
      return {
        ...state,
        statusConfirmOtp: Status.DEFAULT,
        errorConfirm: '',
      };

    case NEOCARE.LOGIN_PHONE_SUCCESS:
      return {
        ...state,
        tempUser: payload.user,
        statusLoginPhone: Status.SUCCESS,
      };
    case NEOCARE.LOGIN_PHONE_RESET:
      return {
        ...state,
        statusLoginPhone: Status.DEFAULT,
      };
    //get Version
    case NEOCARE.GET_VERSION_SUCCESS:
      return {
        ...state,
        forceUpdate: payload.forceUpdate,
        versionNew: payload.versionNew,
        update: payload.update,
        statusGetVersion: Status.SUCCESS,
      };
    case 'UPDATE_INSTALLED_CODE_PUSH':
      return {
        ...state,
        updateInstalledCodePush: payload,
      };
    default: {
      return state;
    }
  }
};
