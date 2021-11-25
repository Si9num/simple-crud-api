const { result } = require('./get');

function put(req, res) {
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
}
module.exports = put;
