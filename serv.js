const http = require('http');
const { get, result } = require('./get');
const getId = require('./getId');
const post = require('./post');
const put = require('./put');
const del = require('./del');
require('dotenv').config();

const port = process.env.PORT;

const server = http.createServer((req, res) => {
  let id = req.url.split('/')[2];

  if (req.url === '/person' && req.method === 'GET') {
    get(req, res);
  } else if (req.url === `/person/${id}` && req.method === 'GET') {
    getId(req, res);
  } else if (req.url === '/person' && req.method === 'POST') {
    post(req, res);
  } else if (req.url === `/person/${id}` && req.method === 'PUT') {
    put(req, res);
  } else if (req.url === `/person/${id}` && req.method === 'DELETE') {
    del(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end('link is not found');
  }
});
server.listen(port, () => console.log(`server is running on ${port} `));
