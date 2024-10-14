import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterEntity } from 'src/db/entities/filter.entity';
import { Repository } from 'typeorm';
import { FilterDto } from './filter.dto';

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

  async create(filterDto: FilterDto) {
    const dbFilter = new FilterEntity();
    dbFilter.nameFilter = filterDto.nameFilter;

    const { id, nameFilter } = await this.filterRepository.save(dbFilter);
    return { id, nameFilter };
  }
}
