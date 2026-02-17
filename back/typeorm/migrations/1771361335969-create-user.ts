import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableColumn } from 'typeorm';

export class CreateUser1771361335969  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'text',
            isPrimary: true,
          },
          {
            name: 'firstname',
            type: 'text',
          },
          {
            name: 'lastname',
            type: 'text',
          },
          {
            name: 'email',
            type: 'text',
          },
          {
            name: 'emailVerified',
            type: 'boolean',
          },
          {
            name: 'image',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'role_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'team_id',
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
            columnNames: ['role_id'],
            referencedTableName: 'role',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['team_id'],
            referencedTableName: 'team',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_user_email',
        columnNames: ['email'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}