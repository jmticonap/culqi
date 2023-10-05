import redisClient from '../database/redis';
import { CredentialType } from '../type';

export default class TokenResource {

  async saveCredential(credential: CredentialType): Promise<string | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await redisClient.set(credential.tokenKey, JSON.stringify(credential), 'EX', 900);

    return await redisClient.get(credential.tokenKey);
  }

  async find(tokenKey: string) {
    return await redisClient.get(tokenKey);
  }
}