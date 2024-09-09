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
import { AddressService } from './address.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddressDto } from './address.dto';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id) {
    return this.addressService.findById(id).catch((e) => {
      throw new NotFoundException(e.address);
    });
  }

  // @UseGuards(AuthGuard)
  // @Get('/user:id')
  // findByUserAndAll(@Param('id') id) {
  //   return this.realtyService.findById(id).catch((e) => {
  //     throw new NotFoundException(e.realty);
  //   });
  // }

  @UseGuards(AuthGuard)
  @Post()
  create(@Param('id') id, @Body() addressDto: AddressDto) {
    if (!id) {
      throw new Error('Realty ID is undefined');
    }
    console.log('Realty ID:', id);
    return this.addressService.create(addressDto, id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id, @Body() addressDto: AddressDto) {
    return this.addressService.update(id, addressDto).catch((e) => {
      throw new NotFoundException(e.address);
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id) {
    return this.addressService.remove(id).catch((e) => {
      throw new NotFoundException(e.address);
    });
  }
}
