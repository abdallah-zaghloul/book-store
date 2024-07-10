import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthMigration1720569376441 implements MigrationInterface {
    name = 'AuthMigration1720569376441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["book-store","public","auth","GENERATED_COLUMN","userId","UUID(persona->>'userId')"]);
        await queryRunner.query(`CREATE TABLE "auth" ("accessId" uuid NOT NULL, "accessToken" text NOT NULL, "persona" jsonb NOT NULL, "userId" uuid GENERATED ALWAYS AS (UUID(persona->>'userId')) STORED NOT NULL, "expiresIn" bigint NOT NULL, "expiredAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "refreshedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "REL_373ead146f110f04dad6084815" UNIQUE ("userId"), CONSTRAINT "PK_639415e79721f3995cf7763961c" PRIMARY KEY ("accessId"))`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_373ead146f110f04dad60848154"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","userId","book-store","public","auth"]);
    }

}
