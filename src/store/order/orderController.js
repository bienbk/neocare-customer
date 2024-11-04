import HttpClient from 'http/HttpClient';
import {UrlApi} from 'http/UrlApi';

class OrderController {
  buyPackageController = async payload => {
    try {
      const {data} = await HttpClient.post(`${UrlApi.apiBuyPackage}`, payload);
      console.log('Controller---buy package of doctor data:::', data);
      return {success: true, data: data, message: ''};
    } catch (error) {
      console.log(error);
      return {success: false, data: '', message: error.toString()};
    }
  };
}
export default new OrderController();
