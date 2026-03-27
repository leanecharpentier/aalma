import { MigrationInterface, QueryRunner } from "typeorm";

export class FillRoles1774540942589 implements MigrationInterface {
  name = "FillRoles1774540942589";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "role" (name, "createdAt", "updatedAt")
      VALUES 
      ('Super Admin', NOW(), NOW()),
      ('Admin', NOW(), NOW()),
      ('CEO', NOW(), NOW()),
      ('HR', NOW(), NOW()),
      ('Manager', NOW(), NOW()),
      ('Employee', NOW(), NOW()),
      ('Health Referee', NOW(), NOW());
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "role"
      WHERE name IN ('Super Admin','Admin','CEO','HR','Manager','Employee','Health Referee')
    `);
  }
}
