import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCellphoneColumn1761018087217 implements MigrationInterface {
    name = 'AddCellphoneColumn1761018087217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ADD "cellphone" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "cellphone"`);
    }

}
