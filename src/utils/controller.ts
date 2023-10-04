import { IncomingMessage } from 'http';

export default async <ReqType>(req: IncomingMessage): Promise<ReqType | Error> => {
  return new Promise<ReqType | Error>((resolve, reject) => {
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
