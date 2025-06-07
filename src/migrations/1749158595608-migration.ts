import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749158595608 implements MigrationInterface {
    name = 'Migration1749158595608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "logo" character varying, "country" character varying, "city" character varying, "stadium" character varying, "foundedYear" integer, "isActive" boolean NOT NULL DEFAULT true, "description" text, CONSTRAINT "UQ_48c0c32e6247a2de155baeaf980" UNIQUE ("name"), CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."players_position_enum" AS ENUM('goalkeeper', 'defender', 'midfielder', 'forward')`);
        await queryRunner.query(`CREATE TABLE "players" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "nickname" character varying, "dateOfBirth" date, "nationality" character varying, "height" integer, "weight" integer, "position" "public"."players_position_enum" NOT NULL DEFAULT 'midfielder', "jerseyNumber" integer, "photo" character varying, "biography" text, "isActive" boolean NOT NULL DEFAULT true, "teamId" uuid, CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_ecaf0c4aabc76f1a3d1a91ea33c" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_ecaf0c4aabc76f1a3d1a91ea33c"`);
        await queryRunner.query(`DROP TABLE "players"`);
        await queryRunner.query(`DROP TYPE "public"."players_position_enum"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
