import { ApiProperty } from "@nestjs/swagger";

export class ImportUsersDto {
  @ApiProperty({
    description: "json containing role mapping for role repartion",
  })
  role_mapping: string;
  @ApiProperty({
    description:
      "json containing column mapping for determining where are the data",
  })
  global_mapping: string;
}
