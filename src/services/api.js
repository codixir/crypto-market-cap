import axios from 'axios';
import buildUrl from 'build-url';

const axiosInstance = axios.create({
  baseURL: 'https://www.stackadapt.com',  
});

class API {
  makeRequest(options) {
    switch(options.method) {
      case 'GET':
        return this.get(options);
      case 'PUT':
        return this.update(options);
      case 'POST':
        return this.create(options);
      case 'DELETE':
        return this.delete(options);
      default:
        return this.get(options);
    }  
  }

  get(options) {
   const url =  buildUrl(options.url, { queryParams: options.queryParams || null });
   return axiosInstance.get(url, {});                           
  }
  //TODO: implement the following methods when needed
  create(options) {}
  update(options) {}
  delete(options) {}
}

export default API;