import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCompany1771361094579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: 'company',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'text',
                },
                {
                    name: 'color_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'createdAt',
                    type: 'date',
                },
                {
                    name: 'updatedAt',
                    type: 'date',
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['color_id'],
                    referencedTableName: 'color',
                    referencedColumnNames: ['id'],
                    onDelete: 'SET NULL',
                },
            ],
        }),
        );  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('company');
    }

}
