import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1724109655867 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
       CREATE TABLE "tbuser" (
        id UUID NOT NULL DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        cpf VARCHAR(255) NOT NULL,
        filterUser VARCHAR(255),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT user_pk_id PRIMARY KEY (id),
        CONSTRAINT user_pk_name UNIQUE (name)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tbuser;`);
  }
}
