import { Module } from '@nestjs/common';
import { RealtyEntity } from 'src/db/entities/realty.entity';
import { RealtyController } from './realty.controller';
import { RealtyService } from './realty.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RealtyController],
  imports: [TypeOrmModule.forFeature([RealtyEntity])],
  providers: [RealtyService],
})
export class RealtyModule {}
