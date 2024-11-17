import { Module } from '@nestjs/common';
import { AppService } from './mercadopago.service';
import { AppController } from './mercadopago.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class MercadopagoModule {}
