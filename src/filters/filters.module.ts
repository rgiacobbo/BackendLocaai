import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { FilterEntity } from '../db/entities/filter.entity';
import { RealtyEntity } from '../db/entities/realty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilterEntity, RealtyEntity]),
  ],
  providers: [FiltersService],
  controllers: [FiltersController],
})
export class FiltersModule {}