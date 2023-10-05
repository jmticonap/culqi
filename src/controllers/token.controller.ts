import { ServerResponse, IncomingMessage } from 'node:http';
import { parse } from 'node:url';
import controllerUtil from '../utils/controller';
import { errorResponse } from '../utils/controller';
import Validator from '../utils/validator';
import { CredentialType, CardType } from '../type';
import TokenService from '../services/token.service';


export default class TokenController {
  private contentType = { 'Content-Type': 'application/json' };
  private requiredFieldError = (field: string) => `El campo "${field}" es requerido.`;
  private EMAIL_ERROR = 'El email no se ajusta al requerimiento';
  private tokenService = new TokenService();
  
  signing = async (req: IncomingMessage, res: ServerResponse) => {
    // Verificating PK in headers
    let pk: string = '';
    try {
      pk = this.tokenService.validatePk(req);
      console.log(`The PK it's there: ${pk}`);
    } catch (error) {
      errorResponse(error, res);
      return;
    }

    let cardData: CardType;
    try {
      cardData = await controllerUtil<CardType>(req);
    } catch (error) {
      errorResponse(error, res);
      return;
    }
  
    const validator = new Validator();
    validator.requireds( cardData, [
      { field: 'email', errorMessage: this.requiredFieldError('email')},
      { field: 'card_number', errorMessage: this.requiredFieldError('card_number')},
      { field: 'cvv', errorMessage: this.requiredFieldError('cvv')},
      { field: 'expiration_year', errorMessage: this.requiredFieldError('expiration_year')},
      { field: 'expiration_month', errorMessage: this.requiredFieldError('expiration_month')}
    ]);
    if(validator.getError()) {
      errorResponse(validator.getErrorMessage(), res);
      return;
    }
  
    validator.setValue(cardData.email)
      .email(this.EMAIL_ERROR)
      .minLength(5, 'El email debe tener minimo 5 digitos')
      .maxLength(100, 'El email debe tener un máximo 100 digitos');
    validator.setValue(String(cardData.card_number))
      .minLength(13, 'EL numeor de tarjeta no puede tener nemos de 13 cifras')
      .maxLength(16, 'El numero de tarjeta no puede tener más de 16 digitos')
      .cardValid('El numero de tarjeta no es valido');
    validator.setValue(String(cardData.cvv))
      .minLength(3, 'EL cvv no puede tener nemos de 3 cifras')
      .maxLength(4, 'El cvv no puede tener más de 4 digitos');
    validator.setValue(cardData.expiration_year)
      .isLength(4, 'EL año debe tener 4 cifras');
    validator.setValue(String(cardData.expiration_month))
      .gte(1, 'El mes no puede ser menor de 1')
      .lte(12, 'El mes no puede ser mayor a 12');
  
    if(validator.getError()) {
      errorResponse(validator.getErrorMessage(), res);
      return;
    }
  
    // TODO: guardar datos del token
    const credential = await this.tokenService.signing({
      cardBody: cardData,
      tokenKey: this.tokenService.tokenising()
    } as CredentialType);
  
    res.writeHead(200, this.contentType);
    res.end(JSON.stringify(credential));
  };

  getCard = async (req: IncomingMessage, res: ServerResponse) => {
    let pk: string = '';
    try {
      pk = this.tokenService.validatePk(req);
      console.log(`The PK it's there: ${pk}`);
    } catch (error) {
      errorResponse(error, res);
      return;
    }

    const url = req.url;
    const parsedUrl = parse(String(url), true);
    const queryData = parsedUrl.query;

    try {
      const cardBody = await this.tokenService.getCardByToken(String(queryData.token));
      
      res.writeHead(200, this.contentType);
      res.end(JSON.stringify(cardBody));
    } catch (error) {
      errorResponse(error, res);
      return;
    }
  };
}
