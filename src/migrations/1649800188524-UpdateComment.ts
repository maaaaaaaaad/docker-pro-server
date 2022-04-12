import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateComment1649800188524 implements MigrationInterface {
    name = 'UpdateComment1649800188524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "COMMENT" ("PK" SERIAL NOT NULL, "CREATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "UPDATE_AT" TIMESTAMP NOT NULL DEFAULT now(), "DELETE_AT" TIMESTAMP, "CONTENT" character varying NOT NULL, "ownerPk" integer, "itemPk" integer, CONSTRAINT "PK_4aada3f50e7b7da47ba8261dbfe" PRIMARY KEY ("PK"))`);
        await queryRunner.query(`ALTER TABLE "COMMENT" ADD CONSTRAINT "FK_ab84c5fefc827d019917d06c482" FOREIGN KEY ("ownerPk") REFERENCES "USER"("PK") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "COMMENT" ADD CONSTRAINT "FK_a363ef1e64c0c4dc7c36875a8b9" FOREIGN KEY ("itemPk") REFERENCES "ITEM"("PK") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "COMMENT" DROP CONSTRAINT "FK_a363ef1e64c0c4dc7c36875a8b9"`);
        await queryRunner.query(`ALTER TABLE "COMMENT" DROP CONSTRAINT "FK_ab84c5fefc827d019917d06c482"`);
        await queryRunner.query(`DROP TABLE "COMMENT"`);
    }

}
