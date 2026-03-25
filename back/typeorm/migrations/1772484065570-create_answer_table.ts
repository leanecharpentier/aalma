import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnswerTable1772484065570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "answer",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "text",
          },
          {
            name: "form_id",
            type: "integer",
          },
          {
            name: "content",
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
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
          {
            columnNames: ["form_id"],
            referencedTableName: "form",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("answer");
  }
}
