import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRoles1771359876645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: 'role',
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
        await queryRunner.dropTable('role');
    }

}
