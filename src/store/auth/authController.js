import HttpClient from 'http/HttpClient';
import {UrlApi} from 'http/UrlApi';

class AuthController {
  sendPhoneController = async phone => {
    try {
      console.log('go to confirm phone: ', phone, UrlApi.sendPhone);
      const result = await HttpClient.post(UrlApi.sendPhone, {
        phoneNumber: phone,
      });
      console.log('data return confirm phone: ', result);
      return {success: true, data: result.data};
    } catch (error) {
      return {success: false, error: error.message};
    }
  };
  reSendPhoneController = async payload => {
    try {
      console.log('go to resend OTP: ', payload, UrlApi.resendPhone);
      const {data} = await HttpClient.post(UrlApi.resendPhone, {
        deviceId: payload.deviceId,
        preAuthSessionId: payload.preAuthSessionId
      });
      console.log('data return resend OTP: ', data);
      return {success: true, data: data};
    } catch (error) {
      return {success: false, error: error.message};
    }
  };
  confirmOtpController = async query => {
    console.log('controller Auth:::::', query, UrlApi.confirmPhone)
    const result = await HttpClient.post(UrlApi.confirmPhone, query);
    console.log('RESULT CONFIRM OTP CONTROLLER', result);
    return result;
  };

  loginPhoneController = async phone => {
    const result = await HttpClient.post(UrlApi.loginPhone, {
      phone: phone,
      allownoti: 0,
      partnerid: 100,
    });
    return result.data;
  };

  getVersion = async (os, version, app_id) => {
    console.log('app_idapp_idapp_idapp_idapp_idapp_id:', os, version, app_id);
    const result = await HttpClient.get(UrlApi.getVersion, {
      params: {
        os,
        version,
        app_id,
      },
    });
    return result.data;
  };
}
export default new AuthController();
