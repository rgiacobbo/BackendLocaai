import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { RealtyController } from './realty/realty.controller';
import { RealtyService } from './realty/realty.service';
import { RealtyModule } from './realty/realty.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    DbModule,
    RealtyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
