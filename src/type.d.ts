export type TokenType = {
  email: string
  card_number: number
  cvv: number
  expiration_year: string
  expiration_month: string
};

export type AnswerItem = {
  errorMessage: string
  error: boolean
}

export type AnswerChain = Array<AnswerItem>;