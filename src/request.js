import superagent from 'superagent';

class Request {

  constructor(options = {}) {
    this.baseUrl = options.baseUrl || '';
    this.timeout = options.timeout;
    this.headers = options.headers || {};
    this.endCallback = options.endCallback
  }

  addHeader(key, value) {
    this.headers[key] = value;
  }

  removeHeader(key) {
    delete this.headers[key];
  }

  _configRequest(request, options) {
    if(this.timeout) {
      request = request.timeout(this.timeout);
    }
    if(options.type) {
      request = request.type(options.type);
    }
    let headers = Object.assign({}, this.headers, options.headers);
    Object.keys(headers).forEach((key) => {
      let value = headers[key];
      if(value !== undefined && value !== null) {
        request = request.set(key, value);
      }
    });
    let fields = Object.assign({}, options.fields);
    Object.keys(fields).forEach((key) => {
      let value = fields[key];
      if(value !== undefined && value !== null) {
        request = request.field(key, value);
      }
    });
    let attachments = Object.assign({}, options.attachments);
    Object.keys(attachments).forEach((key) => {
      let value = attachments[key];
      if(value !== undefined && value !== null) {
        if(value.filename && value.path) {
          request = request.attach(key, value.path, value.filename);
        } else if(value.path) {
          request = request.attach(key, value.path);
        } else {
          request = request.attach(key, value);
        }
      }
    });
    return request.end((err, res) => {
      let req = options;
      req.request = this;
      if(this.endCallback && options.endCallback) {
        this.endCallback(err, req, res, (newErr = err, newReq = req, newRes = res) => options.endCallback(newErr,newReq, newRes));
      } else if(this.endCallback) {
        this.endCallback(err, req, res, () => {});
      }else if(options.endCallback) {
        options.endCallback(err, req, res);
      }
    });
  }

  _configUrl(url = '') {
    return this.baseUrl + url;
  }

  getRequest(options = {}) {
    this._configRequest(superagent.get(this._configUrl(options.url)).query(options.query), options);
  }

  postRequest(options = {}) {
    this._configRequest(superagent.post(this._configUrl(options.url)).send(options.body).query(options.query), options);
  }


  putRequest(options = {}) {
    this._configRequest(superagent.put(this._configUrl(options.url)).send(options.body).query(options.query), options);
  }

  deleteRequest(options = {}) {
    this._configRequest(superagent.del(this._configUrl(options.url)).query(options.query), options);
  }

  request() {
    return superagent;
  }
}

export default Request;
