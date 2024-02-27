import HttpClient from 'http/HttpClient';
import {UrlApi} from 'http/UrlApi';

class DoctorController {
  getPackageDoctor = async (payload = 1) => {
    try {
      const {data} = await HttpClient.get(
        `${UrlApi.apiGetPackageOfDoctor}/${payload}`,
      );
      console.log('Controller---get package of doctor data:::', data);
      return {success: true, data: data, message: ''};
    } catch (error) {
      console.log(error);
      return {success: false, data: '', message: error.toString()};
    }
  };
  followDoctor = async query => {
    const {patient_id, qr_code} = query;
    try {
      const {data} = await HttpClient.get(
        `${UrlApi.apiFollowDoctor}/${patient_id}/follow/doctor/${qr_code}/`,
      );
      console.log('Controller---follow doctor data:::', data);
      return {success: true, message: ''};
    } catch (error) {
      console.log(error);
      return {success: false, data: '', message: error.toString()};
    }
  };
}
export default new DoctorController();
