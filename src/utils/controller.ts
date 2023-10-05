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

export const errorResponse = (error: unknown, res: ServerResponse) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error
    }));
};