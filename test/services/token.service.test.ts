import { describe, expect, test } from '@jest/globals';
import TokenService from '../../src/services/token.service'

describe('Token', () => {
  test('Generate toekn', () => {
    const tokenService = new TokenService();

    expect(tokenService.tokenising().length).toEqual(16);
  });
});