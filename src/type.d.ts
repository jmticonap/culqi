export type TokenType = {
  email: string|null
  card_number: number|null
  cvv: number|null
  expiration_year: string|null
  expiration_month: string|null
};

export type AnswerItem = {
  errorMessage: string
  error: boolean
}

export type AnswerChain = Array<AnswerItem>;