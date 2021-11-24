const result = [
  { id: 1, name: 'nick' },
  { id: 2, name: 'nick' },
];
function get(req, res) {
  res.writeHead(200);
  res.end(JSON.stringify(result));
}

module.exports = { get, result };
