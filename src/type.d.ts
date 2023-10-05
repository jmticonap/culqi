export type CardType = {
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

export type CredentialType = {
  tokenKey: string
  cardBody: CardType
}