import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFormTemplateTable1772483506725
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "form_template",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "name",
            type: "text",
          },
          {
            name: "createdAt",
            type: "date",
          },
          {
            name: "updatedAt",
            type: "date",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("form_template");
  }
}
