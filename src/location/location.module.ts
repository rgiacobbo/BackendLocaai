import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationEntity } from 'src/db/entities/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [TypeOrmModule.forFeature([LocationEntity])],
})
export class LocationModule {}
