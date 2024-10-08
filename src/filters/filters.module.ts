import { Module } from '@nestjs/common';
import { FiltersController } from './filters.controller';
import { FiltersService } from './filters.service';
import { FilterEntity } from 'src/db/entities/filter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FiltersController],
  providers: [FiltersService],
  imports: [TypeOrmModule.forFeature([FilterEntity])],
})
export class FiltersModule {}
