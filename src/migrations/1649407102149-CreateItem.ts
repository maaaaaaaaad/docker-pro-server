import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateItem1649407102149 implements MigrationInterface {
    name = 'CreateItem1649407102149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ITEM" ("PK" SERIAL NOT NULL, "CREATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "UPDATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "DELETE_AT" TIMESTAMP, "SUBJECT" character varying NOT NULL, "COVER_IMAGE" character varying NOT NULL, "DESCRIPTION" character varying NOT NULL, "PRICE" integer NOT NULL, "categoryPk" integer, "userPk" integer, CONSTRAINT "PK_4c57d1b8644d377aa577dc2d535" PRIMARY KEY ("PK"))`);
        await queryRunner.query(`CREATE TABLE "CATEGORY" ("PK" SERIAL NOT NULL, "CREATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "UPDATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "DELETE_AT" TIMESTAMP, "VALUE" character varying NOT NULL, CONSTRAINT "PK_8877bc4f311d689908b83f59ec8" PRIMARY KEY ("PK"))`);
        await queryRunner.query(`ALTER TABLE "ITEM" ADD CONSTRAINT "FK_5b06cd921e14116ed1f5c4ab413" FOREIGN KEY ("categoryPk") REFERENCES "CATEGORY"("PK") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ITEM" ADD CONSTRAINT "FK_2be73e768a0603e142121903e91" FOREIGN KEY ("userPk") REFERENCES "User"("PK") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ITEM" DROP CONSTRAINT "FK_2be73e768a0603e142121903e91"`);
        await queryRunner.query(`ALTER TABLE "ITEM" DROP CONSTRAINT "FK_5b06cd921e14116ed1f5c4ab413"`);
        await queryRunner.query(`DROP TABLE "CATEGORY"`);
        await queryRunner.query(`DROP TABLE "ITEM"`);
    }

}
