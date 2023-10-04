import { ServerResponse, IncomingMessage } from 'node:http';

export default (req: IncomingMessage, res: ServerResponse) => {
  const message = {
    msg: '¡Hola, Mundo!🤓'
  };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(message));
}
