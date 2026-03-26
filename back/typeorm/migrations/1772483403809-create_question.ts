import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateQuestion1772483403809 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "question",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "type_id",
            type: "integer",
          },
          {
            name: "label",
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
            columnNames: ["type_id"],
            referencedTableName: "question_type",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("question");
  }
}
