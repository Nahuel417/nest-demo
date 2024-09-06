import { MigrationInterface, QueryRunner } from "typeorm";

export class Roles1725591968749 implements MigrationInterface {
    name = 'Roles1725591968749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "role" TO "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" character varying NOT NULL DEFAULT 'BASIC'`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isAdmin" TO "role"`);
    }

}
