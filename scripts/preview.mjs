import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = path.join(repoDir, 'docs');
const host = '127.0.0.1';
const port = 4173;

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer(async (request, response) => {
  try {
    const requestPath = request.url === '/' ? '/index.html' : request.url || '/index.html';
    const filePath = path.join(docsDir, decodeURIComponent(requestPath.split('?')[0]));
    const normalizedPath = path.normalize(filePath);
    if (!normalizedPath.startsWith(docsDir)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    const file = await fs.readFile(normalizedPath);
    const extension = path.extname(normalizedPath).toLowerCase();
    response.writeHead(200, {
      'Cache-Control': 'no-cache',
      'Content-Type': contentTypes[extension] || 'application/octet-stream'
    });
    response.end(file);
  } catch (error) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

server.listen(port, host, () => {
  console.log(`Previewing docs build at http://${host}:${port}`);
});
