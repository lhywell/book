const http = require('http');

const html = '<!DOCTYPE html><head></head><body><h1>hello</h1></body></html>'
// Create an HTTP tunneling proxy
const proxy = http.createServer((req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.end(html);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');

});
proxy.listen(3000)

