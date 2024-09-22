import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { RatingEntity } from 'src/db/entities/rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealtyEntity } from 'src/db/entities/realty.entity';

@Module({
  controllers: [RatingController],
  imports: [TypeOrmModule.forFeature([RatingEntity, RealtyEntity])],
  providers: [RatingService],
})
export class RatingModule {}
