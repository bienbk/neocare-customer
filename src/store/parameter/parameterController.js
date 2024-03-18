import HttpClient from 'http/HttpClient';
import {UrlApi} from 'http/UrlApi';

class ParameterController {
  createParameter = async payload => {
    try {
      const {data} = await HttpClient.post(UrlApi.apiCreateParameter, payload);
      console.log('CREATE PARAMETER CONTROLLER::: ', data);
      return {success: true};
    } catch (error) {
      console.log('CREATE PARAMETER CONTROLLER::: ', error);
      return {success: false};
    }
  };
  listParameter = async params => {
    try {
      const {data} = await HttpClient.get(UrlApi.apiListParameter, {params});
      console.log('LIST PARAMETER CONTROLLER::: ', data);
      return {success: true, data: data?.parameters_of_patients};
    } catch (error) {
      console.log('LIST PARAMETER CONTROLLER::: ', error);
      return {success: false};
    }
  };
}
export default new ParameterController();
