import { Proposition } from "typeorm/entities/Proposition";

export class CreateQuestionDto {
  label: string;
  type_id: number;
  propositions?: Proposition[];
}
