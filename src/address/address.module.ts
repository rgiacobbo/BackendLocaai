import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressEntity } from 'src/db/entities/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AddressService],
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  controllers: [AddressController],
})
export class AddressModule {}
