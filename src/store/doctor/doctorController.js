import HttpClient from 'http/HttpClient';
import {UrlApi} from 'http/UrlApi';

class DoctorController {
  // getPackageDoctor = async (payload = 1) => {
  //   try {
  //     const {data} = await HttpClient.get(
  //       `${UrlApi.apiGetPackageOfDoctor}/${payload}`,
  //     );
  //     console.log('Controller---get package of doctor data:::', data);
  //     return {success: true, data: data, message: ''};
  //   } catch (error) {
  //     console.log(error);
  //     return {success: false, data: '', message: error.toString()};
  //   }
  // };
  followDoctor = async query => {
    const {patient_id, qr_code} = query;
    try {
      const {data} = await HttpClient.get(
        `${UrlApi.apiFollowDoctor}${patient_id}/follow/doctor/${qr_code}/`,
      );
      console.log('Controller---follow doctor data:::', data);
      return {success: true, message: ''};
    } catch (error) {
      console.log(error);
      return {success: false, data: '', message: error.toString()};
    }
  };
  listDoctor = async payload => {
    const {patient_id, qr_code, size = 100, page = 1} = payload;
    const query = {
      qr_code,
      size,
      page,
    };
    try {
      const {data} = await HttpClient.get(
        UrlApi.apiListDoctorInfo + `${patient_id}/doctor`,
        {params: query},
      );
      return {success: true, data: data.doctor_of_patients || []};
    } catch (error) {
      console.log('LIST DOCTOR ERROR::', error);
      return {success: false};
    }
  };
  getDoctorDetail = async payload => {
    const {patient_id, qr_code, size, page} = payload;
    const query = {
      qr_code,
      size,
      page,
    };
    try {
      const {data} = await HttpClient.get(
        UrlApi.apiListDoctorInfo + `${patient_id}/doctor`,
        {params: query},
      );
      if (data.doctor_of_patients && data.doctor_of_patients.length > 0) {
        return {success: true, data: data.doctor_of_patients[0] || []};
      }
      return {success: false};
    } catch (error) {
      console.log('LIST DOCTOR ERROR::', error);
      return {success: false};
    }
  };
}
export default new DoctorController();
