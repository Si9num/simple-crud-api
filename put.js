const { result } = require('./get');

function put(req, res) {
  let findRes = result.find((obj) => {
    return obj.id === req.url.split('/')[2];
  });
  if (findRes) {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    let inputPost = '';

    req.on('data', (chunk) => {
      inputPost += chunk.toString();
      inputPost = JSON.parse(inputPost);
      result.splice(result.indexOf(req.url.split('/')[2]), 1);
      Object.defineProperty(inputPost, 'id', {
        value: req.url.split('/')[2],
        writable: false,

        enumerable: true,
      });
      inputPost = JSON.stringify(inputPost);
    });
    req.on('end', () => {
      res.end(inputPost);
      result.push(JSON.parse(inputPost));
    });
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
module.exports = put;
