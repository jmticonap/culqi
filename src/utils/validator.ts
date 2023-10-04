import { AnswerChain, AnswerItem } from '../type';

export default class Validator {
  value: number | string = 0
  answerChain: AnswerChain = []

  requireds(incomingData: object, fields: Array<string>, errorMessage: string | null): Validator {
    this.answerChain.push({
      errorMessage,
      error: !fields.every(item => !(item in incomingData))
    } as AnswerItem);

    return this
  }

  setValue(value: number | string): Validator {
    this.value = value
    this.answerChain = []

    return this
  }

  email(errorMessage: string | null) {
    this.answerChain.push({
      errorMessage,
      error: !!['@gmail.com','@hotmail.com','@yahoo.es'].find(item => String(this.value).includes(item))
    } as AnswerItem);

    return this;
  }

  minLength(value: number, errorMessage: string | null) {
    this.answerChain.push({
      errorMessage,
      error: String(this.value).length >= value
    } as AnswerItem);

    return this;
  }

  maxLength(value: number, errorMessage: string | null) {
    this.answerChain.push({
      errorMessage,
      error: String(this.value).length <= value
    } as AnswerItem);

    return this;
  }

  gt(value: number, errorMessage: string | null): Validator {
    this.answerChain.push({
      errorMessage,
      error: +this.value > value,
    } as AnswerItem);

    return this;
  }

  gte(value: number, errorMessage: string | null): Validator {
    this.answerChain.push({
      errorMessage,
      error: +this.value >= value,
    } as AnswerItem);

    return this;
  }

  getError(): boolean {
    return this.answerChain.every(item => !item.error);
  }

  getErrorMessage() {
    return this.answerChain.map(item => item.errorMessage);
  }
}
