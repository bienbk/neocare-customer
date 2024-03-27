import HttpClient from 'http/HttpClient';
import {UrlApi} from 'http/UrlApi';

class DoctorController {
  followDoctor = async query => {
    const {qr_code} = query;
    try {
      const {data} = await HttpClient.get(
        `${UrlApi.apiFollowDoctor}/${qr_code}`,
      );
      console.log('Controller---follow doctor data:::', data);
      return {
        success: true,
        data:
          data?.doctor_of_patient.length > 0 ? data.doctor_of_patient[0] : {},
      };
    } catch (error) {
      console.log(error);
      return {success: false, data: '', message: error.toString()};
    }
  };
  listDoctor = async () => {
    const query = {
      qr_code: '',
      size: 100,
      page: 1,
    };
    try {
      console.log('come to controller');
      const {data} = await HttpClient.get(UrlApi.apiListDoctorInfo + 'doctor', {
        params: query,
      });
      console.log('DATA', data);
      return {success: true, data: data.doctor_of_patients || []};
    } catch (error) {
      console.log('LIST DOCTOR ERROR::', error);
      return {success: false};
    }
  };
  sendService = async payload => {
    try {
      const {data} = await HttpClient.post(UrlApi.apiSendService, payload);
      return {success: true, data};
    } catch (error) {
      console.log('SEND SERVICE ERROR: ', error);
      return {success: false};
    }
  };
}
export default new DoctorController();
