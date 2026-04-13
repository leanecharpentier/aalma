import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCategoryId1776088112424 implements MigrationInterface {
    name = 'AlterCategoryId1776088112424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" DROP CONSTRAINT "FK_a3b6899a7551858f40639bda64d"`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "category_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "action" ADD CONSTRAINT "FK_a3b6899a7551858f40639bda64d" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" DROP CONSTRAINT "FK_a3b6899a7551858f40639bda64d"`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "category_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "action" ADD CONSTRAINT "FK_a3b6899a7551858f40639bda64d" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
