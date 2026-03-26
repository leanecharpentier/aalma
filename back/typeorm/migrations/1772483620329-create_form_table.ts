import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFormTable1772483620329 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "form",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "company_id",
            type: "integer",
            isNullable: true,
          },
          {
            name: "template_id",
            type: "integer",
          },
          {
            name: "name",
            type: "text",
          },
          {
            name: "start_date",
            type: "date",
          },
          {
            name: "end_date",
            type: "date",
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
            columnNames: ["company_id"],
            referencedTableName: "company",
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
    await queryRunner.dropTable("form");
  }
}
