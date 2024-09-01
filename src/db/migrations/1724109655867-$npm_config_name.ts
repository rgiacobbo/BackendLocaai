import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1724109655867 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
        CREATE TABLE "tbuser" (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            name varchar(256) NOT NULL,
            password varchar(256) NOT NULL,
            phone varchar(12) NOT NULL,
            email varchar(256) NOT NULL,
            city varchar(100) NOT NULL,
            cpf varchar(14) NOT NULL
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tbuser;`);
  }
}
