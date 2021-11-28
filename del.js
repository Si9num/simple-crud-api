const { result } = require('./get');

function del(req, res) {
  let findRes = result.find((obj) => {
    return obj.id === req.url.split('/')[2];
  });
  if (findRes) {
    res.writeHead(204, { 'Content-Type': 'application/json' });
    result.splice(result.indexOf(req.url.split('/')[2]), 1);
    res.end('record was deleted');
  } else if (
    !req.url
      .split('/')[2]
      .match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
  ) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('id incorrect'));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('record does not exist'));
  }
}
module.exports = del;
