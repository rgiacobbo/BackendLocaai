import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729556269789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
            CREATE TABLE "tblocation" (
            id UUID PRIMARY KEY,
            dateStart DATE,
            dateEnd DATE,
            userLessor UUID,
            userTenant UUID,
            realtyId UUID,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tblocation;`);
  }
}
