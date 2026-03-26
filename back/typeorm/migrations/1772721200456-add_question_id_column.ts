import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQuestionIdColumn1772721200456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "answer" ADD COLUMN "question_id" INT NOT NULL, ADD CONSTRAINT "FK_answer_question" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "question_id"`);
  }
}
