import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1681516270358 implements MigrationInterface {
    name = 'CreateTables1681516270358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "listnotes"."user" ("id" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "dthr_create" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "listnotes"."note" ("id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "id_user" character varying NOT NULL, "status" character varying NOT NULL, "dthr_create" TIMESTAMP NOT NULL DEFAULT now(), "dthr_update" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "listnotes"."note" ADD CONSTRAINT "FK_f4f182421a89338bdc432d6adf7" FOREIGN KEY ("id_user") REFERENCES "listnotes"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listnotes"."note" DROP CONSTRAINT "FK_f4f182421a89338bdc432d6adf7"`);
        await queryRunner.query(`DROP TABLE "listnotes"."note"`);
        await queryRunner.query(`DROP TABLE "listnotes"."user"`);
    }

}
