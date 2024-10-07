import { Controller, Get, UseGuards } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('filters')
export class FiltersController {
  constructor(private filtersService: FiltersService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.filtersService.findAll();
  }
}
