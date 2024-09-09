import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1725841132665 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
        CREATE TABLE "tbaddress" (
        id UUID PRIMARY KEY,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(45) NOT NULL,
        number INTEGER NOT NULL,
        state VARCHAR(45) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_address_realty FOREIGN KEY (id) REFERENCES tbrealty(id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tbaddress;`);
  }
}
