import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHealthRefereeRole1772717705585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO role (id, name, "createdAt", "updatedAt") VALUES
        (7, 'Health Referee', NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM role WHERE name IN ('Health Referee');`,
    );
  }
}
