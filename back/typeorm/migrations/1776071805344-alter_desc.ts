import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDesc1776071805344 implements MigrationInterface {
    name = 'AlterDesc1776071805344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "action" ADD "description" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "action" ADD "description" character varying(250) NOT NULL`);
    }

}
