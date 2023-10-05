import Router from './utils/router';
import routes from './routes/routes';
import http from 'node:http';

const hostname = '127.0.0.1';
const port = 3000;

const router = new Router();
routes(router);

const server = http.createServer((req, res) => {
  void router.route(req, res)
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});