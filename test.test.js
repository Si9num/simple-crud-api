const { get, result } = require('./get');
const http = require('http');
function request() {
  return new Promise((resolve) => {
    http.get('http://localhost:4000/person', (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        resolve(JSON.parse(data));
      });
    });
  });
}
function request1() {
  return new Promise((resolve) => {
    http.get('http://localhost:4000/person', (resp) => {
      let data = `{
        "name":"John",
        "age":7,
        "hobbies":["f"]
    }`;
      resp.on('data', (chunk) => {
        result.push(JSON.parse(data));
      });
      resp.on('end', () => {
        resolve(result);
      });
    });
  });
}
test('test ', () => {
  return expect(request()).resolves.toEqual('[]');
});
test('test ', () => {
  return expect(request1()).resolves.toEqual(
    '[[{"age": 7, "hobbies": ["f"], "name": "John"}]]',
  );
});
