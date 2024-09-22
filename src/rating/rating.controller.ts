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
import { RatingService } from './rating.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RatingDto } from './rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id) {
    return this.ratingService.findById(id).catch((e) => {
      throw new NotFoundException(e.rating);
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
  create(@Param('id') id, @Body() ratingDto: RatingDto) {
    return this.ratingService.create(ratingDto, id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id, @Body() ratingDto: RatingDto) {
    return this.ratingService.update(id, ratingDto).catch((e) => {
      throw new NotFoundException(e.rating);
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id) {
    return this.ratingService.remove(id).catch((e) => {
      throw new NotFoundException(e.rating);
    });
  }
}
