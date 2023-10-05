import { describe, expect, test } from '@jest/globals';
import Validator from '../../src/utils/validator'
import { TokenType } from '../../src/type'

describe('Validator', () => {
  test('Requieres fields: complete', () => {
    const incomingData = {
      email: '',
      card_number: 1231231231231233,
      cvv: 123,
      expiration_year: '2025',
      expiration_month: '09'
    } as TokenType;
    const validator = new Validator();
    validator.requireds(incomingData, [{field: 'email', errorMessage: ''}]);

    expect(validator.getError()).toBeFalsy();
  });

  test('Requieres fields: incomplete', () => {
    const incomingData = {
      email: '',
      card_number: 1231231231231233,
      cvv: 123,
      expiration_year: '2025'
    } as TokenType;
    const validator = new Validator();
    validator.requireds(incomingData, [{field: 'expiration_month', errorMessage: ''}]);

    expect(validator.getError()).toBeTruthy();
  });

  test('Validate email: valid', () => {
    const validator = new Validator();
    validator.setValue('qwerqwerq@gmail.com');
    
    validator.email(null);
    expect(validator.getError()).toBeFalsy();
  });

  test('Validate email: invalid', () => {
    const validator = new Validator();
    validator.setValue('qwerqwerqgmail.com');
    
    validator.email(null);
    expect(validator.getError()).toBeTruthy();
  });

  test('Validate email: minLength', () => {
    const validator = new Validator();
    validator
      .setValue('a@gmail.com')
      .minLength(5, null);
    expect(validator.getError()).toBeFalsy();
  });

  test('Validate email: maxLength', () => {
    const validator = new Validator();
    validator
      .setValue('a@gmail.com')
      .maxLength(10, null);
    expect(validator.getError()).toBeTruthy();
  });
});
