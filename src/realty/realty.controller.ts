import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { RealtyService } from './realty.service';
import { RealtyDto } from './realty.dto';
import { User } from 'src/users/users.decorator';
import { UserEntity } from 'src/db/entities/user.entity';

@Controller('realty')
export class RealtyController {
  constructor(private realtyService: RealtyService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@User() user: any) {
    console.log(user);
    return this.realtyService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id) {
    return this.realtyService.findById(id).catch((e) => {
      throw new NotFoundException(e.user);
    });
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() realtyDto: RealtyDto, @User('sub') userId: string) {
    if (!userId) {
      throw new Error('User ID is undefined');
    }
    console.log('User ID:', userId);
    return this.realtyService.create(realtyDto, userId);
  }

  // @UseGuards(AuthGuard)
  // @Put(':id')
  // update(@Param('id') id, @Body() userDto: UserDto) {
  //   return this.realtyService.update(id, userDto).catch((e) => {
  //     throw new NotFoundException(e.user);
  //   });
  // }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id) {
    return this.realtyService.remove(id).catch((e) => {
      throw new NotFoundException(e.realty);
    });
  }
}
