import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActionsAndCategoryTables1776070433051 implements MigrationInterface {
    name = 'AddActionsAndCategoryTables1776070433051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "action" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category_id" uuid, "description" text NOT NULL, "ideal_group" text NOT NULL, "duration_in_minute" integer NOT NULL, "in_person" boolean NOT NULL, "price" integer, "note" integer, "reservation" boolean NOT NULL, "system" boolean NOT NULL, CONSTRAINT "PK_2d9db9cf5edfbbae74eb56e3a39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "action" ADD CONSTRAINT "FK_a3b6899a7551858f40639bda64d" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" DROP CONSTRAINT "FK_a3b6899a7551858f40639bda64d"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "action"`);
    }

}
