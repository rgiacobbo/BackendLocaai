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
import { AdvertisingService } from './advertising.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdvertisingDto } from './advertising.dto';

@Controller('advertising')
export class AdvertisingController {
  constructor(private advertisingService: AdvertisingService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.advertisingService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id) {
    return this.advertisingService.findById(id).catch((e) => {
      throw new NotFoundException(e.advertising);
    });
  }

  // @UseGuards(AuthGuard)
  // @Get('/user:id')
  // findByUserAndAll(@Param('id') id) {
  //   return this.advertisingService.findById(id).catch((e) => {
  //     throw new NotFoundException(e.realty);
  //   });
  // }

  @UseGuards(AuthGuard)
  @Post()
  create(@Param('id') id, @Body() advertisingDto: AdvertisingDto) {
    if (!id) {
      throw new Error('Realty ID is undefined');
    }
    console.log('Realty ID:', id);
    return this.advertisingService.create(advertisingDto, id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id, @Body() advertisingDto: AdvertisingDto) {
    return this.advertisingService.update(id, advertisingDto).catch((e) => {
      throw new NotFoundException(e.advertising);
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id) {
    return this.advertisingService.remove(id).catch((e) => {
      throw new NotFoundException(e.advertising);
    });
  }
}
