import http from './http'

let dev = process.env.NODE_ENV === 'production' ? '' : '/api';
export default {
    getData(url, params, flag) {
      return http.post( dev + url, params, flag );
    },
}