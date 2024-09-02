import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RealtyEntity } from 'src/db/entities/realty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RealtyService {
  constructor(
    @InjectRepository(RealtyEntity)
    private readonly realtyRepository: Repository<RealtyEntity>,
  ) {}

  async findAll() {
    const realty = await this.realtyRepository.find();

    return realty;
  }
}
