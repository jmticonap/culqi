import { IncomingMessage, ServerResponse } from 'http';

export default async <ReqType>(req: IncomingMessage): Promise<ReqType> => {
  return new Promise<ReqType>((resolve, reject) => {
    let body = '';

    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body) as ReqType;
        resolve(parsedBody);
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
};

export const getToken = (req: IncomingMessage): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      const token = req.headers.authorization.substring(7);
      resolve(token);
    } else {
      reject('Token de autorización no válido');
    }
  });
};

export const errorResponse = (error: unknown, res: ServerResponse) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: String(error) }));
};