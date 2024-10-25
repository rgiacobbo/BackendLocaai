import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterEntity } from 'src/db/entities/filter.entity';
import { Repository } from 'typeorm';
import { FilterDto } from './filter.dto';
import { RealtyEntity } from 'src/db/entities/realty.entity';

@Injectable()
export class FiltersService {
  constructor(
    @InjectRepository(FilterEntity)
    private readonly filterRepository: Repository<FilterEntity>,
    @InjectRepository(RealtyEntity)
    private readonly realtyRepository: Repository<RealtyEntity>,
  ) {}

  async findAll() {
    const filter = await this.filterRepository.find();

    return filter;
  }

  async create(filterDto: FilterDto, realtyId: string): Promise<FilterEntity> {
    const realty = await this.realtyRepository.findOne({ where: { id: realtyId } });
    if (!realty) {
      throw new NotFoundException('Realty not found');
    }

    const filter = this.filterRepository.create({
      ...filterDto,
      realty,
    });

    return this.filterRepository.save(filter);
  }
}
