import {MigrationInterface, QueryRunner} from "typeorm";

export class FixNaming1649411616806 implements MigrationInterface {
    name = 'FixNaming1649411616806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "CORE" ("PK" SERIAL NOT NULL, "CREATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "UPDATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "DELETE_AT" TIMESTAMP, CONSTRAINT "PK_aec51992204b59c2610104d7af6" PRIMARY KEY ("PK"))`);
        await queryRunner.query(`CREATE TABLE "CATEGORY" ("PK" SERIAL NOT NULL, "CREATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "UPDATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "DELETE_AT" TIMESTAMP, "VALUE" character varying NOT NULL, CONSTRAINT "PK_8877bc4f311d689908b83f59ec8" PRIMARY KEY ("PK"))`);
        await queryRunner.query(`CREATE TABLE "USER" ("PK" SERIAL NOT NULL, "CREATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "UPDATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "DELETE_AT" TIMESTAMP, "EMAIL" character varying NOT NULL, "PASSWORD" character varying NOT NULL, "NICKNAME" character varying NOT NULL, "AVATAR_IMAGE" character varying, "SOCIAL" character varying, CONSTRAINT "UQ_d4a32d7995d4c1cde2ebe0fb262" UNIQUE ("EMAIL"), CONSTRAINT "UQ_c67cf4bfec10a95757e802a6b3f" UNIQUE ("PASSWORD"), CONSTRAINT "UQ_fd35b69232539b55d01be619847" UNIQUE ("NICKNAME"), CONSTRAINT "PK_d602e8717c13bf984281e96a8ce" PRIMARY KEY ("PK"))`);
        await queryRunner.query(`CREATE TABLE "ITEM" ("PK" SERIAL NOT NULL, "CREATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "UPDATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "DELETE_AT" TIMESTAMP, "SUBJECT" character varying NOT NULL, "COVER_IMAGE" character varying, "DESCRIPTION" character varying NOT NULL, "PRICE" integer NOT NULL, "categoryPk" integer, "ownerPk" integer, CONSTRAINT "PK_4c57d1b8644d377aa577dc2d535" PRIMARY KEY ("PK"))`);
        await queryRunner.query(`ALTER TABLE "ITEM" ADD CONSTRAINT "FK_5b06cd921e14116ed1f5c4ab413" FOREIGN KEY ("categoryPk") REFERENCES "CATEGORY"("PK") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ITEM" ADD CONSTRAINT "FK_61c6d2663e1c891026d3656ea79" FOREIGN KEY ("ownerPk") REFERENCES "USER"("PK") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ITEM" DROP CONSTRAINT "FK_61c6d2663e1c891026d3656ea79"`);
        await queryRunner.query(`ALTER TABLE "ITEM" DROP CONSTRAINT "FK_5b06cd921e14116ed1f5c4ab413"`);
        await queryRunner.query(`DROP TABLE "ITEM"`);
        await queryRunner.query(`DROP TABLE "USER"`);
        await queryRunner.query(`DROP TABLE "CATEGORY"`);
        await queryRunner.query(`DROP TABLE "CORE"`);
    }

}
