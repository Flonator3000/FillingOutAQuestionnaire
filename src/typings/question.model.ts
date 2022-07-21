import {Option} from "./option.model";

export interface Question {
  id: number,
  value: string,
  options: Array<Option>,
}
