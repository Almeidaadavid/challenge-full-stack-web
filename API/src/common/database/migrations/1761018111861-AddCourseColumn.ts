import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCourseColumn1761018111861 implements MigrationInterface {
    name = 'AddCourseColumn1761018111861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ADD "course" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "course"`);
    }

}
