import { MigrationInterface, QueryRunner } from "typeorm";

export class TypeQuestion1772490544920 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO question_type (id, label, "createdAt", "updatedAt") VALUES
        (1, 'Multiple Choice', NOW(), NOW()),
        (2, 'Single Choice', NOW(), NOW()),
        (3, 'Textarea', NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM question_type WHERE label IN ('Multiple Choice', 'Single Choice', 'Textarea');`,
    );
  }
}
