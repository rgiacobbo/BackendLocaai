import { Module } from '@nestjs/common';
import { AdvertisingController } from './advertising.controller';
import { AdvertisingService } from './advertising.service';
import { AdvertisingEntity } from 'src/db/entities/advertising.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AdvertisingController],
  imports: [TypeOrmModule.forFeature([AdvertisingEntity])],
  providers: [AdvertisingService],
})
export class AdvertisingModule {}
