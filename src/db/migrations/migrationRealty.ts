import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1725206831335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
        CREATE TABLE "tbrealty" (
        id UUID NOT NULL DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        value INTEGER NOT NULL,
        description VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        capacity INTEGER NOT NULL,
        userId UUID,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT realty_pk_id PRIMARY KEY (id),
        CONSTRAINT realty_fk_user FOREIGN KEY (userId) REFERENCES tbuser(id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tbrealty;`);
  }
}
