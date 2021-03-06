import request from 'superagent';

class API {
  constructor(url) {
    this.url = url;
  }

  post(path, data) {
    let req = request.post(this.url + '/' + path);
    return req.send(data);
  }

  get(path) {
    let req = request.get(this.url + '/' + path);
    return req;
  }
}

export const ENDPOINT = 'API_ENDPOINT';
export default new API(ENDPOINT);
