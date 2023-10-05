import { CredentialType } from '../type';
import TokenResource from '../resource/token.resource';
import { IncomingMessage } from 'node:http';

const allowedDigits: Array<string> = [
  'q','w','e','r','t','y','u','i','o','p','a','s','d',
  'f','g','h','j','k','l','z','x','c','v','b','n','m',
  'Q','W','E','R','T','Y','U','I','O','P','A','S','D',
  'F','G','H','J','K','L','Z','X','C','V','B','N','M',
  '1','2','3','4','5','6','7','8','9','0'
];

export default class TokenService {
  tokenResource: TokenResource = new TokenResource();

  tokenising(): string {
    let token: string = '';
    
    for (let i = 1; i <= 16; i++) {
      token += allowedDigits[Math.round(Math.random() * allowedDigits.length)]
    }

    return token;
  }

  async signing(credential: CredentialType): Promise<CredentialType> {
    const credentialString = await this.tokenResource.saveCredential(credential);
    
    return new Promise<CredentialType>((resolve, reject) => {
      if (credentialString) {
        const credential = JSON.parse(credentialString) as CredentialType;
        resolve(credential);
      } else {
        reject('Problem to save credential');
      }
    });
  }

  async getCardByToken(tokenKey: string): Promise<CredentialType> {
    const credentialString = await this.tokenResource.find(tokenKey);

    return new Promise<CredentialType>((resolve, reject) => {
      if (credentialString) {
        const credential = JSON.parse(credentialString) as CredentialType;
        resolve(credential);
      } else {
        reject('No tokenKey found');
      }
    });
  }

  validatePk(req: IncomingMessage): string {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      const token = req.headers.authorization.substring(7);
      return token;
    } else {
      throw new Error('The pk is not present');
    }
  }
}