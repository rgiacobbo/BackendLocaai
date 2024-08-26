import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
<<<<<<< HEAD

@Module({
  controllers: [UsersController],
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
>>>>>>> 3c705c6 (CRUD realty)
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
