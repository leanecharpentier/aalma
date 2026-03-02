import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateActivityLogTable1772141189911 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "activity_logs",
        columns: [
          {
            name: "id",
            type: "text",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "text",
            isNullable: true,
          },
          {
            name: "action",
            type: "text",
          },
          {
            name: "status",
            type: "int",
            isNullable: true,
          },
          {
            name: "details",
            type: "json",
            isNullable: true,
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("activity_logs");
  }
}
