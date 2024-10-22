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
import { LocationService } from './location.service';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/users.decorator';
import { LocationDto } from './location.dto';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id) {
    return this.locationService.findById(id).catch((e) => {
      throw new NotFoundException(e.realty);
    });
  }

  // @UseGuards(AuthGuard)
  // @Get('/user:id')
  // findByUserAndAll(@Param('id') id) {
  //   return this.locationService.findById(id).catch((e) => {
  //     throw new NotFoundException(e.realty);
  //   });
  // }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @Post()
  // create(@Body() locationDto: LocationDto, @User('sub') userId: string) {
  //   if (!userId) {
  //     throw new Error('User ID is undefined');
  //   }
  //   console.log('User ID:', userId);
  //   return this.locationService.create(locationDto, userId);
  // }

  // @ApiParam({ name: 'id' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @Put(':id')
  // update(@Param('id') id, @Body() locationDto: LocationDto) {
  //   return this.locationService.update(id, locationDto).catch((e) => {
  //     throw new NotFoundException(e.location);
  //   });
  // }

  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id) {
    return this.locationService.remove(id).catch((e) => {
      throw new NotFoundException(e.location);
    });
  }
}
