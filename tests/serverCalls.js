var chai = require("chai");
var expect = chai.expect;

var Request = require('./dist/request').default;

var server = require('./helper/server.js');

var app, query, body, params;
describe("Check server ", function() {
  //server listening on http://localhost:3000
  before(function(done) {
    app = server(function(_query, _body, _params){
      query= _query;
      body = _body;
      params = _params;
    }).listen(3000, function() {
      done();
    });
  });
  it("should return status code 200 at get request", function(done) {
    var request = new Request();
    request.getRequest({
      url: 'http://localhost:3000/item',
      endCallback: function(err, req, res) {
        expect(err).to.not.exist;
        expect(query).to.be.empty;
        expect(body).to.be.empty;
        expect(params).to.be.empty;
        expect(res.status).to.be.equal(200);
        done();
      }
    })
  });
  it("should return status code 200 at get request with param", function(done) {
    var request = new Request();
    request.getRequest({
      url: 'http://localhost:3000/item/1',
      endCallback: function(err, req, res) {
        expect(err).to.not.exist;
        expect(query).to.be.empty;
        expect(body).to.be.empty;
        expect(params.param).to.be.equal('1');
        expect(res.status).to.be.equal(200);
        done();
      }
    })
  });
  it("should return status code 200 at get request with param", function(done) {
    var request = new Request();
    request.getRequest({
      url: 'http://localhost:3000/item/1',
      query:{
        qparam: 'test'
      },
      endCallback: function(err, req, res) {
        expect(err).to.not.exist;
        expect(query.qparam).to.be.equal('test');
        expect(body).to.be.empty;
        expect(params.param).to.be.equal('1');
        expect(res.status).to.be.equal(200);
        done();
      }
    })
  });
  it("should return status code 200 at post request", function(done) {
    var request = new Request();
    request.postRequest({
      url: 'http://localhost:3000/item',
      endCallback: function(err, req, res) {
        expect(err).to.not.exist;
        expect(query).to.be.empty;
        expect(body).to.be.empty;
        expect(params).to.be.empty;
        expect(res.status).to.be.equal(200);
        done();
      }
    })
  });
  it("should return status code 200 at post request", function(done) {
    var request = new Request();
    request.postRequest({
      url: 'http://localhost:3000/item',
      body: {
        pparam: 'test2'
      },
      query: {
        qparam: 'test1'
      },
      endCallback: function(err, req, res) {
        expect(err).to.not.exist;
        expect(query.qparam).to.be.equal('test1');
        expect(params).to.be.empty;
        expect(body.pparam).to.be.equal('test2');
        expect(res.status).to.be.equal(200);
        done();
      }
    })
  });
  it("should return status code 200 at put request", function(done) {
    var request = new Request();
    request.putRequest({
      url: 'http://localhost:3000/item/1',
      endCallback: function(err, req, res) {
        expect(err).to.not.exist;
        expect(params.param).to.be.equal('1');
        expect(query).to.be.empty;
        expect(body).to.be.empty;
        expect(res.status).to.be.equal(200);
        done();
      }
    })
  });
  it("should return status code 200 at put request", function(done) {
    var request = new Request();
    request.putRequest({
      url: 'http://localhost:3000/item/1',
      body: {
        pparam: 'test2'
      },
      query:{
        qparam: 'test1'
      },
      endCallback: function(err, req, res) {
        expect(err).to.not.exist;
        expect(params.param).to.be.equal('1');
        expect(query.qparam).to.be.equal('test1');
        expect(body.pparam).to.be.equal('test2');
        expect(res.status).to.be.equal(200);
        done();
      }
    })
  });
  it("should return status code 200 at delete request", function(done) {
    var request = new Request();
    request.deleteRequest({
      url: 'http://localhost:3000/item/1',
      endCallback: function(err, req, res) {
        expect(err).to.not.exist;
        expect(res.status).to.be.equal(200);
        done();
      }
    })
  });
  it("should return status code 200 at delete request", function(done) {
    var request = new Request();
    request.deleteRequest({
      url: 'http://localhost:3000/item/1',
      query: {
        qparam: 'test1'
      },
      endCallback: function(err, req, res) {
        expect(err).to.not.exist;
        expect(params.param).to.be.equal('1');
        expect(query.qparam).to.be.equal('test1');
        expect(res.status).to.be.equal(200);
        done();
      }
    })
  });
  it("should return status code 400 at get request", function(done) {
    var request = new Request();
    request.getRequest({
      url: 'http://localhost:3000/error400',
      endCallback: function(err, req, res) {
        expect(err.status).to.be.equal(400);
        expect(res.status).to.be.equal(400);
        done();
      }
    })
  });
  it("should return status code 500 at get request", function(done) {
    var request = new Request();
    request.getRequest({
      url: 'http://localhost:3000/error500',
      endCallback: function(err, req, res) {
        expect(err.status).to.be.equal(500);
        expect(res.status).to.be.equal(500);
        done();
      }
    })
  });
  after(function(done){
    app.close();
    done();
  });
});
