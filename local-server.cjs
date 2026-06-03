const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.png':'image/png'};
function fileFor(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  let rel = clean === '/' ? '/index.html' : clean;
  let file = path.join(root, rel);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  return file;
}
http.createServer((req, res) => {
  const file = fileFor(req.url);
  if (!file.startsWith(root) || !fs.existsSync(file)) {
    res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
    res.end('Not found');
    return;
  }
  res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
}).listen(4173, '127.0.0.1', () => console.log('litix-landings on http://127.0.0.1:4173'));
