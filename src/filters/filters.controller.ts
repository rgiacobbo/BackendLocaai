import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { FilterDto } from './filter.dto';

@Controller('filters')
export class FiltersController {
  constructor(private filtersService: FiltersService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.filtersService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiBody({ type: [FilterDto] })
  @Post()
  create(@Body() filterDto: FilterDto, realtyId:string) {
    return this.filtersService.create(filterDto, realtyId);
  }
}
