import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { RealtyModule } from './realty/realty.module';
import { AddressModule } from './address/address.module';
import { RatingModule } from './rating/rating.module';
import { AdvertisingModule } from './advertising/advertising.module';
import { PaymentModule } from './payment/payment.module';
import { LocationModule } from './location/location.module';
import { FiltersModule } from './filters/filters.module';
import { ImagensModule } from './imagens/imagens.module';
import { MercadopagoModule } from './mercadopago/mercadopago.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    DbModule,
    RealtyModule,
    AddressModule,
    RatingModule,
    AdvertisingModule,
    PaymentModule,
    LocationModule,
    FiltersModule,
    ImagensModule,
    MercadopagoModule,
  ],
})
export class AppModule {}
