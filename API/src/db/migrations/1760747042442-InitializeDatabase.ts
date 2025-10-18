import { MigrationInterface, QueryRunner } from "typeorm";

export class InitializeDatabase1760747042442 implements MigrationInterface {
    name = 'InitializeDatabase1760747042442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "Ra" text NOT NULL, "document" text NOT NULL, CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email"), CONSTRAINT "UQ_c8cff90edfbb98be03cd5df908d" UNIQUE ("Ra"), CONSTRAINT "UQ_52048b2b3a688eb0a90409e4eea" UNIQUE ("document"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
