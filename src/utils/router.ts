import { ServerResponse, IncomingMessage } from 'node:http';

type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;

export default class Router {
  private routes: Record<string, RouteHandler> = {};

  get(route: string, handler: RouteHandler) {
    console.log('GET', {route});
    this.routes[`GET ${route}`] = handler;
  }

  post(route: string, handler: RouteHandler) {
    console.log('POST', {route});
    this.routes[`POST ${route}`] = handler;
  }

  async route(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;

    let routeKey = '';
    if (url?.includes('?')) {
      routeKey = `${method} ${url?.split('?')[0]}`;
    } else {
      routeKey = `${method} ${url}`;
    }

    const handler = this.routes[routeKey];

    if (handler) {
      await handler(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'Not found'
      }));
    }
  }
}
