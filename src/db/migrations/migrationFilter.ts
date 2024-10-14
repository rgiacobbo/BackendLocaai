import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1728347773616 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
        CREATE TABLE "tbfilter" (
        id UUID PRIMARY KEY,
        nameFilter VARCHAR(255) 
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tbfilter;`);
  }
}
