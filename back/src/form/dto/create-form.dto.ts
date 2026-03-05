export class CreateFormDto {
  name: string;
  startDate: Date;
  endDate: Date;
  template_id: number;
  company_id?: number;
}
