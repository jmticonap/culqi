import { ServerResponse, IncomingMessage } from 'node:http';
import controllerUtil from '../utils/controller';
import Validator from '../utils/validator';
import { TokenType } from '../type';

const contentType = { 'Content-Type': 'application/json' };

export default async (req: IncomingMessage, res: ServerResponse) => {
  const tokenData = await controllerUtil<TokenType>(req);

  const validator = new Validator();
  validator.requireds(tokenData, ['expiration_month'], '');
  if(validator.getError()) {
    res.writeHead(400, contentType);
    res.end(JSON.stringify({
      error: "It's a missing field"
    }));
    return;
  }

  res.writeHead(200, contentType);
  res.end(JSON.stringify(tokenData));
}
