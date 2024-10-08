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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Realty')
@Controller('realty')
export class RealtyController {
  constructor(private realtyService: RealtyService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.realtyService.findAll();
  }

  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id) {
    return this.realtyService.findById(id).catch((e) => {
      throw new NotFoundException(e.realty);
    });
  }

  // @UseGuards(AuthGuard)
  // @Get('/user:id')
  // findByUserAndAll(@Param('id') id) {
  //   return this.realtyService.findById(id).catch((e) => {
  //     throw new NotFoundException(e.realty);
  //   });
  // }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() realtyDto: RealtyDto, @User('sub') userId: string) {
    if (!userId) {
      throw new Error('User ID is undefined');
    }
    console.log('User ID:', userId);
    return this.realtyService.create(realtyDto, userId);
  }

  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id, @Body() realtyDto: RealtyDto) {
    return this.realtyService.update(id, realtyDto).catch((e) => {
      throw new NotFoundException(e.realty);
    });
  }

  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id) {
    return this.realtyService.remove(id).catch((e) => {
      throw new NotFoundException(e.realty);
    });
  }
}
