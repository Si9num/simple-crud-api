const { result } = require('./get');

function getId(req, res) {
  res.writeHead(200);
  res.end(
    JSON.stringify(
      result.find((obj) => {
        return obj.id === +req.url.split('/')[2];
      }),
    ),
  );
}
module.exports = getId;
