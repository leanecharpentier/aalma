import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePropositonTable1772483427622 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "proposition",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "question_id",
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
            columnNames: ["question_id"],
            referencedTableName: "question",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("proposition");
  }
}
