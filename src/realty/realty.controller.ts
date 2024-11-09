import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { RealtyService } from './realty.service';
import { Realty, RealtyDto } from './realty.dto';
import { User } from 'src/users/users.decorator';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Realty')
@Controller('realty')
export class RealtyController {
  constructor(private realtyService: RealtyService) {}

  
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

  @UseGuards(AuthGuard) // Garante que apenas usuários autenticados possam acessar
  @Get('user/:userId')
  async getRealtyByUserId(@Param('userId') userId: string) {
    return this.realtyService.findByUserId(userId);
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


  
  @Get()
async getProperties(@Query('category') category?: string): Promise<Realty[]> {
  // Verifica se há algum filtro de categoria, se sim, passa para o serviço
  return this.realtyService.getProperties(category);
}
}
