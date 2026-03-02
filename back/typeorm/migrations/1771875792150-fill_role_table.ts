import { MigrationInterface, QueryRunner } from "typeorm";

export class FillRoleTable1771875792150 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO role (id, name, "createdAt", "updatedAt") VALUES
        (1, 'Super Admin', NOW(), NOW()),
        (2, 'Admin', NOW(), NOW()),
        (3, 'CEO', NOW(), NOW()),
        (4, 'HR', NOW(), NOW()),
        (5, 'Manager', NOW(), NOW()),
        (6, 'Employee', NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM role WHERE name IN ('Super Admin', 'Admin', 'CEO', 'HR', 'Manager', 'Employee');`,
    );
  }
}
