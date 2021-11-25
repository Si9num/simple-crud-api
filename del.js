const { result } = require('./get');

function del(req, res) {
  res.writeHead(204, { 'Content-Type': 'application/json' });

  result.splice(result.indexOf(req.url.split('/')[2]), 1);

  res.end('record was deleted');
}
module.exports = del;
