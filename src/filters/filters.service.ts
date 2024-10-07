import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterEntity } from 'src/db/entities/filter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FiltersService {
  constructor(
    @InjectRepository(FilterEntity)
    private readonly filterRepository: Repository<FilterEntity>,
  ) {}

  async findAll() {
    const filter = await this.filterRepository.find();

    return filter;
  }
}
