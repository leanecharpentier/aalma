import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoadmap1787836066268 implements MigrationInterface {
    name = 'AddRoadmap1787836066268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "format" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_f9f8ca2f11b7b80bef08cef66fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "available_action" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category_id" uuid NOT NULL, "format_id" uuid NOT NULL, "company_id" uuid NOT NULL, "speaker_id" uuid NOT NULL, "duration" integer NOT NULL, "nb_attendees" integer NOT NULL, "title" character varying(50) NOT NULL, "price" character varying(50) NOT NULL, "description" text NOT NULL, "planification" text NOT NULL, "keywords" json NOT NULL, CONSTRAINT "PK_4f29bf8ba8cd3dea72f2b02ec8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "speaker" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "last_name" character varying(50) NOT NULL, "first_name" character varying(50) NOT NULL, "exp" character varying, "job" character varying, "phone" character varying, "email" character varying, CONSTRAINT "PK_8441432fc32d602d417bf2687a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "available_action_id" uuid NOT NULL, "user_id" text NOT NULL, "grade" integer NOT NULL, "comment" text NOT NULL, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roadmap" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "team_id" uuid NOT NULL, CONSTRAINT "PK_8652e486587a4e35070c86d2232" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "priority" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roadmap_id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_413921aa4a118e20f361ceba8b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booked_action" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "action_id" uuid NOT NULL, "priority_id" uuid NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, CONSTRAINT "PK_2f21d9347fbcefba36707335e77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "booked_action_id" uuid NOT NULL, "user_id" text NOT NULL, "grade" integer NOT NULL, "comment" text NOT NULL, CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("user_id" text NOT NULL, "available_action_id" uuid NOT NULL, CONSTRAINT "PK_7a0a82036d8a9802aaff45623cd" PRIMARY KEY ("user_id", "available_action_id"))`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "company_id"`);
        await queryRunner.query(`ALTER TABLE "available_action" ADD CONSTRAINT "FK_bcef79df3e9d7cc4b831186de99" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "available_action" ADD CONSTRAINT "FK_e0acf87b75357761a9b41231e7c" FOREIGN KEY ("format_id") REFERENCES "format"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "available_action" ADD CONSTRAINT "FK_6ebbf87c29cd0c227fbbc2dade3" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "available_action" ADD CONSTRAINT "FK_48fce5960e4cc18747104da5007" FOREIGN KEY ("speaker_id") REFERENCES "speaker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_5cafbaf8e335eefa673cf7c2dde" FOREIGN KEY ("available_action_id") REFERENCES "available_action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_81446f2ee100305f42645d4d6c2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roadmap" ADD CONSTRAINT "FK_d47bbb82421ba4c2664d3df1ecc" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "priority" ADD CONSTRAINT "FK_aa800a0ad3a8f3bcab10186f2b8" FOREIGN KEY ("roadmap_id") REFERENCES "roadmap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booked_action" ADD CONSTRAINT "FK_c597efe9feb3e12454977276417" FOREIGN KEY ("action_id") REFERENCES "available_action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booked_action" ADD CONSTRAINT "FK_a9c786c0c8d4576e8ace767b4cd" FOREIGN KEY ("priority_id") REFERENCES "priority"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grade" ADD CONSTRAINT "FK_b950b907f7d8825c744bee2650e" FOREIGN KEY ("booked_action_id") REFERENCES "booked_action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grade" ADD CONSTRAINT "FK_6e2bfa5e7273f4e8c5eac8bf9ff" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_3e4ab8fdd5663058cb05785dd6a" FOREIGN KEY ("available_action_id") REFERENCES "available_action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_3e4ab8fdd5663058cb05785dd6a"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP CONSTRAINT "FK_6e2bfa5e7273f4e8c5eac8bf9ff"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP CONSTRAINT "FK_b950b907f7d8825c744bee2650e"`);
        await queryRunner.query(`ALTER TABLE "booked_action" DROP CONSTRAINT "FK_a9c786c0c8d4576e8ace767b4cd"`);
        await queryRunner.query(`ALTER TABLE "booked_action" DROP CONSTRAINT "FK_c597efe9feb3e12454977276417"`);
        await queryRunner.query(`ALTER TABLE "priority" DROP CONSTRAINT "FK_aa800a0ad3a8f3bcab10186f2b8"`);
        await queryRunner.query(`ALTER TABLE "roadmap" DROP CONSTRAINT "FK_d47bbb82421ba4c2664d3df1ecc"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_81446f2ee100305f42645d4d6c2"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_5cafbaf8e335eefa673cf7c2dde"`);
        await queryRunner.query(`ALTER TABLE "available_action" DROP CONSTRAINT "FK_48fce5960e4cc18747104da5007"`);
        await queryRunner.query(`ALTER TABLE "available_action" DROP CONSTRAINT "FK_6ebbf87c29cd0c227fbbc2dade3"`);
        await queryRunner.query(`ALTER TABLE "available_action" DROP CONSTRAINT "FK_e0acf87b75357761a9b41231e7c"`);
        await queryRunner.query(`ALTER TABLE "available_action" DROP CONSTRAINT "FK_bcef79df3e9d7cc4b831186de99"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "company_id" uuid`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "grade"`);
        await queryRunner.query(`DROP TABLE "booked_action"`);
        await queryRunner.query(`DROP TABLE "priority"`);
        await queryRunner.query(`DROP TABLE "roadmap"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "speaker"`);
        await queryRunner.query(`DROP TABLE "available_action"`);
        await queryRunner.query(`DROP TABLE "format"`);
    }

}
