import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterActions1776071555431 implements MigrationInterface {
    name = 'AlterActions1776071555431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "ideal_group"`);
        await queryRunner.query(`ALTER TABLE "action" ADD "schedule" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "action" ADD "ideal_group_low" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "action" ADD "ideal_group_high" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "action" ADD "description" character varying(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "reservation"`);
        await queryRunner.query(`ALTER TABLE "action" ADD "reservation" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "reservation"`);
        await queryRunner.query(`ALTER TABLE "action" ADD "reservation" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "action" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "ideal_group_high"`);
        await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "ideal_group_low"`);
        await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "schedule"`);
        await queryRunner.query(`ALTER TABLE "action" ADD "ideal_group" text NOT NULL`);
    }

}
