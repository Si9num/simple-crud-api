const http = require('http');
const { get, result } = require('./get');
const getId = require('./getId');

const port = 4000;

const server = http.createServer((req, res) => {
  let id = req.url.split('/')[2];
  if (req.url === '/person' && req.method === 'GET') {
    get(req, res);
  } else if (req.url === `/person/${id}` && req.method === 'GET') {
    getId(req, res);
  } else {
    res.writeHead(404);
    res.end('link is not found');
  }
});
server.listen(port, () => console.log(`server is running on ${port} `));
