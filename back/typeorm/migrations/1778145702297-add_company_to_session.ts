import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyToSession1778145702297 implements MigrationInterface {
    name = 'AddCompanyToSession1778145702297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ADD "company_id" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "company_id"`);
    }

}
