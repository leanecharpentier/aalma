import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCompany1771361335968 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'team',
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
                        name: 'company_id',
                        type: 'int',
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
                        columnNames: ['company_id'],
                        referencedTableName: 'company',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                    },
                ],
            }),
        );  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('team');
    }

}
