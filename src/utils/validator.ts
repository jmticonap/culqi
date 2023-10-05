import { AnswerChain, AnswerItem } from '../type';

export default class Validator {
  value: number | string = 0
  answerChain: AnswerChain = []

  requireds(incomingData: object, fields: Array<{field: string, errorMessage: string}>): Validator {
    fields.forEach(item => {
      this.answerChain.push({
        errorMessage: item.errorMessage,
        error: !(item.field in incomingData)
      } as AnswerItem);
    });

    return this
  }

  setValue(value: number | string): Validator {
    this.value = value

    return this
  }

  email(errorMessage: string | null) {
    this.answerChain.push({
      errorMessage,
      error: !['@gmail.com','@hotmail.com','@yahoo.es'].find(item => String(this.value).includes(item))
    } as AnswerItem);

    return this;
  }

  minLength(value: number, errorMessage: string | null) {
    this.answerChain.push({
      errorMessage,
      error: !(String(this.value).length >= value)
    } as AnswerItem);

    return this;
  }

  maxLength(value: number, errorMessage: string | null) {
    this.answerChain.push({
      errorMessage,
      error: !(String(this.value).length <= value)
    } as AnswerItem);

    return this;
  }

  isLength(value: number, errorMessage: string | null) {
    this.answerChain.push({
      errorMessage,
      error: !(String(this.value).length == value)
    } as AnswerItem);

    return this;
  }

  gt(value: number, errorMessage: string | null): Validator {
    this.answerChain.push({
      errorMessage,
      error: !(+this.value > value),
    } as AnswerItem);

    return this;
  }

  gte(value: number, errorMessage: string | null): Validator {
    this.answerChain.push({
      errorMessage,
      error: !(+this.value >= value),
    } as AnswerItem);

    return this;
  }

  lt(value: number, errorMessage: string | null): Validator {
    this.answerChain.push({
      errorMessage,
      error: !(+this.value < value),
    } as AnswerItem);

    return this;
  }

  lte(value: number, errorMessage: string | null): Validator {
    this.answerChain.push({
      errorMessage,
      error: !(+this.value <= value),
    } as AnswerItem);

    return this;
  }

  getError(): boolean {
    return !this.answerChain.every(item => !item.error);
  }

  getErrorMessage() {
    return this.answerChain
      .filter(item => item.error).map(item => item.errorMessage);
  }
}
