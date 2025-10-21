import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustColumnName1761018043071 implements MigrationInterface {
    name = 'AdjustColumnName1761018043071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" RENAME COLUMN "Ra" TO "student_registration"`);
        await queryRunner.query(`ALTER TABLE "student" RENAME CONSTRAINT "UQ_c8cff90edfbb98be03cd5df908d" TO "UQ_fb6de7652fb42cb277819294bdb"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" RENAME CONSTRAINT "UQ_fb6de7652fb42cb277819294bdb" TO "UQ_c8cff90edfbb98be03cd5df908d"`);
        await queryRunner.query(`ALTER TABLE "student" RENAME COLUMN "student_registration" TO "Ra"`);
    }

}
