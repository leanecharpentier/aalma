import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableColor1771360995636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
            new Table({
                name: 'color',
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
                    name: 'hexacode',
                    type: 'text',
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
            }),
            );        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('color');
    }

}
