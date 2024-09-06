import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserEntity1725570302378 implements MigrationInterface {
    name = 'ChangeUserEntity1725570302378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isAdmin" TO "role"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'BASIC'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "role" TO "isAdmin"`);
    }

}
