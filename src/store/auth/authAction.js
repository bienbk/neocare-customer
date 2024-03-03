import {NEOCARE} from 'store/actionsTypes';

export const sendPhone = phone => ({
  type: NEOCARE.SEND_PHONE_REQUEST,
  payload: {
    phone,
  },
});
export const reSendPhone = query => ({
  type: NEOCARE.RESEND_PHONE_REQUEST,
  payload: {
    deviceId: query.deviceId,
    preAuthSessionId: query.preAuthSessionId,
  },
});
export const sendPhoneReset = () => ({
  type: NEOCARE.SEND_PHONE_RESET,
});

export const confirmOtp = (otp, deviceId, push_token) => ({
  type: NEOCARE.CONFIRM_OTP_REQUEST,
  payload: {
    otp,
    deviceId,
    push_token,
  },
});
export const confirmOtpReset = () => ({
  type: NEOCARE.CONFIRM_OTP_RESET,
});

export const loginPhone = phone => ({
  type: NEOCARE.LOGIN_PHONE_REQUEST,
  payload: {
    phone,
  },
});
export const loginPhoneReset = () => ({
  type: NEOCARE.LOGIN_PHONE_RESET,
});

export const logout = () => ({
  type: NEOCARE.LOGOUT_REQUEST,
});

export const getVersion = (os, version, app_id) => ({
  type: NEOCARE.GET_VERSION_REQUEST,
  payload: {
    os,
    version,
    app_id,
  },
});

export const getUpdateInstalledCodePush = isInstalled => ({
  type: 'UPDATE_INSTALLED_CODE_PUSH',
  payload: isInstalled,
});
