import { ServerResponse, IncomingMessage } from 'node:http';
import controllerUtil from '../utils/controller';
import { errorResponse } from '../utils/controller';
import Validator from '../utils/validator';
import { TokenType } from '../type';

const contentType = { 'Content-Type': 'application/json' };
const requiredFieldError = (field: string) => `El campo "${field}" es requerido.`;
const EMAIL_ERROR = 'El email no se ajusta al requerimiento';

export default async (req: IncomingMessage, res: ServerResponse) => {
  let tokenData: TokenType;
  try {
    tokenData = await controllerUtil<TokenType>(req);
  } catch (error) {
    errorResponse(error, res);
    return;
  }

  const validator = new Validator();
  validator.requireds( tokenData, [
    { field: 'email', errorMessage: requiredFieldError('email')},
    { field: 'card_number', errorMessage: requiredFieldError('card_number')},
    { field: 'cvv', errorMessage: requiredFieldError('cvv')},
    { field: 'expiration_year', errorMessage: requiredFieldError('expiration_year')},
    { field: 'expiration_month', errorMessage: requiredFieldError('expiration_month')}
  ]);
  if(validator.getError()) {
    errorResponse(validator.getErrorMessage(), res);
    return;
  }

  validator.setValue(tokenData.email)
    .email(EMAIL_ERROR)
    .minLength(5, 'El email debe tener minimo 5 digitos')
    .maxLength(100, 'El email debe tener un máximo 100 digitos');
  validator.setValue(String(tokenData.card_number))
    .minLength(13, 'EL numeor de tarjeta no puede tener nemos de 13 cifras')
    .maxLength(16, 'El numero de tarjeta no puede tener más de 16 digitos');
  validator.setValue(String(tokenData.cvv))
    .minLength(3, 'EL cvv no puede tener nemos de 3 cifras')
    .maxLength(4, 'El cvv no puede tener más de 4 digitos');
  validator.setValue(tokenData.expiration_year)
    .isLength(4, 'EL año debe tener 4 cifras');
  validator.setValue(String(tokenData.expiration_month))
    .gte(1, 'El mes no puede ser menor de 1')
    .lte(12, 'El mes no puede ser mayor a 12');

  if(validator.getError()) {
    errorResponse(validator.getErrorMessage(), res);
    return;
  }

  res.writeHead(200, contentType);
  res.end(JSON.stringify(tokenData));
}
