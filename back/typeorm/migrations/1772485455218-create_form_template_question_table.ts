import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFormTemplateQuestionTable1772485455218
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "form_template_question",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "question_id",
            type: "integer",
            isNullable: true,
          },
          {
            name: "template_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["question_id"],
            referencedTableName: "question",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
          {
            columnNames: ["template_id"],
            referencedTableName: "form_template",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("form_template_question");
  }
}
