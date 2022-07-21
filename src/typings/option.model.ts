export interface Option {
  id: number,
  value: string,
  correct: boolean,
  questionId: number,
}

export type answeredQuestion = Record<number, number>;
