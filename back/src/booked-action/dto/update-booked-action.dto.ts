import { PartialType } from "@nestjs/mapped-types";
import { CreateBookedActionDto } from "./create-booked-action.dto";

export class UpdateBookedActionDto extends PartialType(CreateBookedActionDto) {}