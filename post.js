const { result } = require('./get');
const { v4: uuidv4 } = require('uuid');

function post(req, res) {
  res.writeHead(201, { 'Content-Type': 'application/json' });

  let inputPost = '';

  req.on('data', (chunk) => {
    inputPost += chunk.toString();
    inputPost = JSON.parse(inputPost);

    Object.defineProperty(inputPost, 'id', {
      value: uuidv4(),
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
module.exports = post;
