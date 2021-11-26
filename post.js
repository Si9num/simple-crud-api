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
    if (
      !JSON.parse(inputPost).name ||
      !typeof JSON.parse(inputPost).name === 'string' ||
      !JSON.parse(inputPost).age ||
      !typeof JSON.parse(inputPost).name === 'number' ||
      !JSON.parse(inputPost).hobbies ||
      !Array.isArray(JSON.parse(inputPost).hobbies) ||
      JSON.parse(inputPost).hobbies.some((el) => typeof el !== 'string')
    ) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify(
          'request dont have required field or field type is wrong',
        ),
      );
    } else {
      result.push(JSON.parse(inputPost));
      res.end(inputPost);
    }
  });
}
module.exports = post;
