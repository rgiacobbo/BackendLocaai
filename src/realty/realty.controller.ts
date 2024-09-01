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

@Controller('realty')
export class RealtyController {
  constructor(private realtyService: RealtyService) {}

  // @UseGuards(AuthGuard)
  // @Get()
  // findAll() {
  //   return this.realtyService.findAll();
  // }

  // @UseGuards(AuthGuard)
  // @Get(':id')
  // findById(@Param('id') id) {
  //   return this.realtyService.findById(id).catch((e) => {
  //     throw new NotFoundException(e.user);
  //   });
  // }

  // @Post()
  // create(@Body() userDto: UserDto) {
  //   return this.realtyService.create(userDto);
  // }

  // @UseGuards(AuthGuard)
  // @Put(':id')
  // update(@Param('id') id, @Body() userDto: UserDto) {
  //   return this.realtyService.update(id, userDto).catch((e) => {
  //     throw new NotFoundException(e.user);
  //   });
  // }

  // @UseGuards(AuthGuard)
  // @Delete(':id')
  // delete(@Param('id') id) {
  //   return this.realtyService.remove(id).catch((e) => {
  //     throw new NotFoundException(e.user);
  //   });
  // }
}
