import HttpClient from 'http/HttpClient';
import {UrlApi} from 'http/UrlApi';

class DoctorController {
  getPackageDoctor = async payload => {
    try {
      const {data} = await HttpClient.get(`${UrlApi.apiGetPackageOfDoctor}/1`);
      console.log('Controller---get package of doctor data:::', data);
      return {success: true, data: data, message: ''};
    } catch (error) {
      console.log(error);
      return {success: false, data: '', message: error.toString()};
    }
  };
}
export default new DoctorController();
