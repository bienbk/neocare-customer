import {takeLatest, call, put, select} from 'redux-saga/effects';
import {NEOCARE} from 'store/actionsTypes';
import authController from './authController';
import {isTokenConfirm} from './authSelector';
import {confirmOtpReset, loginPhoneReset, sendPhoneReset} from './authAction';
import {asyncStorage} from 'store/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetGetListShop, resetOrder} from 'store/actions';
import strings from 'localization/Localization';

function* sendPhoneSaga({payload}) {
  try {
    const result = yield call(
      authController.sendPhoneController,
      payload.phone,
    );
    console.log('RESULT SAGA::: ', result);
    if (result.success === true && result?.data && result?.data?.status) {
      const data = result.data;
      console.log('result success sendPhone:', data);
      yield put({
        type: NEOCARE.SEND_PHONE_SUCCESS,
        payload: result.data,
      });
      yield put(sendPhoneReset());
    } else if (result.success === true && result?.data?.status === false) {
      console.log('result errorr sendPhone:', result);
      yield put({
        type: NEOCARE.SEND_PHONE_ERROR,
        payload: {errorMsg: result?.data?.error},
      });
    } else {
      yield put({
        type: NEOCARE.SEND_PHONE_ERROR,
        payload: {errorMsg: 'Xảy ra lỗi trong quá trình nhận OTP'},
      });
    }
  } catch (e) {
    yield put({
      type: NEOCARE.SEND_PHONE_ERROR,
      payload: {
        errorMsg:
          'Xảy ra lỗi trong quá trình nhật OTP, vui lòng liên hệ nhân viên chăm sóc khách hàng',
      },
    });
  }
}

function* reSendPhoneSaga({payload}) {
  try {
    const result = yield call(
      authController.reSendPhoneController,
      payload,
    );
    console.log('RESULT SAGA::: ', result);
    if (result.success === true && result?.data && result?.data?.status) {
      const data = result.data;
      console.log('result success sendPhone:', data);
      yield put({
        type: NEOCARE.RESEND_PHONE_SUCCESS,
        payload: result.data,
      });
      yield put(sendPhoneReset());
    } else if (result.success === true && result?.data?.status === false) {
      console.log('result errorr sendPhone:', result);
      yield put({
        type: NEOCARE.SEND_PHONE_ERROR,
        payload: {errorMsg: result?.data?.error},
      });
    } else {
      yield put({
        type: NEOCARE.SEND_PHONE_ERROR,
        payload: {errorMsg: 'Xảy ra lỗi trong quá trình nhận OTP'},
      });
    }
  } catch (e) {
    yield put({
      type: NEOCARE.SEND_PHONE_ERROR,
      payload: {
        errorMsg:
          'Xảy ra lỗi trong quá trình nhật OTP, vui lòng liên hệ nhân viên chăm sóc khách hàng',
      },
    });
  }
}

function* confirmOtp({payload}) {
  // const tokenConfirm = yield select(state => isTokenConfirm(state));
  console.log('payload confirm Otp', payload);
  const query = {
    userInputCode: payload.otp,
    deviceId: payload.deviceId,
    preAuthSessionId: payload.push_token,
  };
  try {
    const result = yield call(authController.confirmOtpController, query);
    // console.log('result confirmOtp:', result);
    let frontToken = result.headers?.get('front-token');
    let stAccessToken = result.headers?.get('st-access-token');
    let stRefreshToken = result.headers?.get('st-refresh-token');
    if (frontToken || stAccessToken || stRefreshToken) {
      yield asyncStorage.setToken({frontToken, stAccessToken, stRefreshToken});
    }
    if (result.data?.status == 'OK') {
      yield put({
        type: NEOCARE.CONFIRM_OTP_SUCCESS,
      });
      yield asyncStorage.setUser(result.data?.user);
      // yield put(confirmOtpReset());
    } else {
      yield put({
        type: NEOCARE.CONFIRM_OTP_ERROR,
        payload: {
          errorMsg: strings.verifyScreen.errorMessageOtp,
        },
      });
    }
  } catch (e) {
    console.log('error confirm Otp', e)
    yield put({
      type: NEOCARE.CONFIRM_OTP_ERROR,
      payload: {
        errorMsg: strings.verifyScreen.errorMessageApp,
      },
    });
  }
}

function* loginPhone({payload}) {
  try {
    const result = yield call(
      authController.loginPhoneController,
      payload.phone,
    );
    // console.log('result loginPhone:', result, payload);
    if (result?.status) {
      yield put({
        type: NEOCARE.LOGIN_PHONE_SUCCESS,
        payload: {
          user: payload,
        },
      });
      console.log('storeeeeee:', asyncStorage);
    }
    yield put(loginPhoneReset());
  } catch (e) {}
}

function* logout() {
  try {
    yield put(resetOrder());
    yield put(resetGetListShop({isLogout: true}));
    // yield put(resetGetListProduct());
    asyncStorage.clearStorage();
    asyncStorage.setTheFirstLogin('false');
  } catch (e) {
    console.log(e);
  }
}

function* getVersions({payload}) {
  try {
    const result = yield call(
      authController.getVersion,
      payload.os,
      payload.version,
      payload.app_id,
    );
    console.log('response Versionnnnnn:', result);
    yield put({
      type: NEOCARE.GET_VERSION_SUCCESS,
      payload: {
        forceUpdate: result.force,
        versionNew: result.version,
        update: result.update,
      },
    });
  } catch (error) {
    yield put({
      type: NEOCARE.GET_VERSION_ERROR,
      payload: {errorMsg: error},
    });
  }
}

export default function* watcherSaga() {
  yield takeLatest(NEOCARE.RESEND_PHONE_REQUEST, reSendPhoneSaga);
  yield takeLatest(NEOCARE.SEND_PHONE_REQUEST, sendPhoneSaga);
  yield takeLatest(NEOCARE.CONFIRM_OTP_REQUEST, confirmOtp);
  yield takeLatest(NEOCARE.LOGIN_PHONE_REQUEST, loginPhone);
  yield takeLatest(NEOCARE.LOGOUT_REQUEST, logout);
  yield takeLatest(NEOCARE.GET_VERSION_REQUEST, getVersions);
}
