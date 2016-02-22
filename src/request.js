import superagent from 'superagent';

class Request {

  constructor(options) {
    this.baseUrl = options.baseUrl || '';
    this.timeout = options.timeout;
    this.type = options.type || 'json';
    this.headers = options.headers || [];
  }

  addHeader(key, value) {
    this.headers[key] = value;
  }

  removeHeader(key) {
    delete this.headers[key];
  }

  _configRequest(request, endCallback) {
    if(this.timeout) {
      request = request.timeout(this.timeout);
    }
    if(this.type) {
      request = request.type(this.type);
    }
    this.headers.forEach((value, key) => {
      request = request.set(key, value);
    });

    return request.end((err, res) => {
      if(endCallback) {
        endCallback(err, res);
      }
    });
  }

  getRequest(url, queryParams = {}, endCallback = null) {
    this._configRequest(superagent.get(url).query(queryParams), endCallback);
  }

  postRequest(url, bodyParams = {}, queryParams = {}, endCallback = null) {
    this._configRequest(superagent.post(url).send(bodyParams).query(queryParams), endCallback);
  }


  putRequest(url, bodyParams = {}, queryParams = {}, endCallback = null) {
    this._configRequest(superagent.put(url).send(bodyParams).query(queryParams), endCallback);
  }

  deleteRequest(url, bodyParams = {}, queryParams = {}, endCallback = null) {
    this._configRequest(superagent.del(url).send(bodyParams).query(queryParams), endCallback);
  }

  request() {
    return superagent;
  }
}

export default Request;
