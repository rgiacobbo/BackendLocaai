import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1728946270506 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
        CREATE TABLE "tbadvertising" (
        id UUID PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        dateStart DATE NOT NULL,
        dateEnd DATE NOT NULL,
        value INTEGER,
        realtyId UUID,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_realty_rating FOREIGN KEY (id) REFERENCES tbrealty(id) ON DELETE CASCADE
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tbadvertising;`);
  }
}
