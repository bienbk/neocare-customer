import {NEOCARE} from 'store/actionsTypes';
import {takeLatest, call, put, select} from 'redux-saga/effects';
import UserController from './userController';
import { asyncStorage } from '..';
// import {asyncStorage} from 'store/index';
// import {isTokenConfirm} from '../auth/authSelector';

// function* getDeleteAccount() {
//   const currentUser = yield asyncStorage.getUser();
//   console.log('USERRRRRRRRRRRRR:', currentUser);
//   try {
//     const result = yield call(
//       UserController.deleteAccount,
//       currentUser?.custid,
//       currentUser?.session_key,
//       currentUser?.custphone,
//     );
//     console.log('DELETE SAAAGAAAAAA:', result);
//     if (result?.success && result?.data?.status === 1) {
//       yield put({
//         type: NEOCARE.GET_DELETE_ACCOUNT_SUCCESS,
//       });
//     } else {
//       yield put({
//         type: NEOCARE.GET_DELETE_ACCOUNT_ERROR,
//         payload: {
//           errorMsg: result?.data?.message,
//         },
//       });
//     }
//   } catch (error) {
//     yield put({
//       type: NEOCARE.GET_DELETE_ACCOUNT_ERROR,
//       payload: {
//         errorMsg: 'Xảy ra lỗi trong quá trình xóa tài khoản',
//       },
//     });
//   }
// }
// function* confirmDeleteAccountSaga({payload}) {
//   const tokenConfirm = yield select(state => isTokenConfirm(state));
//   console.log('tokenConfirm', tokenConfirm);
//   const query = {
//     otp_token: tokenConfirm,
//     otp: payload.otp,
//   };
//   try {
//     console.log('QUERRRRYYYYYYYY:', query);
//     const result = yield call(UserController.confirmDeleteAccount, query);
//     if (result.success === true) {
//       yield put({
//         type: NEOCARE.CONFIRM_DELETE_OTP_SUCCESS,
//       });
//     } else {
//       yield put({
//         type: NEOCARE.CONFIRM_DELETE_OTP_ERROR,
//         payload: result.errorMessage,
//       });
//     }
//   } catch (error) {
//     yield put({
//       type: NEOCARE.CONFIRM_DELETE_OTP_ERROR,
//       payload:
//         'Xảy ra lỗi trong quá trình xác thực. Vui lòng liên hệ nhân viên phục vụ!',
//     });
//   }
// }
function* updateUserSaga({payload}) {
  try {
    const result = yield call(UserController.updateUserInfo, payload);
    if (result.success === true) {
      yield put({
        type: NEOCARE.UPDATE_USER_INFO_SUCCESS,
        payload: result.user,
      });
    } else {
      yield put({
        type: NEOCARE.UPDATE_USER_INFO_ERROR,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: NEOCARE.UPDATE_USER_INFO_ERROR,
      payload: error.message,
    });
  }
}

// function* setLanguageSaga({payload}) {
//   if (!payload) {
//     return;
//   }
//   console.log('PAYLOAD CHANGE language:::', payload);
//   try {
//     const result = yield call(UserController.updateLanguage, payload);
//     if (result.success) {
//       yield put({
//         type: NEOCARE.SET_LANGUAGE_SUCCESS,
//         payload: payload?.language,
//       });
//     } else {
//       yield put({
//         type: NEOCARE.SET_LANGUAGE_ERROR,
//         payload: result.message,
//       });
//     }
//   } catch (error) {
//     yield put({
//       type: NEOCARE.SET_LANGUAGE_ERROR,
//       payload: error.message,
//     });
//   }
// }
function* registerUserSaga({payload}) {
  try {
    const result = yield call(UserController.registerUser, payload);
    if (result.success === true) {
      asyncStorage.setUser(result.data);
      yield put({
        type: NEOCARE.REGISTER_USER_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({
        type: NEOCARE.REGISTER_USER_ERROR,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: NEOCARE.REGISTER_USER_ERROR,
      payload: error.message,
    });
  }
}

export default function* watcherSaga() {
  // yield takeLatest(NEOCARE.GET_DELETE_ACCOUNT_REQUEST, getDeleteAccount);
  // yield takeLatest(
  //   NEOCARE.CONFIRM_DELETE_OTP_REQUEST,
  //   confirmDeleteAccountSaga,
  // );
  yield takeLatest(NEOCARE.REGISTER_USER_REQUEST, registerUserSaga);
  yield takeLatest(NEOCARE.UPDATE_USER_INFO_REQUEST, updateUserSaga);
}
