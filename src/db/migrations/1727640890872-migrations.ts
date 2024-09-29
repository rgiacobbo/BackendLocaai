import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1727640890872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
            CREATE TABLE "tbpayment" (
            id UUID PRIMARY KEY,
            typePayment VARCHAR(255) NOT NULL,
            amountPaid DOUBLE NOT NULL,
            tax INTEGER NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tbpayment;`);
  }
}

//CONSTRAINT fk_realty_rating FOREIGN KEY (id) REFERENCES tbrealty(id) ON DELETE CASCADE
