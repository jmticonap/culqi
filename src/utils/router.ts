import { ServerResponse, IncomingMessage } from 'node:http';

type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;

export default class Router {
  private routes: Record<string, RouteHandler> = {};

  get(route: string, handler: RouteHandler) {
    this.routes[`GET ${route}`] = handler;
  }

  post(route: string, handler: RouteHandler) {
    this.routes[`POST ${route}`] = handler;
  }

  async route(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;
    const routeKey = `${method} ${url}`;

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
