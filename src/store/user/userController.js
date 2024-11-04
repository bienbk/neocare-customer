import HttpClient from 'http/HttpClient';
import {UrlApi} from 'http/UrlApi';

class UserController {
  deleteAccount = async (custId, sessionKey, phone) => {
    try {
      const result = await HttpClient.delete(UrlApi.deleteAccount);
      console.log('DELETE CONTROLLER:', result);
      if (result?.data?.error) {
        return {
          success: false,
          error: result?.data?.error,
        };
      } else {
        return {
          success: true,
          status: 200,
          data: result.data,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };
  // confirmDeleteAccount = async query => {
  //   try {
  //     const {data} = await HttpClient.put(UrlApi.confirmOtpDelete, query);
  //     console.log('CONFIRM DELETE ACCOUNT CONTROLLER::::', data);
  //     return data.status === false
  //       ? {errorMessage: data?.error, success: false}
  //       : {
  //           success: true,
  //         };
  //   } catch (error) {
  //     console.log(error);
  //     return {
  //       success: false,
  //       errorMessage: error,
  //     };
  //   }
  // };
  // updateUserInfo = async userInfo => {
  //   const query = {
  //     ...userInfo,
  //     cust_city: '',
  //     cust_cmnd: '',
  //     cust_ngaycap: '',
  //     cust_noicap: '',
  //   };
  //   try {
  //     const {data} = await HttpClient.post(UrlApi.updateUserInfo, query);
  //     console.log(data);
  //     if (data.status === false) {
  //       return {success: false, message: data.error};
  //     }
  //     return {success: true, user: data};
  //   } catch (error) {
  //     return {success: false, errorMessage: error};
  //   }
  // };
  registerUser = async payload => {
    try {
      const {data} = await HttpClient.post(UrlApi.apiRegisterUser, payload);
      console.log('data from controller:::', data);
      return {success: true, data: data};
    } catch (error) {
      console.log(error);
      return {success: false, message: error.toString()};
    }
  };
  getUserInfo = async () => {
    try {
      const {data} = await HttpClient.get(UrlApi.apiGetUserInfo);
      console.log('DATA RETURN:::', data);
      return {success: true, data: data.user};
    } catch (error) {
      console.log('GET USER INFO ERROR:', error);
      return {success: false, message: error.toString()};
    }
  };
  updateUserInfo = async payload => {
    console.log('payload update', payload);
    try {
      const {data} = await HttpClient.put(UrlApi.apiGetUserInfo, payload);
      console.log('data from controller put user:::', data);
      return {success: true, data: data};
    } catch (error) {
      console.log(error);
      return {success: false, message: error.toString()};
    }
  };
  // updateLanguage = async query => {
  //   console.log('QUERY UPDATE LANGUAGE:::', query);
  //   try {
  //     const data = await HttpClient.post(UrlApi.updateLanguageUrl, query);
  //     console.log('DATA FROM UPADTING LANGUAGE:::', data);
  //     return {
  //       success: data?.data.status ? true : false,
  //       message: data?.data.status ? '' : '',
  //     };
  //   } catch (error) {
  //     console.log('UPDATE LANGUAGE ERROR:::', error);
  //     return {success: false, message: error.message};
  //   }
  // };
}

export default new UserController();
